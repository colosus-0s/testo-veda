import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { IconButton } from '@/components/ui/IconButton';
import { Drawer } from '@/components/ui/Drawer';

export interface HeaderProps {
  cartItemCount?: number;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount = 0,
  onOpenCart,
  onOpenSearch,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'glass-panel bg-[#0f0f11]/90 shadow-2xl py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <IconButton
              icon={<Menu className="w-6 h-6" />}
              ariaLabel="Open navigation menu"
              onClick={() => setMobileMenuOpen(true)}
            />
          </div>

          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#8b1528] border border-[#d4af37]/40 flex items-center justify-center font-serif-display font-black text-xl text-white shadow-lg shadow-[#8b1528]/30 group-hover:scale-105 transition-transform">
              AP
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-xl font-extrabold tracking-wider text-white group-hover:text-[#d4af37] transition-colors">
                {SITE_CONFIG.brandName.toUpperCase()}
              </span>
              <span className="text-[10px] tracking-widest text-[#d4af37] uppercase font-medium">
                {SITE_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-8">
            {SITE_CONFIG.navigation.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-neutral-300 hover:text-white hover:border-b-2 hover:border-[#8b1528] pb-1 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <IconButton
              icon={<Search className="w-5 h-5" />}
              ariaLabel="Search products"
              onClick={onOpenSearch}
            />

            <Link to="/account">
              <IconButton
                icon={<User className="w-5 h-5" />}
                ariaLabel="Customer account"
              />
            </Link>

            <button
              onClick={onOpenCart}
              className="relative p-2 text-neutral-300 hover:text-white transition-colors focus:outline-none"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8b1528] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0f0f11]">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <Drawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Navigation"
        position="left"
      >
        <div className="flex flex-col space-y-6 pt-2">
          <div className="pb-4 border-b border-neutral-800 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs text-neutral-300">
              FSSAI Lic. #{SITE_CONFIG.fssaiLicense}
            </span>
          </div>

          <nav className="flex flex-col space-y-4">
            {SITE_CONFIG.navigation.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-lg font-serif-display font-medium text-neutral-200 hover:text-[#d4af37] transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-neutral-800 space-y-3 text-xs text-neutral-400">
            <p className="font-semibold text-white">Customer Support</p>
            <p>Email: {SITE_CONFIG.supportEmail}</p>
            <p>Phone: {SITE_CONFIG.supportPhone}</p>
          </div>
        </div>
      </Drawer>
    </>
  );
};
