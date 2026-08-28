import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deactivateProduct } from '@/repositories/productRepository';
import type { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit2, Archive, Search, Package } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeactivate = async (id: string) => {
    if (window.confirm('Are you sure you want to deactivate/archive this formulation?')) {
      await deactivateProduct(id);
      setProducts(getProducts());
    }
  };

  const filteredProducts = (products || []).filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 text-left">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#171717]">Product Catalog Management</h2>
          <p className="text-xs text-slate-600">
            Manage botanical formulations, stock availability, pricing, and storefront catalog visibility.
          </p>
        </div>

        <Link to="/admin/products/new">
          <Button variant="primary" size="md" leftIcon={<Plus size={16} />}>
            Create New Product
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4 bg-[#F7F4ED] p-4 rounded-2xl border border-[#EBE7DF]">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search product title, category, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
          />
        </div>

        <span className="text-xs text-slate-500 font-bold hidden sm:inline">
          Showing {filteredProducts.length} Formulation{filteredProducts.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF] text-center space-y-3">
          <Package className="w-12 h-12 text-slate-400 mx-auto" />
          <h4 className="font-serif text-xl font-bold text-[#171717]">No Products Located</h4>
          <p className="text-xs text-slate-600">Try adjusting your search criteria or add a new product formulation.</p>
          <Link to="/admin/products/new" className="inline-block pt-2">
            <Button variant="primary" size="md" leftIcon={<Plus size={16} />}>Add Product</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto border border-[#EBE7DF] rounded-2xl shadow-subtle-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F4ED] text-[#171717] font-bold border-b border-[#EBE7DF]">
              <tr>
                <th className="p-4">Product Formulation</th>
                <th className="p-4">SKU / Category</th>
                <th className="p-4">Offer Price</th>
                <th className="p-4">MRP</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE7DF] bg-[#FCFBF8]">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#F7F4ED]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images?.primary || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop'}
                        alt={prod.name}
                        className="w-12 h-12 object-contain bg-white rounded-xl p-1 border border-[#EBE7DF]"
                      />
                      <div>
                        <span className="font-serif font-bold text-sm text-[#171717] block">
                          {prod.name}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">{prod.packSize}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-mono text-slate-700 font-bold block">{prod.sku || 'N/A'}</span>
                    <span className="capitalize text-slate-500 text-[11px]">{prod.category}</span>
                  </td>

                  <td className="p-4 font-serif font-bold text-sm text-[#6A1423]">
                    ₹{(prod.price || 0).toLocaleString('en-IN')}
                  </td>

                  <td className="p-4 text-slate-500 line-through">
                    ₹{(prod.compareAtPrice || prod.price || 0).toLocaleString('en-IN')}
                  </td>

                  <td className="p-4 font-bold text-[#171717]">
                    <span className={prod.stock <= (prod.regulatory ? 10 : 5) ? 'text-amber-700 font-extrabold' : ''}>
                      {prod.stock} units
                    </span>
                  </td>

                  <td className="p-4">
                    {prod.stock > 0 ? (
                      <Badge variant="green">ACTIVE</Badge>
                    ) : (
                      <Badge variant="maroon">OUT OF STOCK</Badge>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/products/${prod.id}/edit`}>
                        <Button variant="outline" size="sm" leftIcon={<Edit2 size={12} />}>
                          Edit
                        </Button>
                      </Link>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeactivate(prod.id)}
                        className="text-red-700 hover:bg-red-50"
                        title="Deactivate / Archive Product"
                      >
                        <Archive size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
