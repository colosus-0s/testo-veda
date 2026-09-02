/**
 * Central Asset Registry for Arogya Path
 * Maps production media assets from docs/ and public/assets with fallbacks.
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
    poster: '/assets/product-media/testo image (2).png',
    fallbackImage: '/assets/product-media/testo image (2).png',
  },

  products: {
    testoNatural: {
      front: '/assets/product-media/testo image (2).png',
      label: '/assets/product-media/testo booster label.png',
      render3d: '/assets/product-media/testo image (3).png',
      ingredientsInfographic: '/assets/product-media/testo ingredients (1).png',
      directionsInfographic: '/assets/product-media/testo ingredients (2).png',
      benefitsInfographic: '/assets/product-media/testo ingredients (3).png',
      gallery: [
        '/assets/product-media/testo image (2).png',
        '/assets/product-media/testo image (3).png',
        '/assets/product-media/testo image (4).png',
        '/assets/product-media/testo booster label.png',
        '/assets/product-media/testo ingredients (1).png',
        '/assets/product-media/testo ingredients (2).png',
        '/assets/product-media/testo ingredients (3).png',
      ],
    },
  },

  lifestyle: [
    '/assets/actual-products/file_000000000470820bbde9e46c5efa5dbd.png',
    '/assets/actual-products/file_000000001400821185a0014a130ef8ef.png',
    '/assets/actual-products/file_00000000286c820bbed3cb2fb6202976.png',
    '/assets/actual-products/file_000000003fd8820ba380c5b87ab78271.png',
  ],

  ingredients: {
    allBotanicalsHero: '/assets/product-media/testo ingredients (1).png',
    ashwagandha: '/assets/actual-products/file_00000000418081fa9e56a73d26af827c.png',
    shilajit: '/assets/actual-products/file_00000000537881fa9a81507b1e1d23c2.png',
    gokhuru: '/assets/actual-products/file_0000000066b481fa8ca03cd243a27adc.png',
    safedMusli: '/assets/actual-products/file_000000006adc81fa9de47ea3f5b22de9.png',
    saffron: '/assets/actual-products/file_000000006f6081fabb5058dac80e4e9a.png',
    seaBuckthorn: '/assets/actual-products/file_0000000074c882118348e9c24fe82d25.png',
    fenugreek: '/assets/actual-products/file_00000000994881fa98fd0eaf2e29e679.png',
    kaunch: '/assets/actual-products/file_000000009da481faa3f2211e4d5d4b9e.png',
    talmakhana: '/assets/actual-products/file_000000009ea081fa9e6c0434f317e49e.png',
    ginger: '/assets/actual-products/file_00000000d90881fabf04f01472e8b388.png',
  },
} as const;
