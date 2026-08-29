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
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!secretKey) {
  console.error('❌ ERROR: SUPABASE_SECRET_KEY is required to provision admin role!');
  process.exit(1);
}

const adminClient = createClient(supabaseUrl, secretKey);
const adminEmail = 'arogyapathadmin@gmail.com';

async function provisionAdminAccount() {
  console.log('===========================================================');
  console.log('    AROGYA PATH — ADMINISTRATIVE ROLE PROVISIONING SCRIPT  ');
  console.log('===========================================================');
  console.log(`Target Admin Email: ${adminEmail}`);
  console.log(`Supabase URL:       ${supabaseUrl}`);
  console.log('-----------------------------------------------------------\n');

  // 1. Search for target user in auth.users via admin API
  console.log('1. Searching for user in Supabase Auth...');
  const { data: listData, error: listErr } = await adminClient.auth.admin.listUsers();

  if (listErr) {
    console.error('❌ Failed to list Auth users:', listErr.message);
    process.exit(1);
  }

  const targetAuthUser = listData.users.find(
    (u) => u.email && u.email.toLowerCase() === adminEmail.toLowerCase()
  );

  if (!targetAuthUser) {
    console.error(`❌ User "${adminEmail}" was not found in Supabase Auth!`);
    console.log('Please ensure the user exists in Supabase Authentication -> Users.');
    process.exit(1);
  }

  const adminUuid = targetAuthUser.id;
  console.log(`✅ Auth User Found! UUID: ${adminUuid}`);

  // 2. Promote user to role = 'admin' in public.profiles
  console.log('\n2. Updating public.profiles record...');
  const { data: profileData, error: profileErr } = await adminClient
    .from('profiles')
    .upsert(
      {
        id: adminUuid,
        email: adminEmail,
        full_name: 'Arogya Path Administrator',
        role: 'admin',
        registration_completed: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    )
    .select()
    .single();

  if (profileErr) {
    console.error('❌ Failed to update public.profiles:', profileErr.message);
    process.exit(1);
  }

  console.log('✅ public.profiles updated successfully!');
  console.log(`   Profile ID:             ${profileData.id}`);
  console.log(`   Profile Email:          ${profileData.email}`);
  console.log(`   Profile Role:           ${profileData.role}`);
  console.log(`   Registration Completed: ${profileData.registration_completed}`);

  // 3. Verification
  console.log('\n3. Verifying admin profile state...');
  const { data: verifyProf, error: verifyErr } = await adminClient
    .from('profiles')
    .select('id, email, role, registration_completed')
    .eq('id', adminUuid)
    .single();

  if (verifyErr || !verifyProf) {
    console.error('❌ Verification query failed:', verifyErr?.message);
    process.exit(1);
  }

  const isVerifiedAdmin =
    verifyProf.role === 'admin' && verifyProf.registration_completed === true;

  console.log('-----------------------------------------------------------');
  if (isVerifiedAdmin) {
    console.log('🎉 PROVISIONING SUCCESSFUL!');
    console.log(`Admin UUID: ${verifyProf.id}`);
    console.log(`Email:      ${verifyProf.email}`);
    console.log(`Role:       ${verifyProf.role}`);
    console.log(`Status:     registration_completed = ${verifyProf.registration_completed}`);
  } else {
    console.error('❌ Verification failed: Profile role or registration status did not match expected values.');
    process.exit(1);
  }
  console.log('===========================================================\n');
}

provisionAdminAccount().catch((err) => {
  console.error('Unhandled error during admin provisioning:', err);
  process.exit(1);
});
