import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export const BrandStorySection: React.FC = () => {
  return (
    <Section padding="xl" background="white" className="border-b border-[#EBE7DF] text-[#171717]">
      <Container size="narrow">
        <div className="text-center space-y-6">
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase font-bold tracking-widest text-[#6A1423] bg-red-50 px-3.5 py-1.5 rounded-full inline-block border border-red-100"
          >
            Brand Worldview
          </motion.span>
          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717]"
          >
            The Origin of Arogya Path
          </motion.h2>
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-normal text-left sm:text-center max-w-2xl mx-auto"
          >
            <p>
              In a dietary supplement market often crowded with extreme claims, hidden ingredients, and synthetic shortcuts, Arogya Path was established to forge a higher standard of transparency.
            </p>
            <p>
              "Arogya" represents holistic health, and "Path" signifies a disciplined journey. By pairing classical botanicals—such as Ashwagandha, Shilajit, Gokhuru, and Saffron—with strict FSSAI License compliance and ISO-certified manufacturing, we deliver formulations grounded in factual clarity.
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
