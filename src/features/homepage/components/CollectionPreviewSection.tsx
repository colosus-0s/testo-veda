import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/commerce/ProductGrid';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { Button } from '@/components/ui/Button';

export const CollectionPreviewSection: React.FC = () => {
  return (
    <Section padding="xl">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8b1528] block mb-2">
              Catalog Discovery
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white">
              Men's Wellness Collection
            </h2>
          </div>

          <Link to="/shop">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View Full Storefront
            </Button>
          </Link>
        </div>

        <ProductGrid products={INITIAL_PRODUCTS} columns={3} />
      </Container>
    </Section>
  );
};
