import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  ariaLabel: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  ariaLabel,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8b1528] disabled:opacity-50 select-none';

  const variants = {
    primary: 'bg-[#8b1528] text-white hover:bg-[#a31c32]',
    secondary: 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700',
    ghost: 'text-neutral-300 hover:text-white hover:bg-neutral-800/60',
    outline: 'border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white',
  };

  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <button
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};
