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

console.log('===================================================================');
console.log('       SUPABASE LIVE ANONYMOUS AUTH CONFIGURATION TEST            ');
console.log('===================================================================');
console.log('Target Supabase URL:', supabaseUrl);

const client = createClient(supabaseUrl, anonKey);

async function testLiveAnonAuth() {
  console.log('\nInvoking supabase.auth.signInAnonymously()...');
  const { data, error } = await client.auth.signInAnonymously();

  if (error) {
    console.error('\n❌ RESULT: Anonymous Sign-Ins Failed!');
    console.error('Status:', error.status);
    console.error('Error Code:', error.code);
    console.error('Message:', error.message);
    if (error.status === 422 || error.message?.toLowerCase().includes('disabled')) {
      console.error('\nEXPLICIT FINDING: Anonymous Sign-Ins are DISABLED in the Supabase Project Dashboard.');
      console.error('To enable: Supabase Dashboard -> Authentication -> Providers -> Anonymous Sign-Ins -> Enable');
    }
    return { enabled: false, error };
  }

  console.log('\n✅ RESULT: Anonymous Sign-Ins SUCCESSFUL!');
  console.log('User ID (auth.uid()):', data.user?.id);
  console.log('Is Anonymous:', data.user?.is_anonymous);
  console.log('Session Access Token Present:', Boolean(data.session?.access_token));

  // Test getSession rehydration
  const { data: sessionData } = await client.auth.getSession();
  console.log('getSession() User ID:', sessionData.session?.user?.id);
  console.log('getSession() Is Anonymous:', sessionData.session?.user?.is_anonymous);

  return { enabled: true, user: data.user, session: data.session };
}

testLiveAnonAuth().catch(console.error);
