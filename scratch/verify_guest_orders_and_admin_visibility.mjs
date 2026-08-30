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
const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const publicClient = createClient(supabaseUrl, anonKey);
const adminClient = createClient(supabaseUrl, secretKey);

async function runSecuritySuite() {
  console.log('===========================================================');
  console.log('  AROGYA PATH — GUEST ORDERS & ADMIN VISIBILITY SECURITY SUITE');
  console.log('===========================================================');

  const testMatrix = [];
  const ts = Date.now();

  // 0. Fetch a valid active product for testing checkout
  const { data: prods } = await publicClient.from('products').select('id, name, price').eq('is_active', true).limit(1);
  if (!prods || prods.length === 0) {
    console.error('❌ ERROR: No active product found for testing checkout.');
    process.exit(1);
  }
  const testProd = prods[0];

  // A & B: Guest Creates Order & Receives (order_number, guest_access_token)
  console.log('\n1. Testing Guest Order Creation via create_customer_order RPC...');
  const guestAddressA = {
    fullName: 'Guest Alpha',
    phone: '+91 9800000001',
    email: `guest_a_${ts}@gmail.com`,
    street: '123 Guest Lane',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India',
  };

  const { data: orderDataA, error: orderErrA } = await publicClient.rpc('create_customer_order', {
    p_customer_name: guestAddressA.fullName,
    p_customer_email: guestAddressA.email,
    p_customer_phone: guestAddressA.phone,
    p_shipping_address: guestAddressA,
    p_items: [{ product_id: testProd.id, quantity: 1 }],
    p_payment_provider: 'mock',
  });

  let guestOrderA = null;
  if (!orderErrA && orderDataA?.order_number && orderDataA?.guest_access_token) {
    guestOrderA = orderDataA;
    testMatrix.push({
      test: 'A & B. Guest Order Creation & Token Generation',
      result: 'PASS',
      evidence: `Order #: ${orderDataA.order_number}, Token: ${orderDataA.guest_access_token}`,
    });
  } else {
    testMatrix.push({
      test: 'A & B. Guest Order Creation & Token Generation',
      result: 'FAIL',
      evidence: `Error: ${orderErrA?.message || 'Missing token in return payload'}`,
    });
  }

  // Create Guest B Order
  const guestAddressB = {
    fullName: 'Guest Beta',
    phone: '+91 9800000002',
    email: `guest_b_${ts}@gmail.com`,
    street: '456 Guest Road',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    country: 'India',
  };

  const { data: orderDataB } = await publicClient.rpc('create_customer_order', {
    p_customer_name: guestAddressB.fullName,
    p_customer_email: guestAddressB.email,
    p_customer_phone: guestAddressB.phone,
    p_shipping_address: guestAddressB,
    p_items: [{ product_id: testProd.id, quantity: 1 }],
    p_payment_provider: 'mock',
  });

  // C. Guest retrieves own order with correct pair
  console.log('\n2. Testing Guest Order Retrieval via get_guest_order_details RPC...');
  if (guestOrderA) {
    const { data: fetchedA, error: fetchErrA } = await publicClient.rpc('get_guest_order_details', {
      p_order_number: guestOrderA.order_number,
      p_access_token: guestOrderA.guest_access_token,
    });

    if (!fetchErrA && fetchedA?.order_number === guestOrderA.order_number) {
      testMatrix.push({
        test: 'C. Guest Retrieves Own Order with Valid Pair',
        result: 'PASS',
        evidence: `Retrieved Order #: ${fetchedA.order_number}, Customer: ${fetchedA.customer_name}, Items: ${fetchedA.items?.length}`,
      });
    } else {
      testMatrix.push({
        test: 'C. Guest Retrieves Own Order with Valid Pair',
        result: 'FAIL',
        evidence: `Error: ${fetchErrA?.message || 'Order data mismatch'}`,
      });
    }
  }

  // D. Guest cannot retrieve order with wrong token
  console.log('\n3. Testing Invalid Access Token Rejection...');
  if (guestOrderA) {
    const fakeToken = '00000000-0000-0000-0000-000000000000';
    const { data: fakeFetch, error: fakeErr } = await publicClient.rpc('get_guest_order_details', {
      p_order_number: guestOrderA.order_number,
      p_access_token: fakeToken,
    });

    if (fakeErr || !fakeFetch) {
      testMatrix.push({
        test: 'D. Invalid Access Token Blocked',
        result: 'PASS',
        evidence: `Rejected as expected: "${fakeErr?.message || 'No data returned'}"`,
      });
    } else {
      testMatrix.push({
        test: 'D. Invalid Access Token Blocked',
        result: 'FAIL',
        evidence: 'Order returned despite invalid token!',
      });
    }
  }

  // E. Guest cannot retrieve another guest order using another order's token
  console.log('\n4. Testing Token Mismatch Across Guest Orders...');
  if (guestOrderA && orderDataB) {
    const { data: mismatchFetch, error: mismatchErr } = await publicClient.rpc('get_guest_order_details', {
      p_order_number: guestOrderA.order_number,
      p_access_token: orderDataB.guest_access_token,
    });

    if (mismatchErr || !mismatchFetch) {
      testMatrix.push({
        test: 'E. Cross-Guest Token Access Blocked',
        result: 'PASS',
        evidence: `Blocked as expected: "${mismatchErr?.message || 'No data returned'}"`,
      });
    } else {
      testMatrix.push({
        test: 'E. Cross-Guest Token Access Blocked',
        result: 'FAIL',
        evidence: 'Guest B token accessed Guest A order!',
      });
    }
  }

  // F & G. Customer Isolation & Guest Direct PostgREST Select Restrictions
  console.log('\n5. Testing Customer Isolation & Guest PostgREST RLS Restrictions...');
  const { data: publicDirectOrders, error: publicDirectErr } = await publicClient.from('orders').select('*');
  if (!publicDirectErr && Array.isArray(publicDirectOrders) && publicDirectOrders.length === 0) {
    testMatrix.push({
      test: 'F & G. Public/Unauthenticated Direct Select Orders Blocked',
      result: 'PASS',
      evidence: 'Direct query on orders table returned 0 rows as required by RLS.',
    });
  } else {
    testMatrix.push({
      test: 'F & G. Public/Unauthenticated Direct Select Orders Blocked',
      result: 'FAIL',
      evidence: `Unauthenticated select returned ${publicDirectOrders?.length} rows!`,
    });
  }

  // H, I, J, K, L. Admin Order Visibility (Customer A, Customer B, Guest A, Guest B)
  console.log('\n6. Testing Admin Global Order Visibility...');

  // Create Customer A
  const custAEmail = `cust_a_${ts}@gmail.com`;
  const custAPass = 'CustAPass123!';
  const { data: custAAuth } = await adminClient.auth.admin.createUser({ email: custAEmail, password: custAPass, email_confirm: true });
  const clientA = createClient(supabaseUrl, anonKey);
  await clientA.auth.signInWithPassword({ email: custAEmail, password: custAPass });

  const { data: custAOrder } = await clientA.rpc('create_customer_order', {
    p_customer_name: 'Customer Alpha',
    p_customer_email: custAEmail,
    p_customer_phone: '+91 9800000003',
    p_shipping_address: guestAddressA,
    p_items: [{ product_id: testProd.id, quantity: 1 }],
  });

  // Create Customer B
  const custBEmail = `cust_b_${ts}@gmail.com`;
  const custBPass = 'CustBPass123!';
  const { data: custBAuth } = await adminClient.auth.admin.createUser({ email: custBEmail, password: custBPass, email_confirm: true });
  const clientB = createClient(supabaseUrl, anonKey);
  await clientB.auth.signInWithPassword({ email: custBEmail, password: custBPass });

  const { data: custBOrder } = await clientB.rpc('create_customer_order', {
    p_customer_name: 'Customer Beta',
    p_customer_email: custBEmail,
    p_customer_phone: '+91 9800000004',
    p_shipping_address: guestAddressB,
    p_items: [{ product_id: testProd.id, quantity: 1 }],
  });

  // Authenticate as Admin
  const adminEmail = 'arogyapathadmin@gmail.com';
  const { data: adminAuthProf } = await adminClient.from('profiles').select('id, role').eq('email', adminEmail).single();

  if (adminAuthProf && adminAuthProf.role === 'admin') {
    // Perform PostgREST SELECT using admin service_role/admin context
    const { data: adminOrders, error: adminErr } = await adminClient.from('orders').select('*, order_items(*)');

    if (!adminErr && adminOrders && adminOrders.length >= 4) {
      const hasGuestA = adminOrders.some((o) => o.order_number === guestOrderA?.order_number);
      const hasGuestB = adminOrders.some((o) => o.order_number === orderDataB?.order_number);
      const hasCustA = adminOrders.some((o) => o.order_number === custAOrder?.order_number);
      const hasCustB = adminOrders.some((o) => o.order_number === custBOrder?.order_number);

      if (hasGuestA && hasGuestB && hasCustA && hasCustB) {
        testMatrix.push({
          test: 'H, I, J, K, L. Admin Global Order Visibility',
          result: 'PASS',
          evidence: `Admin retrieved all orders globally (${adminOrders.length} total rows including Guest A, Guest B, Customer A, Customer B).`,
        });
      } else {
        testMatrix.push({
          test: 'H, I, J, K, L. Admin Global Order Visibility',
          result: 'FAIL',
          evidence: `Missing orders: GuestA:${hasGuestA}, GuestB:${hasGuestB}, CustA:${hasCustA}, CustB:${hasCustB}`,
        });
      }
    } else {
      testMatrix.push({
        test: 'H, I, J, K, L. Admin Global Order Visibility',
        result: 'FAIL',
        evidence: `Admin query failed or returned insufficient rows: ${adminErr?.message || adminOrders?.length}`,
      });
    }
  }

  // Cleanup test users
  if (custAAuth?.user) await adminClient.auth.admin.deleteUser(custAAuth.user.id);
  if (custBAuth?.user) await adminClient.auth.admin.deleteUser(custBAuth.user.id);

  console.log('\n===========================================================');
  console.log('                FINAL VERIFICATION REPORT                 ');
  console.log('===========================================================');
  console.table(testMatrix);
  console.log('===========================================================\n');
}

runSecuritySuite().catch((err) => {
  console.error('Security suite unhandled error:', err);
  process.exit(1);
});
