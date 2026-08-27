import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'left' | 'right';
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  position = 'right',
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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`fixed inset-y-0 ${posClass} max-w-full flex pl-10`}>
        <div className="w-screen max-w-md bg-[#141417] border-l border-neutral-800 text-white shadow-2xl flex flex-col">
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
            <h3 className="font-serif-display text-lg font-bold tracking-tight text-white">
              {title}
            </h3>
            <IconButton
              icon={<X className="w-5 h-5" />}
              ariaLabel="Close drawer"
              onClick={onClose}
            />
          </div>
          <div className="flex-1 overflow-y-auto p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};
