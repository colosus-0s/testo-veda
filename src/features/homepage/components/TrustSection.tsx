import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Leaf, FileText, CheckCircle2, Factory } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SITE_CONFIG } from '@/config/site';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#6A1423]" />,
      title: 'FSSAI License Compliance',
      desc: `FSSAI License No. ${SITE_CONFIG.fssaiLicense} for dietary supplement marketing.`,
    },
    {
      icon: <Award className="w-7 h-7 text-[#6A1423]" />,
      title: 'ISO 9001:2015 & GMP Certified',
      desc: 'Formulated in ISO 9001:2015 and GMP certified facilities as declared on packaging.',
    },
    {
      icon: <Leaf className="w-7 h-7 text-[#6A1423]" />,
      title: '100% Vegetarian Capsules',
      desc: 'Encapsulated in vegetarian HPMC cellulose shells carrying the official green vegetarian symbol.',
    },
    {
      icon: <Factory className="w-7 h-7 text-[#6A1423]" />,
      title: 'Verified Manufacturing',
      desc: 'Manufactured by STREAMLINE PHARMA PVT. LTD., KOTHE AATH CHAK-142026.',
    },
    {
      icon: <FileText className="w-7 h-7 text-[#6A1423]" />,
      title: 'Marketed By',
      desc: 'Marketed by AROGYA PATH MARKETING, Ashok Nagar, Lohardaga - 835302, M: 9288515228.',
    },
    {
      icon: <CheckCircle2 className="w-7 h-7 text-[#6A1423]" />,
      title: 'Full Quantitative Disclosure',
      desc: '515 mg total active botanical extracts per capsule: 6 individually quantified herbs plus 170 mg Botanical Extract Blend.',
    },
  ];

  return (
    <Section id="quality" padding="xl" className="bg-[#F7F4ED] border-b border-[#EBE7DF] text-[#171717] opacity-100">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2"
          >
            Quality & Compliance
          </motion.span>
          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] mb-3"
          >
            Factual Regulatory & Manufacturing Details
          </motion.h2>
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
          >
            We operate with complete regulatory clarity so you can verify our compliance credentials and manufacturing details directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#FCFBF8] rounded-2xl p-6 flex items-start gap-4 border border-[#EBE7DF] shadow-subtle-card hover:shadow-elevated-card hover:border-[#6A1423]/40 transition-all duration-300 text-left"
            >
              <div className="shrink-0 p-3 bg-red-50 rounded-xl border border-red-100">
                {item.icon}
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#171717] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
