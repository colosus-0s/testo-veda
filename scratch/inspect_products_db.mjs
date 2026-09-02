import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oqqrcluijcvvxrnkhsip.supabase.co';
const supabaseKey = 'sb_publishable_rQ2cCw5_u__ZooQWmdj7YQ_VpKZ_-T6';
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectProducts() {
  console.log('Fetching products from public.products...');
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
  } else {
    console.log('Found', data.length, 'products in Supabase PostgreSQL:');
    console.log(JSON.stringify(data, null, 2));
  }
}

inspectProducts();
