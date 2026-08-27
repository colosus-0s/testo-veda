import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { ShieldCheck, Flame, Zap, Award } from 'lucide-react';

export const ProductSpotlightSection: React.FC = () => {
  const product = INITIAL_PRODUCTS[0];

  const highlights = [
    {
      icon: <Flame className="w-6 h-6 text-[#8b1528]" />,
      title: '100mg Standardized Ashwagandha',
      desc: 'Adaptogenic root extract helping body manage stress and physical fatigue.',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#d4af37]" />,
      title: '100mg Tribulus / Gokhuru',
      desc: 'Rich in steroidal saponins supporting stamina and vigor.',
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-400" />,
      title: '170mg Purified Shilajit & Blend',
      desc: 'Fulvic mineral exudate combined with Kaunch Beej, Talmakhana & Ginger.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
      title: 'FSSAI License & GMP Certified',
      desc: `Lic No. ${product.regulatory.fssaiLicense}. ISO 9001:2015 audit compliant.`,
    },
  ];

  return (
    <Section padding="xl" dark className="border-t border-neutral-800/80">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-2">
            Product Engineering
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Designed for Maximum Synergy & Absorbability
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light">
            Every dose is encapsulated in vegetarian HPMC shells (E 464) designed for smooth breakdown and gentle digestion post-meals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div key={idx} className="glass-card rounded-xl p-6 flex flex-col justify-between space-y-4">
              <div className="p-3 bg-neutral-900/90 rounded-lg w-fit border border-neutral-800">
                {item.icon}
              </div>
              <div>
                <h3 className="font-serif-display text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
