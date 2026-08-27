import React from 'react';
import { HeroSection } from '@/features/homepage/components/HeroSection';
import { BrandStatementSection } from '@/features/homepage/components/BrandStatementSection';
import { ProductIntroductionSection } from '@/features/homepage/components/ProductIntroductionSection';
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
    <div className="w-full space-y-0">
      {/* 01 Hero Entry */}
      <HeroSection />

      {/* 02 Brand Philosophy & Statement */}
      <BrandStatementSection />

      {/* 03 Product Introduction */}
      <ProductIntroductionSection />

      {/* 04 Product Spotlight Specs */}
      <ProductSpotlightSection />

      {/* 05 Formula & Supplement Facts Breakdown */}
      <FormulaSection />

      {/* 06 10 Botanical Ingredients Story */}
      <IngredientStorySection />

      {/* 07 Modern Vitality Lifestyle */}
      <LifestyleSection />

      {/* 08 Regulatory & Compliance Trust */}
      <TrustSection />

      {/* 09 Brand Standards & Transparency Commitments */}
      <BrandStandardsSection />

      {/* 10 Collection Discovery Preview */}
      <CollectionPreviewSection />

      {/* 11 Brand Worldview & Origin Story */}
      <BrandStorySection />

      {/* 12 Frequently Asked Questions */}
      <FAQPreviewSection />

      {/* 13 Mindful Purchase Invitation CTA */}
      <FinalCTASection />
    </div>
  );
};
