import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export const BrandStatementSection: React.FC = () => {
  return (
    <Section id="brand-statement" padding="xl" className="bg-[#f5f5f7] border-y border-neutral-200 text-[#111115]">
      <Container size="narrow" className="text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase font-bold tracking-widest text-[#8b1528] block mb-4"
        >
          The Path to Wellness
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#111115] leading-tight mb-8"
        >
          "True wellness is not built on temporary stimulants. It is cultivated through purposeful botanical intelligence."
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal"
        >
          At Arogya Path, we reject inflated marketing hypes and artificial quick-fixes. Every formulation is engineered around clean botanical extracts—honoring centuries of Ayurvedic formulation principles while upholding modern analytical rigor.
        </motion.p>
      </Container>
    </Section>
  );
};
