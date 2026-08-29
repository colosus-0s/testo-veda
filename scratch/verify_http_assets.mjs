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
const BUCKET_NAME = 'storefront-assets';

const EXPECTED_ASSET_PATHS = [
  'hero/hero_commercial_video.mp4',
  'products/prod_testo_front.png',
  'products/prod_testo_label.png',
  'products/prod_testo_ingredients_infographic.png',
  'products/prod_testo_directions_infographic.png',
  'products/prod_testo_benefits_infographic.png',
  'lifestyle/lifestyle_1.png',
  'lifestyle/lifestyle_2.png',
  'lifestyle/lifestyle_3.png',
  'lifestyle/lifestyle_4.png',
  'ingredients/all_10_botanicals_hero.jpg',
  'ingredients/ashwagandha_root.jpg',
  'ingredients/shilajit_mineral.jpg',
  'ingredients/gokhuru_fruit.jpg',
  'ingredients/safed_musli.jpg',
  'ingredients/saffron_flower.jpg',
  'ingredients/sea_buckthorn.jpg',
  'ingredients/fenugreek_seeds.jpg',
  'ingredients/kaunch_beej.jpg',
  'ingredients/talmakhana_seeds.jpg',
  'ingredients/ginger_rhizome.jpg',
  'brand/favicon.svg',
  'brand/icons.svg',
];

async function verifyAllPublicAssetUrls() {
  console.log('===========================================================');
  console.log('  AROGYA PATH — SUPABASE STORAGE ASSET HTTP 200 VERIFIER   ');
  console.log('===========================================================');
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Bucket Name: ${BUCKET_NAME}`);
  console.log(`Total Expected Objects: ${EXPECTED_ASSET_PATHS.length}`);
  console.log('-----------------------------------------------------------');

  let passedCount = 0;
  let failedCount = 0;

  for (const itemPath of EXPECTED_ASSET_PATHS) {
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${itemPath}`;
    try {
      const res = await fetch(publicUrl, { method: 'HEAD' });
      if (res.status === 200) {
        console.log(`  ✅ [HTTP 200] ${itemPath}`);
        passedCount++;
      } else {
        console.error(`  ❌ [HTTP ${res.status}] ${itemPath} -> ${publicUrl}`);
        failedCount++;
      }
    } catch (err) {
      console.error(`  ❌ [ERROR] ${itemPath}:`, err.message);
      failedCount++;
    }
  }

  console.log('\n===========================================================');
  console.log(`  SUMMARY: ${passedCount}/${EXPECTED_ASSET_PATHS.length} HTTP 200 OK | ${failedCount} Failed`);
  console.log('===========================================================');

  if (failedCount > 0) {
    process.exit(1);
  }
}

verifyAllPublicAssetUrls().catch((err) => {
  console.error('Unhandled error during asset verification:', err);
  process.exit(1);
});
