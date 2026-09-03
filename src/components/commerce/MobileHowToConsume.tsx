import React from 'react';
import { Pill, Droplets, ShieldAlert } from 'lucide-react';

export const MobileHowToConsume: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'One Capsule Twice A Day',
      subtitle: 'Take one capsule twice a day after a meal or as advised by your Healthcare Professional.',
      icon: <Pill className="w-5 h-5 text-[#6A1423]" />,
    },
    {
      num: '2',
      title: 'Lukewarm Water or Milk',
      subtitle: 'Swallow whole with lukewarm water or milk. Easy to digest and gentle on the stomach.',
      icon: <Droplets className="w-5 h-5 text-[#173C2B]" />,
    },
    {
      num: '3',
      title: 'Do Not Chew or Crush',
      subtitle: 'Swallow the vegetarian capsule whole. Do not open, chew, or crush before consumption.',
      icon: <ShieldAlert className="w-5 h-5 text-[#C7A33A]" />,
    },
  ];

  return (
    <section aria-label="How To Consume Directions" className="py-6 sm:py-8 bg-[#F7F4ED] border-y border-[#EBE7DF] overflow-hidden select-none">
      <div className="px-4 text-center mb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A1423] block mb-1">
          Daily Routine
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#171717]">
          How To Consume
        </h3>
        <p className="text-xs text-slate-700 mt-1">
          Simple daily steps for consistent wellness results
        </p>
      </div>

      <div className="px-4 space-y-3 max-w-lg mx-auto">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FCFBF8] border border-[#EBE7DF] shadow-subtle-card relative overflow-hidden"
          >
            {/* Number Pill */}
            <div className="w-9 h-9 rounded-xl bg-[#6A1423] text-white font-serif font-black text-base flex items-center justify-center shrink-0 shadow-sm">
              {step.num}
            </div>

            <div className="flex-1 text-left">
              <h4 className="font-serif text-sm font-bold text-[#171717] mb-1">
                {step.title}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {step.subtitle}
              </p>
            </div>

            <div className="shrink-0 p-1.5 rounded-lg bg-[#F7F4ED] border border-[#EBE7DF]">
              {step.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
