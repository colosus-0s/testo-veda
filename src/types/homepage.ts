export type SectionType =
  | 'hero'
  | 'brand-statement'
  | 'product-introduction'
  | 'product-spotlight'
  | 'ingredient-story'
  | 'formula'
  | 'lifestyle'
  | 'trust'
  | 'reviews'
  | 'collection-preview'
  | 'brand-story'
  | 'faq-preview'
  | 'final-cta';

export interface HomepageSectionConfig {
  id: string;
  type: SectionType;
  enabled: boolean;
  order: number;
  title?: string;
  subtitle?: string;
  customData?: Record<string, unknown>;
}

export interface HeroConfig {
  type: 'video' | 'image';
  videoUrl: string;
  posterUrl: string;
  fallbackImageUrl: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  trustBadgeText: string;
}
