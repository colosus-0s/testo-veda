import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, CheckCircle2, Lock, Award } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';

export const BrandStandardsSection: React.FC = () => {
  const standards = [
    {
      icon: ShieldCheck,
      title: 'FSSAI License Compliance',
      description: 'Manufactured and marketed under active FSSAI License No. 12118441000654 in compliance with Indian dietary supplement regulations.',
    },
    {
      icon: Award,
      title: 'Certified Manufacturing Facilities',
      description: 'Produced in ISO 9001:2015 & GMP (Good Manufacturing Practice) certified facilities following strict quality control protocols.',
    },
    {
      icon: FileText,
      title: 'Complete Supplement Transparency',
      description: 'Full label disclosure of all 10 active botanical extracts with clear dosage instructions and zero undisclosed synthetic hormones.',
    },
    {
      icon: Lock,
      title: '100% Vegetarian Capsule Shells',
      description: 'Formulated exclusively in HPMC vegetarian capsule shells (E 464) using approved food colors, free from animal gelatin.',
    },
  ];

  return (
    <Section id="brand-standards" className="bg-[#0f0f11] py-20 border-t border-white/5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8b1528]/10 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="sm" className="mb-4">
            Quality & Integrity
          </Badge>
          <Heading level={2} className="text-3xl md:text-4xl text-white font-serif mb-4">
            Brand Standards & Label Transparency
          </Heading>
          <Text className="text-slate-400 text-lg">
            We believe wellness is built on factual clarity. Explore our foundational commitments to formulation accuracy and regulatory compliance.
          </Text>
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
                className="glass-card p-8 rounded-2xl border border-white/10 hover:border-[#d4af37]/40 transition-colors flex gap-6"
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-[#8b1528]/20 border border-[#8b1528]/40 flex items-center justify-center text-[#d4af37]">
                  <Icon size={26} />
                </div>
                <div>
                  <Heading level={3} className="text-xl text-white font-semibold mb-2">
                    {standard.title}
                  </Heading>
                  <Text className="text-slate-300 text-sm leading-relaxed">
                    {standard.description}
                  </Text>
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
          className="mt-12 max-w-3xl mx-auto p-6 rounded-xl bg-white/5 border border-white/10 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-[#d4af37] font-medium text-sm mb-2">
            <CheckCircle2 size={18} />
            <span>Official Regulatory Notice</span>
          </div>
          <Text className="text-xs text-slate-400 leading-relaxed">
            Arogya Path dietary supplements are formulated for daily dietary support. Products are manufactured by Streamline Pharma Private Limited and marketed by Arogyapath Marketing.
          </Text>
        </motion.div>
      </Container>
    </Section>
  );
};
