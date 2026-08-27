import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/commerce/ProductGrid';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { Button } from '@/components/ui/Button';

export const CollectionPreviewSection: React.FC = () => {
  return (
    <Section padding="xl" dark className="bg-[#17171a] border-t border-neutral-800/80">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-2">
              Catalog Discovery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Featured Formulations
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/shop">
              <Button variant="outline" size="md" className="border-white/20 hover:border-white/40 text-white" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Full Storefront
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProductGrid products={INITIAL_PRODUCTS} columns={3} />
        </motion.div>
      </Container>
    </Section>
  );
};
