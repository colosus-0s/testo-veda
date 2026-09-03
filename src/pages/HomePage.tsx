import React from 'react';
import { HeroSection } from '@/features/homepage/components/HeroSection';
import { CategoryDiscoverySection } from '@/features/homepage/components/CategoryDiscoverySection';
import { ProductIntroductionSection } from '@/features/homepage/components/ProductIntroductionSection';
import { PromotionalBannerSection } from '@/features/homepage/components/PromotionalBannerSection';
import { IngredientStorySection } from '@/features/homepage/components/IngredientStorySection';
import { FormulaSection } from '@/features/homepage/components/FormulaSection';
import { WatchAndBuySection } from '@/components/commerce/WatchAndBuySection';
import { TrustSection } from '@/features/homepage/components/TrustSection';
import { BrandStorySection } from '@/features/homepage/components/BrandStorySection';
import { FAQPreviewSection } from '@/features/homepage/components/FAQPreviewSection';
import { FinalCTASection } from '@/features/homepage/components/FinalCTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full space-y-0 bg-[#F7F4ED] opacity-100">
      {/* 01 Hero Campaign Entry */}
      <HeroSection />

      {/* 02 Botanical Pillars & Standards Discovery */}
      <CategoryDiscoverySection />

      {/* 03 Featured Product Stage (TESTO BOOSTER CAPSULES) */}
      <ProductIntroductionSection />

      {/* 04 Editorial Brand Banner */}
      <PromotionalBannerSection />

      {/* 05 Botanical Visual Storytelling Showcase (10 Botanicals) */}
      <IngredientStorySection />

      {/* 06 Technical Formula & Supplement Facts Breakdown */}
      <FormulaSection />

      {/* 07 Daily Routine & Media Showcase */}
      <WatchAndBuySection />

      {/* 08 Regulatory & Compliance Trust (6 Pillars) */}
      <TrustSection />

      {/* 09 Brand Worldview & Origin Story */}
      <BrandStorySection />

      {/* 10 Frequently Asked Questions */}
      <FAQPreviewSection />

      {/* 11 Mindful Closing Invitation CTA */}
      <FinalCTASection />
    </div>
  );
};
