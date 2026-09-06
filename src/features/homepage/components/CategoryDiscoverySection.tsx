import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ASSET_REGISTRY } from '@/config/assets';

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
    category: 'Individually Quantified',
    image: ASSET_REGISTRY.ingredients.ashwagandha,
  },
  {
    id: 'pillar-gokhuru',
    name: 'Gokhuru (Tribulus)',
    latin: 'Tribulus terrestris',
    quantity: '100 mg',
    category: 'Individually Quantified',
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
    category: 'Individually Quantified',
    image: ASSET_REGISTRY.ingredients.safedMusli,
  },
  {
    id: 'pillar-saffron',
    name: 'Saffron (Kesar)',
    latin: 'Crocus sativus',
    quantity: '15 mg',
    category: 'Individually Quantified',
    image: ASSET_REGISTRY.ingredients.saffron,
  },
];

export const CategoryDiscoverySection: React.FC = () => {
  return (
    <Section id="pillars" padding="xl" className="bg-[#F7F4ED] border-b border-[#EBE7DF] text-[#171717] opacity-100">
      <Container>
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2">
              Formulation Core
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#171717] tracking-tight">
              Five Classical Botanical Pillars
            </h2>
          </div>

          <a
            href="#formula"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#6A1423] hover:text-[#3D0B15] transition-colors group"
          >
            <span>Full 10-Botanical Disclosure</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 5-Column Grid on Desktop / Swipeable on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {BOTANICAL_PILLARS.map((pillar, idx) => (
            <motion.a
              key={pillar.id}
              href="#formula"
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group block bg-[#FCFBF8] rounded-2xl overflow-hidden border border-[#EBE7DF] shadow-subtle-card hover:shadow-elevated-card hover:border-[#6A1423]/50 transition-all duration-300 flex flex-col justify-between text-left"
            >
              {/* Botanical Photo */}
              <div className="relative aspect-square bg-[#F7F4ED] overflow-hidden">
                <img
                  src={pillar.image}
                  alt={pillar.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#6A1423] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  {pillar.quantity}
                </div>
              </div>

              {/* Botanical Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#173C2B] tracking-wider block mb-0.5">
                    {pillar.category}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#171717] group-hover:text-[#6A1423] transition-colors leading-snug">
                    {pillar.name}
                  </h3>
                  <p className="text-[11px] italic text-slate-600 line-clamp-1 font-normal">
                    {pillar.latin}
                  </p>
                </div>

                <div className="pt-2.5 mt-2 border-t border-[#EBE7DF] flex items-center justify-between text-[10px] font-bold text-[#6A1423]">
                  <span className="flex items-center gap-1">
                    <Sparkles size={11} className="text-[#C7A33A]" /> Label Fact
                  </span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </Section>
  );
};
