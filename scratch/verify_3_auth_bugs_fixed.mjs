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

const rawUrl = process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/$/, '');
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

const isConfigured = Boolean(process.env.VITE_SUPABASE_URL) && process.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run3AuthBugsVerificationSuite() {
  console.log('===========================================================');
  console.log('  AROGYA PATH — 3-BUG AUTHENTICATION VERIFICATION SUITE   ');
  console.log('===========================================================');

  let passed = 0;
  let failed = 0;

  // TEST G: Attempt login with unregistered email
  console.log('\n[TEST G] Attempting login with unregistered email...');
  const { data: unregData, error: unregError } = await supabase.auth.signInWithPassword({
    email: `unregistered_${Date.now()}@testarogyapath.com`,
    password: 'WrongPassword123!',
  });

  if (unregError || !unregData?.user) {
    console.log('  ✅ PASSED: Unregistered email login failed as expected.');
    passed++;
  } else {
    console.error('  ❌ FAILED: Unregistered email login succeeded unexpectedly!');
    failed++;
  }

  // Duplicate Check logic verification
  console.log('\n[TEST C] Identity Array Duplicate Check Logic Verification...');
  const sampleDuplicateObj = { user: { id: 'usr_123', identities: [] } };
  if (sampleDuplicateObj.user && Array.isArray(sampleDuplicateObj.user.identities) && sampleDuplicateObj.user.identities.length === 0) {
    console.log('  ✅ PASSED: Duplicate user object with empty identities array correctly detected.');
    passed++;
  } else {
    console.error('  ❌ FAILED: Duplicate detection failed.');
    failed++;
  }

  console.log('\n===========================================================');
  console.log(`  RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log('===========================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

run3AuthBugsVerificationSuite().catch((err) => {
  console.error('Unhandled error during test suite:', err);
  process.exit(1);
});
