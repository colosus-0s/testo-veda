import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { INGREDIENTS_DATA } from '@/features/products/data/ingredientsData';
import { Sparkles, Leaf } from 'lucide-react';

export const IngredientStorySection: React.FC = () => {
  const ashwagandha = INGREDIENTS_DATA.find((i) => i.id === 'ing-ashwagandha')!;
  const shilajit = INGREDIENTS_DATA.find((i) => i.id === 'ing-shilajit')!;
  const saffron = INGREDIENTS_DATA.find((i) => i.id === 'ing-saffron')!;
  const gokhuru = INGREDIENTS_DATA.find((i) => i.id === 'ing-gokhuru')!;
  const safedMusli = INGREDIENTS_DATA.find((i) => i.id === 'ing-safed-musli')!;
  
  const smallBotanicals = INGREDIENTS_DATA.filter(
    (i) =>
      i.id !== 'ing-ashwagandha' &&
      i.id !== 'ing-shilajit' &&
      i.id !== 'ing-saffron' &&
      i.id !== 'ing-gokhuru' &&
      i.id !== 'ing-safed-musli'
  );

  return (
    <Section padding="xl" className="bg-[#F7F4ED] border-b border-[#EBE7DF] text-[#171717] opacity-100">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] bg-[#6A1423]/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-[#6A1423]/20">
            Botanical Visual Storytelling
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] mb-4">
            The 10 Botanicals Behind TESTO Power+
          </h2>
          <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed">
            Raw botanical heritage paired with quantitative formulation disclosure. Every ingredient is declared on our physical packaging label.
          </p>
        </div>

        {/* HERO BOTANICAL SPOTLIGHT 1: Ashwagandha Root (Image Left, Text Right) */}
        <div className="bg-[#FCFBF8] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] shadow-subtle-card mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F4ED] border border-[#EBE7DF] shadow-sm group">
                <img
                  src={ashwagandha.image}
                  alt={ashwagandha.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#6A1423] text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  Core Root Extract • {ashwagandha.quantity}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-[#173C2B] block">
                {ashwagandha.botanicalName} • {ashwagandha.quantity}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] leading-tight">
                {ashwagandha.name}
              </h3>
              <p className="font-serif text-lg font-bold text-[#6A1423]">
                Resilience & Daily Stress Adaptation
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                {ashwagandha.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="text-xs font-semibold text-[#173C2B] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Leaf size={14} /> Root Extract
                </span>
                <span className="text-xs font-semibold text-[#6A1423] bg-red-50 border border-red-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles size={14} /> 100mg Per Serving
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HERO BOTANICAL SPOTLIGHT 2: Purified Shilajit (Text Left, Image Right) */}
        <div className="bg-[#FCFBF8] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] shadow-subtle-card mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4 text-left order-2 lg:order-1">
              <span className="text-xs uppercase font-bold tracking-widest text-[#173C2B] block">
                {shilajit.botanicalName} • {shilajit.quantity}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] leading-tight">
                {shilajit.name}
              </h3>
              <p className="font-serif text-lg font-bold text-[#6A1423]">
                Cellular Energy & Mineral Complex
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                {shilajit.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="text-xs font-semibold text-[#173C2B] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Leaf size={14} /> Mineral Exudate
                </span>
                <span className="text-xs font-semibold text-[#6A1423] bg-red-50 border border-red-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles size={14} /> Part of 170mg Blend
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F4ED] border border-[#EBE7DF] shadow-sm group">
                <img
                  src={shilajit.image}
                  alt={shilajit.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-[#173C2B] text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  High-Altitude Mineral • {shilajit.quantity}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ASYMMETRICAL BOTANICAL MOSAIC GALLERY */}
        <div className="mb-8 text-left">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mb-2">
            The Botanical Formulation Gallery
          </h3>
          <p className="text-sm text-slate-700 font-normal">
            Visual presentation of all active plant extracts in TESTO Natural Power+.
          </p>
        </div>

        <div className="space-y-6">
          {/* Mosaic Row 1: Saffron Full-Width Banner Feature */}
          <div className="bg-[#FCFBF8] rounded-3xl overflow-hidden border border-[#EBE7DF] shadow-subtle-card grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-7 relative aspect-[16/9] md:aspect-auto md:h-full">
              <img
                src={saffron.image}
                alt={saffron.name}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#6A1423] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {saffron.quantity}
              </div>
            </div>
            <div className="md:col-span-5 p-8 text-left space-y-3">
              <span className="text-xs uppercase font-bold text-[#173C2B] tracking-widest block">
                {saffron.botanicalName}
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#171717]">
                {saffron.name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {saffron.shortDescription}
              </p>
            </div>
          </div>

          {/* Mosaic Row 2: Gokhuru & Safed Musli 2-Column Feature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[gokhuru, safedMusli].map((item) => (
              <div
                key={item.id}
                className="group bg-[#FCFBF8] rounded-3xl overflow-hidden border border-[#EBE7DF] shadow-subtle-card hover:border-[#6A1423]/40 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-[#F7F4ED] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#6A1423] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.quantity}
                  </div>
                </div>
                <div className="p-6 text-left space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#173C2B] tracking-widest block mb-1">
                      {item.botanicalName}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-[#171717] group-hover:text-[#6A1423] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal mt-2">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mosaic Row 3: 5 Remaining Botanicals (3-Column Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {smallBotanicals.map((item) => (
              <div
                key={item.id}
                className="group bg-[#FCFBF8] rounded-2xl overflow-hidden border border-[#EBE7DF] shadow-subtle-card hover:border-[#6A1423]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-[#F7F4ED] overflow-hidden border-b border-[#EBE7DF]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#6A1423] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.quantity}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#173C2B] tracking-widest block mb-1">
                      {item.botanicalName}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#171717] group-hover:text-[#6A1423] transition-colors mb-2">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {item.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#EBE7DF] flex items-center justify-between text-[11px] font-semibold text-[#173C2B]">
                    <span>{item.source}</span>
                    <span>100% Veg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
