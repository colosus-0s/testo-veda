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

const adminClient = createClient(supabaseUrl, secretKey);

async function testSchema() {
  console.log('Testing orders table columns in Supabase...');
  const { data: orders, error: ordersErr } = await adminClient.from('orders').select('*').limit(1);
  if (ordersErr) {
    console.error('Error querying orders:', ordersErr.message);
  } else if (orders && orders.length > 0) {
    console.log('Orders table columns:', Object.keys(orders[0]));
  } else {
    console.log('Orders table query succeeded (0 rows).');
  }

  console.log('Testing customers table in Supabase...');
  const { data: cust, error: custErr } = await adminClient.from('customers').select('*').limit(1);
  if (custErr) {
    console.log('Customers table status:', custErr.message);
  } else {
    console.log('Customers table exists! Sample columns:', cust && cust.length > 0 ? Object.keys(cust[0]) : 'Empty table');
  }
}

testSchema();
