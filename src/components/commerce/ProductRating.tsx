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
  reviewCount,
  size = 'md',
  showCount = true,
  className = '',
}) => {
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
        <span className={`text-neutral-400 font-medium ${textSizes[size]}`}>
          {rating.toFixed(1)} {reviewCount !== undefined && `(${reviewCount})`}
        </span>
      )}
    </div>
  );
};
