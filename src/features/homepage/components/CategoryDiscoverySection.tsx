import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ASSET_REGISTRY } from '@/config/assets';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface BotanicalPillar {
  id: string;
  name: string;
  latin: string;
  quantity: string;
  category: string;
  image: string;
}

const BOTANICAL_PILLARS: BotanicalPillar[] = [
  {
    id: 'pillar-ashwagandha',
    name: 'Ashwagandha',
    latin: 'Withania somnifera',
    quantity: '100 mg',
    category: 'Individually Quantified Extract',
    image: ASSET_REGISTRY.ingredients.ashwagandha,
  },
  {
    id: 'pillar-gokhuru',
    name: 'Gokhuru (Tribulus)',
    latin: 'Tribulus terrestris',
    quantity: '100 mg',
    category: 'Individually Quantified Extract',
    image: ASSET_REGISTRY.ingredients.gokhuru,
  },
  {
    id: 'pillar-shilajit',
    name: 'Purified Shilajit',
    latin: 'Asphaltum',
    quantity: '170 mg Blend',
    category: 'Botanical Extract Blend',
    image: ASSET_REGISTRY.ingredients.shilajit,
  },
  {
    id: 'pillar-safed-musli',
    name: 'Safed Musli',
    latin: 'Chlorophytum borivilianum',
    quantity: '50 mg',
    category: 'Individually Quantified Extract',
    image: ASSET_REGISTRY.ingredients.safedMusli,
  },
  {
    id: 'pillar-saffron',
    name: 'Saffron (Kesar)',
    latin: 'Crocus sativus',
    quantity: '15 mg',
    category: 'Individually Quantified Extract',
    image: ASSET_REGISTRY.ingredients.saffron,
  },
];

export const CategoryDiscoverySection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMobileId, setSelectedMobileId] = useState<string>(BOTANICAL_PILLARS[0].id);

  return (
    <Section id="pillars" aria-label="5 Classical Botanical Pillars" padding="xl" className="bg-[#121310] border-b border-white/10 text-white relative overflow-hidden select-none">
      <Container size="wide">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-xs font-semibold text-[#F3E5AB] mb-2.5">
                <Sparkles size={12} className="text-[#C7A33A]" />
                <span>FORMULATION CORE</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Five Classical Botanical Pillars
              </h2>
            </div>

            <a
              href="#formula"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F3E5AB] hover:text-white transition-colors group"
            >
              <span>Full 10-Botanical Disclosure</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollReveal>

        {/* Continuous Panoramic Botanical Visual Band (Desktop: Accordion Flex Band / Mobile: Rail) */}
        <ScrollReveal variant="scale-reveal" delay={0.1}>
          <div className="hidden lg:flex gap-3 h-[480px] xl:h-[540px] w-full items-stretch">
            {BOTANICAL_PILLARS.map((pillar) => {
              const isHovered = hoveredId === pillar.id;
              const isAnyHovered = hoveredId !== null;

              return (
                <a
                  key={pillar.id}
                  href="#formula"
                  onMouseEnter={() => setHoveredId(pillar.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out flex flex-col justify-end p-6 group cursor-pointer border ${
                    isHovered
                      ? 'flex-[1.8] border-[#C7A33A]/60 shadow-2xl shadow-[#C7A33A]/15'
                      : isAnyHovered
                      ? 'flex-[0.8] opacity-75 border-white/10'
                      : 'flex-1 border-white/15'
                  }`}
                >
                  {/* Background Photographic Canvas */}
                  <img
                    src={pillar.image}
                    alt={pillar.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Gradient Scrim for Readability */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isHovered
                        ? 'bg-gradient-to-t from-black/95 via-black/60 to-black/20'
                        : 'bg-gradient-to-t from-black/90 via-black/45 to-transparent'
                    }`}
                  />

                  {/* Top Quantity Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-black/60 backdrop-blur-md text-[#F3E5AB] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/15 flex items-center gap-1.5 shadow-md">
                      <Sparkles size={11} className="text-[#C7A33A]" />
                      {pillar.quantity}
                    </span>
                  </div>

                  {/* Content Stage */}
                  <div className="relative z-10 text-left space-y-1">
                    <h3 className="font-serif text-xl xl:text-2xl font-bold text-white leading-tight">
                      {pillar.name}
                    </h3>

                    {/* Latin Botanical Name */}
                    <p className="text-xs italic text-[#F3E5AB]/90 font-medium">
                      {pillar.latin}
                    </p>

                    {/* Factual Classification Reveal */}
                    <div
                      className={`pt-2 transition-all duration-300 space-y-1.5 ${
                        isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 size={11} /> {pillar.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-[#F3E5AB] font-semibold pt-1">
                        <span>Label Disclosed</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Mobile Display (< lg): High-Impact Touch Rail */}
          <div className="lg:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 -mx-4 px-4">
            {BOTANICAL_PILLARS.map((pillar) => {
              const isSelected = selectedMobileId === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setSelectedMobileId(pillar.id)}
                  className={`w-[72vw] max-w-[280px] shrink-0 snap-center rounded-2xl overflow-hidden relative aspect-[3/4] p-5 flex flex-col justify-end text-left border transition-all duration-300 cursor-pointer ${
                    isSelected ? 'border-[#C7A33A] shadow-xl' : 'border-white/15'
                  }`}
                >
                  <img
                    src={pillar.image}
                    alt={pillar.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

                  {/* Top Quantity Tag */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="bg-black/70 backdrop-blur-md text-[#F3E5AB] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/15 flex items-center gap-1">
                      <Sparkles size={10} className="text-[#C7A33A]" />
                      {pillar.quantity}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 space-y-1">
                    <h3 className="font-serif text-lg font-bold text-white leading-tight">
                      {pillar.name}
                    </h3>
                    <p className="text-[11px] italic text-[#F3E5AB] font-medium">
                      {pillar.latin}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase font-bold text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30 mt-1">
                      <ShieldCheck size={10} /> {pillar.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
};
