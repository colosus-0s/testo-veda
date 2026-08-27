import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Leaf, FileText, CheckCircle2, Factory } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SITE_CONFIG } from '@/config/site';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#8b1528]" />,
      title: 'FSSAI License Compliance',
      desc: `FSSAI License No. ${SITE_CONFIG.fssaiLicense} for dietary supplement marketing.`,
    },
    {
      icon: <Award className="w-7 h-7 text-[#8b1528]" />,
      title: 'ISO 9001:2015 & GMP Certified',
      desc: 'Formulated in ISO 9001:2015 and GMP certified facilities as declared on packaging.',
    },
    {
      icon: <Leaf className="w-7 h-7 text-[#8b1528]" />,
      title: '100% Vegetarian Capsules',
      desc: 'Encapsulated in vegetarian HPMC cellulose shells (E 464) with approved food colors.',
    },
    {
      icon: <Factory className="w-7 h-7 text-[#8b1528]" />,
      title: 'Verified Manufacturing',
      desc: 'Manufactured by Streamline Pharma Private Limited (Jagraon) and marketed by Arogyapath Marketing.',
    },
    {
      icon: <FileText className="w-7 h-7 text-[#8b1528]" />,
      title: 'Full Label Disclosure',
      desc: 'Transparent declaration of all active botanical extracts and proprietary blend ingredients.',
    },
    {
      icon: <CheckCircle2 className="w-7 h-7 text-[#8b1528]" />,
      title: 'Botanical Dietary Formulation',
      desc: 'Formulated as a dietary botanical supplement for daily wellness support.',
    },
  ];

  return (
    <Section id="quality" padding="xl" className="bg-[#f5f5f7] border-y border-slate-200 text-[#111115]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase font-bold tracking-widest text-[#8b1528] block mb-2"
          >
            Quality & Compliance
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#111115] mb-4"
          >
            Factual Regulatory & Manufacturing Details
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
          >
            We operate with complete regulatory clarity so you can verify our compliance credentials and manufacturing details.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-xl p-6 flex items-start gap-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="shrink-0 p-3 bg-red-50 rounded-lg border border-red-100">
                {item.icon}
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
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
