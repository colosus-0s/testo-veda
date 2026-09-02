import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, ShoppingBag, Truck, RefreshCw, CheckCircle2, ShieldAlert, FileText } from 'lucide-react';
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
import { useCart } from '@/context/CartContext';

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
      title: 'What is the dosage instructions for TESTO Natural Power+?',
      content: `${product.directions.labelInstruction}. ${product.directions.suggestedUse}`,
    },
    {
      id: 'faq-2',
      title: 'Is TESTO Natural Power+ 100% vegetarian?',
      content: 'Yes. Every capsule shell is made from 100% vegetarian HPMC cellulose (E 464) carrying the official green vegetarian mark as declared on our physical label.',
    },
    {
      id: 'faq-3',
      title: 'What is the regulatory license of Arogya Path?',
      content: `Our products operate under FSSAI License No. ${product.regulatory.fssaiLicense}. Formulated in ISO 9001:2015 and GMP certified facilities.`,
    },
    {
      id: 'faq-4',
      title: 'What botanicals are included in TESTO Power+?',
      content: 'TESTO Natural Power+ combines 10 classical botanical extracts: Ashwagandha (100mg), Gokhuru / Tribulus (100mg), Safed Musli (50mg), Sea Buckthorn (50mg), Fenugreek (30mg), Saffron (15mg), and a 170mg Proprietary Blend (Kaunch Beej, Purified Shilajit, Talmakhana, Ginger).',
    },
  ];

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen">
      {/* Product Hero Section */}
      <Section padding="lg" className="bg-[#FCFBF8] border-b border-[#EBE7DF]">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Shop', href: '/shop' },
              { label: product.name },
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
            {/* Left Gallery Stage */}
            <div className="lg:col-span-6 space-y-4">
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
                      activeImage === img ? 'border-[#6A1423] shadow-sm' : 'border-[#EBE7DF] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery view ${i + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Product Buying Stage */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="maroon">{product.category}</Badge>
                  <Badge variant="veg">100% Veg</Badge>
                  <span className="text-xs text-amber-900 font-bold uppercase tracking-wider bg-amber-50 border border-amber-200 px-3 py-1 rounded-md">
                    Lic. #{product.regulatory.fssaiLicense}
                  </span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-sm font-semibold text-[#6A1423]">
                  {product.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-4 border-y border-[#EBE7DF] py-3">
                <ProductRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
                <span className="text-[#EBE7DF]">|</span>
                <span className="text-xs text-[#173C2B] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 30 Veg Capsules • MRP ₹999
                </span>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-slate-700 block mb-1">Maximum Retail Price</span>
                <ProductPrice
                  price={selectedVariant.price}
                  compareAtPrice={selectedVariant.compareAtPrice}
                  size="xl"
                  textColor="text-[#171717]"
                  showDiscountBadge={false}
                />
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                {product.shortDescription}
              </p>

              {/* Label Notice */}
              {product.discrepancyNotices && product.discrepancyNotices.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-950 font-bold mb-0.5">Dosage Label Note:</strong>
                    <span>{product.discrepancyNotices[0].note}</span>
                  </div>
                </div>
              )}

              {/* Pack Selector */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Select Pack Size:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3.5 rounded-xl text-left border transition-all ${
                        selectedVariant.id === variant.id
                          ? 'bg-[#6A1423]/10 border-[#6A1423] ring-1 ring-[#6A1423]'
                          : 'bg-[#FCFBF8] border-[#EBE7DF] hover:border-[#6A1423]/40'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#171717] block">
                        {variant.packSize}
                      </span>
                      <span className="text-xs text-[#6A1423] font-extrabold block mt-1">
                        ₹{variant.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="space-y-3 pt-4 border-t border-[#EBE7DF]">
                <div className="flex items-center gap-4">
                  <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} size="lg" />
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 font-bold text-sm border-[#6A1423] text-[#6A1423] hover:bg-[#6A1423] hover:text-white transition-all"
                    leftIcon={<ShoppingBag className="w-4 h-4" />}
                    onClick={() => addToCart(product, selectedVariant, quantity)}
                  >
                    Add to Cart
                  </Button>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-md font-bold text-base bg-[#6A1423] hover:bg-[#520f1b]"
                  leftIcon={<Truck className="w-5 h-5" />}
                  onClick={() => {
                    buyNow(product, selectedVariant, quantity);
                    navigate('/checkout');
                  }}
                >
                  Buy Now • ₹{(selectedVariant.price * quantity).toLocaleString('en-IN')}
                </Button>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs text-slate-700 pt-4 border-t border-[#EBE7DF] font-semibold">
                <div className="flex flex-col items-center gap-1.5 p-2 bg-[#F7F4ED] rounded-lg border border-[#EBE7DF]">
                  <Truck className="w-4 h-4 text-[#173C2B]" />
                  <span>Express Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-[#F7F4ED] rounded-lg border border-[#EBE7DF]">
                  <ShieldCheck className="w-4 h-4 text-[#6A1423]" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-[#F7F4ED] rounded-lg border border-[#EBE7DF]">
                  <RefreshCw className="w-4 h-4 text-[#173C2B]" />
                  <span>Verified FSSAI</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Official Supplement Facts & Formula Section */}
      <Section padding="xl" className="bg-[#173C2B] text-white border-y border-[#2E6B4A]/50">
        <Container size="narrow">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-[#F3E5AB] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/20">
              Technical Label Disclosure
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
              What's In Each Capsule
            </h2>
            <p className="text-sm text-[#E2E8F0] font-semibold">
              Serving Size: {facts.servingSize} • FSSAI License No. {product.regulatory.fssaiLicense}
            </p>
          </div>

          <div className="bg-[#FCFBF8] text-[#171717] rounded-2xl p-6 sm:p-8 border-2 border-slate-900 shadow-2xl overflow-x-auto">
            <div className="border-b-4 border-[#171717] pb-3 mb-4 flex items-center justify-between">
              <h3 className="font-serif text-2xl font-black text-[#171717] uppercase">
                Supplement Facts
              </h3>
              <FileText className="w-5 h-5 text-[#6A1423]" />
            </div>

            <div className="flex justify-between text-xs font-black text-[#171717] border-b-2 border-slate-900 pb-2 mb-3">
              <span>Amount Per Serving</span>
              <span>% Daily Value</span>
            </div>

            <div className="divide-y divide-slate-300 text-sm">
              {facts.ingredients.map((ing, i) => (
                <div key={i} className="py-2.5 flex justify-between items-baseline gap-4">
                  <div>
                    <span className="font-bold text-slate-950">{ing.name}</span>
                    {ing.botanicalName && (
                      <span className="text-xs italic text-slate-700 ml-1.5">({ing.botanicalName})</span>
                    )}
                  </div>
                  <span className="font-mono text-xs font-black text-slate-950">{ing.amount}</span>
                </div>
              ))}

              {facts.proprietaryBlend && (
                <div className="py-3 bg-emerald-50 px-3.5 rounded-lg my-2 border border-emerald-300">
                  <div className="flex justify-between font-bold text-slate-950">
                    <span>{facts.proprietaryBlend.name}</span>
                    <span className="font-mono text-xs font-black text-[#173C2B]">{facts.proprietaryBlend.amount}</span>
                  </div>
                  <ul className="mt-1.5 pl-4 list-disc text-xs text-slate-900 font-semibold space-y-1">
                    {facts.proprietaryBlend.ingredients.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="border-t-4 border-[#171717] pt-3 mt-4 text-[11px] text-slate-900 font-semibold space-y-1">
              <p>* Daily Value (% DV) not established for dietary supplements.</p>
              <p><strong>Other Ingredients:</strong> {facts.otherIngredients.join(', ')}.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Product FAQ Section */}
      <Section padding="xl" className="bg-[#FCFBF8] border-b border-[#EBE7DF]">
        <Container size="narrow">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Product & Dosage Clarity
            </h2>
          </div>

          <Accordion items={faqItems} />
        </Container>
      </Section>

      {/* Related Formulations */}
      <Section padding="xl" className="bg-[#F7F4ED]">
        <Container>
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2">
              Storefront Recommendations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Related Botanical Formulations
            </h2>
          </div>

          <div className="max-w-md mx-auto">
            <ProductCard product={product} />
          </div>
        </Container>
      </Section>
    </div>
  );
};
