import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'fade-in' | 'scale-reveal' | 'stagger-container';
  delay?: number;
  duration?: number;
}

const EASE_CURVE = [0.25, 0.1, 0.25, 1.0] as const;

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration = 0.5,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getVariants = (): Variants => {
    switch (variant) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, delay, ease: EASE_CURVE },
          },
        };
      case 'scale-reveal':
        return {
          hidden: { opacity: 0, scale: 0.98 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: duration + 0.1, delay, ease: EASE_CURVE },
          },
        };
      case 'stagger-container':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
              delayChildren: delay,
            },
          },
        };
      case 'fade-in':
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration, delay, ease: 'easeOut' },
          },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};
