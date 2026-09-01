-- ============================================================
-- AROGYA PATH — MIGRATION 006: SECURE GUEST CHECKOUT & GLOBAL ADMIN ORDERS
-- ============================================================

-- 1. PHONE NORMALIZATION UTILITY FUNCTION
CREATE OR REPLACE FUNCTION public.normalize_phone(p_phone TEXT)
RETURNS TEXT AS $$
DECLARE
  v_digits TEXT;
BEGIN
  IF p_phone IS NULL OR TRIM(p_phone) = '' THEN
    RETURN NULL;
  END IF;
  v_digits := REGEXP_REPLACE(p_phone, '\D', '', 'g');
  IF LENGTH(v_digits) >= 10 THEN
    RETURN RIGHT(v_digits, 10);
  ELSE
    RETURN v_digits;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 2. ENSURE GUEST ACCESS TOKEN COLUMN & INDEXES ON public.orders
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'guest_access_token'
  ) THEN
    ALTER TABLE public.orders ADD COLUMN guest_access_token UUID DEFAULT uuid_generate_v4();
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'orders_guest_access_token_key'
  ) THEN
    ALTER TABLE public.orders ADD CONSTRAINT orders_guest_access_token_key UNIQUE (guest_access_token);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_orders_guest_access_token ON public.orders(guest_access_token);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);

-- 3. ATOMIC CHECKOUT ORDER CREATION RPC FUNCTION
CREATE OR REPLACE FUNCTION public.create_customer_order(
  p_customer_name TEXT,
  p_customer_email TEXT,
  p_customer_phone TEXT,
  p_shipping_address JSONB,
  p_items JSONB, -- Array of { product_id, quantity }
  p_payment_provider TEXT DEFAULT 'Cash on Delivery'
)
RETURNS JSONB AS $$
DECLARE
  v_order_id UUID := uuid_generate_v4();
  v_order_number TEXT := 'AP-' || FLOOR(100000 + RANDOM() * 900000)::TEXT;
  v_guest_access_token UUID := uuid_generate_v4();
  v_normalized_phone TEXT := public.normalize_phone(p_customer_phone);
  v_user_id UUID := auth.uid();
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
  IF v_normalized_phone IS NULL OR LENGTH(v_normalized_phone) < 10 THEN
    RAISE EXCEPTION 'A valid 10-digit mobile number is required.';
  END IF;

  -- Validate items & calculate subtotal
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

  -- Calculate shipping fee (Free shipping over ₹499)
  IF v_subtotal >= 499 OR v_subtotal = 0 THEN
    v_shipping_fee := 0;
  ELSE
    v_shipping_fee := 49;
  END IF;

  v_total := v_subtotal + v_shipping_fee - v_discount;

  -- Create order record
  INSERT INTO public.orders (
    id, order_number, guest_access_token, user_id, customer_name, customer_email, customer_phone,
    shipping_address_json, subtotal, shipping_fee, discount, tax, total,
    currency, order_status, payment_status, payment_provider
  ) VALUES (
    v_order_id, v_order_number, v_guest_access_token, v_user_id, p_customer_name, COALESCE(p_customer_email, ''), v_normalized_phone,
    p_shipping_address, v_subtotal, v_shipping_fee, v_discount, v_tax, v_total,
    'INR', 'pending', 'pending', COALESCE(p_payment_provider, 'Cash on Delivery')
  );

  -- Insert order items & update stock
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

GRANT EXECUTE ON FUNCTION public.create_customer_order(TEXT, TEXT, TEXT, JSONB, JSONB, TEXT) TO anon, authenticated, service_role;

-- 4. SECURE AUTHORIZED GUEST ORDER DETAILS RPC FUNCTION
CREATE OR REPLACE FUNCTION public.get_guest_order_details(
  p_order_number TEXT,
  p_access_token UUID DEFAULT NULL,
  p_phone TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_order RECORD;
  v_items JSONB;
  v_clean_phone TEXT := public.normalize_phone(p_phone);
BEGIN
  IF p_order_number IS NULL OR TRIM(p_order_number) = '' THEN
    RAISE EXCEPTION 'Order number is required';
  END IF;

  -- Require either matching UUID guest_access_token, matching phone, or authenticated user/admin
  SELECT * INTO v_order
  FROM public.orders
  WHERE UPPER(order_number) = UPPER(TRIM(p_order_number))
    AND (
      (p_access_token IS NOT NULL AND guest_access_token = p_access_token)
      OR
      (v_clean_phone IS NOT NULL AND customer_phone LIKE '%' || v_clean_phone)
      OR
      (auth.uid() IS NOT NULL AND (user_id = auth.uid() OR public.is_admin()))
    );

  IF v_order.id IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
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
    )
  ) INTO v_items
  FROM public.order_items oi WHERE oi.order_id = v_order.id;

  RETURN jsonb_build_object(
    'id', v_order.id,
    'order_number', v_order.order_number,
    'guest_access_token', v_order.guest_access_token,
    'user_id', v_order.user_id,
    'customer_name', v_order.customer_name,
    'customer_email', v_order.customer_email,
    'customer_phone', v_order.customer_phone,
    'shipping_address', v_order.shipping_address_json,
    'subtotal', v_order.subtotal,
    'shipping_fee', v_order.shipping_fee,
    'discount', v_order.discount,
    'tax', v_order.tax,
    'total', v_order.total,
    'currency', v_order.currency,
    'order_status', v_order.order_status,
    'payment_status', v_order.payment_status,
    'payment_provider', v_order.payment_provider,
    'created_at', v_order.created_at,
    'updated_at', v_order.updated_at,
    'items', COALESCE(v_items, '[]'::jsonb)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.get_guest_order_details(TEXT, UUID, TEXT) TO anon, authenticated, service_role;

-- 5. RLS POLICIES FOR SECURE ORDERS & GLOBAL ADMIN ACCESS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public insert orders via RPC" ON public.orders;
CREATE POLICY "Public insert orders via RPC" ON public.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users read own orders" ON public.orders;
CREATE POLICY "Users read own orders" ON public.orders FOR SELECT USING (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR public.is_admin()
);

DROP POLICY IF EXISTS "Admin update orders" ON public.orders;
CREATE POLICY "Admin update orders" ON public.orders FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "Users read own order items" ON public.order_items;
CREATE POLICY "Users read own order items" ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
      AND ((auth.uid() IS NOT NULL AND orders.user_id = auth.uid()) OR public.is_admin())
  )
);

DROP POLICY IF EXISTS "Admin access order items" ON public.order_items;
CREATE POLICY "Admin access order items" ON public.order_items FOR ALL USING (public.is_admin());
