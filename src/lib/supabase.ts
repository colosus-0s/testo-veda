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

// URL Sanitization: Strip accidental /rest/v1/ suffix or trailing slashes
export const sanitizeSupabaseUrl = (rawUrl: string | undefined): string => {
  if (!rawUrl) return 'https://placeholder.supabase.co';
  let cleaned = rawUrl.trim();
  cleaned = cleaned.replace(/\/rest\/v1\/?$/i, '');
  cleaned = cleaned.replace(/\/$/, '');
  return cleaned;
};

const rawUrl =
  getEnvVar('VITE_SUPABASE_URL') ||
  getEnvVar('VITE_SUPABASE_PROJECT_URL');

const supabaseUrl = sanitizeSupabaseUrl(rawUrl);

const supabasePublishableKey =
  getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY') ||
  getEnvVar('VITE_SUPABASE_ANON_KEY') ||
  'placeholder-anon-key';

export const isSupabaseConfigured = (): boolean => {
  const url = rawUrl;
  const key =
    getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY') ||
    getEnvVar('VITE_SUPABASE_ANON_KEY');
  return Boolean(url) && Boolean(key) && sanitizeSupabaseUrl(url) !== 'https://placeholder.supabase.co';
};

// Safe non-sensitive development diagnostic logger
if (typeof window !== 'undefined' && import.meta.env?.DEV) {
  console.log('[Supabase Config Diagnostic]', {
    supabaseConfigured: isSupabaseConfigured(),
    supabaseUrlConfigured: Boolean(getEnvVar('VITE_SUPABASE_URL')),
    publishableKeyConfigured: Boolean(getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY')),
    sanitizedUrl: supabaseUrl,
  });
}

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
