import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { ASSET_REGISTRY } from '@/config/assets';

export const PromotionalBannerSection: React.FC = () => {
  const product = INITIAL_PRODUCTS[0];

  return (
    <Section padding="none" className="bg-[#2A0E14] text-white relative overflow-hidden my-10 sm:my-16 border-y border-white/10 opacity-100">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1D080D] via-[#2A0E14] to-[#141E18] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#C7A33A]/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Content (col-span-7) */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-5 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#F3E5AB]">
              <ShieldCheck size={14} className="text-[#C7A33A]" />
              <span>FSSAI Lic. #{product.regulatory.fssaiLicense}</span>
              <span className="text-white/40">•</span>
              <span>ISO 9001 & GMP Certified</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12]">
              Formulated with 10 Classical Botanicals in Vegetarian Capsules
            </h2>

            <p className="font-serif text-xs sm:text-sm font-bold text-[#F3E5AB] tracking-widest uppercase">
              {product.subtitle}
            </p>

            <p className="text-slate-200 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              Disclosing 515 mg of active botanical extracts per serving—including Ashwagandha, Gokhuru, Purified Shilajit, Safed Musli, and Saffron. Encapsulated in 100% vegetarian capsule shells.
            </p>

            <div className="flex items-center gap-3 flex-wrap pt-1">
              <span className="text-xs text-white bg-white/10 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 border border-white/15">
                <CheckCircle2 size={13} className="text-[#C7A33A]" /> 30 Veg Capsules
              </span>
              <span className="text-xs text-white bg-white/10 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 border border-white/15">
                <CheckCircle2 size={13} className="text-[#C7A33A]" /> MRP ₹1,499
              </span>
              <span className="text-xs text-[#F3E5AB] bg-black/30 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 border border-[#C7A33A]/40">
                <Sparkles size={13} className="text-[#C7A33A]" /> 515 mg Active Extracts
              </span>
            </div>

            <div className="pt-3">
              <Link to="/testo">
                <Button
                  variant="gold"
                  size="lg"
                  className="shadow-xl shadow-black/30 text-sm sm:text-base font-bold px-7 py-3.5"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore TESTO BOOSTER
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Clean Physical Cutout Showcase (col-span-5) */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm aspect-square bg-gradient-to-b from-white/10 to-white/5 rounded-3xl p-6 sm:p-8 border border-white/15 backdrop-blur-sm flex items-center justify-center shadow-2xl group">
              <img
                src={ASSET_REGISTRY.products.testoBooster.front}
                alt="TESTO BOOSTER Bottle Front"
                className="w-full h-auto max-h-[320px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
