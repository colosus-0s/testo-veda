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

async function testCreateOrder() {
  const { data: prods } = await adminClient.from('products').select('id').eq('is_active', true).limit(1);
  if (!prods || !prods[0]) {
    console.log('No active products found');
    return;
  }

  console.log('Calling create_customer_order RPC with 6 parameters...');
  const res = await adminClient.rpc('create_customer_order', {
    p_customer_name: 'Test Customer',
    p_customer_email: 'test@example.com',
    p_customer_phone: '9876543210',
    p_shipping_address: { street: '123 Test St', city: 'Pune', state: 'MH', pincode: '411001', country: 'India' },
    p_items: [{ product_id: prods[0].id, quantity: 1 }],
    p_payment_provider: 'Cash on Delivery'
  });

  console.log('create_customer_order RPC result:', res);
}

testCreateOrder();
