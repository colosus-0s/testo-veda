import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/site';

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const config = SITE_CONFIG.announcementBar;

  if (!config.enabled || dismissed) return null;

  const tickerItems = [
    'CASH ON DELIVERY AVAILABLE',
    'FREE DELIVERY ACROSS INDIA',
    '100% VEGETARIAN HPMC CAPSULES',
    'DISPATCH IN 24 HOURS',
    'FSSAI LIC. #12118441000654',
  ];

  return (
    <div className="bg-[#6A1423] text-white text-xs font-medium py-1.5 md:py-2 px-3 md:px-4 relative z-40 border-b border-white/10 shadow-sm overflow-hidden select-none">
      {/* Mobile Marquee Ticker (< md) */}
      <div className="md:hidden flex items-center overflow-hidden">
        <div className="animate-ticker text-[11px] font-bold tracking-wider uppercase text-[#FCFBF8] flex items-center whitespace-nowrap">
          {/* First set */}
          {tickerItems.map((item, idx) => (
            <span key={`t1-${idx}`} className="inline-flex items-center">
              <span className="mx-2 text-[#C7A33A]">●</span>
              <span>{item}</span>
            </span>
          ))}
          {/* Duplicate set for seamless infinite loop */}
          {tickerItems.map((item, idx) => (
            <span key={`t2-${idx}`} className="inline-flex items-center">
              <span className="mx-2 text-[#C7A33A]">●</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Desktop Centered Static Layout (>= md) */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between gap-4">
        <div className="flex-1 text-center flex items-center justify-center gap-2 flex-wrap">
          <span>{config.text}</span>
          {config.ctaText && (
            <Link
              to={config.ctaLink}
              className="inline-flex items-center gap-1 font-semibold text-[#F3E5AB] hover:underline underline-offset-2 ml-1"
            >
              <span>{config.ctaText}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/70 hover:text-white transition-colors p-1"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
