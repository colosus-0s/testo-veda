import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'muted' | 'gold' | 'maroon';
  as?: 'p' | 'span' | 'div';
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'md',
  variant = 'secondary',
  as = 'p',
  className = '',
  ...props
}) => {
  const Component = as as React.ElementType;

  const sizes = {
    xs: 'text-xs leading-normal',
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-relaxed',
  };

  const variants = {
    primary: 'text-neutral-100',
    secondary: 'text-neutral-300',
    muted: 'text-neutral-400',
    gold: 'text-[#d4af37]',
    maroon: 'text-[#8b1528]',
  };

  return (
    <Component className={`${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};
