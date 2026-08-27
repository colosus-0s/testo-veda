import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, CheckCircle2, Lock, Award } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export const BrandStandardsSection: React.FC = () => {
  const standards = [
    {
      icon: ShieldCheck,
      title: 'FSSAI License Compliance',
      description: 'Marketed under active FSSAI License No. 12118441000654 in compliance with Indian dietary supplement labeling regulations.',
    },
    {
      icon: Award,
      title: 'Certified Manufacturing Facilities',
      description: 'Produced in ISO 9001:2015 & GMP certified facilities as declared on official product packaging.',
    },
    {
      icon: FileText,
      title: 'Complete Supplement Transparency',
      description: 'Full label disclosure of all botanical extracts with clear dosage instructions and quantitative declarations.',
    },
    {
      icon: Lock,
      title: '100% Vegetarian Capsule Shells',
      description: 'Formulated exclusively in HPMC vegetarian capsule shells (E 464) carrying the official green vegetarian mark.',
    },
  ];

  return (
    <Section id="brand-standards" className="bg-[#0f0f11] py-20 border-t border-white/10 relative overflow-hidden text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8b1528]/15 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] bg-[#8b1528]/30 px-3.5 py-1.5 rounded-full inline-block mb-4 border border-[#8b1528]/60">
            Quality & Compliance
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-serif mb-4">
            Brand Standards & Label Transparency
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            We believe wellness is built on factual clarity. Explore our foundational commitments to formulation accuracy and regulatory compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {standards.map((standard, index) => {
            const Icon = standard.icon;
            return (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/15 hover:border-[#d4af37]/50 transition-colors flex gap-6"
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-[#8b1528]/30 border border-[#8b1528]/60 flex items-center justify-center text-[#d4af37]">
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="text-xl text-white font-bold font-serif mb-2">
                    {standard.title}
                  </h3>
                  <p className="text-slate-200 text-sm leading-relaxed font-normal">
                    {standard.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Responsible Notice Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 max-w-3xl mx-auto p-6 rounded-xl bg-white/5 border border-white/15 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-[#d4af37] font-semibold text-sm mb-2">
            <CheckCircle2 size={18} />
            <span>Official Packaging & Regulatory Declaration</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Arogya Path dietary supplements are formulated for daily dietary support. Manufactured by Streamline Pharma Private Limited (Jagraon) and marketed by Arogyapath Marketing.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
};
