import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSET_REGISTRY } from '@/config/assets';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface RhythmStoryItem {
  id: string;
  stepNumber: string;
  phase: string;
  title: string;
  subtitle: string;
  ritualNote: string;
  image: string;
  verifiedFact: string;
}

const RHYTHM_STORIES: RhythmStoryItem[] = [
  {
    id: 'rhythm-morning',
    stepNumber: '01',
    phase: 'Morning Awakening',
    title: 'Mindful Morning Ritual',
    subtitle: 'Start the day grounded with warm water and mindful presence before beginning your schedule.',
    ritualNote: 'One capsule after breakfast with warm water or lukewarm milk',
    image: ASSET_REGISTRY.campaign.wellnessMorning,
    verifiedFact: 'One capsule after meal • Vegetarian shell',
  },
  {
    id: 'rhythm-botanical',
    stepNumber: '02',
    phase: 'Raw Botanical Prep',
    title: 'Quantitative Botanical Heritage',
    subtitle: '10 classical herbs prepared with zero proprietary secrecy and exact milligram transparency.',
    ritualNote: 'Ashwagandha, Gokhuru, Shilajit & 7 synergistic Ayurvedic herbs',
    image: ASSET_REGISTRY.campaign.botanicalApothecary,
    verifiedFact: '10 Disclosed Botanicals • Lab Verified',
  },
  {
    id: 'rhythm-active',
    stepNumber: '03',
    phase: 'Physical Movement',
    title: 'Mindful Physical Vitality',
    subtitle: 'Formulated specifically to support overall health and vitality for men through consistent discipline.',
    ritualNote: 'Supports active daily performance and balanced vitality',
    image: ASSET_REGISTRY.campaign.strengthTraining,
    verifiedFact: 'Formulated for men • FSSAI Lic. 12118441000654',
  },
  {
    id: 'rhythm-evening',
    stepNumber: '04',
    phase: 'Restorative Evening',
    title: 'Restorative Evening Rhythm',
    subtitle: 'Close the daily cycle with calming restorative balance as your body prepares for deep overnight renewal.',
    ritualNote: 'Second capsule taken after evening dinner with warm water or milk',
    image: ASSET_REGISTRY.lifestyle.restorativeEveningCalm,
    verifiedFact: 'Twice daily regimen • 30 Veg Capsules MRP ₹1499',
  },
];

const AUTOPLAY_INTERVAL = 4000; // 4 seconds dwell per step

export const WatchAndBuySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeStory = RHYTHM_STORIES[activeIndex];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % RHYTHM_STORIES.length);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + RHYTHM_STORIES.length) % RHYTHM_STORIES.length);
    setProgress(0);
  }, []);

  const selectStory = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  // Timer loop with smooth progress tracking
  useEffect(() => {
    if (isPaused) return;

    const stepMs = 50;
    const increment = (stepMs / AUTOPLAY_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % RHYTHM_STORIES.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;
      if (deltaX > 45) {
        handleNext();
      } else if (deltaX < -45) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      aria-label="Daily Wellness Rhythm Showcase"
      className="py-14 sm:py-20 lg:py-24 bg-[#F5F2EA] border-y border-[#E8E2D5] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.2em] text-[#6A1423] block mb-2">
                Daily Wellness Rhythm & Cadence
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1F1C19] tracking-tight">
                The Mindful Daily Cadence
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#6B635B] max-w-xl">
                Experience classical Ayurvedic vitality through a structured morning-to-night routine designed for consistency.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#6B635B] hover:text-[#1F1C19] transition-colors py-1 px-2.5 rounded-full border border-[#DED7C8]"
                aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
              >
                {isPaused ? <Play size={12} /> : <Pause size={12} />}
                <span className="font-sans font-medium">{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
              <Link
                to="/testo"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#6A1423] hover:text-[#3D0B15] transition-colors group"
              >
                <span>View TESTO BOOSTER Details</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Desktop / Tablet: Connected 4-Step Navigation Timeline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8" role="tablist">
          {RHYTHM_STORIES.map((story, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={story.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => selectStory(idx)}
                className={`relative text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'bg-white border-[#C7A33A] shadow-md shadow-[#C7A33A]/10 text-[#1F1C19]'
                    : 'bg-[#EDE8DC]/70 border-[#DDD5C5] text-[#786F66] hover:bg-white/60 hover:text-[#1F1C19]'
                }`}
              >
                {/* Active Progress Bar Underline */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#6A1423] to-[#C7A33A] transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`font-mono text-xs font-bold tracking-wider ${
                      isActive ? 'text-[#6A1423]' : 'text-[#8C8275]'
                    }`}
                  >
                    {story.stepNumber}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-[#6A1423]/10 text-[#6A1423]'
                        : 'bg-black/5 text-[#8C8275]'
                    }`}
                  >
                    {story.phase.split(' ')[0]}
                  </span>
                </div>

                <div className="font-serif font-bold text-xs sm:text-sm line-clamp-1">
                  {story.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Campaign Cinema Stage */}
        <div
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#E3DCCF] bg-stone-900 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Images with Smooth Crossfade */}
          {RHYTHM_STORIES.map((story, idx) => (
            <div
              key={story.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover object-center transform scale-100 hover:scale-102 transition-transform duration-1000"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              {/* Cinematic Vignette & Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden md:block" />
            </div>
          ))}

          {/* Floating Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 sm:p-8 lg:p-12 pointer-events-none">
            {/* Top Bar inside Stage */}
            <div className="flex items-center justify-between pointer-events-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6A1423]/85 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 shadow-md">
                <Sparkles size={12} className="text-[#C7A33A]" />
                Step {activeStory.stepNumber} • {activeStory.phase}
              </span>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors"
                  aria-label="Previous step"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors"
                  aria-label="Next step"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Bottom Content inside Stage */}
            <div className="max-w-2xl text-left space-y-2 sm:space-y-3 pointer-events-auto">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F3E5AB]">
                <ShieldCheck size={14} className="text-[#C7A33A]" />
                <span>{activeStory.verifiedFact}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {activeStory.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                {activeStory.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="bg-black/40 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs text-white/90">
                  <span className="font-bold text-[#C7A33A]">Direction: </span>
                  {activeStory.ritualNote}
                </div>

                <Link
                  to="/testo"
                  className="inline-flex items-center gap-2 bg-[#6A1423] hover:bg-[#80182A] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-md"
                >
                  <span>Explore TESTO BOOSTER</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Guidance Notice */}
        <div className="mt-3 flex sm:hidden items-center justify-between text-[11px] text-[#8C8275] px-1">
          <span>Swipe left / right to change</span>
          <span className="font-mono font-bold text-[#6A1423]">
            {activeIndex + 1} / {RHYTHM_STORIES.length}
          </span>
        </div>
      </div>
    </section>
  );
};
