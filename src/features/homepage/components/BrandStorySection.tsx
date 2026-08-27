import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export const BrandStorySection: React.FC = () => {
  return (
    <Section padding="xl" dark className="bg-[#0f0f11] border-t border-white/10 text-white">
      <Container size="narrow">
        <div className="text-center space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase font-bold tracking-widest text-[#d4af37] bg-[#8b1528]/30 px-3.5 py-1.5 rounded-full inline-block border border-[#8b1528]/60"
          >
            Brand Worldview
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            The Origin of Arogya Path
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-light text-left sm:text-center max-w-2xl mx-auto"
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
