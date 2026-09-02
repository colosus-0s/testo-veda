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

async function testAdminFetch() {
  console.log('Testing admin select from orders and order_items...');
  const { data, error } = await adminClient
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  console.log('Admin fetch error:', error);
  console.log('Total orders fetched from Supabase:', data?.length);
  if (data && data.length > 0) {
    data.slice(0, 5).forEach((ord, i) => {
      console.log(`Order ${i + 1}: #${ord.order_number} | Phone: ${ord.customer_phone} | Items: ${ord.order_items?.length} | Date: ${ord.created_at}`);
    });
  }
}

testAdminFetch();
