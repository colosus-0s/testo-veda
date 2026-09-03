import React from 'react';
import { Link } from 'react-router-dom';
import { IngredientStorySection } from '@/features/homepage/components/IngredientStorySection';
import { FormulaSection } from '@/features/homepage/components/FormulaSection';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ASSET_REGISTRY } from '@/config/assets';
import { SITE_CONFIG } from '@/config/site';
import { ShieldCheck, Leaf, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const FormulaIngredientsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen">
      {/* 01 Premium Editorial Botanical Hero Stage (Warm Ivory Backdrop) */}
      <Section padding="lg" background="ivory" className="border-b border-[#EBE7DF]">
        <Container>
          <Breadcrumb items={[{ label: 'Formula & Ingredients' }]} className="mb-8 text-slate-700" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Editorial Still-Life Image Stage */}
            <div className="lg:col-span-6 relative">
              <div className="relative bg-[#FCFBF8] rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] shadow-subtle-card border-2 border-[#EBE7DF] group">
                <img
                  src={ASSET_REGISTRY.ingredients.allBotanicalsHero}
                  alt="Arogya Path 10 Classical Botanical Ingredients Still Life"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#FCFBF8]/95 backdrop-blur-sm p-3.5 rounded-xl border border-[#EBE7DF] shadow-md flex items-center justify-between text-xs font-bold text-[#171717]">
                  <span className="flex items-center gap-1.5 text-[#173C2B]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 10 Botanical Synergy
                  </span>
                  <span className="text-[#6A1423] font-serif italic">Quantitative Formula</span>
                </div>
              </div>
            </div>

            {/* Right Typography & Positioning Stage */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] bg-red-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-red-100">
                  Quantitative Botanical Intelligence
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight mb-4 leading-tight">
                  Formula & Botanical Ingredients
                </h1>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                  Every capsule of TESTO BOOSTER blends 10 classical plant extracts—disclosed with full quantitative label transparency and zero synthetic fillers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-[#171717]">
                <div className="bg-[#FCFBF8] p-3 rounded-xl border border-[#EBE7DF] flex flex-col gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#6A1423]" />
                  <span>FSSAI Lic. #{SITE_CONFIG.fssaiLicense}</span>
                </div>
                <div className="bg-[#FCFBF8] p-3 rounded-xl border border-[#EBE7DF] flex flex-col gap-1">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>100% Veg Shell (E 464)</span>
                </div>
                <div className="bg-[#FCFBF8] p-3 rounded-xl border border-[#EBE7DF] flex flex-col gap-1">
                  <Sparkles className="w-4 h-4 text-[#6A1423]" />
                  <span>ISO 9001 & GMP</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 02 Technical Supplement Facts Table Stage (Warm White Backdrop) */}
      <FormulaSection />

      {/* 03 Botanical Visual Storytelling Showcase */}
      <IngredientStorySection />

      {/* 04 Exploration Navigation CTA */}
      <Section padding="lg" background="ivory" className="border-t border-[#EBE7DF] text-center">
        <Container size="narrow">
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
              Experience TESTO BOOSTER
            </h3>
            <p className="text-slate-700 text-sm sm:text-base font-normal">
              Formulated with 10 classical botanicals, 100% vegetarian capsule shells, and full quantitative label disclosure.
            </p>
            <div className="pt-2">
              <Link to="/testo">
                <Button variant="primary" size="lg" className="shadow-md font-bold" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore TESTO BOOSTER Details
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
