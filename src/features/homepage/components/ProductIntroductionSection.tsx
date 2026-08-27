import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
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
          {/* 1. Product Image as Visual Hero */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative glass-card rounded-2xl p-8 sm:p-12 overflow-hidden flex items-center justify-center min-h-[440px] border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8b1528]/25 via-transparent to-[#d4af37]/10 pointer-events-none" />
              <img
                src={product.images.render3d}
                alt={product.name}
                className="w-full max-w-xs sm:max-w-sm h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Right Stage: Focused Information & Purchasing */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* 2. Product Name */}
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] bg-[#8b1528]/40 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-[#8b1528]/80">
                Arogya Path Supplement
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                {product.name}
              </h2>
            </div>

            {/* 3. Concise Factual Descriptor */}
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
              {product.shortDescription}
            </p>

            {/* 4. Pack Size & Regulatory Micro-Pill */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-white font-semibold uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1.5 rounded-md">
                {product.packSize}
              </span>
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider bg-emerald-950/50 border border-emerald-800/50 px-3 py-1.5 rounded-md flex items-center gap-1.5">
                <CheckCircle2 size={14} /> 100% Veg
              </span>
              <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider bg-amber-950/50 border border-amber-800/50 px-3 py-1.5 rounded-md">
                Lic. #{product.regulatory.fssaiLicense}
              </span>
            </div>

            {/* Discrepancy Notice Transparency Banner */}
            {product.discrepancyNotices && product.discrepancyNotices.length > 0 && (
              <div className="bg-amber-950/40 border border-amber-800/50 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-amber-200">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-100 font-semibold mb-0.5">Dosage Label Note:</strong>
                  <span>{product.discrepancyNotices[0].note}</span>
                </div>
              </div>
            )}

            {/* 5. Price & 6. CTA */}
            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-neutral-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">Product MRP</span>
                <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} size="xl" />
              </div>

              <Link to={`/products/${product.slug}`}>
                <Button variant="gold" size="lg" className="w-full sm:w-auto shadow-lg shadow-[#d4af37]/20" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore TESTO Power+
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
