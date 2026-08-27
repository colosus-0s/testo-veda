import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { ShieldCheck, Sparkles, Zap, Award } from 'lucide-react';

export const ProductSpotlightSection: React.FC = () => {
  const product = INITIAL_PRODUCTS[0];

  const highlights = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#6A1423]" />,
      title: '100mg Ashwagandha Root',
      desc: 'Adaptogenic root extract helping the body manage stress and daily fatigue.',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#6A1423]" />,
      title: '100mg Tribulus / Gokhuru',
      desc: 'Rich in natural steroidal saponins traditionally used for physical endurance.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#6A1423]" />,
      title: '170mg Purified Shilajit & Blend',
      desc: 'Fulvic mineral complex combined with Kaunch Beej, Talmakhana & Ginger.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#6A1423]" />,
      title: 'FSSAI License & ISO Certified',
      desc: `Lic No. ${product.regulatory.fssaiLicense}. ISO 9001:2015 & GMP compliant.`,
    },
  ];

  return (
    <Section padding="xl" className="bg-[#EBE7DF] border-b border-[#DCD6C8] text-[#171717]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] bg-[#6A1423]/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-[#6A1423]/20">
            Product Formulation Pillars
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] mb-4">
            Botanical Formula & Mineral Complex
          </h2>
          <p className="text-slate-700 text-base font-normal">
            Every dose is encapsulated in 100% vegetarian HPMC shells (E 464) designed for clean consumption post-meals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FCFBF8] rounded-2xl p-6 flex flex-col justify-between space-y-4 border border-[#DCD6C8] shadow-subtle-card hover:shadow-elevated-card hover:border-[#6A1423]/40 transition-all duration-300"
            >
              <div className="p-3 bg-red-50 rounded-xl w-fit border border-red-100">
                {item.icon}
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#171717] mb-2">
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
