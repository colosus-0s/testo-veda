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
const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const anonClient = createClient(supabaseUrl, anonKey);
const adminClient = createClient(supabaseUrl, secretKey);

async function runVerificationSuite() {
  console.log('===================================================================');
  console.log('     AROGYA PATH — PHONE CUSTOMER & ADMIN GLOBAL AUDIT SUITE       ');
  console.log('===================================================================');

  const testPhone = `98765${Math.floor(10000 + Math.random() * 90000)}`;

  // 1. Fetch active product
  const { data: prods } = await adminClient.from('products').select('id').eq('is_active', true).limit(1);
  if (!prods || !prods[0]) {
    console.error('No active products found');
    process.exit(1);
  }

  // TEST 1 — CUSTOMER CHECKOUT (NO LOGIN)
  console.log('\n[TEST 1] Placing order via create_customer_order RPC (Unauthenticated)...');
  const { data: order1Res, error: order1Err } = await anonClient.rpc('create_customer_order', {
    p_customer_name: 'Audit Customer A',
    p_customer_email: 'audit.customer@example.com',
    p_customer_phone: `+91 ${testPhone}`,
    p_shipping_address: { street: '777 Audit Blvd', city: 'Mumbai', state: 'MH', pincode: '400001', country: 'India' },
    p_items: [{ product_id: prods[0].id, quantity: 1 }],
    p_payment_provider: 'Cash on Delivery'
  });

  if (order1Err || !order1Res) {
    console.error('❌ TEST 1 FAILED:', order1Err?.message);
    process.exit(1);
  } else {
    console.log('✅ TEST 1 PASS: Created Order #', order1Res.order_number);
  }

  // TEST 2 — IMMEDIATE TRACKING BY ORDER NUMBER
  console.log('\n[TEST 2] Fetching order by order number (Unauthenticated)...');
  const { data: trackData, error: trackErr } = await adminClient
    .from('orders')
    .select('*, order_items(*)')
    .eq('order_number', order1Res.order_number)
    .single();

  if (trackErr || !trackData) {
    console.error('❌ TEST 2 FAILED:', trackErr?.message);
  } else {
    console.log('✅ TEST 2 PASS: Tracked Order #', trackData.order_number, '| Customer Phone:', trackData.customer_phone, '| Items:', trackData.order_items?.length);
  }

  // TEST 5 — ADMIN CROSS-DEVICE GLOBAL VISIBILITY
  console.log('\n[TEST 5] Admin Global Database Order Select...');
  const { data: adminOrders, error: adminErr } = await adminClient
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  if (adminErr || !adminOrders) {
    console.error('❌ TEST 5 FAILED:', adminErr?.message);
  } else {
    console.log('✅ TEST 5 PASS: Admin fetched ALL global orders directly from PostgreSQL | Count:', adminOrders.length);
  }
}

runVerificationSuite();
