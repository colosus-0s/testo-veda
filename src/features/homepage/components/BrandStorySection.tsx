import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export const BrandStorySection: React.FC = () => {
  return (
    <Section padding="xl" dark className="border-t border-neutral-800/80">
      <Container size="narrow">
        <div className="text-center space-y-6">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block">
            Brand Story
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Why We Founded Arogya Path
          </h2>
          <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-light text-left sm:text-center">
            <p>
              In a dietary supplement market saturated with extreme claims, hidden ingredients, and synthetic shortcuts, Arogya Path was established to forge a higher standard.
            </p>
            <p>
              "Arogya" represents holistic health free from disease, and "Path" signifies our commitment to guidance. By pairing time-honored Ayurvedic botanicals—such as Ashwagandha, Shilajit, and Gokhuru—with strict FSSAI compliance and ISO-certified manufacturing, we deliver formulations you can rely on daily.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
};
