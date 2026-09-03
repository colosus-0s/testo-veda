import React from 'react';
import { Play, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MediaCardItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}

const MEDIA_CARDS: MediaCardItem[] = [
  {
    id: 'wb-1',
    title: 'Morning Energy & Routine',
    subtitle: 'Daily botanical habit for focused stamina',
    image: '/assets/lifestyle/watch-buy-video-1.jpg',
    badge: 'Creator Routine',
  },
  {
    id: 'wb-2',
    title: 'Clean Botanical Science',
    subtitle: '10 verified extracts, 100% vegetarian',
    image: '/assets/lifestyle/watch-buy-video-2.jpg',
    badge: 'Label Review',
  },
  {
    id: 'wb-3',
    title: 'Strength & Daily Stamina',
    subtitle: 'Ashwagandha & Shilajit botanical synergy',
    image: '/assets/lifestyle/benefit-daily-energy.jpg',
    badge: 'Vitality Focus',
  },
  {
    id: 'wb-4',
    title: 'Natural Mountain Purity',
    subtitle: 'Crafted according to classic Ayurvedic wisdom',
    image: '/assets/lifestyle/benefit-male-vitality.jpg',
    badge: 'Pure Living',
  },
];

export const WatchAndBuySection: React.FC = () => {
  return (
    <section aria-label="Watch and Buy Media Showcase" className="py-6 sm:py-8 bg-[#FCFBF8] border-y border-[#EBE7DF] overflow-hidden select-none">
      <div className="px-4 mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A1423] block mb-0.5">
            Lifestyle & Routine
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717]">
            Watch & Experience
          </h3>
        </div>
        <span className="text-[11px] font-bold text-[#6A1423] bg-red-50 border border-red-100 px-2.5 py-1 rounded-full flex items-center gap-1">
          <Sparkles size={12} /> TESTO BOOSTER
        </span>
      </div>

      {/* Horizontal Carousel with Card Peek */}
      <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 pb-2">
        {MEDIA_CARDS.map((card) => (
          <div
            key={card.id}
            className="w-[74vw] max-w-[280px] shrink-0 snap-center rounded-2xl overflow-hidden relative aspect-[9/14] bg-slate-900 shadow-elevated-card group border border-[#EBE7DF]"
          >
            {/* Background Media Image */}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />

            {/* Subtle Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

            {/* Top Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-[#6A1423]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <ShieldCheck size={12} className="text-[#C7A33A]" /> {card.badge}
              </span>
            </div>

            {/* Center Play Indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Play size={20} className="fill-white translate-x-0.5" />
              </div>
            </div>

            {/* Bottom Content & Product Link */}
            <div className="absolute bottom-3 left-3 right-3 z-10 text-left space-y-1">
              <h4 className="font-serif text-sm font-bold text-white line-clamp-1 leading-tight">
                {card.title}
              </h4>
              <p className="text-[11px] text-slate-300 line-clamp-1">
                {card.subtitle}
              </p>
              <div className="pt-1.5">
                <Link
                  to="/testo"
                  className="w-full block bg-white/95 text-[#171717] hover:bg-white text-center text-xs font-bold py-2 rounded-xl shadow-md transition-colors"
                >
                  Explore TESTO BOOSTER
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
