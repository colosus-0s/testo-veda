import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck } from 'lucide-react';

export const AdminInventoryPage: React.FC = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const handleStockUpdate = (prodId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === prodId ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    );
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#171717]">Inventory & Stock Control</h2>
        <p className="text-xs text-slate-600">Monitor warehouse stock counts and update batch availability.</p>
      </div>

      <div className="space-y-4">
        {products.map((prod) => (
          <div key={prod.id} className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={prod.images.primary} alt={prod.name} className="w-16 h-16 object-contain bg-[#FCFBF8] rounded-xl p-2 border border-[#EBE7DF]" />
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-base text-[#171717]">{prod.name}</h3>
                  <Badge variant="veg">100% Veg</Badge>
                </div>
                <p className="text-slate-600">{prod.subtitle}</p>
                <p className="flex items-center gap-1 text-[11px] text-[#173C2B] font-bold">
                  <ShieldCheck size={14} /> FSSAI Lic. #{prod.regulatory.fssaiLicense}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="text-right mr-2">
                <span className="text-slate-500 font-bold block">Current Stock</span>
                <span className={`font-serif font-extrabold text-xl ${prod.stock < 20 ? 'text-red-700' : 'text-emerald-700'}`}>
                  {prod.stock} Units
                </span>
              </div>

              <div className="flex items-center gap-1 bg-[#FCFBF8] border border-[#EBE7DF] p-1.5 rounded-xl">
                <button
                  onClick={() => handleStockUpdate(prod.id, -10)}
                  className="px-2.5 py-1 bg-[#F7F4ED] border border-[#EBE7DF] rounded text-xs font-bold hover:border-[#6A1423]"
                >
                  -10
                </button>
                <button
                  onClick={() => handleStockUpdate(prod.id, +10)}
                  className="px-2.5 py-1 bg-[#F7F4ED] border border-[#EBE7DF] rounded text-xs font-bold hover:border-[#6A1423]"
                >
                  +10
                </button>
                <button
                  onClick={() => handleStockUpdate(prod.id, +50)}
                  className="px-2.5 py-1 bg-[#6A1423] text-white rounded text-xs font-bold hover:bg-[#3D0B15]"
                >
                  +50
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
