import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { ProductPrice } from '@/components/commerce/ProductPrice';

export const CartPage: React.FC = () => {
  const item = INITIAL_PRODUCTS[0];

  return (
    <Section padding="lg">
      <Container size="narrow">
        <h1 className="font-serif-display text-3xl font-bold text-white mb-8">
          Shopping Cart
        </h1>

        <div className="glass-card rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-4">
              <img src={item.images.primary} alt={item.name} className="w-20 h-20 object-contain p-2 glass-card rounded" />
              <div>
                <h3 className="font-serif-display text-lg font-bold text-white">{item.name}</h3>
                <span className="text-xs text-neutral-400">1 Bottle (30 Veg Capsules)</span>
                <ProductPrice price={item.price} compareAtPrice={item.compareAtPrice} size="sm" className="mt-1" />
              </div>
            </div>
            <div className="text-right font-serif-display font-bold text-white text-lg">
              ₹999
            </div>
          </div>

          <div className="flex justify-between items-center text-sm pt-2">
            <span className="text-neutral-400">Subtotal</span>
            <span className="font-bold text-white font-serif-display text-lg">₹999</span>
          </div>

          <Link to="/checkout" className="block">
            <Button variant="gold" size="lg" className="w-full" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Proceed to Checkout • ₹999
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export const CheckoutPage: React.FC = () => {
  return (
    <Section padding="lg">
      <Container size="narrow">
        <h1 className="font-serif-display text-3xl font-bold text-white mb-8">
          Secure Checkout
        </h1>

        <div className="glass-card rounded-xl p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="font-serif-display text-lg font-bold text-white border-b border-neutral-800 pb-2">
              1. Contact & Shipping Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <input type="text" placeholder="Full Name" className="p-3 bg-neutral-900 border border-neutral-800 rounded text-white" />
              <input type="email" placeholder="Email Address" className="p-3 bg-neutral-900 border border-neutral-800 rounded text-white" />
              <input type="tel" placeholder="Mobile Phone (+91)" className="p-3 bg-neutral-900 border border-neutral-800 rounded text-white" />
              <input type="text" placeholder="Pincode" className="p-3 bg-neutral-900 border border-neutral-800 rounded text-white" />
              <input type="text" placeholder="Complete Address" className="sm:col-span-2 p-3 bg-neutral-900 border border-neutral-800 rounded text-white" />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <h3 className="font-serif-display text-lg font-bold text-white border-b border-neutral-800 pb-2">
              2. Payment Method
            </h3>
            <div className="p-4 bg-neutral-900 border border-[#8b1528] rounded-lg flex items-center justify-between text-xs">
              <span className="font-bold text-white">Razorpay (UPI, Credit/Debit Card, Netbanking)</span>
              <span className="text-emerald-400 font-semibold">256-Bit SSL Encrypted</span>
            </div>
          </div>

          <Button variant="gold" size="lg" className="w-full">
            Complete Order • ₹999
          </Button>
        </div>
      </Container>
    </Section>
  );
};
