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
  console.error('❌ Missing SUPABASE_SECRET_KEY in environment');
  process.exit(1);
}

const adminClient = createClient(supabaseUrl, secretKey);

async function applyMigration005() {
  console.log('===========================================================');
  console.log('   APPLYING MIGRATION 005: GUEST ORDERS & TRACKING RPC     ');
  console.log('===========================================================');

  const migrationPath = path.resolve(rootDir, 'supabase/migrations/005_guest_orders_and_tracking.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  // Split SQL into individual statements or execute via pg / REST rpc
  // Standard Supabase JS client doesn't have direct raw SQL execution unless exec SQL extension exists or pg connection.
  // Let's test using pg module if available, or check if postgres extension / RPC is available.
  console.log('Migration SQL File Loaded:', migrationPath);
  console.log('Length:', sql.length, 'bytes');

  // Let's check if pg module is installed in node_modules
  try {
    const pg = await import('pg');
    const { Client } = pg.default;
    const dbUrl = process.env.SUPABASE_DB_URL || `postgresql://postgres.${supabaseUrl.split('//')[1].split('.')[0]}:${process.env.SUPABASE_DB_PASSWORD}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`;
    
    if (process.env.SUPABASE_DB_PASSWORD) {
      console.log('Connecting via pg Client to execute Migration 005...');
      const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
      await client.connect();
      await client.query(sql);
      await client.end();
      console.log('✅ Migration 005 applied successfully via Direct PostgreSQL Connection!');
      return;
    }
  } catch (pgErr) {
    console.log('Note on pg client execution:', pgErr.message);
  }

  console.log('\n===========================================================');
  console.log('Please verify migration statements to execute in Supabase SQL Editor if needed.');
  console.log('===========================================================\n');
}

applyMigration005().catch((err) => {
  console.error('Error applying migration:', err);
  process.exit(1);
});
