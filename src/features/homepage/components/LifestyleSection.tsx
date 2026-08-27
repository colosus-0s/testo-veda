import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ASSET_REGISTRY } from '@/config/assets';

export const LifestyleSection: React.FC = () => {
  return (
    <Section padding="xl" dark className="border-y border-neutral-800/80 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block">
              Modern Vitality & Purpose
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Engineered for Men Who Demand Uncompromised Performance
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              Modern physical and mental demands require continuous resilience. Arogya Path supplies the foundational botanical support to complement disciplined training, active lifestyle habits, and sustained focus.
            </p>

            <div className="space-y-4 pt-2">
              <div className="glass-card p-4 rounded-lg border-l-4 border-l-[#8b1528]">
                <h4 className="font-serif-display text-base font-bold text-white mb-1">
                  Resilience & Endurance
                </h4>
                <p className="text-xs text-neutral-400">
                  Adaptogenic Ashwagandha and Shilajit support stamina under high daily workload.
                </p>
              </div>

              <div className="glass-card p-4 rounded-lg border-l-4 border-l-[#d4af37]">
                <h4 className="font-serif-display text-base font-bold text-white mb-1">
                  Clean Standardized Extraction
                </h4>
                <p className="text-xs text-neutral-400">
                  Zero hidden synthetic hormones, zero unlisted fillers, 100% vegetarian capsules.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative glass-card rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square shadow-2xl group">
              <img
                src={ASSET_REGISTRY.lifestyle[0]}
                alt="Arogya Path Lifestyle Vitality"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
