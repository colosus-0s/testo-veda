import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Store, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/useCart';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { cartSummary, isCartOpen, openCart } = useCart();

  const isHomeActive = location.pathname === '/';
  const isShopActive = location.pathname === '/shop' || location.pathname === '/testo' || location.pathname.startsWith('/products/');
  const isCartActive = isCartOpen || location.pathname === '/cart';

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#FCFBF8]/95 backdrop-blur-md border-t border-[#EBE7DF] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-3 h-14 items-center max-w-md mx-auto px-4">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1.5 transition-colors relative ${
            isHomeActive && !isCartOpen
              ? 'text-[#6A1423] font-bold'
              : 'text-slate-600 hover:text-[#6A1423]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase">Home</span>
          {isHomeActive && !isCartOpen && (
            <span className="absolute bottom-0 w-6 h-0.5 bg-[#6A1423] rounded-full" />
          )}
        </Link>

        {/* Shop */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center py-1.5 transition-colors relative ${
            isShopActive && !isCartOpen
              ? 'text-[#6A1423] font-bold'
              : 'text-slate-600 hover:text-[#6A1423]'
          }`}
        >
          <Store className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase">Shop</span>
          {isShopActive && !isCartOpen && (
            <span className="absolute bottom-0 w-6 h-0.5 bg-[#6A1423] rounded-full" />
          )}
        </Link>

        {/* Cart */}
        <button
          type="button"
          onClick={openCart}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors relative focus:outline-none ${
            isCartActive
              ? 'text-[#6A1423] font-bold'
              : 'text-slate-600 hover:text-[#6A1423]'
          }`}
          aria-label={`Shopping cart with ${cartSummary.itemCount} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartSummary.itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#6A1423] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartSummary.itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wider uppercase">Cart</span>
          {isCartActive && (
            <span className="absolute bottom-0 w-6 h-0.5 bg-[#6A1423] rounded-full" />
          )}
        </button>
      </div>
    </nav>
  );
};
