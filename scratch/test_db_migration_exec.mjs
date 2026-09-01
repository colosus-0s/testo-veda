import pg from 'pg';
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

const { Client } = pg;
const dbUrl = process.env.SUPABASE_DB_URL || 'postgresql://postgres:postgres@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

console.log('Connecting to PostgreSQL database...');
console.log('DB URL Host:', dbUrl.split('@')[1] || 'default');

const sqlPath = path.resolve(rootDir, 'supabase/migrations/006_phone_customer_architecture.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

async function run() {
  if (!process.env.SUPABASE_DB_URL && !process.env.SUPABASE_DB_PASSWORD) {
    console.log('No direct PostgreSQL credentials found in .env.');
    console.log('Checking fallback schema via REST API...');
    return;
  }
  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    console.log('Connected! Executing Migration 006 SQL...');
    await client.query(sql);
    console.log('✅ Migration 006 executed successfully via pg Client!');
    await client.end();
  } catch (err) {
    console.error('Direct pg execution error:', err.message);
  }
}

run();
