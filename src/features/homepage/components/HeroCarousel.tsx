import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ASSET_REGISTRY } from '@/config/assets';

interface HeroCampaignSlide {
  id: string;
  kicker: string;
  headlineLine1: string;
  headlineLine2?: string;
  headlineAccent?: string;
  supportingLine: string;
  ctaText: string;
  ctaLink: string;
  desktopImage: string;
  mobileImage: string;
  alt: string;
  textAlign?: 'left' | 'right';
}

const CAMPAIGN_SLIDES: HeroCampaignSlide[] = [
  {
    id: 'ad-01-active-movement',
    kicker: 'TESTO BOOSTER CAPSULES',
    headlineLine1: 'SUPPORT OVERALL HEALTH',
    headlineLine2: 'AND VITALITY FOR MEN',
    supportingLine: '10 classical botanicals • 30 vegetarian capsules',
    ctaText: 'Explore TESTO BOOSTER',
    ctaLink: '/testo',
    desktopImage: ASSET_REGISTRY.campaign.ad01Movement,
    mobileImage: ASSET_REGISTRY.campaign.ad01MovementMobile,
    alt: 'TESTO BOOSTER campaign with South Asian male runner in full stride at sunrise and verified product bottle on stone ledge',
    textAlign: 'left',
  },
  {
    id: 'ad-02-strength-discipline',
    kicker: 'ACTIVE LIFESTYLE DISCIPLINE',
    headlineLine1: 'FORMULATED WITH',
    headlineLine2: 'CLASSICAL BOTANICALS',
    supportingLine: '10 botanical extracts • 30 vegetarian capsules',
    ctaText: 'Discover the Formula',
    ctaLink: '/formula-ingredients',
    desktopImage: ASSET_REGISTRY.campaign.ad02Strength,
    mobileImage: ASSET_REGISTRY.campaign.ad02StrengthMobile,
    alt: 'TESTO BOOSTER strength discipline campaign with South Asian male deadlifter in sunlight beam and bottle on gym floor',
    textAlign: 'left',
  },
  {
    id: 'ad-03-daily-ritual',
    kicker: 'CONSISTENT DAILY CADENCE',
    headlineLine1: 'A SIMPLE',
    headlineLine2: 'DAILY RITUAL',
    supportingLine: 'One capsule twice a day after a meal.',
    ctaText: 'Explore TESTO BOOSTER',
    ctaLink: '/testo',
    desktopImage: ASSET_REGISTRY.campaign.ad03Ritual,
    mobileImage: ASSET_REGISTRY.campaign.ad03RitualMobile,
    alt: 'TESTO BOOSTER daily ritual campaign with South Asian man at morning wooden table and bottle beside water',
    textAlign: 'left',
  },
  {
    id: 'ad-04-botanical-heritage',
    kicker: 'HERBOLOGY TRANSPARENCY',
    headlineLine1: '10 CLASSICAL',
    headlineLine2: 'BOTANICALS',
    supportingLine: 'Quantitative formulation disclosure on the physical label.',
    ctaText: 'Explore the Formula',
    ctaLink: '/formula-ingredients',
    desktopImage: ASSET_REGISTRY.campaign.ad04Botanicals,
    mobileImage: ASSET_REGISTRY.campaign.ad04BotanicalsMobile,
    alt: 'TESTO BOOSTER botanical heritage campaign with authentic bottle staged beside brass mortar, saffron, and ashwagandha',
    textAlign: 'left',
  },
];

const AUTOPLAY_INTERVAL = 4500; // 4.5 seconds dwell per advertisement

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeSlide = CAMPAIGN_SLIDES[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CAMPAIGN_SLIDES.length);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CAMPAIGN_SLIDES.length) % CAMPAIGN_SLIDES.length);
    setProgress(0);
  }, []);

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Pure progress timer loop (50ms interval, React 19 / purity compliant)
  useEffect(() => {
    if (isPaused) return;

    const stepMs = 50;
    const increment = (stepMs / AUTOPLAY_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % CAMPAIGN_SLIDES.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 45) {
        handleNext();
      } else if (diff < -45) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      aria-label="Full-Screen Product Advertisement Campaign"
      className="relative w-full overflow-hidden select-none bg-[#0D0C0A] min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] max-h-[720px] h-[78vh]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 80% VISUAL: Background Advertising Composition (Image + Human + Product) */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="absolute inset-0 w-full h-full"
        >
          <picture className="w-full h-full block">
            <source media="(max-width: 640px)" srcSet={activeSlide.mobileImage} />
            <img
              src={activeSlide.desktopImage}
              alt={activeSlide.alt}
              className="w-full h-full object-cover object-center"
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
            />
          </picture>

          {/* Targeted Typography Scrim: Left-sided gradient so typography is crisp while the right-side human & product remain bright */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent hidden sm:block pointer-events-none" />
          {/* Mobile Scrim: Bottom/Top gradient for vertical framing */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 sm:hidden pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* 20% UI: Short Headline + Short Supporting Line + Single CTA */}
      <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-between py-8 sm:py-12 lg:py-16 pointer-events-none">
        {/* Top spacer */}
        <div />

        {/* Core Advertising Copy Area (Compact & Left-Aligned in Negative Space) */}
        <div className="max-w-[460px] sm:max-w-[500px] lg:max-w-[560px] text-left pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id + '-copy'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="space-y-2.5 sm:space-y-3.5"
            >
              {/* Short Kicker */}
              <span className="inline-block text-[11px] sm:text-xs uppercase font-bold tracking-[0.22em] text-[#E8C547] drop-shadow-sm">
                {activeSlide.kicker}
              </span>

              {/* Big Bold Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight drop-shadow-md">
                <span>{activeSlide.headlineLine1}</span>
                {activeSlide.headlineLine2 && (
                  <span className="block text-[#F4E6C3]">{activeSlide.headlineLine2}</span>
                )}
              </h1>

              {/* One Short Supporting Line */}
              <p className="text-xs sm:text-base text-stone-200 font-medium leading-relaxed drop-shadow-sm max-w-md">
                {activeSlide.supportingLine}
              </p>

              {/* Single Primary CTA */}
              <div className="pt-2 sm:pt-3">
                <Link
                  to={activeSlide.ctaLink}
                  className="inline-flex items-center gap-2.5 bg-[#6A1423] hover:bg-[#83182C] text-white text-xs sm:text-sm font-bold tracking-wide px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 shadow-xl hover:shadow-[#6A1423]/30 hover:scale-[1.02] group"
                >
                  <span>{activeSlide.ctaText}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Progress Controls & Carousel Indicators (Grouped on Left to Keep Right Product Canvas Unobstructed) */}
        <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto pt-4">
          {/* Linear Progress Indicators */}
          <div className="flex items-center gap-2 sm:gap-3" role="tablist">
            {CAMPAIGN_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}: ${slide.kicker}`}
                  onClick={() => selectSlide(idx)}
                  className="relative h-1.5 sm:h-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
                  style={{ width: isActive ? '48px' : '20px', backgroundColor: 'rgba(255,255,255,0.25)' }}
                >
                  {isActive && (
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#E8C547] to-white transition-all duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Navigation Arrows Grouped With Progress */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous advertisement"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors"
              aria-label="Next advertisement"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
