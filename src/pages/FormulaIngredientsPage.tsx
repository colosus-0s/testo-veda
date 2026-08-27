import React from 'react';
import { IngredientStorySection } from '@/features/homepage/components/IngredientStorySection';
import { FormulaSection } from '@/features/homepage/components/FormulaSection';

export const FormulaIngredientsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F7F4ED] opacity-100 py-6">
      {/* 01 Botanical Visual Storytelling Showcase */}
      <IngredientStorySection />

      {/* 02 Technical Supplement Facts Table */}
      <FormulaSection />
    </div>
  );
};
