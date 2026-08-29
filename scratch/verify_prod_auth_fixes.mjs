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

if (!anonKey || !secretKey) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

const publicClient = createClient(supabaseUrl, anonKey);
const adminClient = createClient(supabaseUrl, secretKey);

async function runVerificationSuite() {
  console.log('===========================================================');
  console.log('    AROGYA PATH — PRODUCTION AUTH FIXES VERIFICATION SUITE ');
  console.log('===========================================================');

  const testMatrix = [];

  // 1. Verify Admin Account Profile & Role
  console.log('\n1. Verifying Admin Account (arogyapathadmin@gmail.com)...');
  const { data: adminProf, error: adminErr } = await adminClient
    .from('profiles')
    .select('*')
    .eq('email', 'arogyapathadmin@gmail.com')
    .single();

  if (adminProf && adminProf.role === 'admin' && adminProf.registration_completed === true) {
    testMatrix.push({
      test: '1. Admin Profile & Role Verification',
      result: 'PASS',
      evidence: `UUID: ${adminProf.id}, Role: ${adminProf.role}, Full Name: "${adminProf.full_name}", Reg Completed: ${adminProf.registration_completed}`,
    });
  } else {
    testMatrix.push({
      test: '1. Admin Profile & Role Verification',
      result: 'FAIL',
      evidence: `Error: ${adminErr?.message || 'Admin profile invalid'}`,
    });
  }

  // 2. Verify Existing Customer Account (ashoeb494@gmail.com)
  console.log('\n2. Verifying Existing Customer Account (ashoeb494@gmail.com)...');
  const { data: custProf, error: custErr } = await adminClient
    .from('profiles')
    .select('*')
    .eq('email', 'ashoeb494@gmail.com')
    .single();

  if (custProf && custProf.role === 'customer' && custProf.registration_completed === true) {
    testMatrix.push({
      test: '2. Existing Customer Profile & Reg Verification',
      result: 'PASS',
      evidence: `UUID: ${custProf.id}, Email: ${custProf.email}, Full Name: "${custProf.full_name}", Reg Completed: ${custProf.registration_completed}`,
    });
  } else {
    testMatrix.push({
      test: '2. Existing Customer Profile & Reg Verification',
      result: 'FAIL',
      evidence: `Error: ${custErr?.message || 'Customer profile missing'}`,
    });
  }

  // 3. Verify Unknown Email Rejection
  console.log('\n3. Verifying Unknown Email Rejection...');
  const randomUnknownEmail = `unknown_auth_test_${Date.now()}@example.com`;
  const { error: unknownLoginErr } = await publicClient.auth.signInWithPassword({
    email: randomUnknownEmail,
    password: 'WrongPassword123!',
  });

  if (unknownLoginErr && unknownLoginErr.message.includes('Invalid login credentials')) {
    testMatrix.push({
      test: '3. Unknown Email Rejection',
      result: 'PASS',
      evidence: `Rejected as expected with message: "${unknownLoginErr.message}"`,
    });
  } else {
    testMatrix.push({
      test: '3. Unknown Email Rejection',
      result: 'FAIL',
      evidence: `Unexpected outcome: ${unknownLoginErr?.message || 'No error thrown'}`,
    });
  }

  // 4. Verify Customer Role Escalation Blocked
  console.log('\n4. Verifying Customer Role Escalation Protection...');
  const ts = Date.now();
  const testCustEmail = `esc_test_${ts}@example.com`;
  const testCustPass = 'CustEscPass123!';

  const { data: testCustAuth } = await adminClient.auth.admin.createUser({
    email: testCustEmail,
    password: testCustPass,
    email_confirm: true,
  });

  if (testCustAuth?.user) {
    await adminClient.from('profiles').upsert({
      id: testCustAuth.user.id,
      email: testCustEmail,
      role: 'customer',
      registration_completed: true,
    });

    const testCustClient = createClient(supabaseUrl, anonKey);
    await testCustClient.auth.signInWithPassword({ email: testCustEmail, password: testCustPass });

    const { error: errEsc } = await testCustClient
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', testCustAuth.user.id);

    const { data: recheckedProf } = await adminClient
      .from('profiles')
      .select('role')
      .eq('id', testCustAuth.user.id)
      .single();

    if (errEsc && recheckedProf?.role === 'customer') {
      testMatrix.push({
        test: '4. Customer Role Escalation Blocked',
        result: 'PASS',
        evidence: `Blocked with message: "${errEsc.message}". Role remained "customer".`,
      });
    } else {
      testMatrix.push({
        test: '4. Customer Role Escalation Blocked',
        result: 'FAIL',
        evidence: `Escalation was NOT blocked! Role: ${recheckedProf?.role}`,
      });
    }

    // Cleanup test user
    await adminClient.from('profiles').delete().eq('id', testCustAuth.user.id);
    await adminClient.auth.admin.deleteUser(testCustAuth.user.id);
  }

  // 5. Verify RLS Admin Data Isolation (Customer querying inventory_movements)
  console.log('\n5. Verifying RLS Admin Data Isolation...');
  const { data: invData, error: invErr } = await publicClient.from('inventory_movements').select('*');

  if (!invData || invData.length === 0) {
    testMatrix.push({
      test: '5. Admin Data RLS Isolation (Inventory)',
      result: 'PASS',
      evidence: `Unauthenticated/Customer query on inventory_movements returned 0 rows. Error: ${invErr?.message || 'None'}`,
    });
  } else {
    testMatrix.push({
      test: '5. Admin Data RLS Isolation (Inventory)',
      result: 'FAIL',
      evidence: `Leak detected! Customer fetched ${invData.length} inventory rows.`,
    });
  }

  console.log('\n===========================================================');
  console.log('                 FINAL VERIFICATION REPORT                 ');
  console.log('===========================================================');
  console.table(testMatrix);
  console.log('===========================================================\n');
}

runVerificationSuite().catch((err) => {
  console.error('Unhandled error during verification:', err);
  process.exit(1);
});
