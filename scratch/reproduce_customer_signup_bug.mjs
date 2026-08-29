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

async function reproduceBug() {
  console.log('===========================================================');
  console.log('   REPRODUCING STOREFRONT CUSTOMER SIGNUP -> LOGIN BUG      ');
  console.log('===========================================================');

  const ts = Date.now();
  const testEmail = `testcust_${ts}@gmail.com`;
  const testPass = 'StorefrontPass123!';
  const testFullName = 'Test Storefront Customer';

  console.log(`1. Simulating Storefront SignUp for: ${testEmail}...`);

  // Mimic AuthContext register() logic
  const { data: signUpData, error: signUpErr } = await publicClient.auth.signUp({
    email: testEmail,
    password: testPass,
    options: {
      data: {
        full_name: testFullName,
        role: 'customer',
      },
    },
  });

  if (signUpErr) {
    console.error('❌ SignUp Failed:', signUpErr.message);
    process.exit(1);
  }

  const createdUserId = signUpData.user?.id;
  console.log('✅ SignUp Succeeded! Auth User ID:', createdUserId);
  console.log('   Session returned on signUp:', !!signUpData.session);

  // 2. Inspect DB state immediately after signUp
  console.log('\n2. Inspecting public.profiles in DB via adminClient...');
  const { data: profileAfterSignUp, error: profErrAfterSignUp } = await adminClient
    .from('profiles')
    .select('*')
    .eq('id', createdUserId)
    .maybeSingle();

  console.log('   Profile in DB after signUp:', profileAfterSignUp);
  console.log('   Error querying profile:', profErrAfterSignUp?.message || 'None');

  // 3. Immediately Sign Out if signUp logged in (AuthContext calls signOut() after register)
  await publicClient.auth.signOut();

  // 4. Attempt Storefront Login
  console.log('\n3. Simulating Storefront Login (signInWithPassword)...');
  const { data: loginData, error: loginErr } = await publicClient.auth.signInWithPassword({
    email: testEmail,
    password: testPass,
  });

  if (loginErr || !loginData.user) {
    console.error('❌ signInWithPassword Failed:', loginErr?.message);
    process.exit(1);
  }

  console.log('✅ signInWithPassword Succeeded in Auth! User ID:', loginData.user.id);
  console.log('   Session Token active:', !!loginData.session);

  // 5. Attempt loadProfile using the newly authenticated publicClient (customer session)
  console.log('\n4. Attempting loadProfile via publicClient (authenticated customer)...');
  const { data: customerProfileData, error: custProfileErr } = await publicClient
    .from('profiles')
    .select('*')
    .eq('id', loginData.user.id)
    .maybeSingle();

  console.log('   customerProfileData returned to customer:', customerProfileData);
  console.log('   custProfileErr returned to customer:', custProfileErr?.message || 'None');

  // 6. Test complete_storefront_registration RPC if profileData was missing
  if (!customerProfileData || customerProfileData.registration_completed !== true) {
    console.log('\n5. Profile missing or uncompleted! Testing RPC complete_storefront_registration via publicClient...');
    const { data: rpcRes, error: rpcErr } = await publicClient.rpc('complete_storefront_registration', {
      p_full_name: testFullName,
    });
    console.log('   RPC Result:', rpcRes);
    console.log('   RPC Error:', rpcErr?.message || 'None');

    const { data: refetchedProfile, error: refetchErr } = await publicClient
      .from('profiles')
      .select('*')
      .eq('id', loginData.user.id)
      .maybeSingle();
    console.log('   Profile after RPC call:', refetchedProfile);
    console.log('   Refetch error:', refetchErr?.message || 'None');
  }

  // Clean up
  if (createdUserId) {
    await adminClient.from('profiles').delete().eq('id', createdUserId);
    await adminClient.auth.admin.deleteUser(createdUserId);
  }

  console.log('===========================================================\n');
}

reproduceBug().catch((err) => {
  console.error('Unhandled error during bug reproduction:', err);
  process.exit(1);
});
