import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/Badge';
import {
  User,
  ShoppingBag,
  Package,
  LogOut,
  ChevronRight,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react';

export const AccountPopover: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { user, isAdmin, logout } = useAuth();
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

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[#171717] hover:text-[#6A1423] transition-colors focus:outline-none flex items-center gap-1.5"
        aria-label="Account and Navigation Options"
        aria-expanded={isOpen}
      >
        <User className="w-5 h-5" />
        {isAdmin && (
          <span className="hidden sm:inline text-xs font-bold text-[#6A1423] bg-[#6A1423]/10 px-2 py-0.5 rounded-full border border-[#6A1423]/20">
            Admin
          </span>
        )}
      </button>

      {/* Popover Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-[#FCFBF8] border border-[#EBE7DF] rounded-2xl shadow-xl z-50 overflow-hidden transform transition-all duration-200">
          {isAdmin ? (
            /* ADMIN MENU */
            <div className="text-left divide-y divide-[#EBE7DF]">
              <div className="p-4 bg-[#F7F4ED] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#6A1423] text-white flex items-center justify-center font-serif font-bold text-sm shadow-sm">
                    {user?.fullName?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#171717]">
                      {user?.fullName || 'Administrator'}
                    </h4>
                    <span className="text-[11px] text-slate-500 block truncate max-w-[150px]">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <Badge variant="maroon" size="sm">
                  Admin
                </Badge>
              </div>

              <div className="p-2 space-y-1 text-xs">
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-bold text-[#6A1423] bg-[#6A1423]/10 hover:bg-[#6A1423] hover:text-white transition-all border border-[#6A1423]/20"
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard size={16} /> Admin Panel
                  </span>
                  <ChevronRight size={14} />
                </Link>

                <Link
                  to="/orders/track"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-semibold text-[#171717] hover:bg-[#F7F4ED] hover:text-[#6A1423] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Package size={16} className="text-slate-500" /> Track Order
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>
              </div>

              <div className="p-3 bg-[#F7F4ED]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            /* STOREFRONT CUSTOMER NAVIGATION POPOVER */
            <div className="text-left divide-y divide-[#EBE7DF]">
              <div className="p-4 bg-[#F7F4ED]">
                <h4 className="font-serif text-sm font-bold text-[#171717]">
                  Arogya Path Express
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  No account required to place or view orders.
                </p>
              </div>

              <div className="p-2 space-y-1 text-xs">
                <Link
                  to="/orders/track"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl font-bold text-[#171717] bg-[#F7F4ED] hover:bg-[#6A1423] hover:text-white transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Package size={16} className="text-[#6A1423]" /> View / Track Order
                  </span>
                  <ChevronRight size={14} />
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

              <div className="p-3 bg-[#F7F4ED] text-center">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-[#6A1423]"
                >
                  <ShieldCheck size={13} /> Admin Portal
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
