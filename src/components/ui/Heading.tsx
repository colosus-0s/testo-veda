import React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'hero' | 'display' | 'h1' | 'h2' | 'h3' | 'h4';
  gold?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  size = 'h2',
  gold = false,
  className = '',
  ...props
}) => {
  const Component = (`h${level}` as unknown) as React.ElementType;

  const sizes = {
    hero: 'text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]',
    display: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight',
    h1: 'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight',
    h2: 'text-xl sm:text-2xl lg:text-3xl font-semibold tracking-normal',
    h3: 'text-lg sm:text-xl font-semibold',
    h4: 'text-base sm:text-lg font-medium',
  };

  const textGradient = gold ? 'gold-gradient-text' : '';

  return (
    <Component
      className={`font-serif-display ${sizes[size]} ${textGradient} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
