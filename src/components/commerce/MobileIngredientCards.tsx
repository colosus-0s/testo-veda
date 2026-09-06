import React from 'react';
import { Sparkles, Leaf } from 'lucide-react';
import { INGREDIENTS_DATA } from '@/features/products/data/ingredientsData';

export const MobileIngredientCards: React.FC = () => {
  return (
    <section aria-label="Key Botanical Ingredients" className="py-6 sm:py-8 overflow-hidden select-none">
      <div className="px-4 mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A1423] block mb-0.5">
            Key Ingredients
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717]">
            10 Classical Botanicals
          </h3>
        </div>
        <span className="text-[11px] font-bold text-[#173C2B] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
          <Leaf size={12} /> Full Disclosure
        </span>
      </div>

      {/* Horizontal Swipe Carousel with Partial Card Peek */}
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 pb-2">
        {INGREDIENTS_DATA.map((item, idx) => (
          <div
            key={item.id}
            className="w-[78vw] max-w-[320px] shrink-0 snap-center bg-[#FCFBF8] rounded-2xl p-4 border border-[#EBE7DF] shadow-subtle-card flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#6A1423] block mb-0.5">
                  {item.quantity}
                </span>
                <h4 className="font-serif text-base font-bold text-[#171717] leading-snug">
                  {item.name}
                </h4>
                <span className="text-[11px] italic text-slate-700 block mb-2">
                  {item.botanicalName}
                </span>
                <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                  {item.shortDescription}
                </p>
              </div>

              {/* Botanical Photo Cutout */}
              <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-[#F7F4ED] border border-[#EBE7DF] p-1 shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-[#EBE7DF] flex items-center justify-between text-[10px] font-bold text-slate-700">
              <span className="flex items-center gap-1 text-[#173C2B]">
                <Sparkles size={12} className="text-[#C7A33A]" /> {item.source}
              </span>
              <span>Slide {idx + 1} / {INGREDIENTS_DATA.length}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
