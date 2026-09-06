import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ASSET_REGISTRY } from '@/config/assets';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <Section padding="xl" className="bg-[#FCFBF8] border-b border-[#EBE7DF] text-[#171717] opacity-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Authentic Botanical Heritage Still Life (col-span-5) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[4/3.5] border border-[#EBE7DF] shadow-subtle-card group">
              <img
                src={ASSET_REGISTRY.brand.brandStoryHeritage}
                alt="Arogya Path Traditional Botanical Heritage"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[#EBE7DF] text-left flex items-center justify-between shadow-sm">
                <span className="text-xs font-bold text-[#171717]">Classical Botanical Discipline</span>
                <span className="text-[10px] uppercase font-bold text-[#6A1423] flex items-center gap-1">
                  <Sparkles size={11} className="text-[#C7A33A]" /> Arogya Path
                </span>
              </div>
            </div>
          </div>

          {/* Right: Narrative Story (col-span-7) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#6A1423] bg-[#6A1423]/10 px-3.5 py-1.5 rounded-full border border-[#6A1423]/20"
            >
              <span>Brand Worldview</span>
              <span className="text-slate-400">•</span>
              <span className="text-[#173C2B]">Factual Integrity</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717] tracking-tight leading-tight"
            >
              The Origin of Arogya Path
            </motion.h2>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed font-normal"
            >
              <p>
                In a dietary supplement market often crowded with extreme claims, hidden ingredients, and synthetic shortcuts, Arogya Path was established to forge a higher standard of transparency.
              </p>
              <p>
                "Arogya" represents holistic health, and "Path" signifies a disciplined journey. By pairing classical botanicals—such as Ashwagandha, Purified Shilajit, Gokhuru, and Saffron—with strict FSSAI License compliance and ISO-certified manufacturing, we deliver formulations grounded in factual clarity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#173C2B] flex-wrap"
            >
              <span className="flex items-center gap-1.5 bg-[#F7F4ED] px-3 py-1.5 rounded-lg border border-[#EBE7DF]">
                <ShieldCheck size={14} className="text-emerald-700" /> FSSAI Lic. #12118441000654
              </span>
              <span className="flex items-center gap-1.5 bg-[#F7F4ED] px-3 py-1.5 rounded-lg border border-[#EBE7DF]">
                <Sparkles size={14} className="text-[#C7A33A]" /> 10 Classical Botanicals
              </span>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
