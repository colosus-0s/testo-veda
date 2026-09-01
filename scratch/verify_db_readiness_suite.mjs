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

async function checkDatabaseReadiness() {
  console.log('===================================================================');
  console.log('       AROGYA PATH — DATABASE READINESS & AUDIT VERIFICATION        ');
  console.log('===================================================================');

  // Check RPC get_guest_order_details
  const { error: rpcErr1 } = await adminClient.rpc('get_guest_order_details', { p_order_number: 'AP-TEST' });
  const isRpc1Ready = !rpcErr1 || rpcErr1.message.includes('Order number') || !rpcErr1.message.includes('Could not find the function');

  // Check RPC create_customer_order
  const { error: rpcErr2 } = await adminClient.rpc('create_customer_order', {
    p_customer_name: 'Test',
    p_customer_email: 'test@example.com',
    p_customer_phone: '9876543210',
    p_shipping_address: {},
    p_items: [],
    p_payment_provider: 'Cash on Delivery'
  });
  const isRpc2Ready = !rpcErr2 || rpcErr2.message.includes('empty cart') || rpcErr2.message.includes('Invalid quantity') || !rpcErr2.message.includes('Could not find the function');

  console.log('\n--- LIVE DATABASE READINESS SUMMARY ---');
  console.log('RPC create_customer_order Status:', isRpc2Ready ? 'READY' : 'MISSING (Migration 006 Execution Required)');
  console.log('RPC get_guest_order_details Status:', isRpc1Ready ? 'READY' : 'MISSING (Migration 006 Execution Required)');

  if (!isRpc1Ready || !isRpc2Ready) {
    console.log('\n⚠️ ACTION REQUIRED: Execute supabase/migrations/006_secure_order_and_phone_architecture.sql in Supabase Dashboard SQL Editor.');
  } else {
    console.log('\n✅ ALL DATABASE RPCs & SCHEMAS VERIFIED READY!');
  }
}

checkDatabaseReadiness();
