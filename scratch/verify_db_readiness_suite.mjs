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

async function checkDatabaseReadiness() {
  console.log('===================================================================');
  console.log('       AROGYA PATH — FINAL MIGRATION AUDIT & READINESS SUITE        ');
  console.log('===================================================================');

  let rpc1Ready = false;
  let rpc2Ready = false;
  let rpc3Ready = false;

  // Check RPC 1: get_guest_order_details
  const { data: rpc1Data, error: rpc1Err } = await anonClient.rpc('get_guest_order_details', { p_order_number: 'AP-NONEXISTENT' });
  if (rpc1Err && rpc1Err.message.includes('Could not find the function')) {
    rpc1Ready = false;
  } else {
    rpc1Ready = true;
  }

  // Check RPC 2: create_customer_order
  const { error: rpc2Err } = await anonClient.rpc('create_customer_order', {
    p_customer_name: 'Audit Test',
    p_customer_email: 'audit@example.com',
    p_customer_phone: '9876543210',
    p_shipping_address: {},
    p_items: [],
    p_payment_provider: 'Cash on Delivery'
  });
  if (rpc2Err && rpc2Err.message.includes('Could not find the function')) {
    rpc2Ready = false;
  } else {
    rpc2Ready = true;
  }

  // Check RPC 3: claim_guest_orders
  const { error: rpc3Err } = await anonClient.rpc('claim_guest_orders');
  if (rpc3Err && rpc3Err.message.includes('Could not find the function')) {
    rpc3Ready = false;
  } else {
    rpc3Ready = true;
  }

  console.log('\n--- LIVE DATABASE STATUS REPORT ---');
  console.log('1. create_customer_order RPC:', rpc2Ready ? 'ACTIVE' : 'MISSING (Migration 006 Execution Required)');
  console.log('2. get_guest_order_details RPC:', rpc1Ready ? 'ACTIVE' : 'MISSING (Migration 006 Execution Required)');
  console.log('3. claim_guest_orders RPC:', rpc3Ready ? 'ACTIVE' : 'MISSING (Migration 006 Execution Required)');

  if (!rpc1Ready || !rpc2Ready || !rpc3Ready) {
    console.log('\n⚠️ STATUS: PENDING USER MANUAL EXECUTION.');
    console.log('Please execute supabase/migrations/006_secure_order_and_phone_architecture.sql in Supabase SQL Editor.');
  } else {
    console.log('\n✅ STATUS: MIGRATION 006 ACTIVE IN LIVE SUPABASE DATABASE!');
  }
}

checkDatabaseReadiness();
