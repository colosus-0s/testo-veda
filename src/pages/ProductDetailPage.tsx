import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, ShoppingBag, Truck, RefreshCw } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductPrice } from '@/components/commerce/ProductPrice';
import { ProductRating } from '@/components/commerce/ProductRating';
import { QuantitySelector } from '@/components/commerce/QuantitySelector';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { Badge } from '@/components/ui/Badge';
import { IngredientCard } from '@/components/commerce/IngredientCard';
import { INGREDIENTS_DATA } from '@/features/products/data/ingredientsData';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug) || INITIAL_PRODUCTS[0];
  
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images.primary);

  return (
    <Section padding="lg">
      <Container>
        <Breadcrumb
          items={[
            { label: 'Shop', href: '/shop' },
            { label: product.name },
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left Gallery Stage */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-card rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-lg glass-card p-2 shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-[#8b1528]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Gallery view ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Buy Stage */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="maroon">{product.category}</Badge>
                <Badge variant="veg">100% Veg</Badge>
              </div>
              <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mb-2">
                {product.name}
              </h1>
              <p className="text-sm font-medium text-[#d4af37]">
                {product.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <ProductRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-neutral-700">|</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                FSSAI Reg. #{product.regulatory.fssaiLicense}
              </span>
            </div>

            <ProductPrice
              price={selectedVariant.price}
              compareAtPrice={selectedVariant.compareAtPrice}
              size="xl"
            />

            <p className="text-neutral-300 text-sm leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Variant Pack Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                Select Regimen Pack Size:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 rounded-lg text-left border transition-all ${
                      selectedVariant.id === variant.id
                        ? 'bg-[#8b1528]/20 border-[#8b1528] ring-1 ring-[#8b1528]'
                        : 'glass-card border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-xs font-bold text-white block line-clamp-1">
                      {variant.packSize}
                    </span>
                    <span className="text-xs text-[#d4af37] font-semibold block mt-1">
                      ₹{variant.price}
                    </span>
                    {variant.savingsPercentage && (
                      <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                        Save {variant.savingsPercentage}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-800">
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} size="lg" />
              <Button
                variant="gold"
                size="lg"
                className="flex-1"
                leftIcon={<ShoppingBag className="w-5 h-5" />}
              >
                Add To Cart • ₹{(selectedVariant.price * quantity).toLocaleString('en-IN')}
              </Button>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-neutral-400 pt-4 border-t border-neutral-800">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Express Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>100% Authentic</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-blue-400" />
                <span>Easy Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients & Formulation Details */}
        <div className="pt-12 border-t border-neutral-800 space-y-12">
          <div>
            <h2 className="font-serif-display text-2xl font-bold text-white mb-6">
              Active Botanical Ingredients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INGREDIENTS_DATA.slice(0, 6).map((ing) => (
                <IngredientCard key={ing.id} ingredient={ing} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
