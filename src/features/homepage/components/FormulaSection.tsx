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
    <Section id="formula" padding="xl" className="bg-[#173C2B] text-white border-y border-[#2E6B4A]/50 opacity-100">
      <Container size="narrow">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#F3E5AB] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/20">
            Technical Label Disclosure
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            What's In Each Capsule
          </h2>
          <p className="text-sm text-emerald-100 font-normal">
            FSSAI License No. {product.regulatory.fssaiLicense} | Serving Size: {facts.servingSize}
          </p>
        </div>

        {/* Visual Quantitative Ingredient Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 text-center">
          {[
            { name: 'Ashwagandha', qty: '100mg' },
            { name: 'Gokhuru (Tribulus)', qty: '100mg' },
            { name: 'Safed Musli', qty: '50mg' },
            { name: 'Sea Buckthorn', qty: '50mg' },
            { name: 'Fenugreek', qty: '30mg' },
            { name: 'Saffron', qty: '15mg' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 rounded-xl p-4 border border-white/15 backdrop-blur-sm shadow-sm"
            >
              <span className="text-xs text-emerald-200 font-medium block mb-1">{item.name}</span>
              <span className="font-serif font-bold text-lg text-[#F3E5AB]">{item.qty}</span>
            </div>
          ))}
        </div>

        {/* Official Supplement Facts Table Panel */}
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-[#FCFBF8] text-[#171717] rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-2xl overflow-x-auto"
        >
          <div className="border-b-4 border-[#171717] pb-3 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-black text-[#171717] uppercase tracking-wider">
                Supplement Facts
              </h3>
              <FileText className="w-5 h-5 text-[#6A1423]" />
            </div>
            <div className="flex justify-between text-xs text-slate-700 font-medium mt-1">
              <span>Serving Size: {facts.servingSize}</span>
              <span>Servings Per Container: {facts.servingsPerContainer}</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="flex justify-between text-xs font-bold text-[#171717] border-b-2 border-slate-900 pb-2 mb-3">
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
                    <span className="text-xs italic text-slate-600 ml-1.5">({ing.botanicalName})</span>
                  )}
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-slate-900 font-bold">{ing.amount}</span>
                </div>
              </div>
            ))}

            {/* Proprietary Blend Header */}
            {facts.proprietaryBlend && (
              <div className="py-3 bg-emerald-50/80 px-3.5 rounded-lg my-2 border border-emerald-200">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>{facts.proprietaryBlend.name}</span>
                  <span className="font-mono text-xs font-bold text-[#173C2B]">{facts.proprietaryBlend.amount}</span>
                </div>
                <ul className="mt-1.5 pl-4 list-disc text-xs text-slate-700 space-y-1">
                  {facts.proprietaryBlend.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="border-t-4 border-[#171717] pt-3 mt-4 text-[11px] text-slate-700 space-y-1">
            <p>* Daily Value (% DV) not established for dietary supplements.</p>
            <p><strong>Other Ingredients:</strong> {facts.otherIngredients.join(', ')}.</p>
          </div>
        </motion.div>

        {/* Directions & Usage Guide */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 border border-white/15 rounded-xl p-4 backdrop-blur-sm">
            <span className="text-[10px] uppercase font-bold text-[#F3E5AB] block mb-1">Dosage</span>
            <p className="text-xs text-white font-medium">{product.directions.labelInstruction}</p>
          </div>
          <div className="bg-white/10 border border-white/15 rounded-xl p-4 backdrop-blur-sm">
            <span className="text-[10px] uppercase font-bold text-[#F3E5AB] block mb-1">How to Take</span>
            <p className="text-xs text-white font-medium">{product.directions.suggestedUse}</p>
          </div>
          <div className="bg-white/10 border border-white/15 rounded-xl p-4 backdrop-blur-sm">
            <span className="text-[10px] uppercase font-bold text-[#F3E5AB] block mb-1">Daily Usage</span>
            <p className="text-xs text-white font-medium">{product.directions.bestResultsDuration}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
};
