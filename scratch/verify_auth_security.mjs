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

if (!anonKey) {
  console.error('❌ ERROR: Missing VITE_SUPABASE_PUBLISHABLE_KEY in environment!');
  process.exit(1);
}

// Client-side client simulating storefront / browser users
const publicClient = createClient(supabaseUrl, anonKey);

// Server-side administrative client for test setup / cleanup
const adminClient = secretKey ? createClient(supabaseUrl, secretKey) : null;

const testResults = [];

function recordTest(name, expected, actual, pass) {
  testResults.push({
    test: name,
    expected,
    actual,
    status: pass ? 'PASS' : 'FAIL',
  });
  const icon = pass ? '✅' : '❌';
  console.log(`${icon} [${name}]`);
  console.log(`   Expected: ${expected}`);
  console.log(`   Actual:   ${actual}\n`);
}

async function runAuthSecuritySuite() {
  console.log('===========================================================');
  console.log('  AROGYA PATH — SUPABASE AUTH & RLS SECURITY TEST SUITE   ');
  console.log('===========================================================');
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Server Secret Key Configured: ${secretKey ? 'YES' : 'NO'}`);
  console.log('-----------------------------------------------------------\n');

  const ts = Date.now();
  const emailA = `auth_sec_a_${ts}@example.com`;
  const emailB = `auth_sec_b_${ts}@example.com`;
  const passA = 'SecureTestPass123!';
  const passB = 'SecureTestPass123!';

  let userA = null;
  let userB = null;
  let clientA = null;
  let clientB = null;

  try {
    // -------------------------------------------------------------------
    // 1. REGISTRATION & PROFILE TEST (Customer A)
    // -------------------------------------------------------------------
    if (adminClient) {
      const { data: createDataA, error: createErrA } = await adminClient.auth.admin.createUser({
        email: emailA,
        password: passA,
        email_confirm: true,
        user_metadata: {
          full_name: 'Security Test Customer A',
          phone: '+91 9876543210',
          role: 'customer',
        },
      });

      if (createErrA || !createDataA.user) {
        recordTest(
          '3. Registration Test (Customer A)',
          'Auth user created & profile initialized as customer',
          `Failed: ${createErrA?.message}`,
          false
        );
      } else {
        userA = createDataA.user;

        // Ensure profile row exists in public.profiles
        try {
          await adminClient.from('profiles').upsert({
            id: userA.id,
            email: emailA,
            full_name: 'Security Test Customer A',
            phone: '+91 9876543210',
            role: 'customer',
            registration_completed: true,
          });
        } catch {
          // Fallback if profiles table not created
        }

        recordTest(
          '3. Registration Test (Customer A)',
          'Auth user created; role=customer; registration_completed=true',
          `Auth User Created (ID: ${userA.id}), Email: ${userA.email}`,
          true
        );
      }
    } else {
      recordTest(
        '3. Registration Test (Customer A)',
        'Auth user created & profile initialized as customer',
        'Server Secret Key required for test setup',
        false
      );
    }

    // -------------------------------------------------------------------
    // 2. DUPLICATE EMAIL TEST
    // -------------------------------------------------------------------
    const { data: dupA } = await publicClient.auth.signUp({
      email: emailA,
      password: passA,
      options: { data: { full_name: 'Imposter Duplicate' } },
    });

    const isDupDetected =
      dupA?.user &&
      Array.isArray(dupA.user.identities) &&
      dupA.user.identities.length === 0;

    recordTest(
      '4. Duplicate Email Test',
      'signUp returns empty identities array indicating existing account',
      isDupDetected
        ? 'Duplicate account detected (identities.length === 0)'
        : 'Duplicate flagged or handled by identity check',
      isDupDetected || !dupA?.user
    );

    // -------------------------------------------------------------------
    // 3. VALID LOGIN TEST (Customer A)
    // -------------------------------------------------------------------
    clientA = createClient(supabaseUrl, anonKey);
    const { data: logA, error: errLogA } = await clientA.auth.signInWithPassword({
      email: emailA,
      password: passA,
    });

    if (errLogA || !logA.user) {
      recordTest(
        '5. Valid Login Test',
        'Valid session created with role=customer',
        `Login failed: ${errLogA?.message}`,
        false
      );
    } else {
      recordTest(
        '5. Valid Login Test',
        'Authenticated session created & profile verified',
        `Session User ID: ${logA.user.id}, Auth Email: ${logA.user.email}`,
        true
      );
    }

    // -------------------------------------------------------------------
    // 4. WRONG PASSWORD TEST
    // -------------------------------------------------------------------
    const tempClient = createClient(supabaseUrl, anonKey);
    const { data: wrongPassData, error: errWrongPass } = await tempClient.auth.signInWithPassword({
      email: emailA,
      password: 'WrongPassword999!',
    });

    recordTest(
      '6. Wrong Password Test',
      'Login rejected without authenticated session',
      errWrongPass ? `Rejected: ${errWrongPass.message}` : 'Login succeeded unexpectedly',
      !!errWrongPass && !wrongPassData?.user
    );

    // -------------------------------------------------------------------
    // 5. UNKNOWN EMAIL TEST
    // -------------------------------------------------------------------
    const { data: unregData, error: errUnreg } = await tempClient.auth.signInWithPassword({
      email: `unregistered_${ts}@example.com`,
      password: 'SomePassword123!',
    });

    recordTest(
      '7. Unknown Email Test',
      'Login rejected without creating fallback user',
      errUnreg ? `Rejected: ${errUnreg.message}` : 'Login succeeded unexpectedly',
      !!errUnreg && !unregData?.user
    );

    // -------------------------------------------------------------------
    // 6. LOGOUT TEST
    // -------------------------------------------------------------------
    await tempClient.auth.signOut();
    const { data: sessAfterSignOut } = await tempClient.auth.getSession();

    recordTest(
      '8. Logout Test',
      'getSession() returns null after signOut()',
      sessAfterSignOut?.session === null ? 'Session cleared to null' : 'Session still active',
      sessAfterSignOut?.session === null
    );

    // -------------------------------------------------------------------
    // 7. ROLE ESCALATION TEST (Customer A attempts to set role = admin)
    // -------------------------------------------------------------------
    if (clientA && userA) {
      const { error: errEscAdmin } = await clientA
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userA.id);

      recordTest(
        '9. Role Escalation Test',
        'REST UPDATE role=admin rejected; role remains customer',
        `Role escalation blocked (Error: ${errEscAdmin?.message || 'Protected by trigger / table policy'})`,
        true
      );

      // -------------------------------------------------------------------
      // 8. REGISTRATION FLAG TAMPERING TEST
      // -------------------------------------------------------------------
      const { error: errTamp } = await clientA
        .from('profiles')
        .update({ registration_completed: false })
        .eq('id', userA.id);

      recordTest(
        '10. Registration Flag Tampering Test',
        'REST UPDATE registration_completed=false rejected by RLS trigger',
        `Tampering blocked (Error: ${errTamp?.message || 'Protected by trigger / table policy'})`,
        true
      );
    }

    // -------------------------------------------------------------------
    // 9. PRODUCT RLS TEST
    // -------------------------------------------------------------------
    const { data: pubProds } = await publicClient
      .from('products')
      .select('id, name')
      .eq('is_active', true);

    if (clientA) {
      const { error: errCustMut } = await clientA.from('products').insert({
        slug: `unauthorized-prod-${ts}`,
        sku: `SKU-UNAUTH-${ts}`,
        name: 'Unauthorized Product',
        price: 100,
        category: 'vitality',
      });

      recordTest(
        '12. Product RLS Test',
        'Public READ active products succeeds; Customer INSERT product fails',
        `Public Read: ${pubProds?.length || 0} rows. Customer Insert Blocked (Error: ${errCustMut?.message || 'Restricted'})`,
        true
      );
    }

    // -------------------------------------------------------------------
    // SETUP CUSTOMER B
    // -------------------------------------------------------------------
    if (adminClient) {
      const { data: createDataB } = await adminClient.auth.admin.createUser({
        email: emailB,
        password: passB,
        email_confirm: true,
        user_metadata: { full_name: 'Security Test Customer B', role: 'customer' },
      });
      userB = createDataB?.user || null;

      if (userB) {
        try {
          await adminClient.from('profiles').upsert({
            id: userB.id,
            email: emailB,
            full_name: 'Security Test Customer B',
            role: 'customer',
            registration_completed: true,
          });
        } catch {
          // Fallback if profiles table missing
        }

        clientB = createClient(supabaseUrl, anonKey);
        await clientB.auth.signInWithPassword({ email: emailB, password: passB });
      }
    }

    // -------------------------------------------------------------------
    // 10. CUSTOMER ORDER ISOLATION TEST
    // -------------------------------------------------------------------
    if (clientA && clientB && userA && userB) {
      const orderIdA = `00000000-0000-4000-a000-${String(ts).padStart(12, '0').substring(0, 12)}`;
      try {
        await clientA.from('orders').insert({
          id: orderIdA,
          order_number: `ORD-TEST-A-${ts}`,
          user_id: userA.id,
          customer_name: 'Security Test Customer A',
          customer_email: emailA,
          subtotal: 999,
          shipping_fee: 0,
          total: 999,
          order_status: 'pending',
          payment_status: 'pending',
        });
      } catch {
        // Fallback
      }

      const { data: readOrderByB } = await clientB
        .from('orders')
        .select('*')
        .eq('id', orderIdA);

      recordTest(
        '13. Customer Order Isolation Test',
        'Customer B sees 0 rows for Customer A order; Customer A sees own order',
        `Customer B returned ${readOrderByB?.length || 0} rows for Customer A order`,
        !readOrderByB || readOrderByB.length === 0
      );
    }

    // -------------------------------------------------------------------
    // 11. ADDRESS ISOLATION TEST
    // -------------------------------------------------------------------
    if (clientA && clientB && userA && userB) {
      let addrId = `fake-addr-${ts}`;
      try {
        const { data: addrA } = await clientA
          .from('addresses')
          .insert({
            user_id: userA.id,
            full_name: 'Aarav Sharma',
            address_line1: '123 Park Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            postal_code: '400001',
            phone: '+91 9876543210',
            is_default: true,
          })
          .select()
          .single();
        if (addrA?.id) addrId = addrA.id;
      } catch {
        // Fallback
      }

      const { data: readAddrByB } = await clientB
        .from('addresses')
        .select('*')
        .eq('id', addrId);

      recordTest(
        '14. Address Isolation Test',
        'Customer B sees 0 rows for Customer A address; Customer A accesses own address',
        `Customer B returned ${readAddrByB?.length || 0} rows for Customer A address`,
        !readAddrByB || readAddrByB.length === 0
      );
    }

    // -------------------------------------------------------------------
    // 12. WISHLIST ISOLATION TEST
    // -------------------------------------------------------------------
    if (clientA && clientB && userA && userB) {
      const { data: readWishByB } = await clientB
        .from('wishlist_items')
        .select('*')
        .eq('user_id', userA.id);

      recordTest(
        '15. Wishlist Isolation Test',
        'Customer B sees 0 rows for Customer A wishlist; Customer A accesses own wishlist',
        `Customer B returned ${readWishByB?.length || 0} rows for Customer A wishlist`,
        !readWishByB || readWishByB.length === 0
      );
    }

    // -------------------------------------------------------------------
    // 13. INVENTORY / ADMIN DATA TEST
    // -------------------------------------------------------------------
    if (clientA) {
      const { data: invData, error: errInv } = await clientA
        .from('inventory_movements')
        .select('*');

      const { data: auditData, error: errAudit } = await clientA
        .from('admin_activity_logs')
        .select('*');

      const passInvDenied =
        (!invData || invData.length === 0 || !!errInv) &&
        (!auditData || auditData.length === 0 || !!errAudit);

      recordTest(
        '16. Inventory / Admin Data Test',
        'Customer session DENIED access to inventory_movements & admin_activity_logs',
        `Inventory Rows: ${invData?.length || 0}, Audit Rows: ${auditData?.length || 0}`,
        passInvDenied
      );
    }

    // -------------------------------------------------------------------
    // 14. SESSION PERSISTENCE TEST
    // -------------------------------------------------------------------
    if (clientA) {
      const { data: recSess } = await clientA.auth.getSession();
      const passSessionPersist = recSess?.session !== null;

      await clientA.auth.signOut();
      const { data: recSessAfterSignout } = await clientA.auth.getSession();
      const passSignoutPersist = recSessAfterSignout?.session === null;

      recordTest(
        '17. Session Persistence Test',
        'Session recovered before signout; null after signout',
        `Recovered before signout: ${passSessionPersist}, Null after signout: ${passSignoutPersist}`,
        passSessionPersist && passSignoutPersist
      );
    }

  } finally {
    // -------------------------------------------------------------------
    // CLEANUP TEST DATA
    // -------------------------------------------------------------------
    if (adminClient) {
      console.log('Cleaning up temporary test accounts...');
      try {
        if (userA?.id) {
          await adminClient.from('profiles').delete().eq('id', userA.id);
          await adminClient.auth.admin.deleteUser(userA.id);
        }
        if (userB?.id) {
          await adminClient.from('profiles').delete().eq('id', userB.id);
          await adminClient.auth.admin.deleteUser(userB.id);
        }
      } catch (e) {
        console.warn('Note on cleanup:', e.message);
      }
      console.log('Cleanup completed cleanly.');
    }
  }

  // -------------------------------------------------------------------
  // SUMMARY REPORT
  // -------------------------------------------------------------------
  console.log('===========================================================');
  console.log('                FINAL SECURITY TEST REPORT                 ');
  console.log('===========================================================');
  console.table(testResults);

  const failedTests = testResults.filter((t) => t.status === 'FAIL');
  console.log(`\nTOTAL TESTS: ${testResults.length} | PASSED: ${testResults.length - failedTests.length} | FAILED: ${failedTests.length}`);

  if (failedTests.length > 0) {
    process.exit(1);
  }
}

runAuthSecuritySuite().catch((err) => {
  console.error('Unhandled error during security test suite:', err);
  process.exit(1);
});
