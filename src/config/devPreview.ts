/**
 * Development Admin Preview Configuration
 * 
 * Provides an isolated testing access mechanism during local development before
 * connecting real Supabase Auth.
 * 
 * Rules:
 * - Active during local Vite development (import.meta.env.DEV) or if VITE_ADMIN_PREVIEW === 'true'
 * - Inactive in production builds unless VITE_ADMIN_PREVIEW is explicitly set
 * - Does NOT mutate user roles in persistent storage or grant real Supabase database permissions
 * - Easily removable once real Supabase Auth + RLS role policy is activated
 */
export const isDevPreviewActive = (): boolean => {
  if (typeof window === 'undefined') return true;
  const isDev = Boolean(import.meta.env.DEV);
  const flag = import.meta.env.VITE_ADMIN_PREVIEW;
  return isDev || flag === 'true';
};
