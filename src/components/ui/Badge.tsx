import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'maroon' | 'gold' | 'green' | 'outline' | 'veg';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'maroon',
  size = 'md',
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center font-bold tracking-wider uppercase rounded-md select-none shadow-sm';

  const variants = {
    maroon: 'bg-[#6A1423] text-white',
    gold: 'bg-amber-100 text-amber-950 border border-amber-300',
    green: 'bg-emerald-100 text-emerald-950 border border-emerald-300',
    outline: 'bg-slate-100 text-slate-900 border border-slate-300',
    veg: 'bg-emerald-50 text-[#173C2B] border border-emerald-300 gap-1.5',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {variant === 'veg' && (
        <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block shrink-0" aria-hidden="true" />
      )}
      {children}
    </span>
  );
};
