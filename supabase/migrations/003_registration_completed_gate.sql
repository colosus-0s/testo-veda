-- ============================================================
-- AROGYA PATH — STOREFRONT REGISTRATION GATE & TAMPERING PROTECTION
-- Migration: 003_registration_completed_gate.sql
-- ============================================================

-- 1. Add registration_completed column to public.profiles if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'registration_completed'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN registration_completed BOOLEAN NOT NULL DEFAULT FALSE;
  END IF;
END $$;

-- 2. Trigger: Automatically Create Profile on Auth Registration (Preserving Existing Roles)
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

-- 3. Trigger: Prevent Tampering with role OR registration_completed via Client REST API
CREATE OR REPLACE FUNCTION public.prevent_registration_flag_tampering()
RETURNS TRIGGER AS $$
BEGIN
  -- Allow service_role key or postgres database admin
  IF (auth.role() = 'service_role') OR (current_user = 'postgres') THEN
    RETURN NEW;
  END IF;

  -- If role OR registration_completed is changing, verify caller is superadmin
  IF (OLD.role IS DISTINCT FROM NEW.role) OR (OLD.registration_completed IS DISTINCT FROM NEW.registration_completed) THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    ) THEN
      RAISE EXCEPTION 'Access Denied: Cannot alter role or registration status directly.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_prevent_registration_flag_tampering ON public.profiles;
CREATE TRIGGER trg_prevent_registration_flag_tampering
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_registration_flag_tampering();

-- 4. SECURITY DEFINER RPC: Complete Storefront Registration
CREATE OR REPLACE FUNCTION public.complete_storefront_registration(
  p_full_name TEXT,
  p_phone TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_email TEXT;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthenticated user cannot complete registration.';
  END IF;

  SELECT email INTO v_email FROM auth.users WHERE id = v_user_id;

  INSERT INTO public.profiles (
    id, email, full_name, phone, role, registration_completed, created_at, updated_at
  ) VALUES (
    v_user_id, COALESCE(v_email, 'user@arogyapath.com'), COALESCE(p_full_name, 'Valued Customer'),
    p_phone, 'customer', TRUE, NOW(), NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    role = public.profiles.role, -- PRESERVE EXISTING ROLE (NEVER DOWNGRADE ADMINS/SUPERADMINS)
    registration_completed = TRUE,
    updated_at = NOW();

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
