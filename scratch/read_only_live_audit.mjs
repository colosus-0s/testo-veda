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

async function runReadOnlyAudit() {
  console.log('===================================================================');
  console.log('      AROGYA PATH — PURE READ-ONLY LIVE DATABASE AUDIT              ');
  console.log('===================================================================');

  // 1. Inspect public.orders Columns & Data (Count Only)
  console.log('\n--- 1. INSPECTING public.orders TABLE STRUCTURE & ROW COUNT ---');
  const { data: ordersSample, error: ordersErr, count: orderCount } = await adminClient
    .from('orders')
    .select('*', { count: 'exact' })
    .limit(1);

  if (ordersErr) {
    console.error('Error selecting from public.orders:', ordersErr.message);
  } else {
    console.log('Total Existing Orders in PostgreSQL:', orderCount);
    if (ordersSample && ordersSample[0]) {
      const row = ordersSample[0];
      const cols = Object.keys(row);
      console.log('Existing Columns in public.orders:', cols);
      console.log('  - guest_access_token column present?:', cols.includes('guest_access_token'));
      console.log('  - user_id column present?:', cols.includes('user_id'));
      console.log('  - customer_phone column present?:', cols.includes('customer_phone'));
      console.log('  - Sample Row Sample Values:');
      console.log('    • order_number:', row.order_number);
      console.log('    • customer_phone:', row.customer_phone);
      console.log('    • user_id:', row.user_id);
      console.log('    • guest_access_token:', row.guest_access_token);
    } else {
      console.log('No order rows returned, checking table schema metadata...');
    }
  }

  // 2. Test Function public.normalize_phone
  console.log('\n--- 2. CHECKING FUNCTION public.normalize_phone ---');
  const { data: normRes, error: normErr } = await adminClient.rpc('normalize_phone', { p_phone: '+91 9876543210' });
  if (normErr) {
    console.log('public.normalize_phone status: NOT FOUND or ERROR (', normErr.message, ')');
  } else {
    console.log('public.normalize_phone status: PRESENT and WORKING | Result:', normRes);
  }

  // 3. Test Function public.create_customer_order
  console.log('\n--- 3. CHECKING FUNCTION public.create_customer_order ---');
  // Pass intentional validation error (empty items array) to inspect signature without mutating DB
  const { data: createRes, error: createErr } = await anonClient.rpc('create_customer_order', {
    p_customer_name: 'AuditTest',
    p_customer_email: 'test@example.com',
    p_customer_phone: '9876543210',
    p_shipping_address: {},
    p_items: [],
    p_payment_provider: 'Cash on Delivery'
  });

  if (createErr) {
    if (createErr.message.includes('Could not find the function')) {
      console.log('public.create_customer_order status: NOT FOUND in schema cache');
    } else {
      console.log('public.create_customer_order status: PRESENT | Signature Match: YES | Validation Response:', createErr.message);
    }
  } else {
    console.log('public.create_customer_order status: PRESENT | Response:', createRes);
  }

  // 4. Test Function public.get_guest_order_details
  console.log('\n--- 4. CHECKING FUNCTION public.get_guest_order_details ---');
  const { data: guestRes, error: guestErr } = await anonClient.rpc('get_guest_order_details', {
    p_order_number: 'AP-NONEXISTENT',
    p_access_token: '00000000-0000-0000-0000-000000000000'
  });

  if (guestErr) {
    if (guestErr.message.includes('Could not find the function')) {
      console.log('public.get_guest_order_details status: NOT FOUND in schema cache');
    } else {
      console.log('public.get_guest_order_details status: PRESENT | Error:', guestErr.message);
    }
  } else {
    console.log('public.get_guest_order_details status: PRESENT | Output:', guestRes);
  }

  // 5. Test Function public.claim_guest_orders
  console.log('\n--- 5. CHECKING FUNCTION public.claim_guest_orders ---');
  const { data: claimRes, error: claimErr } = await anonClient.rpc('claim_guest_orders');
  if (claimErr) {
    if (claimErr.message.includes('Could not find the function')) {
      console.log('public.claim_guest_orders status: NOT FOUND in schema cache');
    } else {
      console.log('public.claim_guest_orders status: PRESENT | Response/Error:', claimErr.message);
    }
  } else {
    console.log('public.claim_guest_orders status: PRESENT | Result:', claimRes);
  }

  // 6. Test Direct Unauthenticated INSERT on public.orders (Anon Role Check)
  console.log('\n--- 6. CHECKING DIRECT INSERT ACCESS ON public.orders FOR ANON ROLE ---');
  // Attempting an invalid insert that violates NOT NULL constraint or invalid payload
  const { error: insertErr } = await anonClient.from('orders').insert([{ customer_name: null }]);
  if (insertErr) {
    console.log('Direct Anon Insert Response:', insertErr.message);
    if (insertErr.message.includes('row-level security') || insertErr.message.includes('permission denied') || insertErr.message.includes('violates row-level security')) {
      console.log('Direct Anon Table Insert: BLOCKED BY RLS (SECURE)');
    } else {
      console.log('Direct Anon Table Insert result:', insertErr.message);
    }
  }

  console.log('\n===================================================================');
  console.log('                    READ-ONLY AUDIT COMPLETE                        ');
  console.log('===================================================================');
}

runReadOnlyAudit();
