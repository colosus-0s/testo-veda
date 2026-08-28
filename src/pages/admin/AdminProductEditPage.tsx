import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, updateProduct } from '@/repositories/productRepository';
import type { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Save, Package, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';

export const AdminProductEditPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const initialProduct = productId ? getProductById(productId) : null;
  const [product, setProduct] = useState<Product | null>(initialProduct);

  const [formData, setFormData] = useState(() => ({
    name: initialProduct?.name || '',
    slug: initialProduct?.slug || '',
    sku: initialProduct?.sku || '',
    subtitle: initialProduct?.subtitle || '',
    category: initialProduct?.category || 'vitality',
    price: initialProduct?.price || 0,
    compareAtPrice: initialProduct?.compareAtPrice || initialProduct?.price || 0,
    packSize: initialProduct?.packSize || '',
    stock: initialProduct?.stock || 0,
    primaryImage: initialProduct?.images?.primary || '',
    galleryImages: initialProduct?.images?.gallery ? initialProduct.images.gallery.join(', ') : '',
    badges: initialProduct?.badges ? initialProduct.badges.join(', ') : '',
    shortDescription: initialProduct?.shortDescription || '',
    description: initialProduct?.description || '',
    featured: initialProduct?.featured ?? true,
  }));

  if (!product) {
    return (
      <div className="space-y-6 text-left py-12">
        <Link to="/admin/products" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1.5">
          <ArrowLeft size={16} /> Back to Products Catalog
        </Link>
        <div className="py-16 bg-[#F7F4ED] rounded-3xl border border-[#EBE7DF] text-center space-y-3">
          <Package className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#171717]">Product Formulation Not Found</h3>
          <p className="text-xs text-slate-600">No product matches the requested ID or slug.</p>
          <Link to="/admin/products" className="inline-block pt-2">
            <Button variant="primary" size="md">Return to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const galleryArray = formData.galleryImages
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const badgesArray = formData.badges
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const updated = await updateProduct(product.id, {
        name: formData.name,
        slug: formData.slug,
        sku: formData.sku,
        subtitle: formData.subtitle,
        category: formData.category,
        price: formData.price,
        compareAtPrice: formData.compareAtPrice,
        packSize: formData.packSize,
        stock: formData.stock,
        shortDescription: formData.shortDescription,
        description: formData.description,
        featured: formData.featured,
        images: {
          ...product.images,
          primary: formData.primaryImage,
          gallery: galleryArray.length > 0 ? galleryArray : [formData.primaryImage],
        },
        badges: badgesArray,
      });

      if (updated) {
        setProduct(updated);
        setSuccessMessage(`Product "${updated.name}" updated successfully!`);
        setTimeout(() => {
          navigate('/admin/products');
        }, 1200);
      }
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-4">
        <div>
          <Link to="/admin/products" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1 mb-1">
            <ArrowLeft size={14} /> Back to Products Catalog
          </Link>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] flex items-center gap-2">
            <Package className="text-[#6A1423]" /> Edit Formulation: {product.name}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Update pricing, inventory stock, images, and regulatory details for this product.
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-emerald-900">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
          <h3 className="font-serif font-bold text-base text-[#171717] border-b border-[#EBE7DF] pb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-[#6A1423]" /> Product Identity & Pricing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#171717] block mb-1">Product Title *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1">Product Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1">Offer Price (₹) *</label>
              <input
                type="number"
                name="price"
                required
                min={0}
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs font-bold text-[#6A1423] focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1">MRP / Compare Price (₹)</label>
              <input
                type="number"
                name="compareAtPrice"
                min={0}
                value={formData.compareAtPrice}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
          <h3 className="font-serif font-bold text-base text-[#171717] border-b border-[#EBE7DF] pb-2">
            Inventory & Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#171717] block mb-1">Pack Size</label>
              <input
                type="text"
                name="packSize"
                value={formData.packSize}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1">Current Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                required
                min={0}
                value={formData.stock}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs font-bold text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
          <h3 className="font-serif font-bold text-base text-[#171717] border-b border-[#EBE7DF] pb-2 flex items-center gap-2">
            <ImageIcon size={16} className="text-[#173C2B]" /> Primary Image
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-[#171717] block mb-1">Primary Image URL</label>
              <input
                type="url"
                name="primaryImage"
                value={formData.primaryImage}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
              {formData.primaryImage && (
                <div className="mt-2 flex items-center gap-3 bg-white p-2 rounded-xl border border-[#EBE7DF] w-fit">
                  <img src={formData.primaryImage} alt="Preview" className="w-12 h-12 object-contain rounded-lg" />
                  <span className="text-[11px] text-slate-500 font-semibold">Active Primary Image</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link to="/admin/products">
            <Button variant="outline" size="md">Cancel</Button>
          </Link>
          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={isSubmitting}
            leftIcon={<Save size={16} />}
          >
            {isSubmitting ? 'Saving Changes...' : 'Save Product Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};
