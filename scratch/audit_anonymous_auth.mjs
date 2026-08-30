import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      const key = parts[0]?.trim();
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
      if (key && val) {
        process.env[key] = val;
      }
    }
  });
}

loadEnvFile(path.resolve(rootDir, '.env'));

const rawUrl = process.env.VITE_SUPABASE_URL || 'https://oqqrcluijcvvxrnkhsip.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/$/, '');
const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const publicClient = createClient(supabaseUrl, anonKey);
const adminClient = createClient(supabaseUrl, secretKey);

async function auditAnonAuth() {
  console.log('===========================================================');
  console.log('  AUDITING SUPABASE ANONYMOUS AUTHENTICATION CAPABILITY     ');
  console.log('===========================================================');

  try {
    console.log('1. Attempting publicClient.auth.signInAnonymously()...');
    const { data, error } = await publicClient.auth.signInAnonymously();

    if (error) {
      console.log('❌ signInAnonymously Error:', error.message, '| Status:', error.status);
      console.log('Note: Anonymous sign-ins might need to be toggled ON in Supabase Dashboard -> Auth -> Providers -> Anonymous Sign-Ins.');
    } else {
      console.log('✅ signInAnonymously Succeeded!');
      console.log('   User ID:', data.user?.id);
      console.log('   Is Anonymous:', data.user?.is_anonymous);
      console.log('   Session active:', !!data.session);

      if (data.user?.id) {
        // Clean up test anon user
        await adminClient.auth.admin.deleteUser(data.user.id);
        console.log('   Cleaned up test anonymous user.');
      }
    }
  } catch (err) {
    console.error('Exception during anonymous auth audit:', err);
  }

  console.log('===========================================================\n');
}

auditAnonAuth();
