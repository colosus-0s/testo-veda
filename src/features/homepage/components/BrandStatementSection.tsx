import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export const BrandStatementSection: React.FC = () => {
  return (
    <Section id="brand-statement" padding="xl" background="ivory" className="border-y border-[#EBE7DF]">
      <Container size="narrow" className="text-center">
        <motion.span
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-4"
        >
          The Path to Wellness
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#171717] leading-tight mb-8"
        >
          "True wellness is not built on temporary stimulants. It is cultivated through purposeful botanical intelligence."
        </motion.h2>

        <motion.p
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal"
        >
          At Arogya Path, we reject inflated marketing hypes and artificial quick-fixes. Every formulation is engineered around clean botanical extracts—honoring centuries of Ayurvedic formulation principles while upholding modern analytical rigor.
        </motion.p>
      </Container>
    </Section>
  );
};
