-- ============================================================
-- AROGYA PATH — MIGRATION 006: PHONE-BASED CUSTOMER ARCHITECTURE
-- ============================================================

-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. CREATE public.customers TABLE
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  password_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on phone for fast lookup
CREATE INDEX IF NOT EXISTS idx_customers_phone ON public.customers(phone);

-- 2. UPDATE public.orders TABLE SCHEMA
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES public.customers(id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone);

-- 3. PHONE NORMALIZATION FUNCTION (Canonical 10-digit Indian Mobile)
CREATE OR REPLACE FUNCTION public.normalize_phone(p_phone TEXT)
RETURNS TEXT AS $$
DECLARE
  v_digits TEXT;
BEGIN
  IF p_phone IS NULL OR TRIM(p_phone) = '' THEN
    RETURN NULL;
  END IF;
  -- Extract all numeric digits
  v_digits := REGEXP_REPLACE(p_phone, '\D', '', 'g');
  -- Return last 10 digits for Indian phone numbers
  IF LENGTH(v_digits) >= 10 THEN
    RETURN RIGHT(v_digits, 10);
  ELSE
    RETURN v_digits;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 4. ATOMIC CHECKOUT ORDER CREATION RPC FUNCTION
CREATE OR REPLACE FUNCTION public.create_customer_order(
  p_customer_name TEXT,
  p_customer_phone TEXT,
  p_shipping_address JSONB,
  p_items JSONB, -- Array of { product_id, quantity }
  p_payment_provider TEXT DEFAULT 'Cash on Delivery',
  p_customer_email TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_order_id UUID := uuid_generate_v4();
  v_order_number TEXT := 'AP-' || FLOOR(100000 + RANDOM() * 900000)::TEXT;
  v_guest_access_token UUID := uuid_generate_v4();
  v_normalized_phone TEXT := public.normalize_phone(p_customer_phone);
  v_customer_id UUID;
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

  -- Find or create customer record by canonical phone
  SELECT id INTO v_customer_id FROM public.customers WHERE phone = v_normalized_phone;

  IF v_customer_id IS NULL THEN
    v_customer_id := uuid_generate_v4();
    INSERT INTO public.customers (
      id, phone, full_name, created_at, updated_at
    ) VALUES (
      v_customer_id, v_normalized_phone, p_customer_name, NOW(), NOW()
    );
  ELSE
    UPDATE public.customers
    SET full_name = COALESCE(NULLIF(TRIM(p_customer_name), ''), full_name),
        updated_at = NOW()
    WHERE id = v_customer_id;
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

  -- Create order record with customer_id link
  INSERT INTO public.orders (
    id, order_number, guest_access_token, customer_id, user_id, customer_name, customer_email, customer_phone,
    shipping_address_json, subtotal, shipping_fee, discount, tax, total,
    currency, order_status, payment_status, payment_provider
  ) VALUES (
    v_order_id, v_order_number, v_guest_access_token, v_customer_id, v_customer_id, p_customer_name, COALESCE(p_customer_email, ''), v_normalized_phone,
    p_shipping_address, v_subtotal, v_shipping_fee, v_discount, v_tax, v_total,
    'INR', 'pending', 'pending', COALESCE(p_payment_provider, 'Cash on Delivery')
  );

  -- Insert order items & update product stock
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
    'customer_id', v_customer_id,
    'guest_access_token', v_guest_access_token,
    'total', v_total,
    'order_status', 'pending',
    'payment_status', 'pending'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.create_customer_order(TEXT, TEXT, JSONB, JSONB, TEXT, TEXT) TO anon, authenticated, service_role;

-- 5. CUSTOMER PHONE AUTHENTICATION & ORDERS RPC FUNCTION
CREATE OR REPLACE FUNCTION public.customer_phone_login(
  p_phone TEXT,
  p_password TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_normalized_phone TEXT := public.normalize_phone(p_phone);
  v_customer RECORD;
  v_orders JSONB;
BEGIN
  IF v_normalized_phone IS NULL OR LENGTH(v_normalized_phone) < 10 THEN
    RAISE EXCEPTION 'A valid 10-digit mobile number is required.';
  END IF;

  SELECT * INTO v_customer FROM public.customers WHERE phone = v_normalized_phone;

  IF v_customer.id IS NULL THEN
    RAISE EXCEPTION 'No customer account found for mobile number %', v_normalized_phone;
  END IF;

  -- Set password on first login if unset; otherwise verify existing password
  IF v_customer.password_hash IS NOT NULL AND v_customer.password_hash <> crypt(p_password, v_customer.password_hash) THEN
    RAISE EXCEPTION 'Invalid password for account. Please verify your password.';
  ELSIF v_customer.password_hash IS NULL THEN
    UPDATE public.customers
    SET password_hash = crypt(p_password, gen_salt('bf')),
        updated_at = NOW()
    WHERE id = v_customer.id;
  END IF;

  -- Aggregate customer's orders
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'id', o.id,
      'order_number', o.order_number,
      'customer_id', o.customer_id,
      'customer_name', o.customer_name,
      'customer_email', o.customer_email,
      'customer_phone', o.customer_phone,
      'shipping_address_json', o.shipping_address_json,
      'subtotal', o.subtotal,
      'shipping_fee', o.shipping_fee,
      'discount', o.discount,
      'tax', o.tax,
      'total', o.total,
      'currency', o.currency,
      'order_status', o.order_status,
      'payment_status', o.payment_status,
      'payment_provider', o.payment_provider,
      'created_at', o.created_at,
      'order_items', (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', oi.id,
            'order_id', oi.order_id,
            'product_id', oi.product_id,
            'product_name_snapshot', oi.product_name_snapshot,
            'product_image_snapshot', oi.product_image_snapshot,
            'sku_snapshot', oi.sku_snapshot,
            'pack_size_snapshot', oi.pack_size_snapshot,
            'unit_price_snapshot', oi.unit_price_snapshot,
            'quantity', oi.quantity,
            'subtotal', oi.subtotal
          )
        ) FROM public.order_items oi WHERE oi.order_id = o.id
      )
    ) ORDER BY o.created_at DESC
  ), '[]'::jsonb) INTO v_orders
  FROM public.orders o
  WHERE o.customer_id = v_customer.id OR o.customer_phone = v_normalized_phone;

  RETURN jsonb_build_object(
    'customer', jsonb_build_object(
      'id', v_customer.id,
      'full_name', v_customer.full_name,
      'phone', v_customer.phone
    ),
    'orders', v_orders
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.customer_phone_login(TEXT, TEXT) TO anon, authenticated, service_role;

-- 6. PUBLIC ORDER BY NUMBER LOOKUP RPC FOR IMMEDIATE POST-CHECKOUT TRACKING
CREATE OR REPLACE FUNCTION public.get_order_by_number(
  p_order_number TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_result JSONB;
BEGIN
  IF p_order_number IS NULL OR TRIM(p_order_number) = '' THEN
    RAISE EXCEPTION 'Order number is required';
  END IF;

  SELECT jsonb_build_object(
    'id', o.id,
    'order_number', o.order_number,
    'customer_id', o.customer_id,
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
    'created_at', o.created_at,
    'updated_at', o.updated_at,
    'items', (
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
      ) FROM public.order_items oi WHERE oi.order_id = o.id
    )
  ) INTO v_result
  FROM public.orders o
  WHERE UPPER(o.order_number) = UPPER(TRIM(p_order_number));

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.get_order_by_number(TEXT) TO anon, authenticated, service_role;

-- 7. UPDATE RLS POLICIES FOR ADMIN GLOBAL ACCESS
DROP POLICY IF EXISTS "Admin read all orders" ON public.orders;
CREATE POLICY "Admin read all orders" ON public.orders FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admin update orders" ON public.orders;
CREATE POLICY "Admin update orders" ON public.orders FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin access order items" ON public.order_items;
CREATE POLICY "Admin access order items" ON public.order_items FOR ALL USING (public.is_admin());
