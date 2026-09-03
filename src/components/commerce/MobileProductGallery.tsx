import React, { useState, useRef } from 'react';
import { ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export interface MobileProductGalleryProps {
  images: string[];
  productName: string;
  fssaiLicense: string;
}

export const MobileProductGallery: React.FC<MobileProductGalleryProps> = ({
  images,
  productName,
  fssaiLicense,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: index * clientWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        <span className="inline-flex items-center gap-1 bg-[#173C2B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase">
          <Sparkles className="w-3 h-3 text-[#C7A33A]" /> 100% Veg (E 464)
        </span>
        <span className="inline-flex items-center gap-1 bg-[#FCFBF8]/90 backdrop-blur-sm text-[#171717] border border-[#EBE7DF] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
          <ShieldCheck className="w-3 h-3 text-[#173C2B]" /> Lic. #{fssaiLicense}
        </span>
      </div>

      {/* Image Counter Badge */}
      <div className="absolute top-3 right-3 z-10 pointer-events-none">
        <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-full shadow-sm">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Swipeable Main Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar bg-[#F7F4ED] aspect-square rounded-2xl border border-[#EBE7DF] shadow-subtle-card touch-pan-x"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-full shrink-0 snap-center aspect-square flex items-center justify-center p-4 relative"
          >
            <img
              src={img}
              alt={`${productName} view ${idx + 1}`}
              className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-300"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows for accessibility */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-md flex items-center justify-center text-slate-700 disabled:opacity-0 transition-opacity z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollToIndex(Math.min(images.length - 1, activeIndex + 1))}
            disabled={activeIndex === images.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-md flex items-center justify-center text-slate-700 disabled:opacity-0 transition-opacity z-10"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-1.5 py-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === idx
                ? 'w-6 h-1.5 bg-[#6A1423]'
                : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar px-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`w-14 h-14 rounded-lg bg-[#F7F4ED] p-1 shrink-0 border-2 transition-all ${
              activeIndex === idx
                ? 'border-[#6A1423] shadow-sm scale-105'
                : 'border-[#EBE7DF] opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
};
