import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, ShoppingBag, Clock } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductPrice } from '@/components/commerce/ProductPrice';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { useCart } from '@/context/CartContext';
import { ASSET_REGISTRY } from '@/config/assets';

export const ProductIntroductionSection: React.FC = () => {
  const product = INITIAL_PRODUCTS[0];
  const { addToCart } = useCart();

  return (
    <Section padding="xl" className="bg-[#FCFBF8] border-b border-[#EBE7DF] text-[#171717] opacity-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column (col-span-6): High-Resolution Physical Product Board Stage */}
          <div className="lg:col-span-6 relative">
            <div className="relative bg-[#F7F4ED] rounded-3xl p-6 sm:p-10 overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[460px] border border-[#EBE7DF] shadow-subtle-card group">
              <img
                src={ASSET_REGISTRY.products.testoBooster.board}
                alt="TESTO BOOSTER CAPSULES on authentic wooden surface with botanicals"
                className="w-full max-w-sm sm:max-w-md h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-[#EBE7DF] px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#173C2B] flex items-center gap-1.5 shadow-sm">
                <ShieldCheck size={14} className="text-emerald-700" />
                <span>Verified Physical Bottle & Packaging</span>
              </div>
            </div>
          </div>

          {/* Right Column (col-span-6): Authoritative Product Buying Stage */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div>
              <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                <span className="text-[11px] uppercase font-bold tracking-widest text-[#6A1423] bg-[#6A1423]/10 px-3 py-1 rounded-full border border-[#6A1423]/20">
                  Authoritative Formulation
                </span>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                  FSSAI Lic. #{product.regulatory.fssaiLicense}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717] tracking-tight mb-1.5">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-[#6A1423] uppercase tracking-wider">
                {product.subtitle}
              </p>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {product.shortDescription}
            </p>

            {/* Packaging & Capsule Specifications */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 bg-[#F7F4ED] rounded-xl border border-[#EBE7DF]">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Pack Standard</span>
                <span className="text-xs font-bold text-[#171717] flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" /> 30 Veg Capsules
                </span>
              </div>
              <div className="p-3 bg-[#F7F4ED] rounded-xl border border-[#EBE7DF]">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Encapsulation</span>
                <span className="text-xs font-bold text-[#173C2B] flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" /> HPMC Vegetarian Shell
                </span>
              </div>
            </div>

            {/* Dosage Instruction from Verified Label */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-amber-950 mb-0.5">Verified Label Directions:</strong>
                <span>One capsule twice a day or as directed by a Healthcare Professional. Swallow whole with lukewarm milk or water after a meal.</span>
              </div>
            </div>

            {/* Price & Direct Purchase CTAs */}
            <div className="pt-4 border-t border-[#EBE7DF] space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-600 block mb-0.5">
                    Maximum Retail Price (MRP)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <ProductPrice price={product.price} size="xl" textColor="text-[#171717]" showDiscountBadge={false} />
                    <span className="text-xs text-slate-600 font-semibold">(₹49.97 / Capsule)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link to="/testo" className="w-full sm:flex-1">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-md font-bold text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <span>Explore TESTO BOOSTER Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-5 border-[#6A1423] text-[#6A1423] hover:bg-[#6A1423] hover:text-white font-bold"
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
