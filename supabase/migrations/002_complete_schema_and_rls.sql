-- ============================================================
-- AROGYA PATH STOREFRONT & ADMIN PANEL — PRODUCTION DATABASE SCHEMA & RLS
-- Migration: 002_complete_schema_and_rls.sql
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'superadmin')),
  registration_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  street TEXT NOT NULL,
  landmark TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'India',
  label TEXT NOT NULL DEFAULT 'Home',
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  subtitle TEXT,
  short_description TEXT,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'wellness',
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  compare_at_price NUMERIC(10, 2) CHECK (compare_at_price >= 0),
  currency TEXT NOT NULL DEFAULT 'INR',
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  low_stock_threshold INT NOT NULL DEFAULT 15,
  pack_size TEXT NOT NULL DEFAULT '60 Capsules',
  servings INT NOT NULL DEFAULT 30,
  capsule_count INT NOT NULL DEFAULT 60,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  fssai_license TEXT NOT NULL DEFAULT '12118441000654',
  primary_image TEXT,
  images_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  badges_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  highlights_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  ingredients_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  supplement_facts_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  usage TEXT,
  warnings TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PRODUCT VARIANTS TABLE
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  pack_size TEXT NOT NULL,
  capsule_count INT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  compare_at_price NUMERIC(10, 2),
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. WISHLIST ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- 6. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address_json JSONB NOT NULL,
  
  subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
  shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (shipping_fee >= 0),
  discount NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (discount >= 0),
  tax NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (tax >= 0),
  total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
  currency TEXT NOT NULL DEFAULT 'INR',
  
  order_status TEXT NOT NULL DEFAULT 'pending' CHECK (
    order_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')
  ),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (
    payment_status IN ('pending', 'completed', 'failed', 'refunded')
  ),
  payment_provider TEXT NOT NULL DEFAULT 'mock',
  provider_order_id TEXT,
  provider_payment_id TEXT,
  tracking_number TEXT,
  courier_name TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  product_name_snapshot TEXT NOT NULL,
  product_image_snapshot TEXT,
  sku_snapshot TEXT,
  variant_id UUID,
  pack_size_snapshot TEXT NOT NULL,
  unit_price_snapshot NUMERIC(10, 2) NOT NULL CHECK (unit_price_snapshot >= 0),
  quantity INT NOT NULL CHECK (quantity > 0),
  subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. INVENTORY MOVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity_change INT NOT NULL,
  new_stock INT NOT NULL CHECK (new_stock >= 0),
  movement_type TEXT NOT NULL CHECK (
    movement_type IN ('initial', 'purchase', 'restock', 'manual_adjustment', 'damaged', 'deactivated')
  ),
  reference_id TEXT,
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. STORE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'store_settings',
  public_settings_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  sensitive_settings_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. ADMIN ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- HELPER FUNCTIONS & TRIGGERS
-- ============================================================

-- Function: Check if auth user is admin/superadmin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Trigger: Prevent Non-Superadmin Role Escalation
CREATE OR REPLACE FUNCTION public.prevent_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
  -- If role is changing, verify caller is superadmin
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    ) THEN
      RAISE EXCEPTION 'Access Denied: Only superadmins can alter user roles.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_prevent_role_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_role_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_role_escalation();

-- Trigger: Automatically Create Profile on Auth Registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, email, full_name, phone, role, registration_completed, created_at, updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Valued Customer'),
    NEW.raw_user_meta_data->>'phone',
    'customer',
    TRUE,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    role = public.profiles.role, -- PRESERVE EXISTING ROLE (NEVER DOWNGRADE ADMINS/SUPERADMINS)
    registration_completed = COALESCE(public.profiles.registration_completed, TRUE),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RPC Function: Atomic Product Stock Update with Inventory Movement Log
CREATE OR REPLACE FUNCTION public.update_product_stock(
  p_product_id UUID,
  p_delta INT,
  p_movement_type TEXT DEFAULT 'manual_adjustment',
  p_notes TEXT DEFAULT NULL,
  p_reference_id TEXT DEFAULT NULL
)
RETURNS INT AS $$
DECLARE
  v_current_stock INT;
  v_new_stock INT;
BEGIN
  -- Select for update to lock row concurrently
  SELECT stock INTO v_current_stock FROM public.products WHERE id = p_product_id FOR UPDATE;
  
  IF v_current_stock IS NULL THEN
    RAISE EXCEPTION 'Product ID % not found', p_product_id;
  END IF;
  
  v_new_stock := GREATEST(0, v_current_stock + p_delta);
  
  UPDATE public.products
  SET stock = v_new_stock, updated_at = NOW()
  WHERE id = p_product_id;
  
  INSERT INTO public.inventory_movements (
    product_id, quantity_change, new_stock, movement_type, reference_id, notes, created_by
  ) VALUES (
    p_product_id, p_delta, v_new_stock, p_movement_type, p_reference_id, p_notes, auth.uid()
  );
  
  RETURN v_new_stock;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC Function: Atomic Server-Calculated Checkout Order Creation
CREATE OR REPLACE FUNCTION public.create_customer_order(
  p_customer_name TEXT,
  p_customer_email TEXT,
  p_customer_phone TEXT,
  p_shipping_address JSONB,
  p_items JSONB, -- Array of { product_id, quantity }
  p_payment_provider TEXT DEFAULT 'mock'
)
RETURNS JSONB AS $$
DECLARE
  v_order_id UUID := uuid_generate_v4();
  v_order_number TEXT := 'AP-' || FLOOR(100000 + RANDOM() * 900000)::TEXT;
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
  
  -- Create order record
  INSERT INTO public.orders (
    id, order_number, user_id, customer_name, customer_email, customer_phone,
    shipping_address_json, subtotal, shipping_fee, discount, tax, total,
    currency, order_status, payment_status, payment_provider
  ) VALUES (
    v_order_id, v_order_number, auth.uid(), p_customer_name, p_customer_email, p_customer_phone,
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
    'total', v_total,
    'order_status', 'pending',
    'payment_status', 'pending'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- 1. Profiles RLS
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users update own profile fields" ON public.profiles FOR UPDATE USING (auth.uid() = id OR public.is_admin());

-- 2. Products RLS
CREATE POLICY "Public read active products" ON public.products FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin full access products" ON public.products FOR ALL USING (public.is_admin());

-- 3. Addresses RLS
CREATE POLICY "Users CRUD own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id OR public.is_admin());

-- 4. Wishlist RLS
CREATE POLICY "Users CRUD own wishlist" ON public.wishlist_items FOR ALL USING (auth.uid() = user_id OR public.is_admin());

-- 5. Orders & Order Items RLS
CREATE POLICY "Users read own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admin update orders" ON public.orders FOR UPDATE USING (public.is_admin());

CREATE POLICY "Users read own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Admin full access order items" ON public.order_items FOR ALL USING (public.is_admin());

-- 6. Inventory Movements RLS
CREATE POLICY "Admin access inventory movements" ON public.inventory_movements FOR ALL USING (public.is_admin());

-- 7. Settings RLS
CREATE POLICY "Public read safe store settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Admin full access settings" ON public.settings FOR ALL USING (public.is_admin());

-- 8. Admin Activity Logs RLS
CREATE POLICY "Admin access activity logs" ON public.admin_activity_logs FOR ALL USING (public.is_admin());

-- ============================================================
-- INITIAL DATABASE SEED (IDEMPOTENT)
-- ============================================================
INSERT INTO public.products (
  id, slug, sku, name, subtitle, category, price, compare_at_price,
  stock, low_stock_threshold, pack_size, servings, capsule_count, is_active,
  short_description, description, primary_image, images_json, badges_json,
  highlights_json, ingredients_json, supplement_facts_json, usage, warnings
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'testo-natural-power-plus',
  'AP-TESTO-001',
  'TESTO Natural Power+ Capsules',
  'Premium Ayurvedic Male Vitality & Testosterone Support',
  'vitality',
  999.00,
  1499.00,
  120,
  15,
  '60 Veg Capsules (500mg)',
  30,
  60,
  TRUE,
  'Scientifically formulated Ayurvedic revitalizer enriched with Himalayan Shilajit, Safed Musli, Ashwagandha, and Gokshura.',
  'Arogya Path TESTO Natural Power+ combines ancient Ayurvedic wisdom with modern scientific standardization to support peak male stamina, vitality, and hormonal balance naturally.',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop"]'::jsonb,
  '["GMP Certified", "100% Herbal", "FSSAI Approved", "Ayush Certified"]'::jsonb,
  '["Supports Natural Testosterone", "Boosts Muscle Stamina & Energy", "Reduces Stress & Cortisol"]'::jsonb,
  '[{"name": "Shilajit", "amount": "150mg"}, {"name": "Ashwagandha", "amount": "100mg"}, {"name": "Safed Musli", "amount": "100mg"}]'::jsonb,
  '{"servingSize": "2 Capsules", "servingsPerContainer": 30}'::jsonb,
  'Take 1 capsule twice daily with warm water or milk after meals.',
  'Consult your physician before use if you have underlying medical conditions.'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  updated_at = NOW();
