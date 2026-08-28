import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Menu,
  ShieldCheck,
  ShieldAlert,
  User,
  Package,
  MapPin,
  Heart,
  Lock,
  LogOut,
  ChevronRight,
  ArrowRight,
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
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#171717] hover:text-[#6A1423] transition-colors focus:outline-none flex items-center gap-1.5 font-bold text-xs"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 text-[#171717]" />
              <span className="hidden sm:inline text-[#171717]">Menu</span>
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

            {/* Account Popover Menu */}
            <AccountPopover />

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

          {/* Section 2: Account Experience */}
          <div className="space-y-2 pt-4 border-t border-[#EBE7DF]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A1423] block">
              CUSTOMER ACCOUNT
            </span>

            {isAuthenticated ? (
              <div className="space-y-1">
                <div className="p-3 bg-[#F7F4ED] rounded-xl border border-[#EBE7DF] mb-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#171717] font-serif block">
                      Hello, {user?.fullName?.split(' ')[0] || 'Customer'}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">{user?.email}</span>
                  </div>
                </div>

                <Link
                  to="/account"
                  onClick={handleMobileNavClick}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#171717] hover:bg-[#F7F4ED]"
                >
                  <span className="flex items-center gap-2"><User size={15} /> My Account</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  to="/account/orders"
                  onClick={handleMobileNavClick}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#171717] hover:bg-[#F7F4ED]"
                >
                  <span className="flex items-center gap-2"><Package size={15} /> My Orders</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  to="/account/addresses"
                  onClick={handleMobileNavClick}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#171717] hover:bg-[#F7F4ED]"
                >
                  <span className="flex items-center gap-2"><MapPin size={15} /> Saved Addresses</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  to="/account/wishlist"
                  onClick={handleMobileNavClick}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#171717] hover:bg-[#F7F4ED]"
                >
                  <span className="flex items-center gap-2"><Heart size={15} /> My Wishlist</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  to="/cart"
                  onClick={handleMobileNavClick}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#171717] hover:bg-[#F7F4ED]"
                >
                  <span className="flex items-center gap-2"><ShoppingBag size={15} /> Shopping Cart</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  to="/account/security"
                  onClick={handleMobileNavClick}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#171717] hover:bg-[#F7F4ED]"
                >
                  <span className="flex items-center gap-2"><Lock size={15} /> Profile & Security</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 mt-2 px-3 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <Link
                  to="/login"
                  onClick={handleMobileNavClick}
                  className="flex items-center justify-between bg-[#6A1423] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm"
                >
                  <span>Sign In</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  to="/register"
                  onClick={handleMobileNavClick}
                  className="flex items-center justify-between bg-[#F7F4ED] border border-[#EBE7DF] text-[#171717] px-4 py-2.5 rounded-xl text-xs font-bold"
                >
                  <span>Create Account / Register</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            )}
          </div>

          {/* Section 3: Admin Access (Only if authenticated user is real admin/superadmin) */}
          {isAdmin && (
            <div className="space-y-2 pt-4 border-t border-[#EBE7DF]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A1423] block">
                ADMINISTRATION
              </span>
              <Link
                to="/admin"
                onClick={handleMobileNavClick}
                className="flex items-center justify-between bg-[#6A1423]/10 border border-[#6A1423] text-[#6A1423] px-3.5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#6A1423] hover:text-white"
              >
                <span className="flex items-center gap-2"><ShieldAlert size={16} /> Admin Panel</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          )}

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
