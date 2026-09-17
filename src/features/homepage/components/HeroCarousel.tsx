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
  Award,
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
  secondaryCta: {
    text: string;
    link: string;
  };
  image: string;
  imageAlt: string;
  imageType: 'product' | 'botanicals' | 'lifestyle' | 'board';
  visualTag: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-formulation',
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
    image: ASSET_REGISTRY.products.testoBooster.stillLife,
    imageAlt: 'TESTO BOOSTER CAPSULES Physical Still Life Photography',
    imageType: 'product',
    visualTag: '10 Classical Botanicals • 30 Veg Capsules',
  },
  {
    id: 'slide-botanicals',
    badge: {
      text: 'QUANTITATIVE BOTANICAL DISCLOSURE',
      subtext: 'Label-Disclosed Milligrams',
      icon: <Sparkles className="w-4 h-4 text-[#C7A33A] shrink-0" />,
    },
    headlinePrimary: '10 CLASSICAL',
    headlineAccent: 'BOTANICAL EXTRACTS',
    subtitle: 'ANCIENT HERBOLOGY, QUANTIFIED LABEL TRANSPARENCY',
    description:
      'Every active ingredient is quantitatively declared. 6 individually quantified extracts totaling 345 mg, combined with our 170 mg synergy extract blend—delivering 515 mg of active botanicals per serving.',
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
      text: 'Discover All 10 Botanicals',
      link: '/formula-ingredients',
    },
    secondaryCta: {
      text: 'Shop TESTO BOOSTER',
      link: '/testo',
    },
    image: ASSET_REGISTRY.lifestyle.botanicalApothecaryPrep,
    imageAlt: 'Authentic raw botanicals, whole saffron, ashwagandha root, and traditional brass mortar',
    imageType: 'botanicals',
    visualTag: 'Ashwagandha • Shilajit • Gokhuru • Saffron',
  },
  {
    id: 'slide-ritual',
    badge: {
      text: 'DAILY WELLNESS DISCIPLINE',
      subtext: 'Non-Habit Forming Ritual',
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
        label: 'Take with Lukewarm Water / Milk',
      },
      {
        label: '100% Vegetarian Shell',
        highlight: true,
      },
    ],
    primaryCta: {
      text: 'Read Dosage & Directions',
      link: '/testo',
    },
    secondaryCta: {
      text: 'Our Story & Philosophy',
      link: '/our-story',
    },
    image: ASSET_REGISTRY.lifestyle.wellnessMorningRitual,
    imageAlt: 'Mindful morning hydration and tea wellness routine in soft dawn lighting',
    imageType: 'lifestyle',
    visualTag: 'Consistent Daily Integration • After Meals',
  },
  {
    id: 'slide-standards',
    badge: {
      text: 'CERTIFIED COMPLIANCE & MANUFACTURING',
      subtext: 'FSSAI Lic. #12118441000654',
      icon: <Award className="w-4 h-4 text-[#C7A33A] shrink-0" />,
    },
    headlinePrimary: 'ISO 9001:2015 &',
    headlineAccent: 'GMP CERTIFIED',
    subtitle: 'RIGOROUS FACILITY STANDARDS & PACKAGING CONTROLS',
    description:
      'Manufactured by Streamline Pharma Pvt. Ltd. (Kothe Aath Chak-142026) under state-inspected FSSAI licensing. Marketed by Arogya Path Marketing with comprehensive batch traceability.',
    pills: [
      {
        label: 'ISO 9001:2015 22000:2018',
        icon: <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />,
      },
      {
        label: 'Streamline Pharma Pvt. Ltd.',
      },
      {
        label: 'Arogya Path Marketing',
        highlight: true,
      },
    ],
    primaryCta: {
      text: 'Verify Compliance Standards',
      link: '/quality-trust',
    },
    secondaryCta: {
      text: 'Explore TESTO BOOSTER',
      link: '/testo',
    },
    image: ASSET_REGISTRY.products.testoBooster.board,
    imageAlt: 'Physical TESTO BOOSTER packaging and manufacturing compliance presentation',
    imageType: 'board',
    visualTag: 'STREAMLINE PHARMA • FSSAI 12118441000654',
  },
];

const AUTOPLAY_INTERVAL = 3000; // 3 seconds per slide

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
        // Swiped left -> next
        handleNext();
      } else if (diff < -minSwipeDistance) {
        // Swiped right -> prev
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = HERO_SLIDES[currentIndex];

  return (
    <section
      aria-label="Arogya Path Hero Carousel"
      className="relative w-full overflow-hidden bg-[#111210] text-white border-b border-white/10 select-none min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] xl:min-h-[720px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-bl from-[#6A1423]/25 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-2/5 h-3/5 bg-gradient-to-tr from-[#173C2B]/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      {/* Main Full-Width Viewport Container */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 lg:py-14">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center"
          >
            {/* Left Content Column (55% desktop / col-span-7) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left order-2 lg:order-1">
              {/* Kicker Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-[#F3E5AB]">
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
                <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                  {slide.headlinePrimary}{' '}
                  {slide.headlineAccent && (
                    <span className="gold-gradient-text block sm:inline">{slide.headlineAccent}</span>
                  )}
                </h1>

                <p className="font-serif text-xs sm:text-base md:text-lg font-bold text-[#F3E5AB] tracking-wide uppercase">
                  {slide.subtitle}
                </p>
              </div>

              {/* Factual Body Description */}
              <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
                {slide.description}
              </p>

              {/* Verified Fact Badges Bar */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-0.5">
                {slide.pills.map((pill, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
                      pill.highlight
                        ? 'text-[#F3E5AB] bg-[#6A1423]/40 border-[#6A1423]'
                        : 'text-white bg-white/10 border-white/15'
                    }`}
                  >
                    {pill.icon}
                    <span>{pill.label}</span>
                    {pill.sublabel && (
                      <span className="text-white/60 font-normal hidden sm:inline">{pill.sublabel}</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 max-w-xl">
                <Link to={slide.primaryCta.link} className="w-full sm:w-auto shrink-0">
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full sm:w-auto text-xs sm:text-base font-bold px-6 sm:px-8 py-3.5 shadow-xl shadow-[#C7A33A]/20"
                    rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
                  >
                    {slide.primaryCta.text}
                  </Button>
                </Link>

                <Link to={slide.secondaryCta.link} className="w-full sm:w-auto shrink-0">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-xs sm:text-base font-bold px-5 sm:px-6 py-3.5 border-white/30 hover:border-white/60 text-white"
                  >
                    {slide.secondaryCta.text}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Stage (45% desktop / col-span-5) */}
            <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 border border-white/15 p-4 sm:p-6 lg:p-8 flex items-center justify-center aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[4/4.2] shadow-2xl backdrop-blur-sm group">
                {/* Radial inner glow */}
                <div className="absolute inset-0 bg-radial-gradient from-[#C7A33A]/20 via-transparent to-transparent pointer-events-none" />

                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className={`w-full h-full object-center drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] group-hover:scale-104 transition-transform duration-700 relative z-10 ${
                    slide.imageType === 'product' || slide.imageType === 'board'
                      ? 'object-contain'
                      : 'object-cover rounded-2xl'
                  }`}
                  loading="eager"
                />

                {/* Floating Bottom Verified Tag */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-white/90 bg-black/70 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-white/15">
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {slide.visualTag}
                  </span>
                  <span className="text-[#F3E5AB] font-bold">Arogya Path</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Prev / Next Buttons */}
      <button
        type="button"
        onClick={handlePrev}
        className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md items-center justify-center transition-all hover:scale-110 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md items-center justify-center transition-all hover:scale-110 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators & Progress */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 focus:outline-none rounded-full ${
              idx === currentIndex
                ? 'w-7 sm:w-8 h-2 bg-[#C7A33A]'
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
