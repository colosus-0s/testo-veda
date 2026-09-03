import React from 'react';
import { Zap, ShieldCheck, HeartPulse } from 'lucide-react';

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
    title: 'BOTANICAL DIETARY SUPPORT',
    description: 'Ashwagandha root extract and purified Shilajit traditionally recognized for supporting stress resilience, vigor, and daily wellness.',
    image: '/assets/lifestyle/benefit-daily-energy.jpg',
    tag: 'Ashwagandha & Shilajit',
    icon: <Zap size={14} className="text-[#C7A33A]" />,
  },
  {
    id: 'b-2',
    title: 'PHYSICAL ENDURANCE & STRENGTH',
    description: 'Gokhuru fruit and Safed Musli root extracts traditionally used for physical endurance and nourishing muscular strength.',
    image: '/assets/lifestyle/benefit-male-vitality.jpg',
    tag: 'Gokhuru & Safed Musli',
    icon: <HeartPulse size={14} className="text-[#C7A33A]" />,
  },
  {
    id: 'b-3',
    title: '100% VEGETARIAN CELLULOSE SHELL',
    description: 'Capsule shell formulated from 100% Vegetarian HPMC (E 464) carrying the official green vegetarian symbol.',
    image: '/assets/products/testo-booster-still-life.png',
    tag: 'Vegetarian HPMC',
    icon: <ShieldCheck size={14} className="text-[#C7A33A]" />,
  },
];

export const MobileBenefitsSection: React.FC = () => {
  return (
    <section aria-label="Key Product Benefits" className="py-6 sm:py-8 bg-[#171717] text-white overflow-hidden select-none">
      <div className="px-4 mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C7A33A] block mb-0.5">
            Key Advantages
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FCFBF8]">
            Targeted Daily Benefits
          </h3>
        </div>
        <span className="text-[10px] font-bold text-[#FCFBF8]/80 bg-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
          Ayurvedic Synergy
        </span>
      </div>

      {/* Horizontal Swipeable Benefit Cards with Peek */}
      <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 pb-2">
        {BENEFIT_CARDS.map((card, idx) => (
          <div
            key={card.id}
            className="w-[80vw] max-w-[320px] shrink-0 snap-center rounded-2xl overflow-hidden relative aspect-[4/5] bg-slate-950 border border-white/10 shadow-2xl flex flex-col justify-end p-5"
          >
            {/* Background Image with Dark Vignette */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            {/* Content Overlay */}
            <div className="relative z-10 space-y-1.5">
              <span className="inline-flex items-center gap-1.5 bg-[#6A1423]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                {card.icon}
                {card.tag}
              </span>
              <h4 className="font-serif text-base sm:text-lg font-black text-white leading-tight tracking-tight">
                {card.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-3">
                {card.description}
              </p>
              <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>0{idx + 1} / 0{BENEFIT_CARDS.length}</span>
                <span className="text-[#C7A33A]">Arogya Path Pure Herb</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
