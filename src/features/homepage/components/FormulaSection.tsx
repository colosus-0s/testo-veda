import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SupplementFactsPanel } from '@/components/commerce/SupplementFactsPanel';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const FormulaSection: React.FC = () => {
  return (
    <Section
      id="formula"
      padding="xl"
      background="white"
      className="border-y border-[#EBE7DF] text-[#171717] opacity-100"
    >
      <Container size="narrow">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] bg-red-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-red-100 shadow-sm">
            Technical Label Disclosure
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] mb-3 tracking-tight">
            What's In Each Capsule
          </h2>
          <p className="text-slate-700 text-sm sm:text-base max-w-xl mx-auto mb-4 leading-relaxed font-normal">
            Authoritative formulation disclosure matching the physical product label. Each 100% vegetarian capsule contains 10 synergistic botanicals.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-slate-700 font-semibold flex-wrap">
            <span className="flex items-center gap-1.5 bg-[#F7F4ED] px-3 py-1.5 rounded-md border border-[#EBE7DF] text-[#173C2B]">
              <ShieldCheck className="w-4 h-4 text-[#173C2B]" />
              FSSAI Lic. #{SITE_CONFIG.fssaiLicense}
            </span>
            <span className="bg-[#F7F4ED] px-3 py-1.5 rounded-md border border-[#EBE7DF] text-slate-800">
              Serving Size: 1 Vegetarian Capsule
            </span>
            <span className="flex items-center gap-1.5 bg-[#F7F4ED] px-3 py-1.5 rounded-md border border-[#EBE7DF] text-[#6A1423]">
              <Sparkles className="w-3.5 h-3.5 text-[#6A1423]" />
              30 Servings Per Container
            </span>
          </div>
        </div>

        {/* Unified Authoritative Supplement Facts Table */}
        <SupplementFactsPanel />
      </Container>
    </Section>
  );
};
