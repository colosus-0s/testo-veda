import React from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/commerce/ProductGrid';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const CollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const collectionTitle = slug ? slug.replace(/-/g, ' ').toUpperCase() : 'ALL COLLECTIONS';

  return (
    <Section padding="lg">
      <Container>
        <Breadcrumb
          items={[
            { label: 'Collections', href: '/shop' },
            { label: collectionTitle },
          ]}
          className="mb-6"
        />

        <div className="mb-10">
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mb-2">
            {collectionTitle}
          </h1>
          <p className="text-sm text-neutral-400">
            Formulations categorized under {collectionTitle}.
          </p>
        </div>

        <ProductGrid products={INITIAL_PRODUCTS} columns={3} />
      </Container>
    </Section>
  );
};
