import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/types/cart';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ProductPrice } from '@/components/commerce/ProductPrice';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cartItems, cartSummary, updateQuantity, removeFromCart, clearCart } = useCart();

  const progressPercent = Math.min(100, (cartSummary.subtotal / cartSummary.freeShippingThreshold) * 100);

  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen py-20">
        <Container size="narrow">
          <div className="bg-[#FCFBF8] rounded-3xl p-12 border border-[#EBE7DF] text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
            <h2 className="font-serif text-3xl font-bold text-[#171717]">Your Cart Is Empty</h2>
            <p className="text-xs text-slate-600">Explore our core dietary formulations and add items to your cart.</p>
            <Link to="/shop" className="inline-block pt-2">
              <Button variant="primary" size="md">
                Browse Storefront
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
      <Section padding="lg" background="ivory">
        <Container>
          <Breadcrumb items={[{ label: 'Shopping Cart' }]} className="mb-8 text-slate-700" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Items Stage */}
            <div className="lg:col-span-8 space-y-6 text-left">
              {/* Free Shipping Progress Indicator */}
              <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-[#173C2B]">
                    <Truck size={16} /> Free Express Shipping
                  </span>
                  <span>
                    {cartSummary.subtotal >= cartSummary.freeShippingThreshold
                      ? 'Unlocked!'
                      : `Add ₹${cartSummary.freeShippingThreshold - cartSummary.subtotal} more to qualify`}
                  </span>
                </div>
                <div className="w-full bg-[#EBE7DF] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-[#FCFBF8] rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-subtle-card divide-y divide-[#EBE7DF]">
                <div className="flex justify-between items-center pb-4 mb-4">
                  <h2 className="font-serif text-xl font-bold text-[#171717]">
                    Shopping Cart ({cartSummary.itemCount} Items)
                  </h2>
                  <button onClick={clearCart} className="text-xs font-bold text-slate-500 hover:text-[#6A1423]">
                    Clear Cart
                  </button>
                </div>

                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <img src={item.product.images.primary} alt={item.product.name} className="w-20 h-20 object-contain bg-[#F7F4ED] rounded-xl p-2 border border-[#EBE7DF]" />
                      <div className="space-y-1">
                        <Link to={`/products/${item.product.slug}`} className="font-serif font-bold text-base text-[#171717] hover:text-[#6A1423]">
                          {item.product.name}
                        </Link>
                        <span className="text-xs text-slate-600 block">{item.variant.packSize}</span>
                        <ProductPrice price={item.variant.price} size="sm" textColor="text-[#6A1423]" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="flex items-center border border-[#EBE7DF] bg-[#F7F4ED] rounded-lg">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-[#6A1423]">-</button>
                        <span className="px-3 py-1.5 text-xs font-bold text-[#171717]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-[#6A1423]">+</button>
                      </div>

                      <span className="font-serif font-bold text-base text-[#171717]">
                        ₹{(item.variant.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-600 p-1" aria-label="Remove item">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Summary Stage */}
            <div className="lg:col-span-4 space-y-6 text-left sticky top-24">
              <div className="bg-[#FCFBF8] p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#171717] border-b border-[#EBE7DF] pb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs text-slate-700 font-semibold">
                  <div className="flex justify-between"><span>Items Subtotal:</span><span>₹{cartSummary.subtotal.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Estimated Shipping:</span><span className="text-emerald-700 font-bold">{cartSummary.shippingFee === 0 ? 'FREE' : `₹${cartSummary.shippingFee}`}</span></div>
                  <div className="flex justify-between font-serif font-black text-lg text-[#171717] pt-4 border-t border-[#EBE7DF]">
                    <span>Total:</span>
                    <span className="text-[#6A1423]">₹{cartSummary.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Link to="/checkout" className="block">
                  <Button variant="primary" size="lg" className="w-full shadow-md font-bold text-base" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Proceed to Checkout
                  </Button>
                </Link>

                <div className="pt-2 text-center text-[11px] text-slate-600 space-y-1 font-semibold">
                  <p className="flex items-center justify-center gap-1 text-[#173C2B]"><ShieldCheck size={14} className="text-emerald-600" /> FSSAI Lic. #12118441000654</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export const CheckoutPageMock = () => null;
