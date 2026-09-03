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
    lifestyleHero: `${storageBase}/lifestyle/lifestyle-hero.png`,
  },
  
  hero: {
    video: `${storageBase}/hero/hero_commercial_video.mp4`,
    poster: `${storageBase}/products/testo-booster-front.png`,
    fallbackImage: `${storageBase}/products/testo-booster-front.png`,
  },

  products: {
    testoBooster: {
      front: `${storageBase}/products/testo-booster-front.png`,
      stillLife: `${storageBase}/products/testo-booster-still-life.png`,
      board: `${storageBase}/products/testo-booster-board.png`,
      collage: `${storageBase}/products/testo-booster-collage.png`,
      holding: `${storageBase}/products/testo-booster-holding.png`,
      // Retain backward compatibility properties
      render3d: `${storageBase}/products/testo-booster-still-life.png`,
      side: `${storageBase}/products/testo-booster-board.png`,
      label: `${storageBase}/products/testo-booster-front.png`,
      ingredientsInfographic: `${storageBase}/infographics/formula-ingredients.png`,
      directionsInfographic: `${storageBase}/infographics/directions.png`,
      benefitsInfographic: `${storageBase}/infographics/benefits.png`,
      gallery: [
        `${storageBase}/products/testo-booster-front.png`,
        `${storageBase}/products/testo-booster-still-life.png`,
        `${storageBase}/products/testo-booster-board.png`,
        `${storageBase}/products/testo-booster-collage.png`,
        `${storageBase}/infographics/directions.png`,
        `${storageBase}/infographics/benefits.png`,
        `${storageBase}/infographics/formula-ingredients.png`,
      ],
    },
  },

  ingredients: {
    allBotanicalsHero: `${storageBase}/ingredients/all-10-botanicals-hero.jpg`,
    ashwagandha: `${storageBase}/ingredients/ashwagandha.jpg`,
    shilajit: `${storageBase}/ingredients/shilajit.jpg`,
    gokhuru: `${storageBase}/ingredients/gokhuru.jpg`,
    safedMusli: `${storageBase}/ingredients/safed-musli.jpg`,
    saffron: `${storageBase}/ingredients/saffron.jpg`,
    seaBuckthorn: `${storageBase}/ingredients/sea-buckthorn.jpg`,
    fenugreek: `${storageBase}/ingredients/fenugreek.jpg`,
    kaunch: `${storageBase}/ingredients/kaunch-beej.jpg`,
    talmakhana: `${storageBase}/ingredients/talmakhana.jpg`,
    ginger: `${storageBase}/ingredients/ginger.jpg`,
  },

  infographics: {
    directions: `${storageBase}/infographics/directions.png`,
    directionsBox: `${storageBase}/infographics/directions-box.png`,
    benefits: `${storageBase}/infographics/benefits.png`,
    formulaIngredients: `${storageBase}/infographics/formula-ingredients.png`,
    transformation: `${storageBase}/infographics/transformation.png`,
    formula: `${storageBase}/infographics/formula-ingredients.png`,
  },

  lifestyle: {
    hero: `${storageBase}/lifestyle/lifestyle-hero.png`,
    mountainVitality: `${storageBase}/lifestyle/mountain-vitality.png`,
    naturalWay: `${storageBase}/lifestyle/natural-way-banner.png`,
    capsuleEnergy: `${storageBase}/lifestyle/capsule-energy.png`,
  },
} as const;
