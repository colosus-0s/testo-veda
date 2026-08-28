import { createClient } from '@supabase/supabase-js';

// Safe environment variable retrieval preventing undefined import.meta.env crashes
const getEnvVar = (key: string): string | undefined => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key];
    }
  } catch {
    // Ignore access errors
  }
  return undefined;
};

const supabaseUrl =
  getEnvVar('VITE_SUPABASE_URL') ||
  getEnvVar('VITE_SUPABASE_PROJECT_URL') ||
  'https://placeholder.supabase.co';

const supabasePublishableKey =
  getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY') ||
  getEnvVar('VITE_SUPABASE_ANON_KEY') ||
  'placeholder-anon-key';

export const isSupabaseConfigured = (): boolean => {
  const url = getEnvVar('VITE_SUPABASE_URL') || getEnvVar('VITE_SUPABASE_PROJECT_URL');
  const key = getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY') || getEnvVar('VITE_SUPABASE_ANON_KEY');
  return Boolean(url) && Boolean(key) && url !== 'https://placeholder.supabase.co';
};

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
