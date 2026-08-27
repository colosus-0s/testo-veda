import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { Review } from '@/types/review';
import { ProductRating } from './ProductRating';

export interface ReviewCardProps {
  review: Review;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => {
  return (
    <div
      className={`glass-card rounded-xl p-6 flex flex-col justify-between space-y-4 ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <ProductRating rating={review.rating} showCount={false} size="sm" />
          <span className="text-xs text-neutral-500">{review.date}</span>
        </div>

        <h4 className="font-serif-display text-base font-bold text-white mb-2">
          "{review.title}"
        </h4>

        <p className="text-sm text-neutral-300 leading-relaxed italic">
          "{review.body}"
        </p>
      </div>

      <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#8b1528] flex items-center justify-center font-bold text-white text-xs">
            {review.author.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-white block leading-none">
              {review.author}
            </span>
            {review.location && (
              <span className="text-[11px] text-neutral-400 block mt-0.5">
                {review.location}
              </span>
            )}
          </div>
        </div>

        {review.verifiedPurchase && (
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Buyer
          </span>
        )}
      </div>
    </div>
  );
};
