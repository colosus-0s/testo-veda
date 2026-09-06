export const SITE_CONFIG = {
  brandName: 'Arogya Path',
  tagline: 'The Path to Wellness',
  legalEntity: 'Arogya Path Marketing',
  manufacturer: 'Streamline Pharma Pvt. Ltd.',
  address: 'Ashok Nagar, Lohardaga - 835302, Jharkhand, India',
  supportEmail: 'arogyapathmarketing@gmail.com',
  supportPhone: '+91 9288515228',
  fssaiLicense: '12118441000654',
  isoCertification: 'ISO 9001:2015 22000:2018',
  gmpCertification: 'GMP Certified',
  
  announcementBar: {
    enabled: true,
    text: 'TESTO BOOSTER CAPSULES • 10 Classical Botanicals • FSSAI Lic. No. 12118441000654',
    ctaText: 'Explore TESTO BOOSTER',
    ctaLink: '/testo',
  },

  socialLinks: {
    instagram: 'https://instagram.com/arogyapathwellness',
    facebook: 'https://facebook.com/arogyapathwellness',
    youtube: 'https://youtube.com/@arogyapathwellness',
    whatsapp: 'https://wa.me/919288515228',
  },

  navigation: [
    { label: 'Shop All', href: '/shop' },
    { label: 'TESTO BOOSTER', href: '/testo' },
    { label: 'Formula & Ingredients', href: '/formula-ingredients' },
    { label: 'Quality & Trust', href: '/quality-trust' },
    { label: 'Our Story', href: '/our-story' },
    { label: 'FAQ', href: '/faq' },
  ],

  footerLinks: {
    shop: [
      { label: 'TESTO BOOSTER (30 Caps)', href: '/testo' },
      { label: 'Shop All Formulations', href: '/shop' },
      { label: "Men's Wellness Collection", href: '/shop' },
    ],
    company: [
      { label: 'Our Story & Heritage', href: '/our-story' },
      { label: 'Quality & Trust Standards', href: '/quality-trust' },
      { label: 'Formula & Ingredients', href: '/formula-ingredients' },
    ],
    support: [
      { label: 'Help & FAQ', href: '/faq' },
      { label: 'Customer Support', href: '/faq#support' },
    ],
    legal: [
      { label: 'FSSAI License Info', href: '/quality-trust' },
      { label: 'Dietary Supplement Disclaimer', href: '/quality-trust' },
    ],
  },
  
  seoDefaults: {
    title: 'Arogya Path — The Path to Wellness | Premium Ayurvedic Storefront',
    description: 'Discover premium natural dietary supplements formulated with botanical extracts like Ashwagandha, Shilajit, Gokhuru, and Saffron.',
    ogImage: '/static/og-arogyapath.jpg',
  },
} as const;
