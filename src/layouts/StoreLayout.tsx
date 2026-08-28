import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AnnouncementBar } from '@/components/navigation/AnnouncementBar';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { Drawer } from '@/components/ui/Drawer';
import { useCart } from '@/context/useCart';
import type { CartItem } from '@/types/cart';
import { ProductPrice } from '@/components/commerce/ProductPrice';
import { Button } from '@/components/ui/Button';
import { Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';

export const StoreLayout: React.FC = () => {
  const { cartItems, cartSummary, isCartOpen, openCart, closeCart, updateQuantity, removeFromCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  const progressPercent = Math.min(100, (cartSummary.subtotal / cartSummary.freeShippingThreshold) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4ED] text-[#171717]">
      <AnnouncementBar />
      <Header
        cartItemCount={cartSummary.itemCount}
        onOpenCart={openCart}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Cart Drawer */}
      <Drawer
        isOpen={isCartOpen}
        onClose={closeCart}
        title={`Shopping Cart (${cartSummary.itemCount})`}
        position="right"
      >
        {cartItems.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
            <p className="text-slate-600 text-xs font-semibold">Your cart is currently empty.</p>
            <Button variant="primary" size="sm" onClick={closeCart}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full justify-between space-y-6 text-left">
            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#F7F4ED] p-3.5 rounded-xl border border-[#EBE7DF] space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="flex items-center gap-1 text-[#173C2B]">
                  <Truck size={14} /> Free Shipping
                </span>
                <span className="text-slate-700">
                  {cartSummary.subtotal >= cartSummary.freeShippingThreshold
                    ? 'Unlocked!'
                    : `Add ₹${cartSummary.freeShippingThreshold - cartSummary.subtotal} more`}
                </span>
              </div>
              <div className="w-full bg-[#EBE7DF] h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-[#EBE7DF] overflow-y-auto max-h-[60vh] pr-1 space-y-4">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="pt-4 flex gap-3 items-center justify-between">
                  <img
                    src={item.product.images.primary}
                    alt={item.product.name}
                    className="w-14 h-14 object-contain bg-[#F7F4ED] p-1.5 rounded-lg border border-[#EBE7DF]"
                  />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-[#171717] font-serif line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-slate-600 block">
                      {item.variant.packSize}
                    </span>
                    <ProductPrice price={item.variant.price} size="sm" textColor="text-[#6A1423]" className="mt-0.5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-5 h-5 rounded bg-[#F7F4ED] border border-[#EBE7DF] text-[#171717] font-bold flex items-center justify-center text-xs hover:border-[#6A1423]"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-[#171717] px-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-5 h-5 rounded bg-[#F7F4ED] border border-[#EBE7DF] text-[#171717] font-bold flex items-center justify-center text-xs hover:border-[#6A1423]"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-600 ml-1.5 p-0.5"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer Subtotal & Checkout CTA */}
            <div className="pt-4 border-t border-[#EBE7DF] space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-serif font-extrabold text-base text-[#171717]">
                  ₹{cartSummary.subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Taxes calculated. Free shipping applied at checkout.</p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link to="/cart" onClick={closeCart}>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Cart
                  </Button>
                </Link>
                <Link to="/checkout" onClick={closeCart}>
                  <Button variant="primary" size="sm" className="w-full text-xs" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Quick Search Drawer */}
      <Drawer
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        title="Search Arogya Path"
        position="right"
      >
        <div className="space-y-4 text-left">
          <input
            type="text"
            placeholder="Search products, ingredients (e.g. Ashwagandha, Shilajit)..."
            className="w-full px-4 py-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
            autoFocus
          />
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Popular Formulations & Ingredients
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {['TESTO Power+', 'Ashwagandha', 'Shilajit', 'Safed Musli', 'Vitality & Stamina'].map((term) => (
                <Link
                  key={term}
                  to={`/shop?q=${encodeURIComponent(term)}`}
                  onClick={() => setSearchOpen(false)}
                  className="px-3 py-1 bg-[#F7F4ED] border border-[#EBE7DF] rounded-full text-slate-800 hover:text-[#6A1423] hover:border-[#6A1423] transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
