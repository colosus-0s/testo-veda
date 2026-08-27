import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export const BrandStatementSection: React.FC = () => {
  return (
    <Section id="brand-statement" padding="xl" dark className="border-y border-neutral-800/80">
      <Container size="narrow" className="text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-3">
          Our Philosophy
        </span>
        <h2 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
          "True wellness is not built on temporary stimulants. It is cultivated through purposeful botanical intelligence."
        </h2>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
          At Arogya Path, we reject inflated marketing hypes and artificial quick-fixes. Every formulation is engineered around clean, standardized botanical extracts—honoring centuries of Ayurvedic formulation principles while upholding modern analytical rigor.
        </p>
      </Container>
    </Section>
  );
};
