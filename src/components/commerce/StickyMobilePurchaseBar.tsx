import React, { useState } from 'react';
import { ShoppingBag, ChevronDown, Check, ArrowRight } from 'lucide-react';
import type { Product, ProductVariant } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

export interface StickyMobilePurchaseBarProps {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const StickyMobilePurchaseBar: React.FC<StickyMobilePurchaseBarProps> = ({
  product,
  selectedVariant,
  onSelectVariant,
}) => {
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, 1);
  };

  const handleBuyNow = () => {
    buyNow(product, selectedVariant, 1);
    navigate('/checkout');
  };

  return (
    <>
      {/* Variant Selector Bottom Sheet Modal */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-end md:hidden animate-fade-in"
          onClick={() => setDropdownOpen(false)}
        >
          <div
            className="bg-[#FCFBF8] rounded-t-2xl p-5 border-t border-[#EBE7DF] shadow-2xl space-y-3 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#EBE7DF]">
              <span className="font-serif text-sm font-bold text-[#171717]">Select Pack Size</span>
              <button
                onClick={() => setDropdownOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>
            <div className="space-y-2">
              {product.variants.map((v) => {
                const isSelected = v.id === selectedVariant.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelectVariant(v);
                      setDropdownOpen(false);
                    }}
                    className={`w-full p-3 rounded-xl flex items-center justify-between border text-left transition-all ${
                      isSelected
                        ? 'bg-[#6A1423]/10 border-[#6A1423] ring-1 ring-[#6A1423]'
                        : 'bg-white border-[#EBE7DF]'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm text-[#171717] block">{v.packSize}</span>
                      <span className="text-xs text-slate-600">MRP incl. of all taxes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-black text-sm text-[#6A1423]">₹{v.price.toLocaleString('en-IN')}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#6A1423]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar */}
      <aside
        aria-label="Mobile Checkout Actions"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#FCFBF8]/95 backdrop-blur-md border-t border-[#EBE7DF] p-2.5 px-3 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[max(0.625rem,env(safe-area-inset-bottom))]"
      >
        <div className="max-w-md mx-auto flex items-center gap-2">
          {/* Left: Pack Selector Trigger */}
          <button
            onClick={() => setDropdownOpen(true)}
            className="flex items-center gap-1.5 bg-white border border-[#EBE7DF] px-2.5 py-2 rounded-xl text-left shadow-sm hover:border-[#6A1423] shrink-0"
            aria-label="Change pack size"
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#171717] line-clamp-1 leading-tight">
                {selectedVariant.capsuleCount} Capsules
              </span>
              <span className="text-[10px] text-[#6A1423] font-black leading-tight">
                ₹{selectedVariant.price}
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {/* Right Action Buttons */}
          <div className="flex-1 flex items-center gap-1.5">
            {/* Add to Cart Icon Button */}
            <button
              onClick={handleAddToCart}
              className="p-2.5 bg-[#C7A33A]/15 border border-[#C7A33A]/60 rounded-xl text-[#9A7B24] hover:bg-[#C7A33A] hover:text-white transition-colors shrink-0"
              aria-label="Add to Cart"
              title="Add to Cart"
            >
              <ShoppingBag size={18} />
            </button>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[#6A1423] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-3 rounded-xl shadow-md hover:bg-[#520f1b] transition-all flex items-center justify-center gap-1 active:scale-[0.98]"
            >
              <span>BUY NOW</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
