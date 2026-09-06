import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { INGREDIENTS_DATA } from '@/features/products/data/ingredientsData';
import type { Ingredient } from '@/types/product';
import { Sparkles, Leaf, CheckCircle2 } from 'lucide-react';

export const IngredientStorySection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(INGREDIENTS_DATA[0].id);
  const activeBotanical: Ingredient =
    INGREDIENTS_DATA.find((i) => i.id === selectedId) || INGREDIENTS_DATA[0];

  return (
    <Section padding="xl" className="bg-[#F7F4ED] border-b border-[#EBE7DF] text-[#171717] opacity-100">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] bg-[#6A1423]/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-[#6A1423]/20">
            Botanical Visual Storytelling
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] mb-3 tracking-tight">
            The 10 Botanicals Behind TESTO BOOSTER
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-normal leading-relaxed">
            Raw botanical heritage paired with quantitative formulation disclosure. Every ingredient is declared on our physical packaging label.
          </p>
        </div>

        {/* TOP / HIGHLIGHT STAGE: Active Selected Botanical Showcase */}
        <div className="bg-[#FCFBF8] rounded-3xl p-6 sm:p-10 border border-[#EBE7DF] shadow-subtle-card mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBotanical.id}
              initial={{ opacity: 0.8, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.8, y: -6 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left: High-Res Raw Botanical Photograph */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F4ED] border border-[#EBE7DF] shadow-md group">
                  <img
                    src={activeBotanical.image}
                    alt={activeBotanical.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#6A1423] text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    {activeBotanical.quantity}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl text-white text-[11px] font-semibold flex items-center justify-between border border-white/10">
                    <span className="italic">{activeBotanical.botanicalName}</span>
                    <span className="text-[#F3E5AB]">{activeBotanical.source}</span>
                  </div>
                </div>
              </div>

              {/* Right: Authoritative Label Disclosures */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#173C2B] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                    {activeBotanical.quantity?.includes('170mg') ? '170 mg Botanical Extract Blend' : 'Individually Quantified Extract'}
                  </span>
                  <span className="text-[11px] font-bold text-[#6A1423] bg-red-50 border border-red-100 px-3 py-1 rounded-md">
                    Label Disclosed
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#171717] leading-tight">
                    {activeBotanical.name}
                  </h3>
                  <p className="text-xs sm:text-sm italic text-slate-600 font-medium mt-0.5">
                    {activeBotanical.botanicalName}
                  </p>
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  {activeBotanical.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <span className="text-xs font-semibold text-[#173C2B] bg-[#F7F4ED] border border-[#EBE7DF] px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Leaf size={14} className="text-emerald-700" /> Botanical Extract
                  </span>
                  <span className="text-xs font-semibold text-[#6A1423] bg-[#F7F4ED] border border-[#EBE7DF] px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#C7A33A]" /> {activeBotanical.quantity}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 bg-[#F7F4ED] border border-[#EBE7DF] px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" /> 100% Vegetarian Capsule
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM / SELECTOR GRID: 10 Botanical Thumbnails */}
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-slate-700 tracking-wider">
              Select Botanical To Inspect Details:
            </span>
            <span className="text-xs font-bold text-[#6A1423]">
              10 Classical Botanicals Disclosed
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
            {INGREDIENTS_DATA.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-[#6A1423]/10 border-[#6A1423] ring-2 ring-[#6A1423] shadow-sm'
                      : 'bg-[#FCFBF8] border-[#EBE7DF] hover:border-[#6A1423]/40'
                  }`}
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#F7F4ED] mb-2 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase text-[#6A1423] block leading-tight">
                      {(item.quantity || '').replace(' Per Serving', '').replace('Part of ', '')}
                    </span>
                    <span className="text-[11px] font-bold text-[#171717] line-clamp-1 leading-snug">
                      {item.name.replace(' (Tribulus)', '').replace(' (Kesar)', '')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};
