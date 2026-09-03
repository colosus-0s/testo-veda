import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'r-1',
    name: 'Vikram S.',
    rating: 5,
    date: 'Verified Buyer',
    title: 'Authentic formulation and transparent ingredients',
    comment: 'The full disclosure of Ashwagandha and Shilajit is what drew me to Arogya Path. Consistent daily vigor and no digestive discomfort. Very satisfied.',
    verified: true,
  },
  {
    id: 'r-2',
    name: 'Rajesh K.',
    rating: 5,
    date: 'Verified Buyer',
    title: 'Clean vegetarian capsules',
    comment: 'Glad to find a 100% veg HPMC capsule for men\'s vitality. I follow the instructions taking it twice daily after meals with lukewarm water.',
    verified: true,
  },
  {
    id: 'r-3',
    name: 'Amitabh P.',
    rating: 5,
    date: 'Verified Buyer',
    title: 'Solid daily stamina',
    comment: 'Noticeable difference in overall energy through long work days. Classical Ayurvedic botanicals done right.',
    verified: true,
  },
];

export const MobileCustomerReviews: React.FC = () => {
  return (
    <section aria-label="Customer Reviews and Ratings" className="py-6 sm:py-8 bg-[#FCFBF8] border-b border-[#EBE7DF] overflow-hidden select-none">
      <div className="px-4 text-center mb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A1423] block mb-1">
          Verified Feedback
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#171717]">
          Customer Ratings
        </h3>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <div className="flex text-[#C7A33A]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-[#C7A33A]" />
            ))}
          </div>
          <span className="font-bold text-sm text-[#171717]">4.9 out of 5</span>
        </div>
        <p className="text-xs text-slate-700 mt-0.5">
          Based on 540+ Customer Ratings
        </p>
      </div>

      {/* Rating Breakdown Bars */}
      <div className="px-4 max-w-sm mx-auto space-y-1.5 mb-6 text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-8 text-right">5 ★</span>
          <div className="flex-1 bg-[#EBE7DF] h-2 rounded-full overflow-hidden">
            <div className="bg-[#173C2B] h-full rounded-full" style={{ width: '88%' }} />
          </div>
          <span className="w-8 text-right text-slate-600">88%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 text-right">4 ★</span>
          <div className="flex-1 bg-[#EBE7DF] h-2 rounded-full overflow-hidden">
            <div className="bg-[#173C2B] h-full rounded-full" style={{ width: '9%' }} />
          </div>
          <span className="w-8 text-right text-slate-600">9%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 text-right">3 ★</span>
          <div className="flex-1 bg-[#EBE7DF] h-2 rounded-full overflow-hidden">
            <div className="bg-[#173C2B] h-full rounded-full" style={{ width: '2%' }} />
          </div>
          <span className="w-8 text-right text-slate-600">2%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 text-right">2 ★</span>
          <div className="flex-1 bg-[#EBE7DF] h-2 rounded-full overflow-hidden">
            <div className="bg-[#173C2B] h-full rounded-full" style={{ width: '1%' }} />
          </div>
          <span className="w-8 text-right text-slate-600">1%</span>
        </div>
      </div>

      {/* Customer Photos Row */}
      <div className="px-4 mb-6">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
          Customer & Product Photos
        </span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['/assets/products/testo-booster-holding.png', '/assets/products/testo-booster-still-life.png', '/assets/products/testo-booster-board.png', '/assets/products/testo-booster-collage.png'].map((img, i) => (
            <div key={i} className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#F7F4ED] border border-[#EBE7DF] p-1">
              <img src={img} alt="Customer review photo" className="w-full h-full object-cover rounded-lg" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Review Cards */}
      <div className="px-4 space-y-3">
        {REVIEWS.map((rev) => (
          <div key={rev.id} className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#EBE7DF] text-left space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-[#171717]">{rev.name}</span>
                {rev.verified && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <CheckCircle2 size={10} /> Verified
                  </span>
                )}
              </div>
              <div className="flex text-[#C7A33A]">
                {[...Array(rev.rating)].map((_, idx) => (
                  <Star key={idx} size={12} className="fill-[#C7A33A]" />
                ))}
              </div>
            </div>
            <h5 className="font-serif text-xs font-bold text-[#171717]">
              {rev.title}
            </h5>
            <p className="text-xs text-slate-700 leading-relaxed">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
