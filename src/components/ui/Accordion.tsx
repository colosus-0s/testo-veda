import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
  dark?: boolean;
  variant?: 'classic' | 'cards';
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
  dark = false,
  variant = 'classic',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  if (variant === 'cards') {
    return (
      <div className={`space-y-3 ${className}`}>
        {items.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-[#FCFBF8] border-[#173C2B] shadow-sm'
                  : 'bg-[#FCFBF8] border-[#EBE7DF] hover:border-[#173C2B]/50'
              }`}
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between text-left p-4 gap-3 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-1.5 h-4 rounded-full transition-colors ${
                    isOpen ? 'bg-[#173C2B]' : 'bg-[#C7A33A]'
                  }`} />
                  <span className="font-serif text-sm sm:text-base font-bold text-[#171717]">
                    {item.title}
                  </span>
                </div>
                <div
                  className={`p-1.5 rounded-full shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#173C2B] text-white rotate-180' : 'bg-[#F7F4ED] text-slate-700'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-[#EBE7DF]/60 animate-fade-in">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`divide-y ${dark ? 'divide-neutral-800' : 'divide-slate-200'} ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-4 transition-colors">
            <button
              onClick={() => toggle(item.id)}
              className={`w-full flex items-center justify-between text-left font-serif text-base sm:text-lg font-bold ${
                dark
                  ? 'text-white hover:text-[#d4af37]'
                  : 'text-slate-900 hover:text-[#8b1528]'
              } focus:outline-none transition-colors py-2 gap-4`}
              aria-expanded={isOpen}
            >
              <span className="leading-snug">{item.title}</span>
              <div className={`p-1.5 rounded-full shrink-0 transition-transform duration-300 ${
                dark
                  ? (isOpen ? 'bg-[#8b1528] text-white rotate-180' : 'bg-white/10 text-neutral-400')
                  : (isOpen ? 'bg-[#8b1528] text-white rotate-180' : 'bg-slate-100 text-slate-600')
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            {isOpen && (
              <div className={`mt-3 text-sm leading-relaxed pr-2 sm:pr-6 ${
                dark ? 'text-neutral-300' : 'text-slate-700'
              }`}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
