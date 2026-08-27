import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { IngredientCard } from '@/components/commerce/IngredientCard';
import { INGREDIENTS_DATA } from '@/features/products/data/ingredientsData';

export const IngredientStorySection: React.FC = () => {
  return (
    <Section padding="xl" dark className="border-t border-neutral-800/80">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-2">
            Botanical Intelligence
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mb-4">
            The Botanical Formula Behind Natural Power+
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            Every capsule contains standardized extracts selected for bio-availability and synergy. We disclose every ingredient and quantity clearly.
          </p>
        </div>

        {/* Editorial Ingredient Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INGREDIENTS_DATA.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
