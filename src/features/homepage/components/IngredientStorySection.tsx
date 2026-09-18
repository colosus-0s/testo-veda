import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { INGREDIENTS_DATA } from '@/features/products/data/ingredientsData';
import type { Ingredient } from '@/types/product';
import { Sparkles, Leaf, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const IngredientStorySection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(INGREDIENTS_DATA[0].id);
  const activeBotanical: Ingredient =
    INGREDIENTS_DATA.find((i) => i.id === selectedId) || INGREDIENTS_DATA[0];

  const isSynergyBlend = Boolean(activeBotanical.quantity?.includes('170 mg'));

  return (
    <Section id="formula" padding="xl" className="bg-[#FCFBF8] border-b border-[#EBE7DF] text-[#171717] relative select-none">
      <Container size="wide">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#6A1423] bg-[#6A1423]/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-[#6A1423]/20">
              10-Botanical Quantitative Explorer
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#171717] mb-2 sm:mb-3 tracking-tight">
              The 10 Classical Botanicals
            </h2>
            <p className="text-slate-600 text-xs sm:text-base font-normal leading-relaxed">
              Every active botanical is quantitatively disclosed on our label: 6 individually quantified extracts totaling 345 mg, plus our 170 mg synergy blend delivering 515 mg active botanicals per serving.
            </p>
          </div>
        </ScrollReveal>

        {/* HERO-SCALE ACTIVE BOTANICAL SHOWCASE */}
        <ScrollReveal variant="scale-reveal" delay={0.1}>
          <div className="bg-[#F7F4ED] rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#EBE7DF] shadow-subtle-card mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBotanical.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center"
              >
                {/* Left: Prominent Cinematic Macro Botanical Image */}
                <div className="lg:col-span-6">
                  <div className="relative aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black/5 border border-[#EBE7DF] shadow-md group">
                    <img
                      src={activeBotanical.image}
                      alt={activeBotanical.name}
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#6A1423] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {activeBotanical.quantity}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-black/65 backdrop-blur-md px-3.5 py-2 rounded-xl text-white text-xs font-semibold flex items-center justify-between border border-white/10">
                      <span className="italic text-[#F3E5AB]">{activeBotanical.botanicalName}</span>
                      <span className="text-emerald-300 flex items-center gap-1 text-[11px]">
                        <ShieldCheck size={13} /> Label Disclosed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Authoritative Label Disclosures */}
                <div className="lg:col-span-6 space-y-3 sm:space-y-4 text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#173C2B] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                      {isSynergyBlend ? '170 mg Botanical Extract Blend' : 'Individually Quantified Extract'}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#6A1423] bg-red-50 border border-red-100 px-3 py-1 rounded-md">
                      Disclosed Milligrams
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#171717] leading-tight">
                      {activeBotanical.name}
                    </h3>
                    <p className="text-xs sm:text-sm italic text-slate-600 font-semibold mt-0.5">
                      {activeBotanical.botanicalName}
                    </p>
                  </div>

                  <p className="text-slate-700 text-xs sm:text-base leading-relaxed font-normal">
                    {activeBotanical.shortDescription}
                  </p>

                  {/* Blend Context Notice if part of 170mg blend */}
                  {isSynergyBlend && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2">
                      <Sparkles size={14} className="text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold mb-0.5">Synergy Blend Formulation Notice:</strong>
                        <span>Combined in our 170 mg Botanical Extract Blend alongside Kaunch Beej, Purified Shilajit, Talmakhana, and Ginger.</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-semibold text-[#173C2B] bg-white border border-[#EBE7DF] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                      <Leaf size={14} className="text-emerald-700" /> Botanical Extract
                    </span>
                    <span className="text-xs font-semibold text-[#6A1423] bg-white border border-[#EBE7DF] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                      <Sparkles size={14} className="text-[#C7A33A]" /> {activeBotanical.quantity}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 bg-white border border-[#EBE7DF] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 size={14} className="text-emerald-600" /> 100% Vegetarian Capsule
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* FLUID THUMBNAIL NAVIGATION RAIL */}
        <ScrollReveal variant="fade-up" delay={0.15}>
          <div className="space-y-2 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block px-1">
              Select Botanical ({INGREDIENTS_DATA.length}):
            </span>

            <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {INGREDIENTS_DATA.map((item) => {
                const isSelected = item.id === activeBotanical.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left shrink-0 transition-all ${
                      isSelected
                        ? 'bg-[#6A1423] text-white border-[#6A1423] shadow-md'
                        : 'bg-white text-[#171717] border-[#EBE7DF] hover:border-[#6A1423]/40'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-[#F7F4ED]"
                    />
                    <div className="pr-1.5">
                      <span className={`text-xs font-bold font-serif block line-clamp-1 ${isSelected ? 'text-white' : 'text-[#171717]'}`}>
                        {item.name}
                      </span>
                      <span className={`text-[10px] block ${isSelected ? 'text-[#F3E5AB]' : 'text-slate-500'}`}>
                        {item.quantity}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
};
