import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Menu,
  ShieldCheck,
  ShieldAlert,
  Package,
  LogOut,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Drawer } from '@/components/ui/Drawer';
import { useAuth } from '@/context/AuthContext';
import { AccountPopover } from './AccountPopover';

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
  const { isAdmin, logout } = useAuth();

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

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await logout();
    setMobileMenuOpen(false);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 md:gap-4">
          {/* Mobile Menu Trigger Button (Left) */}
          <div className="flex items-center lg:hidden shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-[#171717] hover:text-[#6A1423] transition-colors focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 text-[#171717]" />
            </button>
          </div>

          {/* Brand Logo & Title (Centered on Mobile, Left-aligned on Desktop) */}
          <div className="flex-1 flex justify-center lg:justify-start lg:flex-initial">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#6A1423] border border-[#C7A33A]/40 flex items-center justify-center font-serif font-black text-base sm:text-xl text-white shadow-md group-hover:scale-105 transition-transform">
                AP
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-base sm:text-xl font-extrabold tracking-wider text-[#171717] group-hover:text-[#6A1423] transition-colors whitespace-nowrap">
                  {SITE_CONFIG.brandName.toUpperCase()}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-[#6A1423] uppercase font-bold hidden xs:inline">
                  {SITE_CONFIG.tagline}
                </span>
              </div>
            </Link>
          </div>

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

          {/* Header Action Icons (Right) */}
          <div className="flex items-center space-x-1 sm:space-x-3 shrink-0">
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
              className="p-1.5 sm:p-2 text-[#171717] hover:text-[#6A1423] transition-colors focus:outline-none"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Popover Menu (Visible on md+) */}
            <div className="hidden sm:block">
              <AccountPopover />
            </div>

            <button
              onClick={onOpenCart}
              className="relative p-1.5 sm:p-2 text-[#171717] hover:text-[#6A1423] transition-colors focus:outline-none"
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

      {/* Mobile Navigation Drawer */}
      <Drawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Arogya Path Menu"
        position="left"
        theme="light"
      >
        <div className="flex flex-col space-y-6 text-[#171717] text-left">
          {/* Section 1: Main Navigation */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A1423] block">
              MAIN NAVIGATION
            </span>
            <nav className="flex flex-col space-y-1">
              {SITE_CONFIG.navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={handleMobileNavClick}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-serif font-bold transition-all ${
                      active
                        ? 'bg-[#6A1423] text-white shadow-sm'
                        : 'text-[#171717] hover:bg-[#F7F4ED] hover:text-[#6A1423]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={14} className={active ? 'text-white' : 'text-slate-400'} />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Section 2: Quick Links & Logistics */}
          <div className="space-y-2 pt-4 border-t border-[#EBE7DF]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A1423] block">
              LOGISTICS & ORDERS
            </span>

            <div className="space-y-1">
              <Link
                to="/orders/track"
                onClick={handleMobileNavClick}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-[#171717] bg-[#F7F4ED] hover:bg-[#6A1423] hover:text-white transition-all"
              >
                <span className="flex items-center gap-2">
                  <Package size={16} className="text-[#6A1423]" /> View / Track Order
                </span>
                <ChevronRight size={14} />
              </Link>

              <Link
                to="/cart"
                onClick={handleMobileNavClick}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#171717] hover:bg-[#F7F4ED]"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag size={16} className="text-slate-500" /> Shopping Cart
                </span>
                <ChevronRight size={14} className="text-slate-400" />
              </Link>

              {isAdmin && (
                <div className="pt-2 border-t border-[#EBE7DF] mt-2">
                  <Link
                    to="/admin"
                    onClick={handleMobileNavClick}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#6A1423] bg-[#6A1423]/10 border border-[#6A1423]/20"
                  >
                    <span className="flex items-center gap-2">
                      <LayoutDashboard size={15} /> Admin Panel
                    </span>
                    <ChevronRight size={14} />
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 mt-2 px-3 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200"
                  >
                    <LogOut size={14} /> Admin Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>



          {/* Footer Information */}
          <div className="pt-6 border-t border-[#EBE7DF] space-y-2 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <ShieldCheck size={16} /> FSSAI Lic. #{SITE_CONFIG.fssaiLicense}
            </span>
            <p className="text-[11px]">Email: {SITE_CONFIG.supportEmail}</p>
            <p className="text-[11px]">Phone: {SITE_CONFIG.supportPhone}</p>
          </div>
        </div>
      </Drawer>
    </>
  );
};
