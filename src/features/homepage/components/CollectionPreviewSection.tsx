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
    <Section padding="xl" className="bg-[#FCFBF8] border-b border-[#EBE7DF] text-[#171717]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2">
              Catalog Storefront
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Featured Botanical Formulations
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/shop">
              <Button variant="outline" size="md" className="border-slate-300 text-[#171717] hover:border-[#6A1423] hover:text-[#6A1423]" rightIcon={<ArrowRight className="w-4 h-4" />}>
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
