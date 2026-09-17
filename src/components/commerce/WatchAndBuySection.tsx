import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSET_REGISTRY } from '@/config/assets';

interface MediaCardItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

const CAMPAIGN_CARDS: MediaCardItem[] = [
  {
    id: 'campaign-1',
    title: 'Morning Routine & Water',
    subtitle: 'Taken after meals with lukewarm milk or water as directed',
    image: ASSET_REGISTRY.lifestyle.wellnessMorningRitual,
    tag: 'Daily Wellness Habit',
  },
  {
    id: 'campaign-2',
    title: 'Raw Botanical Heritage',
    subtitle: '10 classical botanicals with quantitative label disclosure',
    image: ASSET_REGISTRY.lifestyle.botanicalApothecaryPrep,
    tag: 'Authentic Herbology',
  },
  {
    id: 'campaign-3',
    title: 'Mindful Physical Vitality',
    subtitle: 'Formulated to support overall health and vitality for men',
    image: ASSET_REGISTRY.lifestyle.activeVitalityMovement,
    tag: 'Active Lifestyle',
  },
  {
    id: 'campaign-4',
    title: 'Consistent Daily Rhythm',
    subtitle: 'One capsule twice a day in 100% vegetarian capsule shells',
    image: ASSET_REGISTRY.lifestyle.restorativeEveningCalm,
    tag: 'Evening Routine',
  },
];

export const WatchAndBuySection: React.FC = () => {
  return (
    <section aria-label="Lifestyle & Campaign Showcase" className="py-10 sm:py-16 bg-[#FCFBF8] border-y border-[#EBE7DF] overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
              Lifestyle & Daily Ritual
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#171717] tracking-tight">
              The Mindful Daily Rhythm
            </h3>
          </div>
          <Link
            to="/testo"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#6A1423] hover:text-[#3D0B15] transition-colors group"
          >
            <span>Explore TESTO BOOSTER Formulation</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Desktop: 4-Column Grid | Mobile: Horizontal Scroll with Peek */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x sm:snap-none no-scrollbar pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CAMPAIGN_CARDS.map((card) => (
            <Link
              key={card.id}
              to="/testo"
              className="w-[74vw] max-w-[280px] sm:w-auto sm:max-w-none shrink-0 snap-center rounded-3xl overflow-hidden relative aspect-[3/4] bg-slate-900 shadow-subtle-card hover:shadow-elevated-card group border border-[#EBE7DF] block transition-all duration-300"
            >
              {/* Background Media Image */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Scrim for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#6A1423]/85 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm border border-white/15">
                  <Sparkles size={11} className="text-[#C7A33A]" /> {card.tag}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-left space-y-1.5">
                <h4 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {card.subtitle}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-[#F3E5AB]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-400" /> 100% Vegetarian
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-0.5 text-white">
                    Details &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
