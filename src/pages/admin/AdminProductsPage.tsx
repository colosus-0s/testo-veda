import React from 'react';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#171717]">Product Catalog & Inventory</h2>
        <p className="text-xs text-slate-600">Active formulations, price points, packaging sizes, and stock availability.</p>
      </div>

      <div className="divide-y divide-[#EBE7DF] border border-[#EBE7DF] rounded-2xl overflow-hidden bg-[#F7F4ED]">
        {INITIAL_PRODUCTS.map((prod) => (
          <div key={prod.id} className="p-6 bg-[#FCFBF8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={prod.images.primary} alt={prod.name} className="w-16 h-16 object-contain bg-[#F7F4ED] rounded-xl p-2 border border-[#EBE7DF]" />
              <div className="space-y-1 text-xs text-slate-800">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-base text-[#171717]">{prod.name}</h3>
                  <Badge variant="veg">100% Veg</Badge>
                  <Badge variant="maroon">{prod.category}</Badge>
                </div>
                <p className="text-slate-600 font-semibold">{prod.subtitle}</p>
                <p className="flex items-center gap-1 text-[11px] text-[#173C2B] font-bold"><ShieldCheck size={14} /> FSSAI Lic. #{prod.regulatory.fssaiLicense}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-right">
              <div>
                <span className="text-slate-500 font-bold block">MRP</span>
                <span className="font-serif font-extrabold text-base text-[#6A1423]">₹{prod.price}</span>
              </div>

              <div>
                <span className="text-slate-500 font-bold block">Stock Level</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mt-0.5">
                  {prod.stock} In Stock
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
