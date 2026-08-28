import React, { useState } from 'react';
import { getProducts, updateStock } from '@/repositories/productRepository';
import type { Product } from '@/types/product';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Boxes, Plus, Minus, Search, AlertTriangle } from 'lucide-react';

export const AdminInventoryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [searchQuery, setSearchQuery] = useState('');

  const handleStockAdjust = async (id: string, delta: number) => {
    const target = products.find((p) => p.id === id);
    if (target) {
      const newStock = Math.max(0, target.stock + delta);
      await updateStock(id, newStock);
      setProducts(getProducts());
    }
  };

  const filtered = (products || []).filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#171717]">Inventory & Stock Control</h2>
          <p className="text-xs text-slate-600">Monitor warehouse availability and update stock thresholds in real time.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search SKU or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-9 pr-3 py-2 text-xs text-[#171717]"
          />
        </div>
      </div>

      <div className="overflow-x-auto border border-[#EBE7DF] rounded-2xl shadow-subtle-card">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F7F4ED] text-[#171717] font-bold border-b border-[#EBE7DF]">
            <tr>
              <th className="p-4">Formulation</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Pack Size</th>
              <th className="p-4">Current Stock</th>
              <th className="p-4">Stock Status</th>
              <th className="p-4 text-right">Instant Stock Adjusters</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBE7DF] bg-[#FCFBF8]">
            {filtered.map((prod) => {
              const isLowStock = prod.stock > 0 && prod.stock <= 15;
              const isOutOfStock = prod.stock === 0;

              return (
                <tr key={prod.id} className="hover:bg-[#F7F4ED]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images?.primary || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop'}
                        alt={prod.name}
                        className="w-10 h-10 object-contain bg-white rounded-xl p-1 border border-[#EBE7DF]"
                      />
                      <span className="font-serif font-bold text-sm text-[#171717]">{prod.name}</span>
                    </div>
                  </td>

                  <td className="p-4 font-mono font-bold text-slate-700">{prod.sku || 'AP-SKU-1001'}</td>

                  <td className="p-4 text-slate-600">{prod.packSize}</td>

                  <td className="p-4 font-extrabold text-sm text-[#171717]">
                    <span className={isLowStock ? 'text-amber-700' : isOutOfStock ? 'text-red-700' : 'text-emerald-800'}>
                      {prod.stock} units
                    </span>
                  </td>

                  <td className="p-4">
                    {isOutOfStock ? (
                      <Badge variant="maroon">OUT OF STOCK</Badge>
                    ) : isLowStock ? (
                      <Badge variant="gold" className="flex items-center gap-1 w-fit">
                        <AlertTriangle size={12} /> LOW STOCK
                      </Badge>
                    ) : (
                      <Badge variant="green">IN STOCK</Badge>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStockAdjust(prod.id, -10)}
                        title="Reduce stock by 10"
                        className="text-xs py-1 px-2"
                        leftIcon={<Minus size={12} />}
                      >
                        10
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStockAdjust(prod.id, 10)}
                        title="Increase stock by 10"
                        className="text-xs py-1 px-2"
                        leftIcon={<Plus size={12} />}
                      >
                        10
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleStockAdjust(prod.id, 50)}
                        title="Restock batch +50"
                        className="text-xs py-1 px-2.5"
                        leftIcon={<Boxes size={12} />}
                      >
                        +50 Batch
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
