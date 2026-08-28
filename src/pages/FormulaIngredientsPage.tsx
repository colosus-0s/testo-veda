import React from 'react';
import { IngredientStorySection } from '@/features/homepage/components/IngredientStorySection';
import { FormulaSection } from '@/features/homepage/components/FormulaSection';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ShieldCheck, Leaf, Sparkles } from 'lucide-react';

export const FormulaIngredientsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen">
      {/* Page Hero */}
      <Section padding="md" className="bg-[#173C2B] text-white border-b border-[#2E6B4A]/50">
        <Container>
          <Breadcrumb items={[{ label: 'Formula & Ingredients' }]} className="mb-6 text-[#E2E8F0]" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#F3E5AB] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/20">
              Quantitative Label Transparency
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Formula & Botanical Ingredients
            </h1>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              10 classical botanical extracts disclosed with full quantitative transparency and technical label declarations.
            </p>

            <div className="flex items-center gap-4 flex-wrap pt-4 text-xs font-semibold text-[#E2E8F0]">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md border border-white/15">
                <ShieldCheck className="w-4 h-4 text-[#F3E5AB]" /> FSSAI Lic. #12118441000654
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md border border-white/15">
                <Leaf className="w-4 h-4 text-emerald-400" /> 100% Veg HPMC Shells
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md border border-white/15">
                <Sparkles className="w-4 h-4 text-[#F3E5AB]" /> ISO 9001:2015 & GMP Certified
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 01 Technical Supplement Facts Table Stage */}
      <FormulaSection />

      {/* 02 Botanical Visual Storytelling Showcase */}
      <IngredientStorySection />
    </div>
  );
};
