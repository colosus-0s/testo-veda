import { createClient } from '@supabase/supabase-js';

// Safe environment variable retrieval preventing undefined import.meta.env crashes
const getEnvVar = (key: string): string | undefined => {
  try {
    // Check import.meta.env safely
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key];
    }
  } catch {
    // Ignore access errors
  }
  return undefined;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || 'https://placeholder.supabase.co';
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || 'placeholder-anon-key';

export const isSupabaseConfigured = (): boolean => {
  const url = getEnvVar('VITE_SUPABASE_URL');
  const key = getEnvVar('VITE_SUPABASE_ANON_KEY');
  return Boolean(url) && Boolean(key) && url !== 'https://placeholder.supabase.co';
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
