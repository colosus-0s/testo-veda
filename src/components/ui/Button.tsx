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
    const baseStyles = 'inline-flex items-center justify-center font-semibold opacity-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6A1423] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-md border';

    const variants = {
      primary: 'bg-[#6A1423] text-white border-[#6A1423] hover:bg-[#3D0B15] hover:border-[#3D0B15] shadow-md',
      secondary: 'bg-[#173C2B] text-white border-[#173C2B] hover:bg-[#0f281d] hover:border-[#0f281d] shadow-md',
      outline: 'bg-transparent text-[#6A1423] border-2 border-[#6A1423] hover:bg-[#6A1423] hover:text-white shadow-sm',
      ghost: 'bg-transparent text-[#171717] border-transparent hover:bg-[#6A1423]/10 hover:text-[#6A1423]',
      gold: 'bg-[#C7A33A] text-white border-[#C7A33A] hover:bg-[#a6862b] hover:border-[#a6862b] shadow-md font-bold',
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
          <svg className="animate-spin h-4 w-4 text-current shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          leftIcon
        )}
        <span className="shrink-0">{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
