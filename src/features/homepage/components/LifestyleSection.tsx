import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ASSET_REGISTRY } from '@/config/assets';

export const LifestyleSection: React.FC = () => {
  return (
    <Section padding="xl" background="white" className="border-b border-[#EBE7DF] overflow-hidden text-[#171717]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block">
              Modern Vitality & Routine
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717] leading-tight">
              Engineered for Men Who Value Intentional Routine
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Modern physical and mental demands require continuous resilience. Arogya Path supplies the foundational botanical support to complement disciplined training, active lifestyle habits, and sustained focus.
            </p>

            <div className="space-y-4 pt-2">
              <div className="bg-[#F7F4ED] p-4 rounded-xl border-l-4 border-l-[#6A1423] border-[#EBE7DF] shadow-subtle-card">
                <h4 className="font-serif text-base font-bold text-[#171717] mb-1">
                  Resilience & Daily Support
                </h4>
                <p className="text-xs text-slate-700 font-normal">
                  Adaptogenic Ashwagandha and Shilajit support energy management under physical demands.
                </p>
              </div>

              <div className="bg-[#F7F4ED] p-4 rounded-xl border-l-4 border-l-[#173C2B] border-[#EBE7DF] shadow-subtle-card">
                <h4 className="font-serif text-base font-bold text-[#171717] mb-1">
                  Clean Formulation Disclosure
                </h4>
                <p className="text-xs text-slate-700 font-normal">
                  Full label disclosure, zero unlisted fillers, 100% vegetarian capsule shells.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative"
          >
            <div className="relative bg-[#F7F4ED] rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-square shadow-subtle-card group border border-[#EBE7DF]">
              <img
                src={ASSET_REGISTRY.brand.lifestyleHero}
                alt="Arogya Path Lifestyle Vitality"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
