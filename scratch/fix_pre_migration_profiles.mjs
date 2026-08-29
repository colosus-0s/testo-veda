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
  console.error('❌ Missing SUPABASE_SECRET_KEY');
  process.exit(1);
}

const adminClient = createClient(supabaseUrl, secretKey);

async function fixProfiles() {
  console.log('===========================================================');
  console.log('     AROGYA PATH — PRE-MIGRATION PROFILES BACKFILL SCRIPT   ');
  console.log('===========================================================');

  // 1. Fetch all users from auth.users
  const { data: authData, error: authErr } = await adminClient.auth.admin.listUsers();
  if (authErr) {
    console.error('❌ Failed to fetch Auth users:', authErr.message);
    process.exit(1);
  }

  for (const user of authData.users) {
    const isTargetAdmin = user.email && user.email.toLowerCase() === 'arogyapathadmin@gmail.com';

    let fullName = user.user_metadata?.full_name;
    if (!fullName || fullName === 'Valued Customer') {
      if (isTargetAdmin) {
        fullName = 'Arogya Path Administrator';
      } else {
        const username = user.email ? user.email.split('@')[0] : 'Customer';
        fullName = username.charAt(0).toUpperCase() + username.slice(1);
      }
    }

    const targetRole = isTargetAdmin ? 'admin' : 'customer';

    console.log(`Processing user: ${user.email} (UUID: ${user.id})`);
    console.log(`  Setting full_name: "${fullName}", role: "${targetRole}"`);

    const { data: upsertData, error: upsertErr } = await adminClient
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email: user.email,
          full_name: fullName,
          role: targetRole,
          registration_completed: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select()
      .single();

    if (upsertErr) {
      console.error(`  ❌ Failed to upsert profile for ${user.email}:`, upsertErr.message);
    } else {
      console.log(`  ✅ Profile successfully updated:`, {
        id: upsertData.id,
        email: upsertData.email,
        full_name: upsertData.full_name,
        role: upsertData.role,
        registration_completed: upsertData.registration_completed,
      });
    }
  }

  console.log('\n===========================================================');
  console.log('                 BACKFILL COMPLETED                        ');
  console.log('===========================================================\n');
}

fixProfiles().catch((err) => {
  console.error('Unhandled error in fixProfiles:', err);
  process.exit(1);
});
