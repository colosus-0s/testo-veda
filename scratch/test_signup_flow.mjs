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
loadEnvFile(path.resolve(rootDir, '.env.local'));

const rawUrl = process.env.VITE_SUPABASE_URL || 'https://oqqrcluijcvvxrnkhsip.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/$/, '');
const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const publicClient = createClient(supabaseUrl, anonKey);
const adminClient = createClient(supabaseUrl, secretKey);

async function testSignupFlow() {
  console.log('===========================================================');
  console.log('      TESTING PUBLIC CLIENT SIGNUP & LOGIN ERROR DIAGNOSTIC');
  console.log('===========================================================');

  const ts = Date.now();
  const testEmail = `public_signup_${ts}@outlook.com`;
  const testPass = 'PublicPass123!';
  const testFullName = 'Public Test User';

  console.log(`1. Calling publicClient.auth.signUp for: ${testEmail}...`);
  const { data: signUpData, error: signUpErr } = await publicClient.auth.signUp({
    email: testEmail,
    password: testPass,
    options: {
      data: { full_name: testFullName, role: 'customer' },
    },
  });

  if (signUpErr) {
    console.log('   signUp Error:', signUpErr.message);
  } else {
    console.log('   signUp Succeeded!');
    console.log('   User ID:', signUpData.user?.id);
    console.log('   Session returned:', !!signUpData.session);
    console.log('   Email Confirmed At:', signUpData.user?.email_confirmed_at);
  }

  const userId = signUpData.user?.id;

  if (userId) {
    // Check profile created by trigger
    const { data: prof, error: profErr } = await adminClient
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    console.log('\n2. Profile in DB after signUp:', prof);

    // Test signInWithPassword immediately
    console.log('\n3. Testing signInWithPassword immediately after signUp...');
    const { data: loginData, error: loginErr } = await publicClient.auth.signInWithPassword({
      email: testEmail,
      password: testPass,
    });

    if (loginErr) {
      console.log('❌ signInWithPassword Error:', loginErr.message, 'Status:', loginErr.status);
    } else {
      console.log('✅ signInWithPassword Succeeded!');
    }

    // Clean up
    await adminClient.from('profiles').delete().eq('id', userId);
    await adminClient.auth.admin.deleteUser(userId);
    console.log('\n4. Cleaned up test user.');
  }

  console.log('===========================================================\n');
}

testSignupFlow().catch((err) => {
  console.error('Diagnostic error:', err);
  process.exit(1);
});
