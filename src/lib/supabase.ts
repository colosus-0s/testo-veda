import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://oqqrcluijcvvxrnkhsip.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_rQ2cCw5_u__ZooQWmdj7YQ_VpKZ_-T6';

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

export const sanitizeSupabaseUrl = (rawUrl: string | undefined): string => {
  if (!rawUrl) return DEFAULT_SUPABASE_URL;
  let cleaned = rawUrl.trim();
  cleaned = cleaned.replace(/\/rest\/v1\/?$/i, '');
  cleaned = cleaned.replace(/\/$/, '');
  return cleaned || DEFAULT_SUPABASE_URL;
};

const rawUrl =
  getEnvVar('VITE_SUPABASE_URL') ||
  getEnvVar('VITE_SUPABASE_PROJECT_URL') ||
  DEFAULT_SUPABASE_URL;

export const supabaseUrl = sanitizeSupabaseUrl(rawUrl);

export const supabasePublishableKey =
  getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY') ||
  getEnvVar('VITE_SUPABASE_ANON_KEY') ||
  DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => true;

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
