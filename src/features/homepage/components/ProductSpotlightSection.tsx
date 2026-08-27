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
      icon: <Sparkles className="w-6 h-6 text-[#d4af37]" />,
      title: '100mg Ashwagandha Root',
      desc: 'Adaptogenic root extract helping the body manage stress and daily fatigue.',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#d4af37]" />,
      title: '100mg Tribulus / Gokhuru',
      desc: 'Rich in natural steroidal saponins traditional used for physical endurance.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#d4af37]" />,
      title: '170mg Purified Shilajit & Blend',
      desc: 'Fulvic mineral complex combined with Kaunch Beej, Talmakhana & Ginger.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#d4af37]" />,
      title: 'FSSAI License & ISO Certified',
      desc: `Lic No. ${product.regulatory.fssaiLicense}. ISO 9001:2015 & GMP audit compliant.`,
    },
  ];

  return (
    <Section padding="xl" dark className="bg-[#17171a] border-t border-neutral-800/80">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-2">
            Product Formulation Pillars
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Standardized Botanicals & Mineral Complex
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light">
            Every dose is encapsulated in 100% vegetarian HPMC shells (E 464) designed for clean breakdown post-meals.
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
              className="glass-card rounded-xl p-6 flex flex-col justify-between space-y-4 border border-white/10 hover:border-[#d4af37]/30 transition-colors"
            >
              <div className="p-3 bg-[#8b1528]/20 rounded-lg w-fit border border-[#8b1528]/40">
                {item.icon}
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
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
