import React from 'react';
import { HeroSection } from '@/features/homepage/components/HeroSection';
import { BrandStatementSection } from '@/features/homepage/components/BrandStatementSection';
import { ProductIntroductionSection } from '@/features/homepage/components/ProductIntroductionSection';
import { ProductSpotlightSection } from '@/features/homepage/components/ProductSpotlightSection';
import { IngredientStorySection } from '@/features/homepage/components/IngredientStorySection';
import { FormulaSection } from '@/features/homepage/components/FormulaSection';
import { LifestyleSection } from '@/features/homepage/components/LifestyleSection';
import { TrustSection } from '@/features/homepage/components/TrustSection';
import { ReviewsSection } from '@/features/homepage/components/ReviewsSection';
import { CollectionPreviewSection } from '@/features/homepage/components/CollectionPreviewSection';
import { BrandStorySection } from '@/features/homepage/components/BrandStorySection';
import { FAQPreviewSection } from '@/features/homepage/components/FAQPreviewSection';
import { FinalCTASection } from '@/features/homepage/components/FinalCTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full space-y-0">
      {/* Chapter 01: Hero Entry */}
      <HeroSection />

      {/* Chapter 02: Brand Philosophy & Statement */}
      <BrandStatementSection />

      {/* Chapter 03: Product Introduction */}
      <ProductIntroductionSection />

      {/* Chapter 04: Product Spotlight Specs */}
      <ProductSpotlightSection />

      {/* Chapter 05: Ingredient Botanical Story */}
      <IngredientStorySection />

      {/* Chapter 06: Transparent Formula Breakdown */}
      <FormulaSection />

      {/* Chapter 07: Modern Vitality Lifestyle */}
      <LifestyleSection />

      {/* Chapter 08: Trust & Compliance Assurance */}
      <TrustSection />

      {/* Chapter 09: Verified Customer Reviews */}
      <ReviewsSection />

      {/* Chapter 10: Collection Discovery Preview */}
      <CollectionPreviewSection />

      {/* Chapter 11: Brand Story & Founders Vision */}
      <BrandStorySection />

      {/* Chapter 12: Frequently Asked Questions */}
      <FAQPreviewSection />

      {/* Chapter 13: High-Impact Purchase CTA */}
      <FinalCTASection />
    </div>
  );
};
