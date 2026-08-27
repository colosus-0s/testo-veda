import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';

export const PromotionalBannerSection: React.FC = () => {
  const product = INITIAL_PRODUCTS[0];

  return (
    <Section padding="none" className="bg-[#6A1423] text-white relative overflow-hidden my-12 opacity-100">
      <div className="absolute inset-0 bg-gradient-to-r from-[#3D0B15] via-[#6A1423] to-[#173C2B]/80 pointer-events-none" />

      <Container className="relative z-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#F3E5AB]">
              <ShieldCheck size={14} className="text-[#C7A33A]" />
              <span>FSSAI Lic. #{product.regulatory.fssaiLicense}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Natural Botanical Support For An Intentional Routine
            </h2>

            <p className="text-slate-200 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Synthesizing 10 classical botanical extracts—including Ashwagandha, Shilajit, Gokhuru, and Saffron—in 100% vegetarian capsule shells.
            </p>

            <div className="flex items-center gap-4 flex-wrap pt-2">
              <span className="text-xs text-white bg-white/10 px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#C7A33A]" /> 30 Veg Capsules
              </span>
              <span className="text-xs text-white bg-white/10 px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#C7A33A]" /> MRP ₹999
              </span>
            </div>

            <div className="pt-4">
              <Link to={`/products/${product.slug}`}>
                <Button
                  variant="gold"
                  size="lg"
                  className="shadow-xl shadow-black/20 text-base"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore TESTO Power+
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm aspect-square bg-white/5 rounded-2xl p-6 border border-white/15 backdrop-blur-md flex items-center justify-center">
              <img
                src={product.images.primary}
                alt="Arogya Path TESTO Natural Power+"
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
