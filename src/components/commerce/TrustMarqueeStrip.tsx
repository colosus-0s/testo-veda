import React from 'react';
import { ShieldCheck, Award, Leaf, CheckCircle2, Factory } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const TrustMarqueeStrip: React.FC = () => {
  const trustBadges = [
    { icon: <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />, label: `FSSAI Lic. #${SITE_CONFIG.fssaiLicense}` },
    { icon: <Leaf className="w-4 h-4 text-[#C7A33A] shrink-0" />, label: '100% Vegetarian HPMC Shells' },
    { icon: <Award className="w-4 h-4 text-emerald-400 shrink-0" />, label: SITE_CONFIG.isoCertification },
    { icon: <CheckCircle2 className="w-4 h-4 text-[#C7A33A] shrink-0" />, label: SITE_CONFIG.gmpCertification },
    { icon: <Factory className="w-4 h-4 text-emerald-400 shrink-0" />, label: `Mfg: ${SITE_CONFIG.manufacturer}` },
    { icon: <Leaf className="w-4 h-4 text-[#C7A33A] shrink-0" />, label: '10 Classical Botanical Extracts' },
    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />, label: 'Disclosed Active Milligrams (515 mg)' },
    { icon: <ShieldCheck className="w-4 h-4 text-[#C7A33A] shrink-0" />, label: 'Standardized Batch Traceability' },
  ];

  return (
    <div className="w-full bg-[#171815] border-b border-white/10 text-white py-3 overflow-hidden select-none">
      <div className="flex items-center">
        <div className="animate-ticker flex items-center whitespace-nowrap text-xs font-semibold tracking-wider uppercase text-slate-300">
          {/* First loop */}
          {trustBadges.map((badge, idx) => (
            <span key={`b1-${idx}`} className="inline-flex items-center gap-2 mx-5">
              {badge.icon}
              <span className="text-white font-medium">{badge.label}</span>
              <span className="text-[#C7A33A] opacity-40 ml-3">/</span>
            </span>
          ))}
          {/* Second loop for seamless repetition */}
          {trustBadges.map((badge, idx) => (
            <span key={`b2-${idx}`} className="inline-flex items-center gap-2 mx-5">
              {badge.icon}
              <span className="text-white font-medium">{badge.label}</span>
              <span className="text-[#C7A33A] opacity-40 ml-3">/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
