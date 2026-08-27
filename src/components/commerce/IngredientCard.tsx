import React from 'react';
import type { Ingredient } from '@/types/product';

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
      className={`bg-[#FCFBF8] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden border border-[#EBE7DF] shadow-subtle-card hover:shadow-elevated-card hover:border-[#6A1423]/40 transition-all duration-300 ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#6A1423] tracking-widest block mb-1">
              {ingredient.botanicalName}
            </span>
            <h3 className="font-serif text-xl font-bold text-[#171717] group-hover:text-[#6A1423] transition-colors">
              {ingredient.name}
            </h3>
          </div>
          {ingredient.quantity && (
            <span className="text-xs font-bold text-[#173C2B] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0">
              {ingredient.quantity}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-700 leading-relaxed mb-4 font-normal">
          {ingredient.shortDescription}
        </p>
      </div>

      <div className="pt-3 border-t border-[#EBE7DF] flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">Source / Extract:</span>
        <span className="font-semibold text-[#173C2B]">
          {ingredient.source || 'Botanical Extract'}
        </span>
      </div>
    </div>
  );
};
