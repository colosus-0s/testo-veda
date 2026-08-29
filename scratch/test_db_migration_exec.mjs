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

const adminClient = createClient(supabaseUrl, secretKey);

async function testMigrationExec() {
  console.log('Testing RPC get_guest_order_details call on Supabase...');
  const { data, error } = await adminClient.rpc('get_guest_order_details', {
    p_order_number: 'AP-000000',
    p_access_token: '00000000-0000-0000-0000-000000000000'
  });

  if (error) {
    console.log('RPC get_guest_order_details error message:', error.message);
    if (error.message.includes('function public.get_guest_order_details') || error.message.includes('does not exist')) {
      console.log('STATUS: Migration 005 needs execution in Supabase SQL Editor.');
    }
  } else {
    console.log('RPC get_guest_order_details returned:', data);
  }
}

testMigrationExec();
