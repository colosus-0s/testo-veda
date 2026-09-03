/**
 * Central Asset Registry for Arogya Path
 * Maps verified product photography, botanical ingredient assets, brand lifestyle visuals, and infographics
 * from the authoritative Supabase Storage bucket: arogya-path-assets
 */

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oqqrcluijcvvxrnkhsip.supabase.co';
const supabaseBaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/$/, '');
const storageBase = `${supabaseBaseUrl}/storage/v1/object/public/arogya-path-assets`;

export const ASSET_REGISTRY = {
  brand: {
    logo: '/static/favicon.svg',
    logoFull: '/static/favicon.svg',
    vegSymbol: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%232e6f40" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="3" stroke="%232e6f40" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="%232e6f40"/></svg>',
    fssaiBadge: '/static/fssai-badge.svg',
    gmpSeal: '/static/gmp-seal.svg',
    isoSeal: '/static/iso-seal.svg',
    lifestyleHero: `${storageBase}/lifestyle/lifestyle_hero.png`,
  },
  
  hero: {
    video: `${storageBase}/hero/hero_commercial_video.mp4`,
    poster: `${storageBase}/products/testo-front.png`,
    fallbackImage: `${storageBase}/products/testo-front.png`,
  },

  products: {
    testoNatural: {
      front: `${storageBase}/products/testo-front.png`,
      label: `${storageBase}/products/testo-label.png`,
      render3d: `${storageBase}/products/testo-3d.png`,
      side: `${storageBase}/products/testo-side.png`,
      ingredientsInfographic: `${storageBase}/infographics/formula.png`,
      directionsInfographic: `${storageBase}/infographics/directions.png`,
      benefitsInfographic: `${storageBase}/infographics/benefits.png`,
      gallery: [
        `${storageBase}/products/testo-front.png`,
        `${storageBase}/products/testo-3d.png`,
        `${storageBase}/products/testo-side.png`,
        `${storageBase}/products/testo-label.png`,
        `${storageBase}/infographics/formula.png`,
        `${storageBase}/infographics/directions.png`,
        `${storageBase}/infographics/benefits.png`,
      ],
    },
  },

  ingredients: {
    allBotanicalsHero: `${storageBase}/infographics/formula.png`,
    ashwagandha: `${storageBase}/ingredients/ashwagandha.png`,
    shilajit: `${storageBase}/ingredients/shilajit.png`,
    gokhuru: `${storageBase}/ingredients/gokhuru.png`,
    safedMusli: `${storageBase}/ingredients/safed-musli.png`,
    saffron: `${storageBase}/ingredients/saffron.png`,
    seaBuckthorn: `${storageBase}/ingredients/sea-buckthorn.png`,
    fenugreek: `${storageBase}/ingredients/fenugreek.png`,
    kaunch: `${storageBase}/ingredients/kaunch-beej.png`,
    talmakhana: `${storageBase}/ingredients/talmakhana.png`,
    ginger: `${storageBase}/ingredients/ginger.png`,
  },

  infographics: {
    formula: `${storageBase}/infographics/formula.png`,
    directions: `${storageBase}/infographics/directions.png`,
    benefits: `${storageBase}/infographics/benefits.png`,
  },

  lifestyle: {
    hero: `${storageBase}/lifestyle/lifestyle_hero.png`,
    one: `${storageBase}/lifestyle/lifestyle_1.png`,
    two: `${storageBase}/lifestyle/lifestyle_2.png`,
    three: `${storageBase}/lifestyle/lifestyle_3.png`,
  },
} as const;
