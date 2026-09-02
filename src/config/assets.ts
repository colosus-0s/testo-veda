/**
 * Central Asset Registry for Arogya Path
 * Maps verified product photography, botanical ingredient assets, and infographics.
 */

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oqqrcluijcvvxrnkhsip.supabase.co';
const supabaseBaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/$/, '');
const storageBase = `${supabaseBaseUrl}/storage/v1/object/public/storefront-assets`;

export const ASSET_REGISTRY = {
  brand: {
    logo: '/static/favicon.svg',
    logoFull: '/static/favicon.svg',
    vegSymbol: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%232e6f40" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="3" stroke="%232e6f40" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="%232e6f40"/></svg>',
    fssaiBadge: '/static/fssai-badge.svg',
    gmpSeal: '/static/gmp-seal.svg',
    isoSeal: '/static/iso-seal.svg',
  },
  
  hero: {
    video: `${storageBase}/hero/hero_commercial_video.mp4`,
    poster: '/assets/products/testo_front.png',
    fallbackImage: '/assets/products/testo_front.png',
  },

  products: {
    testoNatural: {
      front: '/assets/products/testo_front.png',
      label: '/assets/products/testo_label.png',
      render3d: '/assets/products/testo_3d.png',
      side: '/assets/products/testo_side.png',
      ingredientsInfographic: '/assets/products/ingredients_infographic.png',
      directionsInfographic: '/assets/products/directions_infographic.png',
      benefitsInfographic: '/assets/products/benefits_infographic.png',
      gallery: [
        '/assets/products/testo_front.png',
        '/assets/products/testo_3d.png',
        '/assets/products/testo_side.png',
        '/assets/products/testo_label.png',
        '/assets/products/ingredients_infographic.png',
        '/assets/products/directions_infographic.png',
        '/assets/products/benefits_infographic.png',
      ],
    },
  },

  ingredients: {
    allBotanicalsHero: '/assets/products/ingredients_infographic.png',
    ashwagandha: '/assets/ingredients/ashwagandha.png',
    shilajit: '/assets/ingredients/shilajit.png',
    gokhuru: '/assets/ingredients/gokhuru.png',
    safedMusli: '/assets/ingredients/safed_musli.png',
    saffron: '/assets/ingredients/saffron.png',
    seaBuckthorn: '/assets/ingredients/sea_buckthorn.png',
    fenugreek: '/assets/ingredients/fenugreek.png',
    kaunch: '/assets/ingredients/kaunch.png',
    talmakhana: '/assets/ingredients/talmakhana.png',
    ginger: '/assets/ingredients/ginger.png',
  },
} as const;
