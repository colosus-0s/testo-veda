import React from 'react';
import type { Ingredient } from '@/types/product';
import { Badge } from '@/components/ui/Badge';

export interface IngredientCardProps {
  ingredient: Ingredient;
  className?: string;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  className = '',
}) => {
  return (
    <div
      className={`glass-card rounded-xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-[#8b1528]/50 transition-all duration-300 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-[10px] uppercase font-semibold text-[#d4af37] tracking-wider block mb-1">
            {ingredient.botanicalName}
          </span>
          <h3 className="font-serif-display text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
            {ingredient.name}
          </h3>
        </div>
        {ingredient.quantity && (
          <Badge variant="gold" size="sm">
            {ingredient.quantity}
          </Badge>
        )}
      </div>

      <p className="text-sm text-neutral-300 leading-relaxed mb-4">
        {ingredient.shortDescription}
      </p>

      <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
        <span className="text-neutral-400">Approved Benefit:</span>
        <span className="font-medium text-emerald-400 text-right max-w-[200px] line-clamp-1">
          {ingredient.approvedBenefit}
        </span>
      </div>
    </div>
  );
};
