import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'left' | 'right';
  theme?: 'light' | 'dark';
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  position = 'right',
  theme = 'light',
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const posClass = position === 'right' ? 'right-0' : 'left-0';
  const flexPos = position === 'right' ? 'justify-end' : 'justify-start';

  const isLight = theme === 'light';
  const bgClass = isLight
    ? 'bg-[#FCFBF8] text-[#171717] border-[#EBE7DF]'
    : 'bg-[#173C2B] text-white border-[#2E6B4A]/50';

  const borderPos = position === 'right' ? 'border-l' : 'border-r';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dim Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sliding Container */}
      <div className={`fixed inset-y-0 ${posClass} max-w-full flex ${flexPos}`}>
        <div
          className={`w-screen max-w-md ${bgClass} ${borderPos} shadow-2xl flex flex-col transition-transform duration-300 ease-in-out`}
        >
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#EBE7DF] flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold tracking-tight text-[#171717]">
              {title}
            </h3>
            <IconButton
              icon={<X className="w-5 h-5 text-[#171717] hover:text-[#6A1423]" />}
              ariaLabel="Close menu"
              onClick={onClose}
            />
          </div>

          {/* Drawer Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-left">{children}</div>
        </div>
      </div>
    </div>
  );
};
