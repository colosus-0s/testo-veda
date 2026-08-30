-- ============================================================
-- AROGYA PATH — MIGRATION 005: GUEST ORDERS & ORDER TRACKING
-- ============================================================

-- 1. ADD GUEST ACCESS TOKEN COLUMN TO ORDERS
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS guest_access_token UUID DEFAULT uuid_generate_v4();

-- Backfill existing orders that don't have a guest_access_token
UPDATE public.orders 
SET guest_access_token = uuid_generate_v4() 
WHERE guest_access_token IS NULL;

-- Enforce NOT NULL and UNIQUE constraint
ALTER TABLE public.orders 
ALTER COLUMN guest_access_token SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'orders_guest_access_token_key'
  ) THEN
    ALTER TABLE public.orders ADD CONSTRAINT orders_guest_access_token_key UNIQUE (guest_access_token);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_orders_guest_access_token 
ON public.orders(guest_access_token);

-- 2. UPDATE handle_new_user TRIGGER TO SUPPORT ANONYMOUS & PERMANENT USER CONVERSION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_is_anon BOOLEAN := COALESCE(NEW.is_anonymous, FALSE);
  v_full_name TEXT;
BEGIN
  IF v_is_anon THEN
    v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'Valued Guest');
  ELSE
    v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'Valued Customer');
  END IF;

  INSERT INTO public.profiles (
    id, email, full_name, phone, role, registration_completed, created_at, updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    v_full_name,
    NEW.raw_user_meta_data->>'phone',
    'customer',
    TRUE,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = COALESCE(EXCLUDED.email, public.profiles.email),
    full_name = CASE 
      WHEN EXCLUDED.full_name IS NOT NULL AND EXCLUDED.full_name <> 'Valued Guest' THEN EXCLUDED.full_name
      ELSE public.profiles.full_name
    END,
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    role = public.profiles.role, -- PRESERVE EXISTING ROLE (NEVER DOWNGRADE ADMINS/SUPERADMINS)
    registration_completed = TRUE,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. UPDATE create_customer_order RPC TO GENERATE & RETURN GUEST_ACCESS_TOKEN
CREATE OR REPLACE FUNCTION public.create_customer_order(
  p_customer_name TEXT,
  p_customer_email TEXT,
  p_customer_phone TEXT,
  p_shipping_address JSONB,
  p_items JSONB, -- Array of { product_id, quantity }
  p_payment_provider TEXT DEFAULT 'mock',
  p_user_id UUID DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_order_id UUID := uuid_generate_v4();
  v_order_number TEXT := 'AP-' || FLOOR(100000 + RANDOM() * 900000)::TEXT;
  v_guest_access_token UUID := uuid_generate_v4();
  v_user_id UUID := COALESCE(auth.uid(), p_user_id);
  v_subtotal NUMERIC(10, 2) := 0;
  v_shipping_fee NUMERIC(10, 2) := 0;
  v_discount NUMERIC(10, 2) := 0;
  v_tax NUMERIC(10, 2) := 0;
  v_total NUMERIC(10, 2) := 0;
  v_item JSONB;
  v_prod_id UUID;
  v_qty INT;
  v_prod_name TEXT;
  v_prod_price NUMERIC(10, 2);
  v_prod_image TEXT;
  v_prod_sku TEXT;
  v_prod_stock INT;
  v_line_subtotal NUMERIC(10, 2);
BEGIN
  -- Loop through items to validate price & stock server-side
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_prod_id := (v_item->>'product_id')::UUID;
    v_qty := (v_item->>'quantity')::INT;
    
    IF v_qty <= 0 THEN
      RAISE EXCEPTION 'Invalid quantity % for product %', v_qty, v_prod_id;
    END IF;
    
    SELECT name, price, primary_image, sku, stock
    INTO v_prod_name, v_prod_price, v_prod_image, v_prod_sku, v_prod_stock
    FROM public.products WHERE id = v_prod_id AND is_active = TRUE FOR UPDATE;
    
    IF v_prod_price IS NULL THEN
      RAISE EXCEPTION 'Product % is invalid or deactivated', v_prod_id;
    END IF;
    
    IF v_prod_stock < v_qty THEN
      RAISE EXCEPTION 'Insufficient stock for product "%" (Available: %, Requested: %)', v_prod_name, v_prod_stock, v_qty;
    END IF;
    
    v_line_subtotal := v_prod_price * v_qty;
    v_subtotal := v_subtotal + v_line_subtotal;
  END LOOP;
  
  -- Calculate shipping fee
  IF v_subtotal >= 499 OR v_subtotal = 0 THEN
    v_shipping_fee := 0;
  ELSE
    v_shipping_fee := 49;
  END IF;
  
  v_total := v_subtotal + v_shipping_fee - v_discount;
  
  -- Create order record with guest_access_token and user_id
  INSERT INTO public.orders (
    id, order_number, guest_access_token, user_id, customer_name, customer_email, customer_phone,
    shipping_address_json, subtotal, shipping_fee, discount, tax, total,
    currency, order_status, payment_status, payment_provider
  ) VALUES (
    v_order_id, v_order_number, v_guest_access_token, v_user_id, p_customer_name, p_customer_email, p_customer_phone,
    p_shipping_address, v_subtotal, v_shipping_fee, v_discount, v_tax, v_total,
    'INR', 'pending', 'pending', p_payment_provider
  );
  
  -- Insert items and update stock atomically
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_prod_id := (v_item->>'product_id')::UUID;
    v_qty := (v_item->>'quantity')::INT;
    
    SELECT name, price, primary_image, sku INTO v_prod_name, v_prod_price, v_prod_image, v_prod_sku
    FROM public.products WHERE id = v_prod_id;
    
    v_line_subtotal := v_prod_price * v_qty;
    
    INSERT INTO public.order_items (
      order_id, product_id, product_name_snapshot, product_image_snapshot,
      sku_snapshot, pack_size_snapshot, unit_price_snapshot, quantity, subtotal
    ) VALUES (
      v_order_id, v_prod_id, v_prod_name, v_prod_image,
      v_prod_sku, '60 Capsules', v_prod_price, v_qty, v_line_subtotal
    );
    
    PERFORM public.update_product_stock(v_prod_id, -v_qty, 'purchase', 'Customer Order ' || v_order_number, v_order_id::TEXT);
  END LOOP;
  
  RETURN jsonb_build_object(
    'id', v_order_id,
    'order_number', v_order_number,
    'guest_access_token', v_guest_access_token,
    'total', v_total,
    'order_status', 'pending',
    'payment_status', 'pending'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.create_customer_order(TEXT, TEXT, TEXT, JSONB, JSONB, TEXT, UUID) TO anon, authenticated, service_role;

-- 4. CREATE SECURE GUEST ORDER TRACKING RPC FUNCTION
CREATE OR REPLACE FUNCTION public.get_guest_order_details(
  p_order_number TEXT,
  p_access_token UUID
)
RETURNS JSONB AS $$
DECLARE
  v_result JSONB;
BEGIN
  IF p_order_number IS NULL OR p_access_token IS NULL THEN
    RAISE EXCEPTION 'Order number and guest access token are required';
  END IF;

  SELECT jsonb_build_object(
    'id', o.id,
    'order_number', o.order_number,
    'guest_access_token', o.guest_access_token,
    'customer_name', o.customer_name,
    'customer_email', o.customer_email,
    'customer_phone', o.customer_phone,
    'shipping_address', o.shipping_address_json,
    'subtotal', o.subtotal,
    'shipping_fee', o.shipping_fee,
    'discount', o.discount,
    'tax', o.tax,
    'total', o.total,
    'currency', o.currency,
    'order_status', o.order_status,
    'payment_status', o.payment_status,
    'payment_provider', o.payment_provider,
    'provider_order_id', o.provider_order_id,
    'provider_payment_id', o.provider_payment_id,
    'tracking_number', o.tracking_number,
    'courier_name', o.courier_name,
    'created_at', o.created_at,
    'updated_at', o.updated_at,
    'items', COALESCE(
      (
        SELECT jsonb_agg(jsonb_build_object(
          'id', oi.id,
          'order_id', oi.order_id,
          'product_id', oi.product_id,
          'product_name', oi.product_name_snapshot,
          'product_image', oi.product_image_snapshot,
          'sku', oi.sku_snapshot,
          'pack_size', oi.pack_size_snapshot,
          'unit_price', oi.unit_price_snapshot,
          'quantity', oi.quantity,
          'subtotal', oi.subtotal
        ))
        FROM public.order_items oi
        WHERE oi.order_id = o.id
      ), '[]'::jsonb
    )
  ) INTO v_result
  FROM public.orders o
  WHERE LOWER(TRIM(o.order_number)) = LOWER(TRIM(p_order_number))
    AND o.guest_access_token = p_access_token;

  IF v_result IS NULL THEN
    RAISE EXCEPTION 'Order not found or invalid tracking token';
  END IF;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.get_guest_order_details(TEXT, UUID) TO anon, authenticated, service_role;
