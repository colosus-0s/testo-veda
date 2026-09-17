import React from 'react';
import { HeroCarousel } from '@/features/homepage/components/HeroCarousel';
import { ProductIntroductionSection } from '@/features/homepage/components/ProductIntroductionSection';
import { CategoryDiscoverySection } from '@/features/homepage/components/CategoryDiscoverySection';
import { IngredientStorySection } from '@/features/homepage/components/IngredientStorySection';
import { BrandStorySection } from '@/features/homepage/components/BrandStorySection';
import { WatchAndBuySection } from '@/components/commerce/WatchAndBuySection';
import { TrustSection } from '@/features/homepage/components/TrustSection';
import { FAQPreviewSection } from '@/features/homepage/components/FAQPreviewSection';
import { FinalCTASection } from '@/features/homepage/components/FinalCTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full space-y-0 bg-[#F7F4ED] opacity-100">
      {/* 01 Hero Carousel Entry (Full-Width Advertising Canvas) */}
      <HeroCarousel />

      {/* 02 Featured TESTO BOOSTER (Core Product Buying Stage) */}
      <ProductIntroductionSection />

      {/* 03 Botanical / Formulation Discovery (5 Classical Botanical Pillars) */}
      <CategoryDiscoverySection />

      {/* 04 10 Botanicals Visual Storytelling & Quantitative Explorer */}
      <IngredientStorySection />

      {/* 05 Editorial Brand Story & Origin */}
      <BrandStorySection />

      {/* 06 Daily Wellness / Lifestyle Ritual Rail */}
      <WatchAndBuySection />

      {/* 07 Trust & Certified Manufacturing Standards (6 Pillars) */}
      <TrustSection />

      {/* 08 Frequently Asked Questions */}
      <FAQPreviewSection />

      {/* 09 Mindful Closing Invitation CTA */}
      <FinalCTASection />
    </div>
  );
};
