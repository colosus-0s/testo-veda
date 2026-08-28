import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { ProductPrice } from '@/components/commerce/ProductPrice';
import { ProductRating } from '@/components/commerce/ProductRating';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const AccountWishlistPage: React.FC = () => {
  const { wishlistProductIds, removeFromWishlist } = useAuth();
  const { addToCart } = useCart();

  const savedProducts = INITIAL_PRODUCTS.filter((p) => wishlistProductIds.includes(p.id));

  return (
    <div className="space-y-6 text-left">
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
          Saved Formulations
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
          My Wishlist ({savedProducts.length})
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Formulations saved for future wellness cycles and express replenishment.
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-16 bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF] text-center space-y-4">
          <Heart className="w-12 h-12 text-slate-400 mx-auto" />
          <h4 className="font-serif text-xl font-bold text-[#171717]">Your Wishlist Is Empty</h4>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            You haven't saved any botanical formulations to your wishlist yet.
          </p>
          <Link to="/shop" className="inline-block pt-2">
            <Button variant="primary" size="md" rightIcon={<ArrowRight size={16} />}>
              Explore Storefront Catalog
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-[#FCFBF8] rounded-2xl border border-[#EBE7DF] p-5 flex flex-col justify-between space-y-4 shadow-subtle-card hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <Badge variant="veg" size="sm">100% Veg</Badge>
                  <button
                    onClick={() => removeFromWishlist(prod.id)}
                    className="text-slate-400 hover:text-red-600 p-1"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <Link to={`/products/${prod.slug}`} className="block aspect-square bg-[#F7F4ED] rounded-xl p-4 border border-[#EBE7DF]">
                  <img src={prod.images.primary} alt={prod.name} className="w-full h-full object-contain drop-shadow-sm" />
                </Link>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">{prod.category}</span>
                  <Link to={`/products/${prod.slug}`} className="block font-serif font-bold text-base text-[#171717] hover:text-[#6A1423] line-clamp-1">
                    {prod.name}
                  </Link>
                  <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{prod.subtitle}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#EBE7DF]">
                  <ProductRating rating={prod.rating} reviewCount={prod.reviewCount} size="sm" />
                  <ProductPrice price={prod.price} size="sm" textColor="text-[#6A1423]" />
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                className="w-full font-bold"
                leftIcon={<ShoppingBag size={14} />}
                onClick={() => {
                  addToCart(prod);
                  removeFromWishlist(prod.id);
                }}
              >
                Move To Cart
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
