import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowRight, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0a0a0c] text-neutral-400 border-t border-neutral-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-neutral-800/80">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#8b1528] border border-[#d4af37]/40 flex items-center justify-center font-serif-display font-black text-lg text-white">
                AP
              </div>
              <span className="font-serif-display text-xl font-extrabold text-white tracking-wider">
                {SITE_CONFIG.brandName.toUpperCase()}
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Arogya Path is dedicated to formulating natural dietary supplements rooted in traditional botanical wisdom and verified by modern analytical standards.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs text-neutral-300">
              <span className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                FSSAI License No. {SITE_CONFIG.fssaiLicense}
              </span>
              <span className="text-neutral-400">
                {SITE_CONFIG.isoCertification} | {SITE_CONFIG.gmpCertification}
              </span>
            </div>

            {/* Newsletter Form */}
            <div className="pt-4 max-w-sm">
              <h4 className="font-serif-display text-sm font-bold text-white mb-2">
                Join the Wellness Circle
              </h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded border border-emerald-800/40">
                  <Check className="w-4 h-4" />
                  <span>Thank you for subscribing to Arogya Path updates.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#8b1528]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#8b1528] hover:bg-[#a31c32] text-white px-3 py-2 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="font-serif-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Storefront
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SITE_CONFIG.footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-serif-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SITE_CONFIG.footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Support */}
          <div>
            <h4 className="font-serif-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Policies & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SITE_CONFIG.footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer Banner */}
        <div className="py-6 border-b border-neutral-800/80 text-[11px] text-neutral-500 leading-relaxed">
          <p>
            <strong className="text-neutral-400">Dietary Supplement Notice:</strong> Products sold on this website are food supplements intended for dietary support and are not for medicinal use. Statements made regarding dietary supplements have not been evaluated by therapeutic government bodies to diagnose, treat, cure, or prevent any disease. Individual results may vary. Consult a registered healthcare professional or dietician prior to consumption.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.brandName} ({SITE_CONFIG.legalEntity}). All rights reserved.
          </p>
          <p className="text-[11px]">
            Marketed by {SITE_CONFIG.legalEntity} | Manufactured by {SITE_CONFIG.manufacturer}
          </p>
        </div>
      </div>
    </footer>
  );
};
