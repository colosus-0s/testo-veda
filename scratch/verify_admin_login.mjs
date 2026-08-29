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
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const publicClient = createClient(supabaseUrl, anonKey);
const adminClient = createClient(supabaseUrl, secretKey);
const adminEmail = 'arogyapathadmin@gmail.com';

async function verifyAdminState() {
  console.log('===========================================================');
  console.log('    AROGYA PATH — ADMIN ACCOUNT PROVISIONING VERIFIER     ');
  console.log('===========================================================');
  console.log(`Target Admin Email: ${adminEmail}`);
  console.log('-----------------------------------------------------------\n');

  // 1. Query public.profiles for arogyapathadmin@gmail.com
  const { data: prof, error: profErr } = await adminClient
    .from('profiles')
    .select('id, email, full_name, role, registration_completed')
    .eq('email', adminEmail)
    .single();

  if (profErr || !prof) {
    console.log('❌ Admin Profile Status: NOT PROVISIONED YET');
    console.log(`   Error: ${profErr?.message || 'Profile row missing'}`);
    console.log('\n   ACTION REQUIRED: Please execute the SQL snippet in Supabase SQL Editor:');
    console.log(`
      CREATE OR REPLACE FUNCTION public.prevent_registration_flag_tampering()
      RETURNS TRIGGER AS $$
      BEGIN
        IF (auth.role() = 'service_role') OR (current_user = 'postgres') THEN
          RETURN NEW;
        END IF;

        IF (OLD.role IS DISTINCT FROM NEW.role) OR (OLD.registration_completed IS DISTINCT FROM NEW.registration_completed) THEN
          IF NOT EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'superadmin'
          ) THEN
            RAISE EXCEPTION 'Access Denied: Cannot alter role or registration status directly.';
          END IF;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      CREATE OR REPLACE FUNCTION public.prevent_role_escalation()
      RETURNS TRIGGER AS $$
      BEGIN
        IF (auth.role() = 'service_role') OR (current_user = 'postgres') THEN
          RETURN NEW;
        END IF;

        IF OLD.role IS DISTINCT FROM NEW.role THEN
          IF NOT EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'superadmin'
          ) THEN
            RAISE EXCEPTION 'Access Denied: Only superadmins can alter user roles.';
          END IF;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      INSERT INTO public.profiles (id, email, full_name, role, registration_completed)
      SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', 'Arogya Path Administrator'), 'admin', true
      FROM auth.users
      WHERE email = '${adminEmail}'
      ON CONFLICT (id) DO UPDATE SET
        role = 'admin',
        registration_completed = true;
    `);
    process.exit(1);
  }

  console.log('✅ 1. Admin Profile Verified in public.profiles:');
  console.log(`   - UUID:                   ${prof.id}`);
  console.log(`   - Email:                  ${prof.email}`);
  console.log(`   - Role:                   ${prof.role}`);
  console.log(`   - Registration Completed: ${prof.registration_completed}`);

  const isRoleAdmin = prof.role === 'admin';
  const isRegComp = prof.registration_completed === true;

  console.log(`\n✅ 2. Role = admin: ${isRoleAdmin ? 'PASS' : 'FAIL'}`);
  console.log(`✅ 3. Registration Completed = true: ${isRegComp ? 'PASS' : 'FAIL'}`);

  // 4. Role Escalation Test for Normal Customer
  const ts = Date.now();
  const custEmail = `cust_test_${ts}@example.com`;
  const custPass = 'CustTestPass123!';

  const { data: custAuth } = await adminClient.auth.admin.createUser({
    email: custEmail,
    password: custPass,
    email_confirm: true,
    user_metadata: { role: 'customer' },
  });

  if (custAuth?.user) {
    await adminClient.from('profiles').upsert({
      id: custAuth.user.id,
      email: custEmail,
      role: 'customer',
      registration_completed: true,
    });

    const custClient = createClient(supabaseUrl, anonKey);
    await custClient.auth.signInWithPassword({ email: custEmail, password: custPass });

    const { error: errEsc } = await custClient
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', custAuth.user.id);

    console.log(`✅ 4. Customer Role Escalation Blocked: ${errEsc ? 'PASS (Blocked)' : 'FAIL'}`);

    // Clean up test customer
    await adminClient.from('profiles').delete().eq('id', custAuth.user.id);
    await adminClient.auth.admin.deleteUser(custAuth.user.id);
  }

  console.log('\n===========================================================');
  console.log('                 ADMIN VERIFICATION SUMMARY               ');
  console.log('===========================================================');
  console.log(`Admin UUID:                   ${prof.id}`);
  console.log(`Admin Email:                  ${prof.email}`);
  console.log(`Admin Role:                   ${prof.role}`);
  console.log(`Admin Registration Completed: ${prof.registration_completed}`);
  console.log(`Storefront Portal Auth:       Ready via /admin/login`);
  console.log('===========================================================\n');
}

verifyAdminState().catch((err) => {
  console.error('Unhandled error during admin verification:', err);
  process.exit(1);
});
