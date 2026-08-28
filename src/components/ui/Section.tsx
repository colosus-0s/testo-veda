import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'ivory' | 'white' | 'stone' | 'deep-green' | 'dark' | 'transparent';
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  padding = 'lg',
  background,
  dark = false,
  className = '',
  style,
  ...props
}) => {
  const paddings = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-24 md:py-32',
  };

  let bgClass = '';
  let inlineStyle: React.CSSProperties = { ...style };

  if (background === 'deep-green') {
    bgClass = 'bg-[#173C2B] text-white';
    inlineStyle = { backgroundColor: '#173C2B', color: '#ffffff', ...style };
  } else if (background === 'ivory') {
    bgClass = 'bg-[#F7F4ED] text-[#171717]';
  } else if (background === 'white') {
    bgClass = 'bg-[#FCFBF8] text-[#171717]';
  } else if (background === 'stone') {
    bgClass = 'bg-[#EBE7DF] text-[#171717]';
  } else if (background === 'dark' || dark) {
    bgClass = 'bg-[#0a0a0c] text-white';
  }

  return (
    <section
      className={`relative w-full ${paddings[padding]} ${bgClass} ${className}`}
      style={inlineStyle}
      {...props}
    >
      {children}
    </section>
  );
};
