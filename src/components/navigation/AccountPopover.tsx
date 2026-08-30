import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/Badge';
import {
  User,
  ShoppingBag,
  Package,
  MapPin,
  Heart,
  Lock,
  LogOut,
  ChevronRight,
  ArrowRight,
  LayoutDashboard,
} from 'lucide-react';

export const AccountPopover: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, isGuest, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/');
  };

  const getFirstName = () => {
    if (isGuest) return 'Guest';
    if (!user?.fullName) return 'Customer';
    return user.fullName.split(' ')[0];
  };

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[#171717] hover:text-[#6A1423] transition-colors focus:outline-none flex items-center gap-1.5"
        aria-label="Account Options"
        aria-expanded={isOpen}
      >
        <User className="w-5 h-5" />
        {(isAuthenticated || isGuest) && (
          <span className="hidden sm:inline text-xs font-bold text-[#171717] max-w-[90px] truncate">
            {isGuest ? 'Guest' : getFirstName()}
          </span>
        )}
      </button>

      {/* Popover Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-[#FCFBF8] border border-[#EBE7DF] rounded-2xl shadow-xl z-50 overflow-hidden transform transition-all duration-200">
          {isAuthenticated ? (
            /* REGISTERED MEMBER / ADMIN MENU */
            <div className="text-left divide-y divide-[#EBE7DF]">
              {/* Header Greeting */}
              <div className="p-4 bg-[#F7F4ED] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#6A1423] text-white flex items-center justify-center font-serif font-bold text-base shadow-sm">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#171717]">
                      Hello, {getFirstName()}
                    </h4>
                    <span className="text-[11px] text-slate-500 block truncate max-w-[170px]">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <Badge variant="maroon" size="sm">
                  {user?.role === 'admin' || user?.role === 'superadmin' ? 'Admin' : 'Member'}
                </Badge>
              </div>

              {/* Navigation Items */}
              <div className="p-2 space-y-0.5 text-xs">
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl font-bold text-[#6A1423] bg-[#6A1423]/10 hover:bg-[#6A1423] hover:text-white transition-all mb-1 border border-[#6A1423]/20"
                  >
                    <span className="flex items-center gap-2">
                      <LayoutDashboard size={16} /> Admin Panel
                    </span>
                    <ChevronRight size={14} />
                  </Link>
                )}

                <Link
                  to="/account"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-semibold text-[#171717] hover:bg-[#F7F4ED] hover:text-[#6A1423] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <User size={16} className="text-slate-500" /> Account Overview
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  to="/account/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-semibold text-[#171717] hover:bg-[#F7F4ED] hover:text-[#6A1423] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Package size={16} className="text-slate-500" /> My Orders
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  to="/account/addresses"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-semibold text-[#171717] hover:bg-[#F7F4ED] hover:text-[#6A1423] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-500" /> Saved Addresses
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  to="/account/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-semibold text-[#171717] hover:bg-[#F7F4ED] hover:text-[#6A1423] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Heart size={16} className="text-slate-500" /> My Wishlist
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-semibold text-[#171717] hover:bg-[#F7F4ED] hover:text-[#6A1423] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag size={16} className="text-slate-500" /> Shopping Cart
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  to="/account/security"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-semibold text-[#171717] hover:bg-[#F7F4ED] hover:text-[#6A1423] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Lock size={16} className="text-slate-500" /> Login & Security
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>
              </div>

              {/* Sign Out CTA */}
              <div className="p-3 bg-[#F7F4ED]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          ) : isGuest ? (
            /* ANONYMOUS GUEST POPOVER */
            <div className="text-left divide-y divide-[#EBE7DF]">
              {/* Header Greeting */}
              <div className="p-4 bg-amber-50/70 border-b border-amber-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center font-serif font-bold text-base shadow-sm">
                    G
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-amber-950">
                      Welcome Back, Guest
                    </h4>
                    <span className="text-[11px] text-amber-800 block">
                      Remembered on this browser
                    </span>
                  </div>
                </div>
                <Badge variant="green" size="sm">
                  Guest
                </Badge>
              </div>

              {/* Guest Navigation Items */}
              <div className="p-2 space-y-0.5 text-xs">
                <Link
                  to="/account/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-bold text-[#171717] bg-[#F7F4ED] hover:bg-[#6A1423] hover:text-white transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Package size={16} className="text-[#6A1423]" /> My Orders
                  </span>
                  <ChevronRight size={14} />
                </Link>

                <Link
                  to="/orders/track"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-semibold text-[#171717] hover:bg-[#F7F4ED] hover:text-[#6A1423] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <User size={16} className="text-slate-500" /> Track an Order
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-semibold text-[#171717] hover:bg-[#F7F4ED] hover:text-[#6A1423] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag size={16} className="text-slate-500" /> Shopping Cart
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>
              </div>

              {/* Guest Call to Actions */}
              <div className="p-4 bg-[#F7F4ED] space-y-2">
                <p className="text-[11px] text-slate-600 mb-1 font-medium">
                  Create a free account to save your orders permanently across all devices.
                </p>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#6A1423] text-white py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-[#3D0B15] transition-colors"
                >
                  Create Free Account <ArrowRight size={14} />
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center bg-white border border-[#EBE7DF] text-[#171717] py-2 rounded-xl text-xs font-bold hover:border-[#6A1423] transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          ) : (
            /* LOGGED OUT ACCOUNT POPOVER */
            <div className="p-6 text-left space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
                  Arogya Path Account
                </span>
                <h4 className="font-serif text-lg font-bold text-[#171717]">
                  Welcome to Arogya Path
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Sign in to view your orders, account details, and saved addresses.
                </p>
              </div>

              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#6A1423] text-white py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-[#3D0B15] transition-colors"
                >
                  Sign In <ArrowRight size={14} />
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center bg-[#F7F4ED] border border-[#EBE7DF] text-[#171717] py-2.5 rounded-xl text-xs font-bold hover:border-[#6A1423] transition-colors"
                >
                  Create Account / Register
                </Link>
              </div>

              <div className="pt-3 border-t border-[#EBE7DF] flex items-center justify-between text-[11px]">
                <Link
                  to="/forgot-password"
                  onClick={() => setIsOpen(false)}
                  className="font-bold text-[#6A1423] hover:underline"
                >
                  Forgot Password?
                </Link>

                <Link
                  to="/orders/track"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-600 hover:text-[#6A1423] font-semibold"
                >
                  Track Order
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
