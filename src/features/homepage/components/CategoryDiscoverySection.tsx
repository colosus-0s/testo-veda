import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Activity, ShieldCheck, HeartPulse } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ASSET_REGISTRY } from '@/config/assets';

export const CategoryDiscoverySection: React.FC = () => {
  const categories = [
    {
      id: 'cat-mens-wellness',
      title: "Men's Wellness & Vitality",
      description: 'Foundational daily botanical support for endurance, stamina, and resilience.',
      image: ASSET_REGISTRY.ingredients.ashwagandha,
      icon: Activity,
      link: '/collections/mens-wellness',
      tag: 'Featured Category',
    },
    {
      id: 'cat-stamina-endurance',
      title: 'Stamina & Endurance',
      description: 'Ashwagandha, Gokhuru, and Shilajit extracts engineered for physical performance.',
      image: ASSET_REGISTRY.ingredients.gokhuru,
      icon: HeartPulse,
      link: '/collections/vitality',
      tag: 'Core Formulation',
    },
    {
      id: 'cat-botanical-extracts',
      title: 'Botanical Extract Science',
      description: 'Full quantitative disclosure of Saffron, Sea Buckthorn, Fenugreek & Safed Musli.',
      image: ASSET_REGISTRY.ingredients.saffron,
      icon: Sparkles,
      link: '#formula',
      tag: '10 Botanicals',
    },
    {
      id: 'cat-regulatory-compliance',
      title: 'Regulatory & Quality Standards',
      description: 'FSSAI License No. 12118441000654, ISO 9001:2015 & 100% Vegetarian Capsules.',
      image: ASSET_REGISTRY.products.testoBooster.front,
      icon: ShieldCheck,
      link: '#quality',
      tag: 'Verified Compliance',
    },
  ];

  return (
    <Section padding="xl" className="bg-[#F7F4ED] border-b border-[#EBE7DF] text-[#171717] opacity-100">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2">
              Storefront Discovery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Explore Formulations By Wellness Need
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#6A1423] hover:text-[#3D0B15] transition-colors group"
            >
              <span>Browse All Categories</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id}>
                <Link
                  to={cat.link}
                  className="group block bg-[#FCFBF8] rounded-2xl overflow-hidden border border-[#EBE7DF] shadow-subtle-card hover:shadow-elevated-card hover:border-[#6A1423]/40 transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-[#EBE7DF]/50 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#6A1423] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {cat.tag}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[#6A1423] mb-2">
                        <Icon size={18} />
                        <h3 className="font-serif text-lg font-bold text-[#171717] group-hover:text-[#6A1423] transition-colors">
                          {cat.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#EBE7DF] flex items-center justify-between text-xs font-bold text-[#6A1423]">
                      <span>Explore Needs</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
