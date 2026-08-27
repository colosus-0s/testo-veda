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
  const base = 'inline-flex items-center font-medium tracking-wide uppercase rounded select-none';

  const variants = {
    maroon: 'bg-[#8b1528] text-white',
    gold: 'bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30',
    green: 'bg-[#2e6f40]/20 text-[#3d8b52] border border-[#2e6f40]/40',
    outline: 'border border-neutral-700 text-neutral-300',
    veg: 'bg-emerald-950/40 text-emerald-400 border border-emerald-600/40 gap-1.5',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {variant === 'veg' && (
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
      )}
      {children}
    </span>
  );
};
