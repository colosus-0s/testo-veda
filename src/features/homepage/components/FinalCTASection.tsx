import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Lock } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const FinalCTASection: React.FC = () => {
  return (
    <Section padding="xl" dark className="bg-gradient-to-b from-[#8b1528]/30 via-[#0f0f11] to-[#0f0f11] border-t border-neutral-800/80 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-radial-gradient from-[#8b1528]/20 via-transparent to-transparent pointer-events-none" />

      <Container size="narrow" className="relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-3"
        >
          A Mindful Choice
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-white mb-6"
        >
          The Path Starts With A Choice.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-lg text-neutral-300 mb-10 max-w-2xl mx-auto font-light"
        >
          Discover TESTO Natural Power+ Capsules today. 100% Vegetarian, FSSAI Licensed (No. 12118441000654), ISO 9001:2015 & GMP Certified.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link to="/products/testo-natural-power-plus" className="w-full sm:w-auto">
            <Button
              variant="gold"
              size="lg"
              className="w-full sm:w-auto text-base shadow-xl shadow-[#d4af37]/20"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Explore TESTO Power+ (₹999)
            </Button>
          </Link>

          <Link to="/shop" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base border-white/20 hover:border-white/40">
              Browse Full Storefront
            </Button>
          </Link>
        </motion.div>

        {/* Value Micro Badges */}
        <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-400">
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Free Express Delivery Above ₹499</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>FSSAI License Compliance</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-blue-400" />
            <span>100% Vegetarian Shell (E 464)</span>
          </div>
        </div>
      </Container>
    </Section>
  );
};
