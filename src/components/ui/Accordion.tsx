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
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
  dark = false,
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
