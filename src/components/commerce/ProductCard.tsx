import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, CheckCircle2, Heart, ArrowRight } from 'lucide-react';
import type { Product } from '@/types/product';
import { ProductPrice } from './ProductPrice';
import { ProductRating } from './ProductRating';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

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
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useAuth();
  const isWishlisted = isInWishlist(product.id);

  const handleAction = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <div
      className={`group relative bg-[#FCFBF8] rounded-2xl overflow-hidden flex flex-col justify-between border border-[#EBE7DF] shadow-subtle-card hover:shadow-elevated-card hover:border-[#6A1423]/40 transition-all duration-300 ${className}`}
    >
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        <Badge variant="maroon" size="sm">10 Botanicals</Badge>
        {product.regulatory.isVegetarian && <Badge variant="veg" size="sm">100% Veg</Badge>}
      </div>

      {/* Wishlist Heart Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#FCFBF8]/80 backdrop-blur-sm border border-[#EBE7DF] hover:bg-white transition-all shadow-sm"
        aria-label="Toggle Wishlist"
      >
        <Heart
          size={16}
          className={isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-slate-400 hover:text-rose-600'}
        />
      </button>

      {/* Product Image Stage */}
      <Link
        to="/testo"
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
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3 text-left">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 flex-wrap gap-1">
            <span className="text-slate-800 font-bold uppercase tracking-wider text-[11px]">{product.category}</span>
            <span className="flex items-center gap-1 text-[#173C2B] font-bold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Lic. #{product.regulatory.fssaiLicense}
            </span>
          </div>

          <Link to="/testo" className="block group-hover:text-[#6A1423] transition-colors">
            <h3 className="font-serif text-lg font-bold text-[#171717] tracking-tight line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed font-normal mb-2">
            {product.subtitle || product.shortDescription}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#173C2B] font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded flex items-center gap-1">
              <CheckCircle2 size={12} /> {product.packSize}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 pt-3 border-t border-[#EBE7DF]">
            <ProductRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
            <ProductPrice price={product.price} size="sm" textColor="text-[#171717]" showDiscountBadge={false} />
          </div>

          <div className="flex gap-2">
            <Link to="/testo" className="flex-1">
              <Button
                variant="primary"
                size="sm"
                className="w-full shadow-sm font-bold"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore TESTO BOOSTER Details
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="px-3 border-[#6A1423] text-[#6A1423] hover:bg-[#6A1423] hover:text-white transition-colors"
              aria-label="Add to Cart"
              title="Add to Cart"
              onClick={handleAction}
            >
              <ShoppingBag className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
