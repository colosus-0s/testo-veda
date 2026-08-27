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
      className={`group relative bg-[#FCFBF8] rounded-2xl overflow-hidden flex flex-col justify-between border border-[#EBE7DF] shadow-subtle-card hover:shadow-elevated-card hover:border-[#6A1423]/40 transition-all duration-300 ${className}`}
    >
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.bestSeller && <Badge variant="maroon">Featured Formulation</Badge>}
        {product.regulatory.isVegetarian && <Badge variant="veg">100% Veg</Badge>}
      </div>

      {/* Product Image Stage */}
      <Link
        to={`/products/${product.slug}`}
        className="relative block w-full aspect-square bg-[#F7F4ED] overflow-hidden p-6 border-b border-[#EBE7DF]"
      >
        <img
          src={product.images.primary}
          alt={product.name}
          className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-md"
          loading="lazy"
        />
      </Link>

      {/* Product Details Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
            <span>{product.category}</span>
            <span className="flex items-center gap-1 text-[#173C2B] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              FSSAI Lic. #{product.regulatory.fssaiLicense}
            </span>
          </div>

          <Link to={`/products/${product.slug}`} className="block group-hover:text-[#6A1423] transition-colors">
            <h3 className="font-serif text-lg font-bold text-[#171717] tracking-tight line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed font-normal">
            {product.subtitle || product.shortDescription}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 pt-3 border-t border-[#EBE7DF]">
            <ProductRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
            <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          </div>

          <Button
            variant="primary"
            size="sm"
            className="w-full shadow-sm"
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
