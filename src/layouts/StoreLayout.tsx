import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AnnouncementBar } from '@/components/navigation/AnnouncementBar';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { Drawer } from '@/components/ui/Drawer';
import { ProductPrice } from '@/components/commerce/ProductPrice';
import { Button } from '@/components/ui/Button';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider, useCart } from '@/context/CartContext';
import { OrderProvider } from '@/context/OrderContext';

const StoreLayoutContent: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { items, cartOpen, openCart, closeCart, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4ED] text-[#171717] opacity-100">
      <AnnouncementBar />
      <Header
        cartItemCount={itemCount}
        onOpenCart={openCart}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Cart Drawer */}
      <Drawer
        isOpen={cartOpen}
        onClose={closeCart}
        title={`Shopping Cart (${itemCount})`}
        position="right"
      >
        {items.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-[#6A1423] mx-auto" />
            <p className="text-slate-600 text-xs font-semibold">Your cart is currently empty.</p>
            <Button variant="primary" size="sm" onClick={closeCart} className="font-bold">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full justify-between space-y-6 text-left">
            <div className="divide-y divide-[#EBE7DF] space-y-4">
              {items.map((item) => (
                <div key={item.id} className="pt-4 flex gap-4 items-center justify-between">
                  <img
                    src={item.product.images.primary}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain bg-[#F7F4ED] p-2 rounded-xl border border-[#EBE7DF]"
                  />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-[#171717] font-serif line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 block">
                      {item.variant.name}
                    </span>
                    <ProductPrice price={item.variant.price} size="sm" textColor="text-[#6A1423]" className="mt-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded bg-[#F7F4ED] border border-[#EBE7DF] text-[#171717] font-bold flex items-center justify-center text-xs hover:border-[#6A1423]"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-[#171717]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded bg-[#F7F4ED] border border-[#EBE7DF] text-[#171717] font-bold flex items-center justify-center text-xs hover:border-[#6A1423]"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-red-600 ml-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#EBE7DF] space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-[#171717]">
                <span>Subtotal</span>
                <span className="font-serif text-lg text-[#6A1423]">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Free express shipping across India on orders above ₹499.</p>
              <Link to="/checkout" onClick={closeCart}>
                <Button variant="primary" size="lg" className="w-full font-bold shadow-md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Proceed to Checkout
                </Button>
              </Link>
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
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {['TESTO Power+', 'Ashwagandha', 'Shilajit', 'Safed Musli', 'Vitality'].map((term) => (
                <span
                  key={term}
                  onClick={() => setSearchOpen(false)}
                  className="px-3 py-1 bg-[#F7F4ED] border border-[#EBE7DF] rounded-full text-slate-700 hover:text-[#6A1423] hover:border-[#6A1423] cursor-pointer text-xs font-semibold"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-[#EBE7DF] text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>FSSAI Lic. #12118441000654 Compliant Storefront</span>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export const StoreLayout: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <StoreLayoutContent />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
};
