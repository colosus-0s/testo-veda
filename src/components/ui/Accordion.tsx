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
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
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
    <div className={`divide-y divide-neutral-800/80 border-y border-neutral-800/80 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-4 transition-colors">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left font-serif-display text-lg text-white hover:text-[#d4af37] focus:outline-none focus:text-[#d4af37] transition-colors py-1"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-[#d4af37]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="mt-3 text-sm text-neutral-300 leading-relaxed pr-6 animate-fadeIn">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
