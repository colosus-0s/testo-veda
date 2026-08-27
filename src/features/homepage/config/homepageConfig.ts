import type { HomepageSectionConfig, HeroConfig } from '@/types/homepage';
import { ASSET_REGISTRY } from '@/config/assets';

export const HERO_CONFIG: HeroConfig = {
  type: 'video',
  videoUrl: ASSET_REGISTRY.hero.video,
  posterUrl: ASSET_REGISTRY.hero.poster,
  fallbackImageUrl: ASSET_REGISTRY.hero.fallbackImage,
  headline: 'THE PATH TO NATURAL VITALITY & POWER',
  subheadline: 'Crafted with potent extracts of Ashwagandha, Shilajit, Gokhuru, and Saffron. Formulated for the modern man who demands uncompromised physical performance.',
  primaryCtaText: 'Explore TESTO Natural Power+',
  primaryCtaLink: '/products/testo-natural-power-plus',
  secondaryCtaText: 'Understand The Formula',
  secondaryCtaLink: '#formula',
  trustBadgeText: 'FSSAI Listed • ISO 9001:2015 & GMP Certified • 100% Veg',
};

export const DEFAULT_HOMEPAGE_SECTIONS: HomepageSectionConfig[] = [
  { id: 'sec-hero', type: 'hero', enabled: true, order: 1 },
  { id: 'sec-brand-statement', type: 'brand-statement', enabled: true, order: 2 },
  { id: 'sec-prod-intro', type: 'product-introduction', enabled: true, order: 3 },
  { id: 'sec-spotlight', type: 'product-spotlight', enabled: true, order: 4 },
  { id: 'sec-ingredients', type: 'ingredient-story', enabled: true, order: 5 },
  { id: 'sec-formula', type: 'formula', enabled: true, order: 6 },
  { id: 'sec-lifestyle', type: 'lifestyle', enabled: true, order: 7 },
  { id: 'sec-trust', type: 'trust', enabled: true, order: 8 },
  { id: 'sec-reviews', type: 'reviews', enabled: true, order: 9 },
  { id: 'sec-collection', type: 'collection-preview', enabled: true, order: 10 },
  { id: 'sec-[#brand-story]', type: 'brand-story', enabled: true, order: 11 },
  { id: 'sec-faq', type: 'faq-preview', enabled: true, order: 12 },
  { id: 'sec-cta', type: 'final-cta', enabled: true, order: 13 },
];
