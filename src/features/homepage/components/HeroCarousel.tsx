import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  Dumbbell,
} from 'lucide-react';
import { ASSET_REGISTRY } from '@/config/assets';
import { Button } from '@/components/ui/Button';

interface HeroSlide {
  id: string;
  badge: {
    text: string;
    subtext?: string;
    icon: React.ReactNode;
  };
  headlinePrimary: string;
  headlineAccent?: string;
  subtitle: string;
  description: string;
  pills: Array<{
    label: string;
    sublabel?: string;
    icon?: React.ReactNode;
    highlight?: boolean;
  }>;
  primaryCta: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
  backgroundImage: string;
  backgroundAlt: string;
  productImage?: string;
  productAlt?: string;
  visualTag: string;
  focalPosition?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'campaign-active-vitality',
    badge: {
      text: 'AYURVEDIC BOTANICAL FORMULATION',
      subtext: 'FSSAI Lic. #12118441000654',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />,
    },
    headlinePrimary: 'TESTO BOOSTER',
    headlineAccent: 'CAPSULES',
    subtitle: 'SUPPORT OVERALL HEALTH AND VITALITY FOR MEN',
    description:
      'A factual botanical dietary supplement formulated with 10 classical plant extracts—including Ashwagandha, Gokhuru, Purified Shilajit, Safed Musli, and Saffron. Encapsulated in 100% vegetarian capsule shells.',
    pills: [
      {
        label: '30 Veg Capsules',
        icon: <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />,
      },
      {
        label: 'MRP ₹1,499',
        sublabel: '(~₹49.97/Cap)',
      },
      {
        label: 'Capsule shell: HPMC Vegetarian',
        highlight: true,
      },
    ],
    primaryCta: {
      text: 'Explore TESTO BOOSTER • ₹1,499',
      link: '/testo',
    },
    secondaryCta: {
      text: 'View Formula & Ingredients',
      link: '/formula-ingredients',
    },
    backgroundImage: ASSET_REGISTRY.campaign.morningRun,
    backgroundAlt: 'Athletic morning vitality campaign against misty dawn mountain backdrop',
    productImage: ASSET_REGISTRY.products.testoBooster.stillLife,
    productAlt: 'TESTO BOOSTER CAPSULES physical bottle still life',
    visualTag: '10 Classical Botanicals • 30 Veg Capsules',
    focalPosition: 'object-[75%_center]',
  },
  {
    id: 'campaign-strength-discipline',
    badge: {
      text: 'ACTIVE LIFESTYLE DISCIPLINE',
      subtext: 'Standardized Formulation',
      icon: <Dumbbell className="w-4 h-4 text-[#C7A33A] shrink-0" />,
    },
    headlinePrimary: 'DISCIPLINED',
    headlineAccent: 'VITALITY FOR MEN',
    subtitle: '10 CLASSICAL BOTANICALS • 515 MG ACTIVE EXTRACTS',
    description:
      'Formulated for men committed to physical discipline and daily wellness. Featuring 6 individually quantified extracts combined with our 170 mg synergy extract blend.',
    pills: [
      {
        label: '515 mg Active Extracts',
        icon: <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />,
      },
      {
        label: '6 Individually Quantified',
      },
      {
        label: '170 mg Synergy Blend',
        highlight: true,
      },
    ],
    primaryCta: {
      text: 'Discover Formulation Details',
      link: '/formula-ingredients',
    },
    secondaryCta: {
      text: 'Shop TESTO BOOSTER',
      link: '/testo',
    },
    backgroundImage: ASSET_REGISTRY.campaign.strengthTraining,
    backgroundAlt: 'Controlled physical movement and strength discipline in warm ambient sunlight',
    visualTag: 'Physical Discipline • Daily Routine',
    focalPosition: 'object-[70%_center]',
  },
  {
    id: 'campaign-botanical-heritage',
    badge: {
      text: 'QUANTITATIVE BOTANICAL DISCLOSURE',
      subtext: 'Label Transparency',
      icon: <Sparkles className="w-4 h-4 text-[#C7A33A] shrink-0" />,
    },
    headlinePrimary: 'ANCIENT',
    headlineAccent: 'APOTHECARY HERITAGE',
    subtitle: 'VIVID SAFFRON, ASHWAGANDHA, SHILAJIT & GOKHURU',
    description:
      'Every active botanical is quantitatively disclosed on our packaging label. Formulated in adherence to classical Ayurvedic herbology and certified facility standards.',
    pills: [
      {
        label: 'Kashmiri Saffron (15 mg)',
        icon: <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />,
      },
      {
        label: 'Ashwagandha (100 mg)',
      },
      {
        label: 'Purified Shilajit (170 mg Blend)',
        highlight: true,
      },
    ],
    primaryCta: {
      text: 'Discover All 10 Botanicals',
      link: '/formula-ingredients',
    },
    secondaryCta: {
      text: 'Shop TESTO BOOSTER',
      link: '/testo',
    },
    backgroundImage: ASSET_REGISTRY.campaign.botanicalApothecary,
    backgroundAlt: 'Authentic Kashmiri saffron, whole ashwagandha roots, gokhuru, and brass mortar',
    productImage: ASSET_REGISTRY.products.testoBooster.board,
    productAlt: 'TESTO BOOSTER physical packaging with classical botanicals',
    visualTag: 'Saffron • Shilajit • Ashwagandha • Gokhuru',
    focalPosition: 'object-[60%_center]',
  },
  {
    id: 'campaign-mindful-ritual',
    badge: {
      text: 'DAILY WELLNESS DISCIPLINE',
      subtext: 'After Meals',
      icon: <Clock className="w-4 h-4 text-emerald-400 shrink-0" />,
    },
    headlinePrimary: 'THE MINDFUL',
    headlineAccent: 'DAILY RHYTHM',
    subtitle: 'ONE CAPSULE TWICE A DAY AFTER MEALS',
    description:
      'Formulated for seamless integration into your daily wellness routine. Swallow whole with lukewarm milk or water as directed by a Healthcare Professional. Packaged in 100% vegetarian capsule shells.',
    pills: [
      {
        label: 'Morning & Evening Routine',
        icon: <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />,
      },
      {
        label: 'Lukewarm Water / Milk',
      },
      {
        label: '100% Vegetarian HPMC Shell',
        highlight: true,
      },
    ],
    primaryCta: {
      text: 'Read Directions & Dosage',
      link: '/testo',
    },
    secondaryCta: {
      text: 'Our Story & Philosophy',
      link: '/our-story',
    },
    backgroundImage: ASSET_REGISTRY.campaign.wellnessMorning,
    backgroundAlt: 'Mindful morning hydration and wellness routine in soft morning sunlight',
    productImage: ASSET_REGISTRY.products.testoBooster.front,
    productAlt: 'TESTO BOOSTER physical bottle front packaging',
    visualTag: 'Consistent Daily Integration • After Meals',
    focalPosition: 'object-[65%_center]',
  },
];

const AUTOPLAY_INTERVAL = 4500; // 4.5 seconds per slide

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

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
      const minSwipeDistance = 40;
      if (diff > minSwipeDistance) {
        handleNext();
      } else if (diff < -minSwipeDistance) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = HERO_SLIDES[currentIndex];

  return (
    <section
      aria-label="Arogya Path Campaign Hero"
      className="relative w-full overflow-hidden bg-[#0A0B09] text-white select-none min-h-[520px] sm:min-h-[580px] lg:min-h-[660px] xl:min-h-[720px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-Bleed Background Advertising Campaign Image */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${slide.id}`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img
            src={slide.backgroundImage}
            alt={slide.backgroundAlt}
            className={`w-full h-full object-cover ${slide.focalPosition || 'object-center'}`}
            loading="eager"
          />
          {/* Cinematic Scrims: Dark gradient on left & bottom for crystal-clear readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30 lg:from-black/90 lg:via-black/55 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 lg:hidden" />
        </motion.div>
      </AnimatePresence>

      {/* Main Full-Width Viewport Container */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 lg:py-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`content-${slide.id}`}
            initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center"
          >
            {/* Left Content Column (col-span-7 / col-span-8) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-3.5 sm:space-y-5 text-left">
              {/* Kicker Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-[#F3E5AB]">
                {slide.badge.icon}
                <span>{slide.badge.text}</span>
                {slide.badge.subtext && (
                  <>
                    <span className="text-white/40 hidden sm:inline">•</span>
                    <span className="text-white/80 hidden sm:inline">{slide.badge.subtext}</span>
                  </>
                )}
              </div>

              {/* Monumental Headline */}
              <div className="space-y-1 sm:space-y-2">
                <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                  {slide.headlinePrimary}{' '}
                  {slide.headlineAccent && (
                    <span className="gold-gradient-text block sm:inline">{slide.headlineAccent}</span>
                  )}
                </h1>

                <p className="font-serif text-xs sm:text-sm md:text-base font-bold text-[#F3E5AB] tracking-wide uppercase">
                  {slide.subtitle}
                </p>
              </div>

              {/* Factual Body Description */}
              <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl font-normal leading-relaxed line-clamp-3 sm:line-clamp-none">
                {slide.description}
              </p>

              {/* Verified Fact Badges Bar */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap pt-0.5">
                {slide.pills.map((pill, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border backdrop-blur-md flex items-center gap-1 sm:gap-1.5 ${
                      pill.highlight
                        ? 'text-[#F3E5AB] bg-[#6A1423]/60 border-[#C7A33A]/40'
                        : 'text-white bg-black/40 border-white/20'
                    }`}
                  >
                    {pill.icon}
                    <span>{pill.label}</span>
                    {pill.sublabel && (
                      <span className="text-white/70 font-normal hidden sm:inline">{pill.sublabel}</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1.5 sm:pt-2 max-w-xl">
                <Link to={slide.primaryCta.link} className="w-full sm:w-auto shrink-0">
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full sm:w-auto text-xs sm:text-base font-bold px-5 sm:px-8 py-3 sm:py-3.5 shadow-2xl shadow-[#C7A33A]/25"
                    rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
                  >
                    {slide.primaryCta.text}
                  </Button>
                </Link>

                {slide.secondaryCta && (
                  <Link to={slide.secondaryCta.link} className="hidden sm:inline-block w-full sm:w-auto shrink-0">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto text-xs sm:text-base font-bold px-5 sm:px-6 py-3 sm:py-3.5 border-white/30 hover:border-white/60 text-white backdrop-blur-md bg-black/20"
                    >
                      {slide.secondaryCta.text}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Right Visual Stage: Organic Product Placement (col-span-5 / col-span-4) */}
            <div className="lg:col-span-5 xl:col-span-4 relative flex justify-center items-center">
              {slide.productImage ? (
                <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md flex flex-col items-center justify-center group">
                  {/* Atmospheric radial backlight */}
                  <div className="absolute inset-0 bg-radial-gradient from-[#C7A33A]/30 via-transparent to-transparent pointer-events-none scale-125 blur-2xl" />

                  <img
                    src={slide.productImage}
                    alt={slide.productAlt || 'TESTO BOOSTER Physical Packaging'}
                    className="w-full max-h-[220px] sm:max-h-[300px] lg:max-h-[420px] xl:max-h-[460px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] group-hover:scale-103 transition-transform duration-700 relative z-10"
                    loading="eager"
                  />

                  {/* Floating Verified Packaging Tag */}
                  <div className="mt-2.5 z-20 flex items-center justify-between gap-3 text-[10px] sm:text-[11px] font-semibold text-white/95 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 shadow-2xl">
                    <span className="flex items-center gap-1.5 text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {slide.visualTag}
                    </span>
                    <span className="text-[#F3E5AB] font-bold">Arogya Path</span>
                  </div>
                </div>
              ) : (
                /* Pure Lifestyle Slide: Clean breathing space so the human athletic movement is celebrated */
                <div className="hidden lg:flex items-center justify-center p-6 text-right">
                  <div className="bg-black/50 backdrop-blur-md p-4 rounded-2xl border border-white/15 max-w-xs text-left space-y-1 shadow-2xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F3E5AB] block">
                      Daily Discipline
                    </span>
                    <p className="text-xs text-slate-200">
                      Formulated to support overall health and vitality for men. FSSAI Lic. #12118441000654.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Prev / Next Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md items-center justify-center transition-all hover:scale-110 focus:outline-none shadow-xl"
        aria-label="Previous campaign slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md items-center justify-center transition-all hover:scale-110 focus:outline-none shadow-xl"
        aria-label="Next campaign slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators & Dwell Progress */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 focus:outline-none rounded-full ${
              idx === currentIndex
                ? 'w-8 sm:w-10 h-2 bg-[#C7A33A] shadow-md shadow-[#C7A33A]/50'
                : 'w-2 h-2 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}: ${s.headlinePrimary}`}
          />
        ))}
      </div>
    </section>
  );
};

export const HeroSection = HeroCarousel;
