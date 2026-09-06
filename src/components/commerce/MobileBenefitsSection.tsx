import React from 'react';
import { Sparkles, ShieldCheck, HeartPulse, CheckCircle2 } from 'lucide-react';
import { ASSET_REGISTRY } from '@/config/assets';

interface BenefitCard {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  icon: React.ReactNode;
}

const BENEFIT_CARDS: BenefitCard[] = [
  {
    id: 'b-1',
    title: 'FORMULATED WITH CLASSICAL BOTANICALS',
    description: 'Ashwagandha root extract and purified Shilajit traditionally recognized for supporting daily wellness and vitality.',
    image: ASSET_REGISTRY.lifestyle.wellnessMorningRitual,
    tag: 'Ashwagandha & Shilajit',
    icon: <Sparkles size={14} className="text-[#C7A33A]" />,
  },
  {
    id: 'b-2',
    title: 'SUPPORT OVERALL HEALTH & VITALITY FOR MEN',
    description: 'Gokhuru fruit and Safed Musli extracts traditionally used for physical endurance and supporting overall vitality in men.',
    image: ASSET_REGISTRY.lifestyle.activeVitalityMovement,
    tag: 'Gokhuru & Safed Musli',
    icon: <HeartPulse size={14} className="text-[#C7A33A]" />,
  },
  {
    id: 'b-3',
    title: '100% VEGETARIAN CAPSULE SHELL (HPMC)',
    description: 'Encapsulated in vegetarian HPMC cellulose shells carrying the official green vegetarian symbol and FSSAI License No. 12118441000654.',
    image: ASSET_REGISTRY.products.testoBooster.stillLife,
    tag: 'Vegetarian HPMC Shell',
    icon: <ShieldCheck size={14} className="text-[#C7A33A]" />,
  },
];

export const MobileBenefitsSection: React.FC = () => {
  return (
    <section aria-label="Targeted Daily Formulation Benefits" className="py-10 sm:py-16 bg-[#141312] text-white overflow-hidden select-none border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4 text-left">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#C7A33A] block mb-1">
              Formulation Distinctives
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Targeted Daily Benefits
            </h3>
          </div>
          <span className="text-xs font-bold text-[#F3E5AB] bg-white/10 px-3 py-1.5 rounded-full uppercase tracking-wider self-start sm:self-auto border border-white/15">
            10 Classical Botanicals
          </span>
        </div>

        {/* Desktop: 3-Column Balanced Grid | Mobile: Horizontal Scroll with Peek */}
        <div className="flex md:grid md:grid-cols-3 gap-5 lg:gap-8 overflow-x-auto md:overflow-visible snap-x md:snap-none no-scrollbar pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {BENEFIT_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className="w-[80vw] max-w-[340px] md:w-auto md:max-w-none shrink-0 snap-center rounded-3xl overflow-hidden relative aspect-[4/5] bg-slate-950 border border-white/15 shadow-2xl flex flex-col justify-end p-6 group"
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 pointer-events-none" />

              {/* Content Overlay */}
              <div className="relative z-10 space-y-2 text-left">
                <span className="inline-flex items-center gap-1.5 bg-[#6A1423]/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm border border-white/10">
                  {card.icon}
                  {card.tag}
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight tracking-tight">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-3">
                  {card.description}
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Pillar 0{idx + 1} / 0{BENEFIT_CARDS.length}</span>
                  <span className="text-[#C7A33A] flex items-center gap-1 font-sans font-semibold">
                    <CheckCircle2 size={12} className="text-emerald-400" /> Verified Label Fact
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
