import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, ShoppingBag, Clock } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductPrice } from '@/components/commerce/ProductPrice';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { useCart } from '@/context/CartContext';
import { ASSET_REGISTRY } from '@/config/assets';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const ProductIntroductionSection: React.FC = () => {
  const product = INITIAL_PRODUCTS[0];
  const { addToCart } = useCart();
  const [activeVisual, setActiveVisual] = useState<'packaging' | 'ritual'>('packaging');
  const [isHovered, setIsHovered] = useState(false);

  // On desktop, hover toggles to ritual; on mobile, explicit tap toggles
  const effectiveVisual = isHovered ? 'ritual' : activeVisual;

  return (
    <Section
      id="featured-product"
      aria-label="Featured Product - TESTO BOOSTER"
      padding="xl"
      className="bg-[#F8F6F0] border-b border-[#EBE7DF] text-[#171717] relative overflow-hidden select-none"
    >
      <Container size="wide">
        <ScrollReveal variant="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-18 items-center">
            {/* Left Column (col-span-6 / col-span-7): Full-Bleed Product Editorial & Interaction Stage */}
            <div
              className="lg:col-span-7 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Main Visual Presentation Stage (No artificial small grey box) */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl bg-[#ECE7DC] border border-[#DDD6C8] group cursor-pointer">
                {/* State 1: Authentic Physical Packaging Board */}
                <AnimatePresence mode="wait">
                  {effectiveVisual === 'packaging' ? (
                    <motion.div
                      key="visual-packaging"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }}
                      className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
                    >
                      <img
                        src={ASSET_REGISTRY.products.testoBooster.board}
                        alt="TESTO BOOSTER CAPSULES physical board packaging on wooden surface"
                        className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] transition-transform duration-700 group-hover:scale-103"
                        loading="lazy"
                      />
                      {/* Floating Bottom Verified Tag */}
                      <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md border border-[#EBE7DF] px-3.5 py-2 rounded-xl text-xs font-bold text-[#173C2B] flex items-center justify-between sm:justify-start gap-2 shadow-md">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck size={15} className="text-emerald-700" />
                          <span>Verified Physical Packaging</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold sm:hidden">• Tap to view ritual</span>
                      </div>
                    </motion.div>
                  ) : (
                    /* State 2: Authentic Daily Usage Ritual & Botanical Prep */
                    <motion.div
                      key="visual-ritual"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }}
                      className="absolute inset-0"
                    >
                      <img
                        src={ASSET_REGISTRY.campaign.dailyRitualPrep}
                        alt="Mindful morning hydration and clean botanical ritual"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                      {/* Floating Bottom Ritual Tag */}
                      <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-between shadow-xl">
                        <span className="flex items-center gap-2 text-[#F3E5AB]">
                          <Clock size={15} className="text-amber-300 shrink-0" />
                          <span>Daily Ritual: 1 Capsule Twice Daily with Lukewarm Water / Milk</span>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">After Meals</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating Interactive State Switcher (Pills) */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-black/55 backdrop-blur-md p-1 rounded-full border border-white/20">
                  <button
                    type="button"
                    aria-label="View physical packaging"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveVisual('packaging');
                    }}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                      effectiveVisual === 'packaging'
                        ? 'bg-white text-[#171717] shadow-sm'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Packaging
                  </button>
                  <button
                    type="button"
                    aria-label="View daily usage ritual"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveVisual('ritual');
                    }}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                      effectiveVisual === 'ritual'
                        ? 'bg-[#6A1423] text-white shadow-sm'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Usage Ritual
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column (col-span-6 / col-span-5): Authoritative Product Commerce Stage */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-left">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-[#6A1423] bg-[#6A1423]/10 px-3 py-1 rounded-full border border-[#6A1423]/20">
                    Authoritative Formulation
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                    FSSAI Lic. #{product.regulatory.fssaiLicense}
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717] tracking-tight leading-[1.1] mb-1">
                  {product.name}
                </h2>

                <p className="text-xs sm:text-sm font-bold text-[#6A1423] uppercase tracking-wider">
                  {product.subtitle}
                </p>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                {product.shortDescription}
              </p>

              {/* Packaging & Capsule Specifications */}
              <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#EBE7DF]">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Pack Standard</span>
                  <span className="text-xs font-bold text-[#171717] flex items-center gap-1">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" /> 30 Veg Capsules
                  </span>
                </div>
                <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#EBE7DF]">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Encapsulation</span>
                  <span className="text-xs font-bold text-[#173C2B] flex items-center gap-1">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" /> HPMC Vegetarian Shell
                  </span>
                </div>
              </div>

              {/* Verified Dosage Instruction from Label */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-amber-950 mb-0.5">Verified Label Directions:</strong>
                  <span>One capsule twice a day or as directed by a Healthcare Professional. Swallow whole with lukewarm milk or water after a meal.</span>
                </div>
              </div>

              {/* Price & Direct Purchase CTAs */}
              <div className="pt-3 border-t border-[#EBE7DF] space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-600 block mb-0.5">
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
        </ScrollReveal>
      </Container>
    </Section>
  );
};
