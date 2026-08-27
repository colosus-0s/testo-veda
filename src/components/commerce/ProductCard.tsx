import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck } from 'lucide-react';
import type { Product } from '@/types/product';
import { ProductPrice } from './ProductPrice';
import { ProductRating } from './ProductRating';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className = '',
}) => {
  return (
    <div
      className={`group relative glass-card rounded-xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-[#d4af37]/40 transition-colors ${className}`}
    >
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.bestSeller && <Badge variant="maroon">Featured</Badge>}
        {product.regulatory.isVegetarian && <Badge variant="veg">100% Veg</Badge>}
      </div>

      {/* Product Image Stage */}
      <Link
        to={`/products/${product.slug}`}
        className="relative block w-full aspect-square bg-gradient-to-b from-neutral-900/90 to-[#141417] overflow-hidden p-6"
      >
        <img
          src={product.images.primary}
          alt={product.name}
          className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-2xl"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
      </Link>

      {/* Product Details Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium mb-1">
            <span>{product.category}</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              FSSAI Lic. #{product.regulatory.fssaiLicense}
            </span>
          </div>

          <Link to={`/products/${product.slug}`} className="block group-hover:text-[#d4af37] transition-colors">
            <h3 className="font-serif text-lg font-bold text-white tracking-tight line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed font-normal">
            {product.subtitle || product.shortDescription}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 pt-2 border-t border-neutral-800">
            <ProductRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
            <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          </div>

          <Button
            variant="gold"
            size="sm"
            className="w-full shadow-md"
            leftIcon={<ShoppingBag className="w-4 h-4" />}
            onClick={() => onAddToCart && onAddToCart(product)}
          >
            Explore TESTO
          </Button>
        </div>
      </div>
    </div>
  );
};
