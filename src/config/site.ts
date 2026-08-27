export const SITE_CONFIG = {
  brandName: 'Arogya Path',
  tagline: 'The Path to Wellness',
  legalEntity: 'Arogyapath Marketing',
  manufacturer: 'Streamline Pharma Private Limited',
  address: 'Ashok Nagar, Logardaga, Jharkhand, India',
  supportEmail: 'arogyapathmarketing@gmail.com',
  supportPhone: '+91 9288515228',
  fssaiLicense: '12118441000654',
  isoCertification: 'ISO 9001:2015 22000:2018',
  gmpCertification: 'GMP Certified',
  
  announcementBar: {
    enabled: true,
    text: 'Free Express Shipping Across India on Orders Above ₹499 | 100% Authentic & FSSAI Compliant',
    ctaText: 'Shop TESTO Power+',
    ctaLink: '/products/testo-natural-power-plus',
  },

  socialLinks: {
    instagram: 'https://instagram.com/arogyapathwellness',
    facebook: 'https://facebook.com/arogyapathwellness',
    youtube: 'https://youtube.com/@arogyapathwellness',
    whatsapp: 'https://wa.me/919288515228',
  },

  navigation: [
    { label: 'Shop All', href: '/shop' },
    { label: 'TESTO Power+', href: '/products/testo-natural-power-plus' },
    { label: 'Formula & Ingredients', href: '#formula' },
    { label: 'Quality & Trust', href: '#quality' },
    { label: 'Our Story', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ],

  footerLinks: {
    shop: [
      { label: 'TESTO Natural Power+ (30 Caps)', href: '/products/testo-natural-power-plus' },
      { label: 'Men\'s Wellness Collection', href: '/collections/mens-wellness' },
      { label: 'Vitality & Stamina', href: '/collections/vitality' },
      { label: 'New Arrivals', href: '/shop?filter=new' },
    ],
    company: [
      { label: 'About Arogya Path', href: '/about' },
      { label: 'Quality & Ingredient Standards', href: '/about#quality' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Store Locator', href: '/contact#stores' },
    ],
    support: [
      { label: 'Help & FAQ', href: '/faq' },
      { label: 'Shipping & Delivery', href: '/shipping' },
      { label: 'Return & Refund Policy', href: '/returns' },
      { label: 'Track Your Order', href: '/account/orders' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Dietary Supplement Disclaimer', href: '/disclaimer' },
      { label: 'FSSAI License Info', href: '/fssai-info' },
    ],
  },
  
  seoDefaults: {
    title: 'Arogya Path — The Path to Wellness | Premium Supplement Store',
    description: 'Discover science-backed natural dietary supplements formulated with botanical extracts like Ashwagandha, Shilajit, Gokhuru, and Saffron.',
    ogImage: '/static/og-arogyapath.jpg',
  },
} as const;
