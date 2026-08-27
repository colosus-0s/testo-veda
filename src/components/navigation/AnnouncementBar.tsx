import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/site';

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const config = SITE_CONFIG.announcementBar;

  if (!config.enabled || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-[#5c0b1a] via-[#8b1528] to-[#5c0b1a] text-white text-xs font-medium py-2 px-4 relative z-40 border-b border-[#a31c32]/30 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 text-center flex items-center justify-center gap-2 flex-wrap">
          <span>{config.text}</span>
          {config.ctaText && (
            <Link
              to={config.ctaLink}
              className="inline-flex items-center gap-1 font-semibold text-[#f3e5ab] hover:underline underline-offset-2 ml-1"
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
