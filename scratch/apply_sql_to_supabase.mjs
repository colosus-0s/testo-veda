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

async function trySqlExecution() {
  console.log('Testing RPC exec_sql / exec...');
  try {
    const res = await adminClient.rpc('exec_sql', { sql: 'SELECT 1;' });
    console.log('exec_sql RPC result:', res);
  } catch (err) {
    console.log('exec_sql RPC catch:', err.message);
  }

  try {
    const res2 = await adminClient.rpc('get_order_by_number', { p_order_number: 'AP-123456' });
    console.log('get_order_by_number RPC result:', res2);
  } catch (err) {
    console.log('get_order_by_number catch:', err.message);
  }
}

trySqlExecution();
