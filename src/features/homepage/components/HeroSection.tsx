import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { ASSET_REGISTRY } from '@/config/assets';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  const primaryCtaLink = '/testo';
  const primaryCtaText = 'Explore TESTO BOOSTER';
  const priceDisplay = '₹1,499';

  return (
    <section className="relative w-full bg-[#111210] text-white overflow-hidden pt-6 sm:pt-10 pb-14 sm:pb-20 border-b border-white/10">
      {/* Subtle ambient botanical lighting in background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#6A1423]/25 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-[#173C2B]/30 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (58% desktop / col-span-7) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            {/* Regulatory Kicker Badge */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-[#F3E5AB]"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>AYURVEDIC BOTANICAL FORMULATION</span>
              <span className="text-white/40">•</span>
              <span className="text-white/80">FSSAI Lic. #12118441000654</span>
            </motion.div>

            {/* Monumental Headline */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]"
              >
                TESTO BOOSTER <br className="hidden sm:inline" />
                <span className="gold-gradient-text">CAPSULES</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-sm sm:text-lg font-bold text-[#F3E5AB] tracking-wide uppercase"
              >
                Support Overall Health and Vitality for Men
              </motion.p>
            </div>

            {/* Authoritative Label Paragraph */}
            <motion.p
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              A factual botanical dietary supplement formulated with 10 classical plant extracts—including Ashwagandha, Gokhuru, Purified Shilajit, Safed Musli, and Saffron. Encapsulated in 100% vegetarian capsule shells.
            </motion.p>

            {/* Verified Fact Badges Bar */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 sm:gap-3 flex-wrap pt-1"
            >
              <span className="text-xs font-semibold text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" /> 30 Veg Capsules
              </span>
              <span className="text-xs font-semibold text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                MRP ₹1,499 <span className="text-white/60 font-normal">(~₹49.97/Cap)</span>
              </span>
              <span className="text-xs font-semibold text-[#F3E5AB] bg-[#6A1423]/40 px-3 py-1.5 rounded-lg border border-[#6A1423]">
                Capsule shell: HPMC Vegetarian
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2 max-w-xl"
            >
              <Link to={primaryCtaLink} className="w-full sm:w-auto shrink-0">
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto text-sm sm:text-base font-bold px-7 py-3.5 shadow-xl shadow-[#C7A33A]/20"
                  rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
                >
                  {primaryCtaText} • {priceDisplay}
                </Button>
              </Link>

              <a href="#formula" className="w-full sm:w-auto shrink-0">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-sm sm:text-base font-bold px-6 py-3.5 border-white/30 hover:border-white/60 text-white"
                >
                  View Formula & Ingredients
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right Column (42% desktop / col-span-5): Dedicated Clean Product Stage */}
          <motion.div
            initial={{ opacity: 1, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 border border-white/15 p-6 sm:p-10 flex items-center justify-center aspect-[4/4.5] shadow-2xl backdrop-blur-sm group">
              {/* Natural warm radial lighting behind bottle */}
              <div className="absolute inset-0 bg-radial-gradient from-[#C7A33A]/15 via-transparent to-transparent pointer-events-none" />

              {/* Physical Still Life Photograph */}
              <img
                src={ASSET_REGISTRY.products.testoBooster.stillLife}
                alt="TESTO BOOSTER CAPSULES Packaging and Physical Product"
                className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700 relative z-10"
              />

              {/* Floating Verified Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  10 Classical Botanicals
                </span>
                <span className="text-[#F3E5AB]">30 Veg Capsules</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#pillars"
        className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white transition-colors p-1 items-center gap-1 text-[11px] font-semibold tracking-wider uppercase"
        aria-label="Scroll to botanical pillars"
      >
        <span>Explore Formulation</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
};
