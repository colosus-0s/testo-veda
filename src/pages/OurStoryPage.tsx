import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ASSET_REGISTRY } from '@/config/assets';

export const OurStoryPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen">
      {/* Page Hero Stage with explicit Deep Botanical Green background */}
      <Section padding="md" background="deep-green" className="border-b border-[#2E6B4A]/50">
        <Container>
          <Breadcrumb items={[{ label: 'Our Story' }]} className="mb-6 text-[#E2E8F0]" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#F3E5AB] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/20">
              Arogya Path Brand Philosophy
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              The Path To Mindful Wellness
            </h1>
            <p className="text-[#E2E8F0] text-base sm:text-lg leading-relaxed font-normal">
              Combining classical Indian botanical heritage with modern daily routines and complete quantitative label disclosure.
            </p>
          </div>
        </Container>
      </Section>

      {/* Editorial Story Chapters */}
      <Section padding="xl" background="white" className="border-b border-[#EBE7DF]">
        <Container size="narrow">
          {/* Visual Brand Still Life Hero Stage */}
          <div className="mb-12 rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] border-2 border-[#EBE7DF] shadow-subtle-card">
            <img
              src={ASSET_REGISTRY.brand.brandStoryHeritage}
              alt="Arogya Path Traditional Botanical Heritage and Herbology"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="space-y-16 text-left">
            {/* Chapter 1 */}
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423]">
                Chapter 01 • Botanical Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                Rooted In Classical Wisdom
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                Arogya Path ("The Path to Wellness") was established to provide clean, intentional botanical dietary support for individuals seeking physical stamina, daily vigor, and stress resilience.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                We draw inspiration from classical Indian Rasayana traditions—utilizing botanicals such as Ashwagandha, Purified Shilajit, Gokhuru, and Saffron—without relying on unverified medical claims or artificial promises.
              </p>
            </div>

            {/* Chapter 2 */}
            <div className="bg-[#F7F4ED] p-8 sm:p-12 rounded-3xl border border-[#EBE7DF] space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#173C2B]">
                Chapter 02 • Label Transparency
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#171717]">
                Quantitative Formulations Only
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                We believe you deserve to know exactly what enters your body. Every capsule of TESTO BOOSTER explicitly declares its quantitative ingredient breakdown: 100mg Ashwagandha Root, 100mg Gokhuru Fruit, 50mg Safed Musli, 50mg Sea Buckthorn, 30mg Fenugreek, 15mg Saffron, and 170mg Proprietary Blend.
              </p>
            </div>

            {/* Chapter 3 */}
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423]">
                Chapter 03 • Clean Encapsulation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                100% Vegetarian Standard
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                Our commitment extends to capsule shell composition. All Arogya Path formulations are encapsulated in 100% vegetarian HPMC cellulose shells (E 464) carrying the green vegetarian emblem, ensuring accessible consumption for all dietary preferences.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
