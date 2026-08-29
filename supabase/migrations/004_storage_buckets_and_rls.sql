-- ============================================================
-- AROGYA PATH — SUPABASE STORAGE BUCKETS & RLS SECURITY POLICIES
-- Migration: 004_storage_buckets_and_rls.sql
-- ============================================================

-- 1. Register Public Buckets in storage.buckets (Idempotent)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  (
    'storefront-assets',
    'storefront-assets',
    TRUE,
    52428800, -- 50 MB limit for commercial video & high-res media
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm']
  ),
  (
    'product-images',
    'product-images',
    TRUE,
    10485760, -- 10 MB limit for product gallery images
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
  )
ON CONFLICT (id) DO UPDATE SET
  public = TRUE,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Objects RLS Policies for storefront-assets Bucket
-- Public Read Access for Storefront Visitors
DROP POLICY IF EXISTS "Public read storefront assets" ON storage.objects;
CREATE POLICY "Public read storefront assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'storefront-assets' OR bucket_id = 'product-images');

-- Admin-Only Write Access (Insert, Update, Delete)
DROP POLICY IF EXISTS "Admin insert storefront assets" ON storage.objects;
CREATE POLICY "Admin insert storefront assets"
  ON storage.objects FOR INSERT
  WITH CHECK (
    (bucket_id = 'storefront-assets' OR bucket_id = 'product-images')
    AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admin update storefront assets" ON storage.objects;
CREATE POLICY "Admin update storefront assets"
  ON storage.objects FOR UPDATE
  USING (
    (bucket_id = 'storefront-assets' OR bucket_id = 'product-images')
    AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admin delete storefront assets" ON storage.objects;
CREATE POLICY "Admin delete storefront assets"
  ON storage.objects FOR DELETE
  USING (
    (bucket_id = 'storefront-assets' OR bucket_id = 'product-images')
    AND public.is_admin()
  );
