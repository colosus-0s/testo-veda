import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  padding = 'lg',
  dark = false,
  className = '',
  ...props
}) => {
  const paddings = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-24 md:py-32',
  };

  const bg = dark ? 'bg-[#0a0a0c]' : 'bg-transparent';

  return (
    <section className={`relative w-full ${paddings[padding]} ${bg} ${className}`} {...props}>
      {children}
    </section>
  );
};
