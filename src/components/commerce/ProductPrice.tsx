import React from 'react';

export interface ProductPriceProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscountBadge?: boolean;
  textColor?: string;
  className?: string;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  compareAtPrice,
  currency = '₹',
  size = 'md',
  showDiscountBadge = true,
  textColor = 'text-[#171717]',
  className = '',
}) => {
  const isDiscounted = compareAtPrice && compareAtPrice > price;
  const savings = isDiscounted
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const sizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-bold',
    lg: 'text-xl font-bold',
    xl: 'text-3xl font-extrabold',
  };

  const compareSizeClasses = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-lg',
  };

  return (
    <div className={`inline-flex items-baseline gap-2 flex-wrap ${className}`}>
      <span className={`font-serif-display ${textColor} ${sizeClasses[size]}`}>
        {currency}
        {price.toLocaleString('en-IN')}
      </span>

      {isDiscounted && (
        <>
          <span className={`line-through text-neutral-500 font-normal ${compareSizeClasses[size]}`}>
            {currency}
            {compareAtPrice.toLocaleString('en-IN')}
          </span>
          {showDiscountBadge && (
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded">
              SAVE {savings}%
            </span>
          )}
        </>
      )}
    </div>
  );
};
