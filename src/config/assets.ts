/**
 * Central Asset Registry for Arogya Path
 * Maps local high-resolution botanical photography and commercial product renders.
 */

export const ASSET_REGISTRY = {
  brand: {
    logo: '/favicon.svg',
    logoFull: '/favicon.svg',
    vegSymbol: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%232e6f40" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="3" stroke="%232e6f40" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="%232e6f40"/></svg>',
    fssaiBadge: '/static/fssai-badge.svg',
    gmpSeal: '/static/gmp-seal.svg',
    isoSeal: '/static/iso-seal.svg',
  },
  
  hero: {
    video: '/docs/images-and-videos/58fe62a5-4fd3-4cc2-af7e-cafbd18b826c-video.mp4',
    poster: '/docs/images-and-videos/testo image (4).png',
    fallbackImage: '/docs/images-and-videos/testo image (4).png',
  },

  products: {
    testoNatural: {
      front: '/docs/images-and-videos/testo image (4).png',
      label: '/docs/images-and-videos/testo booster label.png',
      render3d: '/docs/images-and-videos/testo image (4).png',
      ingredientsInfographic: '/docs/images-and-videos/testo ingredients (1).png',
      directionsInfographic: '/docs/images-and-videos/testo ingredients (2).png',
      benefitsInfographic: '/docs/images-and-videos/testo ingredients (3).png',
      gallery: [
        '/docs/images-and-videos/testo image (4).png',
        '/docs/images-and-videos/testo booster label.png',
        '/docs/images-and-videos/testo ingredients (1).png',
        '/docs/images-and-videos/testo ingredients (2).png',
        '/docs/images-and-videos/testo ingredients (3).png',
      ],
    },
  },

  lifestyle: [
    '/docs/images-and-videos/Gemini_Generated_Image_khogpwkhogpwkhog.png',
    '/docs/images-and-videos/Gemini_Generated_Image_yoi8x4yoi8x4yoi8.png',
    '/docs/images-and-videos/Gemini_Generated_Image_m7e5ujm7e5ujm7e5.png',
    '/docs/images-and-videos/Gemini_Generated_Image_5r3c9i5r3c9i5r3c.png',
  ],

  ingredients: {
    ashwagandha: '/images/ingredients/ashwagandha_root.jpg',
    shilajit: '/images/ingredients/shilajit_mineral.jpg',
    gokhuru: '/images/ingredients/gokhuru_fruit.jpg',
    safedMusli: '/images/ingredients/safed_musli.jpg',
    saffron: '/images/ingredients/saffron_flower.jpg',
    seaBuckthorn: '/images/ingredients/sea_buckthorn.jpg',
    fenugreek: '/images/ingredients/fenugreek_seeds.jpg',
    kaunch: '/images/ingredients/kaunch_beej.jpg',
    talmakhana: '/images/ingredients/talmakhana_seeds.jpg',
    ginger: '/images/ingredients/ginger_rhizome.jpg',
  },
} as const;
