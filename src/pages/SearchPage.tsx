import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const SearchPage: React.FC = () => {
  return (
    <Section padding="lg">
      <Container>
        <h1 className="font-serif-display text-3xl font-bold text-white mb-6">
          Search Products
        </h1>
        <input
          type="text"
          placeholder="Search catalog by name, botanical ingredient, SKU..."
          className="w-full max-w-xl p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-white mb-8"
        />
      </Container>
    </Section>
  );
};

export const NotFoundPage: React.FC = () => {
  return (
    <Section padding="xl" className="text-center py-32">
      <Container size="narrow" className="space-y-6">
        <h1 className="font-serif-display text-6xl font-extrabold text-[#8b1528]">404</h1>
        <h2 className="font-serif-display text-2xl font-bold text-white">Page Not Found</h2>
        <p className="text-sm text-neutral-400">
          The path you are looking for does not exist or has been relocated.
        </p>
        <Link to="/">
          <Button variant="gold" size="md">Return to Homepage</Button>
        </Link>
      </Container>
    </Section>
  );
};
