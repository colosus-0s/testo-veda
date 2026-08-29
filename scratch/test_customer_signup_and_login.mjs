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

async function testCustomerSignupAndLogin() {
  console.log('===========================================================');
  console.log('  TESTING REAL CUSTOMER SIGNUP -> PROFILE -> LOGIN FLOW   ');
  console.log('===========================================================');

  const ts = Date.now();
  const testEmail = `new_test_cust_${ts}@gmail.com`;
  const testPass = 'NewCustomerPass123!';
  const testFullName = 'New Test Customer';

  // 1. Create Auth User via adminClient (bypassing signUp rate limit)
  console.log(`1. Creating Auth user: ${testEmail}...`);
  const { data: createData, error: createErr } = await adminClient.auth.admin.createUser({
    email: testEmail,
    password: testPass,
    email_confirm: true,
    user_metadata: { full_name: testFullName, role: 'customer' },
  });

  if (createErr || !createData.user) {
    console.error('❌ createUser Failed:', createErr?.message);
    process.exit(1);
  }

  const userId = createData.user.id;
  console.log(`✅ Auth User Created! ID: ${userId}`);

  // 2. Check if handle_new_user trigger inserted profile in public.profiles
  console.log('\n2. Checking public.profiles immediately after Auth user creation...');
  const { data: profInDb, error: profErrInDb } = await adminClient
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  console.log('   Profile in DB:', profInDb);
  console.log('   Query error:', profErrInDb?.message || 'None');

  // 3. Perform signInWithPassword using publicClient (customer credentials)
  console.log('\n3. Executing signInWithPassword with customer publicClient...');
  const custClient = createClient(supabaseUrl, anonKey);
  const { data: loginData, error: loginErr } = await custClient.auth.signInWithPassword({
    email: testEmail,
    password: testPass,
  });

  if (loginErr || !loginData.user) {
    console.error('❌ signInWithPassword Failed:', loginErr?.message);
    process.exit(1);
  }

  console.log('✅ signInWithPassword Succeeded! Authenticated Customer Session ID:', loginData.user.id);

  // 4. Query public.profiles using custClient (authenticated customer session)
  console.log('\n4. Querying public.profiles AS THE AUTHENTICATED CUSTOMER...');
  const { data: custReadProf, error: custReadErr } = await custClient
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  console.log('   Profile returned to customer:', custReadProf);
  console.log('   Error returned to customer:', custReadErr?.message || 'None');

  // 5. Test RPC complete_storefront_registration if profile was null
  if (!custReadProf) {
    console.log('\n5. Profile was NULL for customer! Invoking complete_storefront_registration RPC as customer...');
    const { data: rpcRes, error: rpcErr } = await custClient.rpc('complete_storefront_registration', {
      p_full_name: testFullName,
    });
    console.log('   RPC Result:', rpcRes);
    console.log('   RPC Error:', rpcErr?.message || 'None');

    const { data: postRpcProf, error: postRpcErr } = await custClient
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    console.log('   Profile returned to customer post-RPC:', postRpcProf);
    console.log('   Post-RPC error:', postRpcErr?.message || 'None');
  }

  // Clean up test user
  console.log('\n6. Cleaning up test customer...');
  await adminClient.from('profiles').delete().eq('id', userId);
  await adminClient.auth.admin.deleteUser(userId);
  console.log('✅ Cleaned up test customer.');

  console.log('===========================================================\n');
}

testCustomerSignupAndLogin().catch((err) => {
  console.error('Unhandled error during test:', err);
  process.exit(1);
});
