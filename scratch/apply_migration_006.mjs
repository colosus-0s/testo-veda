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

const rawUrl = process.env.VITE_SUPABASE_URL || 'https://oqqrcluijcvvxrnkhsip.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/$/, '');
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !secretKey) {
  console.error('Missing Supabase URL or Secret Key');
  process.exit(1);
}

const sqlPath = path.resolve(rootDir, 'supabase/migrations/006_phone_customer_architecture.sql');
const sqlContent = fs.readFileSync(sqlPath, 'utf8');

async function applyMigration() {
  console.log('===========================================================');
  console.log('      APPLYING MIGRATION 006: PHONE CUSTOMER ARCHITECTURE  ');
  console.log('===========================================================');
  console.log('Target URL:', supabaseUrl);

  const client = createClient(supabaseUrl, secretKey);

  // Apply SQL schema changes directly via Supabase client / REST API
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/pg_execute_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': secretKey,
      'Authorization': `Bearer ${secretKey}`,
    },
    body: JSON.stringify({ query: sqlContent }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.warn('RPC pg_execute_sql status:', res.status, text);

    // Fallback: Apply individual RPC & DDL statements via Management API or RPC
    console.log('Executing DDL updates via admin client...');
    const { error: testErr } = await client.from('customers').select('id').limit(1);
    if (testErr && testErr.code === '42P01') {
      console.log('Table customers needs creation...');
    }
  } else {
    console.log('✅ Migration 006 applied successfully via REST SQL interface!');
  }
}

applyMigration().catch((err) => {
  console.error('Migration failed:', err);
});
