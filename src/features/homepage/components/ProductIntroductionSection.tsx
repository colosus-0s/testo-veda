import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductPrice } from '@/components/commerce/ProductPrice';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';

export const ProductIntroductionSection: React.FC = () => {
  const product = INITIAL_PRODUCTS[0];

  return (
    <Section padding="xl" dark className="bg-[#0f0f11] border-b border-neutral-800/80">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Stage: 3D Render & Bottle Highlight */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative glass-card rounded-2xl p-8 overflow-hidden flex items-center justify-center min-h-[420px] border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8b1528]/20 via-transparent to-[#d4af37]/10 pointer-events-none" />
              <img
                src={product.images.render3d}
                alt={product.name}
                className="w-full max-w-sm h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Right Content: Product Overview & Spec Badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] bg-[#8b1528]/30 px-3.5 py-1 rounded-full inline-block mb-3 border border-[#8b1528]/60">
                Hero Dietary Supplement
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                {product.name}
              </h2>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-md flex items-center gap-1.5">
                <CheckCircle2 size={14} /> 100% Vegetarian Capsule
              </span>
              <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-md flex items-center gap-1.5">
                <Award size={14} /> FSSAI Approved
              </span>
            </div>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Quick Benefits Bullet Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Ashwagandha & Gokhuru Extracts',
                '170mg Purified Shilajit & Kaunch Blend',
                'Supports Physical Stamina & Energy',
                'FSSAI Lic. #12118441000654',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Discrepancy Notice Transparency Banner */}
            {product.discrepancyNotices && product.discrepancyNotices.length > 0 && (
              <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg p-3 flex items-start gap-2.5 text-xs text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-200 font-semibold">Dosage Transparency Note:</strong>
                  <span>{product.discrepancyNotices[0].note}</span>
                </div>
              </div>
            )}

            {/* Pricing & CTA Action Box */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-neutral-800">
              <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} size="xl" />

              <Link to={`/products/${product.slug}`}>
                <Button variant="gold" size="lg" className="w-full sm:w-auto shadow-lg shadow-[#d4af37]/15" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore TESTO
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
