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

const adminClient = createClient(supabaseUrl, secretKey);

async function diagnoseAuthUsers() {
  console.log('===========================================================');
  console.log('       SUPABASE AUTH USERS & PROFILES AUDIT DIAGNOSTIC     ');
  console.log('===========================================================');

  // 1. Fetch all users from auth.users
  const { data: authData, error: authErr } = await adminClient.auth.admin.listUsers();
  if (authErr) {
    console.error('❌ Failed to fetch auth.users:', authErr.message);
    process.exit(1);
  }

  console.log(`Total users in auth.users: ${authData.users.length}\n`);

  // 2. Fetch all profiles from public.profiles
  const { data: profileData, error: profErr } = await adminClient.from('profiles').select('*');
  if (profErr) {
    console.error('❌ Failed to fetch public.profiles:', profErr.message);
    process.exit(1);
  }

  console.log(`Total profiles in public.profiles: ${profileData.length}\n`);

  const profilesMap = new Map(profileData.map((p) => [p.id, p]));

  const auditReport = authData.users.map((u) => {
    const prof = profilesMap.get(u.id);
    return {
      auth_id: u.id,
      email: u.email,
      created_at: u.created_at,
      profile_exists: !!prof,
      role: prof?.role || 'MISSING',
      full_name: prof?.full_name || 'MISSING',
      registration_completed: prof ? prof.registration_completed : 'MISSING',
    };
  });

  console.table(auditReport);
  console.log('===========================================================\n');
}

diagnoseAuthUsers().catch((err) => {
  console.error('Diagnostic error:', err);
  process.exit(1);
});
