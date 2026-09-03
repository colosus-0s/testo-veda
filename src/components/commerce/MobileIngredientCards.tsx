import React from 'react';
import { Sparkles, Leaf } from 'lucide-react';

interface BotanicalItem {
  name: string;
  latin: string;
  part: string;
  amount: string;
  description: string;
  image: string;
  category: 'Individually Quantified' | '170mg Botanical Blend';
}

const BOTANICAL_CARDS: BotanicalItem[] = [
  {
    name: 'Ashwagandha Root',
    latin: 'Withania somnifera',
    part: 'Root Extract',
    amount: '100 mg',
    description: 'Classical adaptogen traditionally recognized for supporting stress resilience, daily vigor, and stamina.',
    image: '/assets/ingredients/ashwagandha_root.jpg',
    category: 'Individually Quantified',
  },
  {
    name: 'Gokhuru (Tribulus)',
    latin: 'Tribulus terrestris',
    part: 'Fruit Extract',
    amount: '100 mg',
    description: 'Bioactive fruit extract prized in classic Ayurveda for physical endurance and male wellness.',
    image: '/assets/ingredients/gokhuru_fruit.jpg',
    category: 'Individually Quantified',
  },
  {
    name: 'Safed Musli',
    latin: 'Chlorophytum borivilianum',
    part: 'Tuberous Root',
    amount: '50 mg',
    description: 'Traditional Rasayana root supporting muscle nourishment and natural physical strength.',
    image: '/assets/ingredients/safed_musli.jpg',
    category: 'Individually Quantified',
  },
  {
    name: 'Sea Buckthorn',
    latin: 'Hippophae rhamnoides',
    part: 'Berry Extract',
    amount: '50 mg',
    description: 'Himalayan berry rich in natural bioflavonoids and antioxidant fatty acids.',
    image: '/assets/ingredients/sea_buckthorn.jpg',
    category: 'Individually Quantified',
  },
  {
    name: 'Fenugreek Seed',
    latin: 'Trigonella foenum-graecum',
    part: 'Seed Extract',
    amount: '30 mg',
    description: 'Saponin-standardized seed extract aiding metabolic vitality and cellular energy.',
    image: '/assets/ingredients/fenugreek_seeds.jpg',
    category: 'Individually Quantified',
  },
  {
    name: 'Saffron (Kesar)',
    latin: 'Crocus sativus',
    part: 'Stigma Extract',
    amount: '15 mg',
    description: 'Precious crocin-rich stigma traditionally valued for mood balance and overall wellbeing.',
    image: '/assets/ingredients/saffron_flower.jpg',
    category: 'Individually Quantified',
  },
  {
    name: 'Purified Shilajit',
    latin: 'Asphaltum punjabianum',
    part: 'Purified Mineral Resin',
    amount: 'In 170mg Blend',
    description: 'Purified Himalayan mineral pitch rich in natural fulvic acid and trace minerals.',
    image: '/assets/ingredients/shilajit_mineral.jpg',
    category: '170mg Botanical Blend',
  },
  {
    name: 'Kaunch Beej',
    latin: 'Mucuna pruriens',
    part: 'Seed Extract',
    amount: 'In 170mg Blend',
    description: 'Bioactive seed extract supporting natural neuro-vitality and positive energy.',
    image: '/assets/ingredients/kaunch_beej.jpg',
    category: '170mg Botanical Blend',
  },
  {
    name: 'Talmakhana',
    latin: 'Hygrophila spinosa',
    part: 'Seed Extract',
    amount: 'In 170mg Blend',
    description: 'Classical botanical extract traditionally utilized for reproductive vitality.',
    image: '/assets/ingredients/talmakhana_seeds.jpg',
    category: '170mg Botanical Blend',
  },
  {
    name: 'Ginger Rhizome',
    latin: 'Zingiber officinale',
    part: 'Rhizome Extract',
    amount: 'In 170mg Blend',
    description: 'Warming bioavailability enhancer aiding digestion and nutrient absorption.',
    image: '/assets/ingredients/ginger_rhizome.jpg',
    category: '170mg Botanical Blend',
  },
];

export const MobileIngredientCards: React.FC = () => {
  return (
    <section aria-label="Key Botanical Ingredients" className="py-6 sm:py-8 overflow-hidden select-none">
      <div className="px-4 mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A1423] block mb-0.5">
            Key Ingredients
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717]">
            10 Classical Botanicals
          </h3>
        </div>
        <span className="text-[11px] font-bold text-[#173C2B] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
          <Leaf size={12} /> Full Disclosure
        </span>
      </div>

      {/* Horizontal Swipe Carousel with Partial Card Peek */}
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 pb-2">
        {BOTANICAL_CARDS.map((item, idx) => (
          <div
            key={idx}
            className="w-[78vw] max-w-[320px] shrink-0 snap-center bg-[#FCFBF8] rounded-2xl p-4 border border-[#EBE7DF] shadow-subtle-card flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#6A1423] block mb-0.5">
                  {item.amount}
                </span>
                <h4 className="font-serif text-base font-bold text-[#171717] leading-snug">
                  {item.name}
                </h4>
                <span className="text-[11px] italic text-slate-700 block mb-2">
                  {item.latin} • {item.part}
                </span>
                <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Botanical Photo Cutout */}
              <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-[#F7F4ED] border border-[#EBE7DF] p-1 shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-[#EBE7DF] flex items-center justify-between text-[10px] font-bold text-slate-700">
              <span className="flex items-center gap-1 text-[#173C2B]">
                <Sparkles size={12} className="text-[#C7A33A]" /> {item.category}
              </span>
              <span>Slide {idx + 1} / {BOTANICAL_CARDS.length}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
