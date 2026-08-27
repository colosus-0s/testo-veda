import React from 'react';
import { HeroSection } from '@/features/homepage/components/HeroSection';
import { CategoryDiscoverySection } from '@/features/homepage/components/CategoryDiscoverySection';
import { ProductIntroductionSection } from '@/features/homepage/components/ProductIntroductionSection';
import { PromotionalBannerSection } from '@/features/homepage/components/PromotionalBannerSection';
import { ProductSpotlightSection } from '@/features/homepage/components/ProductSpotlightSection';
import { FormulaSection } from '@/features/homepage/components/FormulaSection';
import { IngredientStorySection } from '@/features/homepage/components/IngredientStorySection';
import { LifestyleSection } from '@/features/homepage/components/LifestyleSection';
import { TrustSection } from '@/features/homepage/components/TrustSection';
import { BrandStandardsSection } from '@/features/homepage/components/BrandStandardsSection';
import { CollectionPreviewSection } from '@/features/homepage/components/CollectionPreviewSection';
import { BrandStorySection } from '@/features/homepage/components/BrandStorySection';
import { FAQPreviewSection } from '@/features/homepage/components/FAQPreviewSection';
import { FinalCTASection } from '@/features/homepage/components/FinalCTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full space-y-0 bg-[#F7F4ED]">
      {/* 03 Hero Campaign Entry */}
      <HeroSection />

      {/* 04 Category / Need Discovery Grid */}
      <CategoryDiscoverySection />

      {/* 05 Featured Product Stage (TESTO Natural Power+) */}
      <ProductIntroductionSection />

      {/* 06 Editorial Commerce Banner */}
      <PromotionalBannerSection />

      {/* 07 Product Formulation Pillars */}
      <ProductSpotlightSection />

      {/* 08 Formula & Supplement Facts Breakdown */}
      <FormulaSection />

      {/* 09 10 Botanical Ingredients Story */}
      <IngredientStorySection />

      {/* 10 Modern Vitality Lifestyle */}
      <LifestyleSection />

      {/* 11 Regulatory & Compliance Trust */}
      <TrustSection />

      {/* 12 Brand Quality Standards */}
      <BrandStandardsSection />

      {/* 13 Catalog Storefront Preview */}
      <CollectionPreviewSection />

      {/* 14 Brand Worldview & Origin Story */}
      <BrandStorySection />

      {/* 15 Frequently Asked Questions */}
      <FAQPreviewSection />

      {/* 16 Mindful Closing Invitation CTA */}
      <FinalCTASection />
    </div>
  );
};
