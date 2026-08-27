import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { FileText } from 'lucide-react';

export const FormulaSection: React.FC = () => {
  const product = INITIAL_PRODUCTS[0];
  const facts = product.supplementFacts;

  return (
    <Section id="formula" padding="xl" className="bg-[#f5f5f7] border-y border-neutral-300 text-[#111115]">
      <Container size="narrow">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase font-bold tracking-widest text-[#8b1528] block mb-2"
          >
            Transparent Formulation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#111115] mb-3"
          >
            Official Supplement Facts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs text-slate-600 font-medium"
          >
            FSSAI License No. {product.regulatory.fssaiLicense} | Serving Size: {facts.servingSize}
          </motion.p>
        </div>

        {/* Supplement Facts Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-300 shadow-xl overflow-x-auto"
        >
          <div className="border-b-4 border-[#111115] pb-3 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-black text-[#111115] uppercase tracking-wider">
                Supplement Facts
              </h3>
              <FileText className="w-5 h-5 text-[#8b1528]" />
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-medium mt-1">
              <span>Serving Size: {facts.servingSize}</span>
              <span>Servings Per Container: {facts.servingsPerContainer}</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="flex justify-between text-xs font-bold text-[#111115] border-b-2 border-slate-900 pb-2 mb-3">
            <span>Amount Per Serving</span>
            <span>% Daily Value</span>
          </div>

          {/* Individual Ingredients */}
          <div className="divide-y divide-slate-200 text-sm">
            {facts.ingredients.map((ing, i) => (
              <div key={i} className="py-2.5 flex justify-between items-baseline gap-4">
                <div>
                  <span className="font-semibold text-slate-900">{ing.name}</span>
                  {ing.botanicalName && (
                    <span className="text-xs italic text-slate-500 ml-1.5">({ing.botanicalName})</span>
                  )}
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-slate-900 font-bold">{ing.amount}</span>
                </div>
              </div>
            ))}

            {/* Proprietary Blend Header */}
            {facts.proprietaryBlend && (
              <div className="py-3 bg-slate-50 px-3 rounded-lg my-2 border border-slate-200">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>{facts.proprietaryBlend.name}</span>
                  <span className="font-mono text-xs font-bold">{facts.proprietaryBlend.amount}</span>
                </div>
                <ul className="mt-1.5 pl-4 list-disc text-xs text-slate-600 space-y-1">
                  {facts.proprietaryBlend.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="border-t-4 border-[#111115] pt-3 mt-4 text-[11px] text-slate-600 space-y-1">
            <p>* Daily Value (% DV) not established for dietary supplements.</p>
            <p><strong>Other Ingredients:</strong> {facts.otherIngredients.join(', ')}.</p>
          </div>
        </motion.div>

        {/* Directions & Usage Guide */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#8b1528] block mb-1">Dosage</span>
            <p className="text-xs text-slate-900 font-medium">{product.directions.labelInstruction}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#8b1528] block mb-1">How to Take</span>
            <p className="text-xs text-slate-900 font-medium">{product.directions.suggestedUse}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#8b1528] block mb-1">Daily Usage</span>
            <p className="text-xs text-slate-900 font-medium">{product.directions.bestResultsDuration}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
};
