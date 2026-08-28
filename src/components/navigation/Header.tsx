import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, ShieldCheck, ShieldAlert } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Drawer } from '@/components/ui/Drawer';
import { useAuth } from '@/context/AuthContext';

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
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

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

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href === '/testo') return location.pathname === '/testo' || location.pathname.startsWith('/products/');
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#FCFBF8]/95 backdrop-blur-md shadow-md py-3 border-b border-[#EBE7DF]'
            : 'bg-[#F7F4ED]/90 backdrop-blur-sm py-4 border-b border-[#EBE7DF]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#171717] hover:text-[#6A1423] transition-colors focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#6A1423] border border-[#C7A33A]/40 flex items-center justify-center font-serif font-black text-xl text-white shadow-md group-hover:scale-105 transition-transform">
              AP
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl font-extrabold tracking-wider text-[#171717] group-hover:text-[#6A1423] transition-colors">
                {SITE_CONFIG.brandName.toUpperCase()}
              </span>
              <span className="text-[10px] tracking-widest text-[#6A1423] uppercase font-bold">
                {SITE_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-7">
            {SITE_CONFIG.navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm transition-all pb-1 ${
                    active
                      ? 'font-bold text-[#6A1423] border-b-2 border-[#6A1423]'
                      : 'font-semibold text-[#171717] hover:text-[#6A1423] hover:border-b-2 hover:border-[#6A1423]/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-1 bg-[#6A1423]/10 border border-[#6A1423] px-2.5 py-1 rounded-md text-xs font-bold text-[#6A1423] hover:bg-[#6A1423] hover:text-white transition-all"
              >
                <ShieldAlert size={14} /> Admin
              </Link>
            )}

            <button
              onClick={onOpenSearch}
              className="p-2 text-[#171717] hover:text-[#6A1423] transition-colors focus:outline-none"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="p-2 text-[#171717] hover:text-[#6A1423] transition-colors"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#171717] hover:text-[#6A1423] transition-colors focus:outline-none"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6A1423] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
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
        <div className="flex flex-col space-y-6 pt-2 text-[#171717] text-left">
          <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Lic. #{SITE_CONFIG.fssaiLicense}
            </span>
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-[#6A1423] underline"
              >
                Admin Panel
              </Link>
            )}
          </div>

          <nav className="flex flex-col space-y-4">
            {SITE_CONFIG.navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-serif transition-colors py-1 ${
                    active ? 'font-black text-[#6A1423] underline' : 'font-bold text-[#171717] hover:text-[#6A1423]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              to={isAuthenticated ? '/account' : '/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-serif font-bold text-[#6A1423] pt-2 border-t border-slate-200"
            >
              {isAuthenticated ? 'My Account' : 'Sign In / Register'}
            </Link>
          </nav>

          <div className="pt-6 border-t border-slate-200 space-y-3 text-xs text-slate-600">
            <p className="font-bold text-[#171717]">Customer Support</p>
            <p>Email: {SITE_CONFIG.supportEmail}</p>
            <p>Phone: {SITE_CONFIG.supportPhone}</p>
          </div>
        </div>
      </Drawer>
    </>
  );
};
