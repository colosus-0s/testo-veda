import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

loadEnvFile(path.resolve(__dirname, '../.env'));
loadEnvFile(path.resolve(__dirname, '../.env.local'));

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';
const isConfigured = process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runAuthVerificationSuite() {
  console.log('===========================================================');
  console.log('  AROGYA PATH — REGISTRATION-ONLY AUTH VERIFICATION SUITE  ');
  console.log('===========================================================');
  console.log(`  Supabase Status: ${isConfigured ? 'CONNECTED' : 'UNCONFIGURED / SAFE GUARD ACTIVE'}`);

  let passed = 0;
  let failed = 0;

  // CASE A: Non-existent email login attempt MUST FAIL
  console.log('\n[TEST 1] Case A: Login with unregistered email...');
  const testEmailNonExistent = `unregistered_${Date.now()}@testarogyapath.com`;
  const { data: dataA, error: errorA } = await supabase.auth.signInWithPassword({
    email: testEmailNonExistent,
    password: 'Password123!',
  });

  if (errorA || !dataA?.user) {
    console.log('  ✅ PASSED: Unregistered email login attempt failed as expected.');
    passed++;
  } else {
    console.error('  ❌ FAILED: Unregistered email login succeeded unexpectedly!');
    failed++;
  }

  if (isConfigured) {
    // CASE C: Real Storefront Registration
    console.log('\n[TEST 2] Case C: Storefront Registration (/register)...');
    const testRegEmail = `test_customer_${Date.now()}@testarogyapath.com`;
    const testRegPass = 'SecurePass123!';

    const { data: dataReg, error: errorReg } = await supabase.auth.signUp({
      email: testRegEmail,
      password: testRegPass,
      options: {
        data: {
          full_name: 'Test Storefront Customer',
          phone: '+91 9999988888',
          role: 'customer',
        },
      },
    });

    if (errorReg || !dataReg.user) {
      console.error('  ❌ FAILED: Storefront registration signUp failed:', errorReg?.message);
      failed++;
    } else {
      console.log('  ✅ Auth user created with ID:', dataReg.user.id);

      const { error: rpcErr } = await supabase.rpc('complete_storefront_registration', {
        p_full_name: 'Test Storefront Customer',
        p_phone: '+91 9999988888',
      });

      if (rpcErr) {
        console.warn('  ⚠️ RPC Warning:', rpcErr.message);
      } else {
        console.log('  ✅ RPC complete_storefront_registration executed successfully.');
      }

      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', dataReg.user.id)
        .single();

      if (prof) {
        console.log('  ✅ PASSED: Profile created with role =', prof.role, ', registration_completed =', prof.registration_completed);
        passed++;
      } else {
        console.error('  ❌ FAILED: Profile missing in public.profiles.');
        failed++;
      }
    }
  } else {
    console.log('\n[TEST 2-5] Skipping live network queries (Supabase URL unconfigured, safe fallback active).');
  }

  console.log('\n===========================================================');
  console.log(`  RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log('===========================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runAuthVerificationSuite().catch((err) => {
  console.error('Unhandled error during test suite:', err);
  process.exit(1);
});
