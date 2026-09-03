import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  ShoppingBag,
  Truck,
  RefreshCw,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Leaf,
  ArrowRight,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductPrice } from '@/components/commerce/ProductPrice';
import { ProductRating } from '@/components/commerce/ProductRating';
import { QuantitySelector } from '@/components/commerce/QuantitySelector';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { getProductBySlug, getProducts } from '@/repositories/productRepository';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { ProductCard } from '@/components/commerce/ProductCard';
import { SupplementFactsPanel } from '@/components/commerce/SupplementFactsPanel';
import { useCart } from '@/context/CartContext';
import { MobileProductGallery } from '@/components/commerce/MobileProductGallery';
import { StickyMobilePurchaseBar } from '@/components/commerce/StickyMobilePurchaseBar';
import { MobileIngredientCards } from '@/components/commerce/MobileIngredientCards';
import { WatchAndBuySection } from '@/components/commerce/WatchAndBuySection';
import { MobileBenefitsSection } from '@/components/commerce/MobileBenefitsSection';
import { MobileHowToConsume } from '@/components/commerce/MobileHowToConsume';
import { MobileCustomerReviews } from '@/components/commerce/MobileCustomerReviews';

export const ProductDetailPage: React.FC = () => {
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '') || getProducts()[0];

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images.primary);

  const facts = product.supplementFacts;

  const faqItems = [
    {
      id: 'faq-1',
      title: 'What is the dosage instruction for TESTO BOOSTER?',
      content: `${product.directions.labelInstruction}. ${product.directions.suggestedUse}`,
    },
    {
      id: 'faq-2',
      title: 'Is TESTO BOOSTER 100% vegetarian?',
      content:
        'Yes. Every capsule shell is made from 100% vegetarian HPMC cellulose (E 464) carrying the official green vegetarian mark as declared on our physical label.',
    },
    {
      id: 'faq-3',
      title: 'What is the regulatory license of Arogya Path?',
      content: `Our products operate under FSSAI License No. ${product.regulatory.fssaiLicense}. Formulated in ISO 9001:2015 and GMP certified facilities.`,
    },
    {
      id: 'faq-4',
      title: 'What botanicals are included in TESTO BOOSTER?',
      content:
        'TESTO BOOSTER combines 10 classical botanical extracts: Ashwagandha (100mg), Gokhuru / Tribulus (100mg), Safed Musli (50mg), Sea Buckthorn (50mg), Fenugreek (30mg), Saffron (15mg), and a 170mg Proprietary Blend (Kaunch Beej, Purified Shilajit, Talmakhana, Ginger).',
    },
    {
      id: 'faq-5',
      title: 'How is TESTO BOOSTER packaged and delivered?',
      content:
        'Each bottle contains 30 vegetarian capsules as declared on our physical packaging label. Cash on Delivery is available across India with free delivery on orders above ₹499.',
    },
  ];

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen pb-28 md:pb-12">
      {/* Product Hero Section */}
      <Section padding="lg" className="bg-[#FCFBF8] border-b border-[#EBE7DF]">
        <Container>
          <Breadcrumb
            items={[{ label: 'Shop', href: '/shop' }, { label: product.name }]}
            className="mb-4 sm:mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-8 sm:mb-12">
            {/* Mobile Touch-Swipeable Gallery (< lg) */}
            <div className="lg:hidden">
              <MobileProductGallery
                images={product.images.gallery}
                productName={product.name}
                fssaiLicense={product.regulatory.fssaiLicense}
              />
            </div>

            {/* Desktop Gallery Stage (>= lg) */}
            <div className="hidden lg:block lg:col-span-6 space-y-4">
              <div className="bg-[#F7F4ED] rounded-3xl p-8 sm:p-12 aspect-square flex items-center justify-center relative overflow-hidden border border-[#EBE7DF] shadow-subtle-card">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
                />
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-xl bg-[#F7F4ED] p-2 shrink-0 border-2 transition-all ${
                      activeImage === img
                        ? 'border-[#6A1423] shadow-sm'
                        : 'border-[#EBE7DF] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Gallery view ${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Product Buying Stage */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div>
                <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                  <Badge variant="maroon">{product.category}</Badge>
                  <Badge variant="veg">100% Veg (E 464)</Badge>
                  <span className="text-[11px] text-amber-900 font-bold uppercase tracking-wider bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                    FSSAI Lic. #{product.regulatory.fssaiLicense}
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#171717] tracking-tight mb-1.5">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-[#6A1423]">
                  {product.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3 border-y border-[#EBE7DF] py-2.5">
                <ProductRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size="md"
                />
                <span className="text-[#EBE7DF]">|</span>
                <span className="text-xs text-[#173C2B] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 30 Veg Capsules • MRP ₹1,499
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold text-slate-700 block mb-0.5">
                  Maximum Retail Price (Incl. of all taxes)
                </span>
                <div className="flex items-baseline gap-3">
                  <ProductPrice
                    price={selectedVariant.price}
                    compareAtPrice={selectedVariant.compareAtPrice}
                    size="xl"
                    textColor="text-[#171717]"
                    showDiscountBadge={false}
                  />
                  <span className="text-xs text-slate-600 font-semibold">
                    (₹{(selectedVariant.price / selectedVariant.capsuleCount).toFixed(2)} / Capsule)
                  </span>
                </div>
              </div>

              <p className="text-slate-700 text-xs sm:text-base leading-relaxed font-normal">
                {product.shortDescription}
              </p>

              {/* Label Notice */}
              {product.discrepancyNotices && product.discrepancyNotices.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-950 font-bold mb-0.5">
                      Dosage Label Instruction:
                    </strong>
                    <span>{product.discrepancyNotices[0].note}</span>
                  </div>
                </div>
              )}

              {/* Mobile-Friendly Selectable Variant Cards (Matching frame_06.jpg) */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Select Pack Option:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-3 rounded-xl text-left border transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#6A1423]/10 border-[#6A1423] ring-1 ring-[#6A1423] shadow-sm'
                            : 'bg-[#FCFBF8] border-[#EBE7DF] hover:border-[#6A1423]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-[#171717]">
                            {variant.packSize}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#6A1423] shrink-0" />
                          )}
                        </div>
                        <div className="flex items-baseline justify-between gap-1">
                          <span className="font-serif text-sm text-[#6A1423] font-black">
                            ₹{variant.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-700 font-medium">
                            ₹{(variant.price / variant.capsuleCount).toFixed(0)}/cap
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & Inline CTAs */}
              <div className="space-y-2.5 pt-3 border-t border-[#EBE7DF]">
                <div className="flex items-center gap-3">
                  <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} size="lg" />
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 font-bold text-xs sm:text-sm border-[#6A1423] text-[#6A1423] hover:bg-[#6A1423] hover:text-white transition-all"
                    leftIcon={<ShoppingBag className="w-4 h-4" />}
                    onClick={() => addToCart(product, selectedVariant, quantity)}
                  >
                    Add to Cart
                  </Button>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-md font-bold text-sm sm:text-base bg-[#6A1423] hover:bg-[#520f1b] flex items-center justify-center gap-2"
                  onClick={() => {
                    buyNow(product, selectedVariant, quantity);
                    navigate('/checkout');
                  }}
                >
                  <span>Buy Now • ₹{(selectedVariant.price * quantity).toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* What Makes It Distinct / Feature Pills (Matching frame_06.jpg) */}
              <div className="space-y-2 pt-3 border-t border-[#EBE7DF]">
                <span className="text-[11px] uppercase font-bold text-slate-800 tracking-wider block">
                  Formula Distinctives
                </span>
                <div className="space-y-1.5 text-xs font-semibold text-[#173C2B]">
                  <div className="flex items-center gap-2.5 p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-100">
                    <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <Sparkles size={12} />
                    </div>
                    <span>10 Classical Synergistic Ayurvedic Botanicals</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-100">
                    <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <Leaf size={12} />
                    </div>
                    <span>100% Vegetarian HPMC Cellulose Shell (E 464)</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-100">
                    <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <ShieldCheck size={12} />
                    </div>
                    <span>FSSAI Lic. #{product.regulatory.fssaiLicense} • ISO 9001 & GMP Facility</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-100">
                    <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} />
                    </div>
                    <span>515 mg Total Active Botanical Extracts Per Capsule</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-700 pt-3 border-t border-[#EBE7DF] font-semibold">
                <div className="flex flex-col items-center gap-1 p-2 bg-[#F7F4ED] rounded-xl border border-[#EBE7DF]">
                  <Truck className="w-4 h-4 text-[#173C2B]" />
                  <span>Express Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-[#F7F4ED] rounded-xl border border-[#EBE7DF]">
                  <ShieldCheck className="w-4 h-4 text-[#6A1423]" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-[#F7F4ED] rounded-xl border border-[#EBE7DF]">
                  <RefreshCw className="w-4 h-4 text-[#173C2B]" />
                  <span>Verified FSSAI</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Watch & Buy Mobile Showcase (Matching frame_08.jpg & frame_11.jpg) */}
      <WatchAndBuySection />

      {/* 10 Classical Botanicals Horizontal Swipeable Cards (Matching frame_10.jpg) */}
      <MobileIngredientCards />

      {/* Key Benefits Visual Story Cards (Matching frame_13.jpg & frame_14.jpg) */}
      <MobileBenefitsSection />

      {/* How To Consume Numbered Steps (Matching frame_20.jpg & frame_28.jpg) */}
      <MobileHowToConsume />

      {/* Official Supplement Facts & Formula Section */}
      <Section padding="xl" className="bg-[#F7F4ED] border-y border-[#EBE7DF] overflow-hidden">
        <Container size="narrow">
          <div className="text-center mb-6 sm:mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] bg-red-50 px-3.5 py-1.5 rounded-full inline-block mb-2.5 border border-red-100 shadow-sm">
              Technical Label Disclosure
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#171717] mb-2">
              What's In Each Capsule
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold">
              Serving Size: {facts.servingSize} • FSSAI License No. {product.regulatory.fssaiLicense}
            </p>
          </div>

          {/* Horizontal scroll container for table on small screens so whole page does not overflow */}
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <SupplementFactsPanel />
          </div>
        </Container>
      </Section>

      {/* Customer Ratings & Reviews Breakdown (Matching frame_21.jpg & frame_23.jpg) */}
      <MobileCustomerReviews />

      {/* Product FAQ Section (Matching frame_24.jpg) */}
      <Section padding="lg" className="bg-[#FCFBF8] border-b border-[#EBE7DF]">
        <Container size="narrow">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
              Product & Dosage Clarity
            </h2>
          </div>

          <Accordion items={faqItems} variant="cards" />
        </Container>
      </Section>

      {/* Storefront Recommendations */}
      <Section padding="lg" className="bg-[#F7F4ED]">
        <Container>
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
              Storefront Recommendations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
              Related Botanical Formulations
            </h2>
          </div>

          <div className="max-w-md mx-auto">
            <ProductCard product={product} />
          </div>
        </Container>
      </Section>

      {/* Persistent Mobile Bottom Purchase Bar (Matching frame_01.jpg & frame_28.jpg) */}
      <StickyMobilePurchaseBar
        product={product}
        selectedVariant={selectedVariant}
        onSelectVariant={setSelectedVariant}
      />
    </div>
  );
};
