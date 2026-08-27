import React from 'react';
import { Star } from 'lucide-react';

export interface ProductRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  reviewCount = 0,
  size = 'md',
  showCount = true,
  className = '',
}) => {
  // Rule #34: NO FAKE SOCIAL PROOF. If no authentic reviews exist, display pack info rather than 0 stars.
  if (rating === 0 || reviewCount === 0) {
    return (
      <span className="text-[11px] text-[#f3e5ab] bg-[#8b1528]/30 border border-[#8b1528]/60 px-2 py-0.5 rounded font-medium">
        30 Veg Caps
      </span>
    );
  }

  const starSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-[#d4af37]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSizes[size]} ${
              star <= Math.floor(rating)
                ? 'fill-[#d4af37] text-[#d4af37]'
                : star - rating < 1
                ? 'fill-[#d4af37]/50 text-[#d4af37]'
                : 'text-neutral-700 fill-none'
            }`}
          />
        ))}
      </div>
      {showCount && (
        <span className={`text-neutral-300 font-medium ${textSizes[size]}`}>
          {rating.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  );
};
