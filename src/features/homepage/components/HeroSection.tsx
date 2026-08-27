import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { HERO_CONFIG } from '../config/homepageConfig';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0f0f11] pt-16">
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
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-all duration-1000"
          >
            <source src={HERO_CONFIG.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={HERO_CONFIG.fallbackImageUrl}
            alt="Arogya Path TESTO Natural Power+"
            className="w-full h-full object-cover object-center opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/60 to-[#0f0f11]/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0f0f11]/40 to-[#0f0f11]" />
      </div>

      {/* Atmospheric Glow Overlay */}
      <div className="hero-glow top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8b1528]/30 border border-[#8b1528]/60 text-xs font-semibold text-[#f3e5ab] mb-6 backdrop-blur-md"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{HERO_CONFIG.trustBadgeText}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl"
        >
          THE PATH TO NATURAL <br className="hidden sm:inline" />
          <span className="gold-gradient-text">VITALITY & POWER</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl text-neutral-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10 text-shadow"
        >
          {HERO_CONFIG.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <Link to={HERO_CONFIG.primaryCtaLink} className="w-full sm:w-auto">
            <Button
              variant="gold"
              size="lg"
              className="w-full sm:w-auto text-base shadow-lg shadow-[#d4af37]/20"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {HERO_CONFIG.primaryCtaText}
            </Button>
          </Link>

          <a href={HERO_CONFIG.secondaryCtaLink} className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base border-white/20 hover:border-white/40">
              {HERO_CONFIG.secondaryCtaText}
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#brand-statement"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-neutral-400 hover:text-white transition-colors animate-bounce p-2"
        aria-label="Scroll down to brand statement"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};
