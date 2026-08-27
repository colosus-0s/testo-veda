import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { IngredientCard } from '@/components/commerce/IngredientCard';
import { INGREDIENTS_DATA } from '@/features/products/data/ingredientsData';

export const IngredientStorySection: React.FC = () => {
  return (
    <Section padding="xl" dark className="bg-[#0f0f11] border-t border-neutral-800/80">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-2"
          >
            Botanical Intelligence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            The 10 Botanicals Behind Natural Power+
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light"
          >
            Every capsule contains standardized extracts selected for bio-compatibility and traditional synergy. We disclose every ingredient and quantity clearly.
          </motion.p>
        </div>

        {/* Editorial Ingredient Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INGREDIENTS_DATA.map((ingredient, idx) => (
            <motion.div
              key={ingredient.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <IngredientCard ingredient={ingredient} />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
