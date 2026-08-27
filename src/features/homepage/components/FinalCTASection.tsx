import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const FinalCTASection: React.FC = () => {
  return (
    <Section padding="xl" dark className="border-t border-neutral-800/80 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#8b1528]/20 via-transparent to-transparent pointer-events-none" />

      <Container size="narrow" className="relative z-10 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-3">
          Begin Your Journey
        </span>
        <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-white mb-6">
          Experience Natural Vitality with Arogya Path
        </h2>
        <p className="text-sm sm:text-lg text-neutral-300 mb-10 max-w-2xl mx-auto font-light">
          Order TESTO Natural Power+ Capsules today. 100% Vegetarian, FSSAI Licensed, ISO & GMP Quality Certified.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to="/products/testo-natural-power-plus" className="w-full sm:w-auto">
            <Button variant="gold" size="lg" className="w-full sm:w-auto text-base" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Order TESTO Power+ (₹999)
            </Button>
          </Link>

          <Link to="/shop" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
              Browse Full Storefront
            </Button>
          </Link>
        </div>

        {/* Value Micro Badges */}
        <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-400">
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Free Delivery Above ₹499</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>100% Authentic Packaging</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 text-blue-400" />
            <span>Easy 7-Day Support</span>
          </div>
        </div>
      </Container>
    </Section>
  );
};
