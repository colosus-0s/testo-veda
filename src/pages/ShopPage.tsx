import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/commerce/ProductGrid';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const ShopPage: React.FC = () => {
  return (
    <Section padding="lg">
      <Container>
        <Breadcrumb items={[{ label: 'Shop All' }]} className="mb-6" />

        <div className="mb-10">
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mb-2">
            Storefront Catalog
          </h1>
          <p className="text-sm text-neutral-400">
            Explore our dietary supplement formulations crafted with traditional botanical extracts.
          </p>
        </div>

        <ProductGrid products={INITIAL_PRODUCTS} columns={3} />
      </Container>
    </Section>
  );
};
