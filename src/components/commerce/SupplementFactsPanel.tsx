import React from 'react';
import { ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export interface SupplementFactsPanelProps {
  className?: string;
  theme?: 'light' | 'emerald';
}

export const SupplementFactsPanel: React.FC<SupplementFactsPanelProps> = ({
  className = '',
  theme = 'light',
}) => {
  const isEmerald = theme === 'emerald';

  return (
    <div
      className={`rounded-2xl border-2 transition-all overflow-hidden ${
        isEmerald
          ? 'bg-[#FCFBF8] text-[#171717] border-[#173C2B] shadow-2xl'
          : 'bg-[#FCFBF8] text-[#171717] border-slate-900 shadow-xl'
      } ${className}`}
    >
      {/* Box Header */}
      <div className="border-b-4 border-slate-900 p-6 sm:p-8 pb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#6A1423]" />
            <h3 className="font-serif text-2xl sm:text-3xl font-black uppercase tracking-wider text-[#171717]">
              Supplement Facts
            </h3>
          </div>
          <span className="text-xs font-bold bg-[#173C2B]/10 text-[#173C2B] px-3 py-1 rounded-full border border-[#173C2B]/20 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#173C2B]" />
            Official Label
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-800 pt-1 border-t border-slate-300">
          <div className="flex justify-between sm:justify-start gap-4">
            <span className="text-slate-600">Serving Size:</span>
            <span className="text-slate-950 font-black">1 Vegetarian Capsule</span>
          </div>
          <div className="flex justify-between sm:justify-end gap-4">
            <span className="text-slate-600">Servings Per Container:</span>
            <span className="text-slate-950 font-black">30</span>
          </div>
        </div>
      </div>

      {/* Table Column Headers */}
      <div className="bg-[#F7F4ED] px-6 sm:px-8 py-2.5 border-b-2 border-slate-900 flex justify-between text-xs font-black text-slate-900">
        <span>Active Processed Extracts</span>
        <div className="flex gap-8">
          <span className="w-20 text-right">Amount</span>
          <span className="w-16 text-right">% DV*</span>
        </div>
      </div>

      {/* 6 Individually Quantified Ingredients */}
      <div className="px-6 sm:px-8 divide-y divide-slate-200 text-sm">
        {[
          { name: 'Ashwagandha Extract', latin: 'Withania somnifera', part: 'Root', amount: '100 mg' },
          { name: 'Gokhuru Extract', latin: 'Tribulus terrestris', part: 'Fruit', amount: '100 mg' },
          { name: 'Safed Musli Extract', latin: 'Chlorophytum borivilianum', part: 'Tuberous Root', amount: '50 mg' },
          { name: 'Sea Buckthorn Extract', latin: 'Hippophae rhamnoides', part: 'Berry', amount: '50 mg' },
          { name: 'Fenugreek Extract', latin: 'Trigonella foenum-graecum', part: 'Seed', amount: '30 mg' },
          { name: 'Saffron Extract', latin: 'Crocus sativus', part: 'Stigma', amount: '15 mg' },
        ].map((item, idx) => (
          <div key={idx} className="py-2.5 flex items-center justify-between gap-2">
            <div className="pr-2">
              <span className="font-bold text-slate-900">{item.name}</span>
              <span className="text-xs text-slate-600 italic ml-1.5 hidden sm:inline">
                ({item.latin} — {item.part})
              </span>
            </div>
            <div className="flex gap-8 shrink-0 font-mono text-xs items-center">
              <span className="w-20 text-right font-black text-slate-950 text-sm">{item.amount}</span>
              <span className="w-16 text-right font-semibold text-slate-500">**</span>
            </div>
          </div>
        ))}
      </div>

      {/* Botanical Extract Blend Section (170 mg Total) */}
      <div className="mx-6 sm:mx-8 my-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-300">
        <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
          <div>
            <span className="font-serif font-black text-slate-950 text-base">
              Botanical Extract Blend
            </span>
            <span className="block text-[11px] text-[#173C2B] font-bold">
              (Proprietary 4-Herb Synergy Blend)
            </span>
          </div>
          <div className="flex gap-8 shrink-0 font-mono text-xs items-center">
            <span className="w-20 text-right font-black text-[#173C2B] text-base">170 mg</span>
            <span className="w-16 text-right font-semibold text-slate-500">**</span>
          </div>
        </div>

        {/* 4 Blend Ingredients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 text-xs text-slate-800">
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Kaunch Beej <em className="text-slate-600">(Mucuna pruriens)</em></span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Purified Shilajit <em className="text-slate-600">(Asphaltum)</em></span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Talmakhana <em className="text-slate-600">(Hygrophila spinosa)</em></span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Ginger Extract <em className="text-slate-600">(Zingiber officinale)</em></span>
          </div>
        </div>
      </div>

      {/* Excipients & Capsule Shell */}
      <div className="px-6 sm:px-8 py-2 text-xs text-slate-700 border-t border-slate-200 flex flex-wrap justify-between gap-2 font-medium">
        <span><strong>Excipients:</strong> q.s.</span>
        <span><strong>Capsule Shell:</strong> 100% Vegetarian HPMC (E 464)</span>
      </div>

      {/* Statutory Disclaimers & Notes (Directly from Physical Label) */}
      <div className="bg-[#F7F4ED] p-6 sm:p-8 pt-4 border-t-4 border-slate-900 text-[11px] text-slate-700 space-y-2 leading-relaxed">
        <p>
          ** % Daily Value (% DV) not established for dietary supplements. % RDA calculated as per ICMR 2020 guidelines wherever applicable.
        </p>
        <p>
          <strong>Advice:</strong> Not to exceed recommended daily usage. Health supplement, not for medicinal use. Not recommended for children, pregnant or lactating women. Keep out of reach of children.
        </p>
        <p>
          <strong>Recommended Usage:</strong> One capsule twice a day or as directed by a Healthcare Professional. Swallow whole with lukewarm milk or water after a meal. Do not open, chew, or crush.
        </p>
        <p className="text-[10px] text-slate-500 italic pt-1">
          This product is not intended to diagnose, treat, cure or prevent any disease. Store in a cool, dry & dark place away from direct sunlight.
        </p>
      </div>
    </div>
  );
};
