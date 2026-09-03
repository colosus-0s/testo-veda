import type { HomepageSectionConfig, HeroConfig } from '@/types/homepage';
import { ASSET_REGISTRY } from '@/config/assets';

const LOCAL_STORAGE_FEATURED_PRODUCT_KEY = 'arogyapath_featured_product_id_v1';

export const getFeaturedProductId = (): string => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(LOCAL_STORAGE_FEATURED_PRODUCT_KEY);
      if (saved) return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
};

export const setFeaturedProductId = (id: string) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(LOCAL_STORAGE_FEATURED_PRODUCT_KEY, id);
    }
  } catch {
    // Ignore storage errors
  }
};

export const HERO_CONFIG: HeroConfig = {
  type: 'video',
  videoUrl: ASSET_REGISTRY.hero.video,
  posterUrl: ASSET_REGISTRY.hero.poster,
  fallbackImageUrl: '/assets/brand/botanical-atmosphere.jpg',
  headline: 'THE PATH TO WELLNESS',
  subheadline: 'Arogya Path botanical formulations represent dietary supplements formulated with classical herbs to support daily vitality.',
  primaryCtaText: 'Explore Formulations',
  primaryCtaLink: '/shop',
  secondaryCtaText: 'Discover The Formula',
  secondaryCtaLink: '#formula',
  trustBadgeText: 'FSSAI License No. 12118441000654 • 100% Veg Capsules',
};

export const DEFAULT_HOMEPAGE_SECTIONS: HomepageSectionConfig[] = [
  { id: 'sec-hero', type: 'hero', enabled: true, order: 1 },
  { id: 'sec-brand-statement', type: 'brand-statement', enabled: true, order: 2 },
  { id: 'sec-prod-intro', type: 'product-introduction', enabled: true, order: 3 },
  { id: 'sec-spotlight', type: 'product-spotlight', enabled: true, order: 4 },
  { id: 'sec-formula', type: 'formula', enabled: true, order: 5 },
  { id: 'sec-ingredients', type: 'ingredient-story', enabled: true, order: 6 },
  { id: 'sec-lifestyle', type: 'lifestyle', enabled: true, order: 7 },
  { id: 'sec-trust', type: 'trust', enabled: true, order: 8 },
  { id: 'sec-standards', type: 'reviews', enabled: true, order: 9 },
  { id: 'sec-collection', type: 'collection-preview', enabled: true, order: 10 },
  { id: 'sec-brand-story', type: 'brand-story', enabled: true, order: 11 },
  { id: 'sec-faq', type: 'faq-preview', enabled: true, order: 12 },
  { id: 'sec-cta', type: 'final-cta', enabled: true, order: 13 },
];
