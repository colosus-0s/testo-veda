import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0f11] disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-md';

    const variants = {
      primary: 'bg-[#8b1528] text-white hover:bg-[#a31c32] focus:ring-[#8b1528] shadow-md shadow-[#8b1528]/20',
      secondary: 'bg-neutral-800 text-neutral-100 hover:bg-neutral-700 focus:ring-neutral-700 border border-neutral-700',
      outline: 'bg-transparent text-neutral-100 border border-neutral-700 hover:border-[#8b1528] hover:text-white hover:bg-[#8b1528]/10 focus:ring-[#8b1528]',
      ghost: 'bg-transparent text-neutral-300 hover:text-white hover:bg-neutral-800/60 focus:ring-neutral-700',
      gold: 'bg-gradient-to-r from-[#d4af37] to-[#aa851d] text-[#0f0f11] font-semibold hover:from-[#f3e5ab] hover:to-[#d4af37] focus:ring-[#d4af37] shadow-lg shadow-[#d4af37]/20',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3.5 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
