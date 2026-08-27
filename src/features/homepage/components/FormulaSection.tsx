import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';

export const FormulaSection: React.FC = () => {
  const product = INITIAL_PRODUCTS[0];
  const facts = product.supplementFacts;

  return (
    <Section id="formula" padding="xl">
      <Container size="narrow">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8b1528] block mb-2">
            Transparent Formulation
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Official Supplement Facts
          </h2>
          <p className="text-xs text-neutral-400">
            FSSAI License No. {product.regulatory.fssaiLicense} | Serving Size: {facts.servingSize}
          </p>
        </div>

        {/* Supplement Facts Panel */}
        <div className="glass-card rounded-xl p-6 sm:p-8 border border-neutral-700/60 shadow-2xl">
          <div className="border-b-4 border-white pb-3 mb-4">
            <h3 className="font-serif-display text-2xl font-black text-white uppercase tracking-wider">
              Supplement Facts
            </h3>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mt-1">
              <span>Serving Size: {facts.servingSize}</span>
              <span>Servings Per Container: {facts.servingsPerContainer}</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="flex justify-between text-xs font-bold text-neutral-200 border-b-2 border-neutral-600 pb-2 mb-3">
            <span>Amount Per Serving</span>
            <span>% Daily Value</span>
          </div>

          {/* Individual Ingredients */}
          <div className="divide-y divide-neutral-800/80 text-sm">
            {facts.ingredients.map((ing, i) => (
              <div key={i} className="py-2.5 flex justify-between items-baseline gap-4">
                <div>
                  <span className="font-semibold text-white">{ing.name}</span>
                  {ing.botanicalName && (
                    <span className="text-xs italic text-neutral-400 ml-1.5">({ing.botanicalName})</span>
                  )}
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-white font-medium">{ing.amount}</span>
                </div>
              </div>
            ))}

            {/* Proprietary Blend Header */}
            {facts.proprietaryBlend && (
              <div className="py-3">
                <div className="flex justify-between font-semibold text-white">
                  <span>{facts.proprietaryBlend.name}</span>
                  <span className="font-mono text-xs">{facts.proprietaryBlend.amount}</span>
                </div>
                <ul className="mt-1.5 pl-4 list-disc text-xs text-neutral-400 space-y-1">
                  {facts.proprietaryBlend.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="border-t-4 border-white pt-3 mt-4 text-[11px] text-neutral-400 space-y-1">
            <p>* Daily Value (% DV) not established for dietary supplements.</p>
            <p><strong>Other Ingredients:</strong> {facts.otherIngredients.join(', ')}.</p>
          </div>
        </div>

        {/* Directions & Usage Guide */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="glass-card rounded-lg p-4">
            <span className="text-[10px] uppercase font-bold text-[#d4af37] block mb-1">Dosage</span>
            <p className="text-xs text-white font-medium">{product.directions.labelInstruction}</p>
          </div>
          <div className="glass-card rounded-lg p-4">
            <span className="text-[10px] uppercase font-bold text-[#d4af37] block mb-1">How to Take</span>
            <p className="text-xs text-white font-medium">{product.directions.suggestedUse}</p>
          </div>
          <div className="glass-card rounded-lg p-4">
            <span className="text-[10px] uppercase font-bold text-[#d4af37] block mb-1">Best Results</span>
            <p className="text-xs text-white font-medium">{product.directions.bestResultsDuration}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
};
