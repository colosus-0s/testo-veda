/**
 * Central Asset Registry for Arogya Path
 * Maps production media assets to Supabase Storage CDN URLs with local fallbacks.
 */

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oqqrcluijcvvxrnkhsip.supabase.co';
const supabaseBaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/$/, '');
const storageBase = `${supabaseBaseUrl}/storage/v1/object/public/storefront-assets`;

export const ASSET_REGISTRY = {
  brand: {
    logo: `${storageBase}/brand/favicon.svg`,
    logoFull: `${storageBase}/brand/favicon.svg`,
    vegSymbol: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%232e6f40" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="3" stroke="%232e6f40" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="%232e6f40"/></svg>',
    fssaiBadge: '/static/fssai-badge.svg',
    gmpSeal: '/static/gmp-seal.svg',
    isoSeal: '/static/iso-seal.svg',
  },
  
  hero: {
    video: `${storageBase}/hero/hero_commercial_video.mp4`,
    poster: `${storageBase}/products/prod_testo_front.png`,
    fallbackImage: `${storageBase}/products/prod_testo_front.png`,
  },

  products: {
    testoNatural: {
      front: `${storageBase}/products/prod_testo_front.png`,
      label: `${storageBase}/products/prod_testo_label.png`,
      render3d: `${storageBase}/products/prod_testo_front.png`,
      ingredientsInfographic: `${storageBase}/products/prod_testo_ingredients_infographic.png`,
      directionsInfographic: `${storageBase}/products/prod_testo_directions_infographic.png`,
      benefitsInfographic: `${storageBase}/products/prod_testo_benefits_infographic.png`,
      gallery: [
        `${storageBase}/products/prod_testo_front.png`,
        `${storageBase}/products/prod_testo_label.png`,
        `${storageBase}/products/prod_testo_ingredients_infographic.png`,
        `${storageBase}/products/prod_testo_directions_infographic.png`,
        `${storageBase}/products/prod_testo_benefits_infographic.png`,
      ],
    },
  },

  lifestyle: [
    `${storageBase}/lifestyle/lifestyle_1.png`,
    `${storageBase}/lifestyle/lifestyle_2.png`,
    `${storageBase}/lifestyle/lifestyle_3.png`,
    `${storageBase}/lifestyle/lifestyle_4.png`,
  ],

  ingredients: {
    allBotanicalsHero: `${storageBase}/ingredients/all_10_botanicals_hero.jpg`,
    ashwagandha: `${storageBase}/ingredients/ashwagandha_root.jpg`,
    shilajit: `${storageBase}/ingredients/shilajit_mineral.jpg`,
    gokhuru: `${storageBase}/ingredients/gokhuru_fruit.jpg`,
    safedMusli: `${storageBase}/ingredients/safed_musli.jpg`,
    saffron: `${storageBase}/ingredients/saffron_flower.jpg`,
    seaBuckthorn: `${storageBase}/ingredients/sea_buckthorn.jpg`,
    fenugreek: `${storageBase}/ingredients/fenugreek_seeds.jpg`,
    kaunch: `${storageBase}/ingredients/kaunch_beej.jpg`,
    talmakhana: `${storageBase}/ingredients/talmakhana_seeds.jpg`,
    ginger: `${storageBase}/ingredients/ginger_rhizome.jpg`,
  },
} as const;
