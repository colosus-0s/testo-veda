import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from '@/components/navigation/AnnouncementBar';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { Drawer } from '@/components/ui/Drawer';
import type { CartItem } from '@/types/cart';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { ProductPrice } from '@/components/commerce/ProductPrice';
import { Button } from '@/components/ui/Button';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StoreLayout: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Sample Cart State Baseline
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-item-1',
      productId: INITIAL_PRODUCTS[0].id,
      variantId: INITIAL_PRODUCTS[0].variants[0].id,
      product: INITIAL_PRODUCTS[0],
      variant: INITIAL_PRODUCTS[0].variants[0],
      quantity: 1,
    },
  ]);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f11] text-neutral-100">
      <AnnouncementBar />
      <Header
        cartItemCount={cartItemCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Cart Drawer */}
      <Drawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        title={`Shopping Cart (${cartItemCount})`}
        position="right"
      >
        {cartItems.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
            <p className="text-neutral-400 text-sm">Your cart is currently empty.</p>
            <Button variant="gold" size="sm" onClick={() => setCartOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full justify-between space-y-6">
            <div className="divide-y divide-neutral-800 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-4 flex gap-4 items-center justify-between">
                  <img
                    src={item.product.images.primary}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain glass-card p-2 rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white font-serif-display line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-xs text-neutral-400 block">
                      {item.variant.name}
                    </span>
                    <ProductPrice price={item.variant.price} size="sm" className="mt-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded bg-neutral-800 text-neutral-300 flex items-center justify-center text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded bg-neutral-800 text-neutral-300 flex items-center justify-center text-xs"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, -item.quantity)}
                      className="text-neutral-500 hover:text-red-400 ml-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-400">Subtotal</span>
                <span className="font-bold text-white font-serif-display">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">Taxes and express shipping calculated at checkout.</p>
              <Link to="/checkout" onClick={() => setCartOpen(false)}>
                <Button variant="gold" size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Drawer>

      {/* Quick Search Drawer / Modal */}
      <Drawer
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        title="Search Arogya Path"
        position="right"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search products, ingredients (e.g. Ashwagandha, Shilajit)..."
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:outline-none focus:border-[#8b1528]"
            autoFocus
          />
          <div className="pt-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {['TESTO Power+', 'Ashwagandha', 'Shilajit', 'Safed Musli', 'Vitality'].map((term) => (
                <span
                  key={term}
                  className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:text-white hover:border-[#8b1528] cursor-pointer"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
