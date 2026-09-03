import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Lock } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const FinalCTASection: React.FC = () => {
  return (
    <Section padding="xl" background="dark" className="bg-gradient-to-b from-[#6A1423] via-[#3D0B15] to-[#171717] border-t border-white/10 relative overflow-hidden text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#6A1423]/30 via-transparent to-transparent pointer-events-none" />

      <Container size="narrow" className="relative z-10 text-center py-12">
        <motion.span
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase font-bold tracking-widest text-[#F3E5AB] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-4 border border-white/20"
        >
          A Mindful Choice
        </motion.span>

        <motion.h2
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl font-bold text-white mb-6"
        >
          The Path Starts With A Choice.
        </motion.h2>

        <motion.p
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Explore TESTO BOOSTER Capsules today. 100% Vegetarian, FSSAI License No. 12118441000654, ISO 9001:2015 & GMP Certified.
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link to="/testo" className="w-full sm:w-auto">
            <Button
              variant="gold"
              size="lg"
              className="w-full sm:w-auto text-base shadow-xl shadow-black/30 font-bold"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Explore TESTO BOOSTER (₹1,499)
            </Button>
          </Link>

          <Link to="/shop" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base border-white/30 hover:border-white/60 text-white font-bold">
              Browse Full Storefront
            </Button>
          </Link>
        </motion.div>

        {/* Value Micro Badges */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 font-medium">
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-[#F3E5AB]" />
            <span>Free Express Shipping Above ₹499</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>FSSAI License Compliance</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-amber-300" />
            <span>100% Vegetarian Shell (E 464)</span>
          </div>
        </div>
      </Container>
    </Section>
  );
};
