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
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error('❌ ERROR: Missing Supabase key in environment!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'storefront-assets';

const ASSET_MAPPINGS = [
  // 1. Hero Commercial Video
  {
    local: 'docs/images-and-videos/58fe62a5-4fd3-4cc2-af7e-cafbd18b826c-video.mp4',
    storagePath: 'hero/hero_commercial_video.mp4',
    mimeType: 'video/mp4',
  },
  // 2. Product Renders & Pack Labels
  {
    local: 'docs/images-and-videos/testo image (4).png',
    storagePath: 'products/prod_testo_front.png',
    mimeType: 'image/png',
  },
  {
    local: 'docs/images-and-videos/testo booster label.png',
    storagePath: 'products/prod_testo_label.png',
    mimeType: 'image/png',
  },
  {
    local: 'docs/images-and-videos/testo ingredients (1).png',
    storagePath: 'products/prod_testo_ingredients_infographic.png',
    mimeType: 'image/png',
  },
  {
    local: 'docs/images-and-videos/testo ingredients (2).png',
    storagePath: 'products/prod_testo_directions_infographic.png',
    mimeType: 'image/png',
  },
  {
    local: 'docs/images-and-videos/testo ingredients (3).png',
    storagePath: 'products/prod_testo_benefits_infographic.png',
    mimeType: 'image/png',
  },
  // 3. Lifestyle Photography
  {
    local: 'docs/images-and-videos/Gemini_Generated_Image_khogpwkhogpwkhog.png',
    storagePath: 'lifestyle/lifestyle_1.png',
    mimeType: 'image/png',
  },
  {
    local: 'docs/images-and-videos/Gemini_Generated_Image_yoi8x4yoi8x4yoi8.png',
    storagePath: 'lifestyle/lifestyle_2.png',
    mimeType: 'image/png',
  },
  {
    local: 'docs/images-and-videos/Gemini_Generated_Image_m7e5ujm7e5ujm7e5.png',
    storagePath: 'lifestyle/lifestyle_3.png',
    mimeType: 'image/png',
  },
  {
    local: 'docs/images-and-videos/Gemini_Generated_Image_5r3c9i5r3c9i5r3c.png',
    storagePath: 'lifestyle/lifestyle_4.png',
    mimeType: 'image/png',
  },
  // 4. Botanical Ingredient Photography
  {
    local: 'public/images/ingredients/all_10_botanicals_hero.jpg',
    storagePath: 'ingredients/all_10_botanicals_hero.jpg',
    mimeType: 'image/jpeg',
  },
  {
    local: 'public/images/ingredients/ashwagandha_root.jpg',
    storagePath: 'ingredients/ashwagandha_root.jpg',
    mimeType: 'image/jpeg',
  },
  {
    local: 'public/images/ingredients/shilajit_mineral.jpg',
    storagePath: 'ingredients/shilajit_mineral.jpg',
    mimeType: 'image/jpeg',
  },
  {
    local: 'public/images/ingredients/gokhuru_fruit.jpg',
    storagePath: 'ingredients/gokhuru_fruit.jpg',
    mimeType: 'image/jpeg',
  },
  {
    local: 'public/images/ingredients/safed_musli.jpg',
    storagePath: 'ingredients/safed_musli.jpg',
    mimeType: 'image/jpeg',
  },
  {
    local: 'public/images/ingredients/saffron_flower.jpg',
    storagePath: 'ingredients/saffron_flower.jpg',
    mimeType: 'image/jpeg',
  },
  {
    local: 'public/images/ingredients/sea_buckthorn.jpg',
    storagePath: 'ingredients/sea_buckthorn.jpg',
    mimeType: 'image/jpeg',
  },
  {
    local: 'public/images/ingredients/fenugreek_seeds.jpg',
    storagePath: 'ingredients/fenugreek_seeds.jpg',
    mimeType: 'image/jpeg',
  },
  {
    local: 'public/images/ingredients/kaunch_beej.jpg',
    storagePath: 'ingredients/kaunch_beej.jpg',
    mimeType: 'image/jpeg',
  },
  {
    local: 'public/images/ingredients/talmakhana_seeds.jpg',
    storagePath: 'ingredients/talmakhana_seeds.jpg',
    mimeType: 'image/jpeg',
  },
  {
    local: 'public/images/ingredients/ginger_rhizome.jpg',
    storagePath: 'ingredients/ginger_rhizome.jpg',
    mimeType: 'image/jpeg',
  },
  // 5. Brand Logos & Icons
  {
    local: 'public/favicon.svg',
    storagePath: 'brand/favicon.svg',
    mimeType: 'image/svg+xml',
  },
  {
    local: 'public/icons.svg',
    storagePath: 'brand/icons.svg',
    mimeType: 'image/svg+xml',
  },
];

async function runUploadPipeline() {
  console.log('===========================================================');
  console.log('  AROGYA PATH — SUPABASE STORAGE ASSET MIGRATION PIPELINE  ');
  console.log('===========================================================');
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Target Bucket: ${BUCKET_NAME}`);
  console.log(`Total Assets Audited: ${ASSET_MAPPINGS.length}`);
  console.log('-----------------------------------------------------------');

  // Ensure Bucket Exists
  const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(BUCKET_NAME);
  if (bucketError) {
    console.log(`Creating public bucket '${BUCKET_NAME}'...`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm'],
      fileSizeLimit: 52428800, // 50MB
    });
    if (createError) {
      console.warn(`Warning creating bucket '${BUCKET_NAME}':`, createError.message);
    }
  } else {
    console.log(`Bucket '${BUCKET_NAME}' already exists and is configured.`);
  }

  let uploadedCount = 0;
  let failedCount = 0;
  const publicUrls = {};

  for (const item of ASSET_MAPPINGS) {
    const fullLocalPath = path.resolve(rootDir, item.local);
    if (!fs.existsSync(fullLocalPath)) {
      console.error(`❌ Local file not found: ${item.local}`);
      failedCount++;
      continue;
    }

    const fileBuffer = fs.readFileSync(fullLocalPath);
    console.log(`Uploading [${item.storagePath}] (${(fileBuffer.length / 1024).toFixed(1)} KB)...`);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(item.storagePath, fileBuffer, {
        contentType: item.mimeType,
        upsert: true,
      });

    if (uploadError) {
      console.error(`  ❌ Upload failed for ${item.storagePath}:`, uploadError.message);
      failedCount++;
    } else {
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${item.storagePath}`;
      publicUrls[item.storagePath] = publicUrl;
      console.log(`  ✅ Uploaded successfully: ${publicUrl}`);
      uploadedCount++;
    }
  }

  console.log('\n===========================================================');
  console.log(`  MIGRATION COMPLETE: ${uploadedCount} Uploaded | ${failedCount} Failed`);
  console.log('===========================================================');

  if (failedCount > 0) {
    process.exit(1);
  }
}

runUploadPipeline().catch((err) => {
  console.error('Unhandled error during upload pipeline:', err);
  process.exit(1);
});
