import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { HERO_CONFIG } from '../config/homepageConfig';
import { getActiveProducts } from '@/repositories/productRepository';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const activeProducts = getActiveProducts();
  const featuredProduct = activeProducts.find((p) => p.featured) || activeProducts[0];

  const primaryCtaLink = featuredProduct ? `/products/${featuredProduct.slug}` : HERO_CONFIG.primaryCtaLink;
  const primaryCtaText = featuredProduct ? `Explore ${featuredProduct.name}` : HERO_CONFIG.primaryCtaText;
  const subheadline = featuredProduct ? featuredProduct.shortDescription : HERO_CONFIG.subheadline;

  return (
    <section className="relative min-h-[75vh] sm:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#0f0f11] pt-12 opacity-100">
      {/* Background Media Stage */}
      <div className="absolute inset-0 z-0">
        {!videoFailed && !shouldReduceMotion ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={HERO_CONFIG.posterUrl}
            onError={() => setVideoFailed(true)}
            className="w-full h-full object-cover object-center opacity-45 scale-105 transition-all duration-1000"
          >
            <source src={HERO_CONFIG.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={featuredProduct?.images?.primary || HERO_CONFIG.fallbackImageUrl}
            alt={featuredProduct?.name || 'Arogya Path Botanical Formulation'}
            className="w-full h-full object-cover object-center opacity-45"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/70 to-[#0f0f11]/40" />
      </div>

      {/* Atmospheric Glow Overlay */}
      <div className="hero-glow top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-16 opacity-100">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6A1423]/60 border border-[#6A1423] text-xs font-semibold text-[#F3E5AB] mb-6 backdrop-blur-md"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{HERO_CONFIG.trustBadgeText}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl"
        >
          AROGYA PATH <br className="hidden sm:inline" />
          <span className="gold-gradient-text">THE PATH TO WELLNESS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed mb-10 drop-shadow"
        >
          {subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <Link to={primaryCtaLink} className="w-full sm:w-auto">
            <Button
              variant="gold"
              size="lg"
              className="w-full sm:w-auto text-base shadow-xl shadow-[#C7A33A]/20"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {primaryCtaText}
            </Button>
          </Link>

          <a href={HERO_CONFIG.secondaryCtaLink} className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base border-white/30 hover:border-white/60 text-white">
              {HERO_CONFIG.secondaryCtaText}
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#formula"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-slate-400 hover:text-white transition-colors p-2"
        aria-label="Scroll down to formula"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};
