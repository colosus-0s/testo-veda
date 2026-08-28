import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createProduct } from '@/repositories/productRepository';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Save, Package, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';

export const AdminProductCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    subtitle: 'Ayurvedic Dietary Supplement',
    category: 'vitality',
    price: 999,
    compareAtPrice: 1499,
    packSize: '30 Veg Capsules (500mg)',
    capsuleCount: 30,
    stock: 50,
    lowStockThreshold: 10,
    primaryImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
    galleryImages: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
    badges: '100% Ayurvedic, FSSAI Approved, GMP Certified',
    shortDescription: 'Botanical dietary supplement formulated with high-potency herbs to support daily vitality.',
    description: 'Comprehensive Ayurvedic dietary formulation crafted according to traditional texts.',
    featured: true,
  });

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

      const created = await createProduct({
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        sku: formData.sku || `AP-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        subtitle: formData.subtitle,
        category: formData.category,
        price: formData.price,
        compareAtPrice: formData.compareAtPrice,
        packSize: formData.packSize,
        capsuleCount: formData.capsuleCount,
        stock: formData.stock,
        shortDescription: formData.shortDescription,
        description: formData.description,
        featured: formData.featured,
        images: {
          primary: formData.primaryImage,
          label: formData.primaryImage,
          render3d: formData.primaryImage,
          gallery: galleryArray.length > 0 ? galleryArray : [formData.primaryImage],
        },
        badges: badgesArray,
        regulatory: {
          fssaiLicense: '12118441000654',
          isVegetarian: true,
          certifications: ['GMP Certified', 'ISO 9001:2015', 'FSSAI'],
          marketedBy: 'Arogya Path Wellness Pvt. Ltd.',
          manufacturedBy: 'Arogya Botanical Labs India',
          mrp: formData.compareAtPrice,
        },
      });

      setSuccessMessage(`Product "${created.name}" created successfully!`);
      setTimeout(() => {
        navigate('/admin/products');
      }, 1200);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-4">
        <div>
          <Link to="/admin/products" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1 mb-1">
            <ArrowLeft size={14} /> Back to Products Catalog
          </Link>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] flex items-center gap-2">
            <Package className="text-[#6A1423]" /> Create New Product Formulation
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Add a new dietary product to the Arogya Path database. It will immediately publish to the storefront upon creation.
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
        {/* Core Product Info */}
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
                placeholder="e.g. AROGYA Herbal Slumber Capsules"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1">Product Slug (URL)</label>
              <input
                type="text"
                name="slug"
                placeholder="e.g. arogya-herbal-slumber"
                value={formData.slug}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1">SKU Code</label>
              <input
                type="text"
                name="sku"
                placeholder="e.g. AP-SKU-8821"
                value={formData.sku}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              >
                <option value="vitality">Vitality & Power</option>
                <option value="wellness">General Wellness</option>
                <option value="immunity">Immunity Support</option>
                <option value="recovery">Sleep & Recovery</option>
              </select>
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

        {/* Inventory & Pack Configuration */}
        <div className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
          <h3 className="font-serif font-bold text-base text-[#171717] border-b border-[#EBE7DF] pb-2">
            Inventory & Pack Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#171717] block mb-1">Pack Size Label</label>
              <input
                type="text"
                name="packSize"
                placeholder="30 Veg Capsules (500mg)"
                value={formData.packSize}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1">Initial Stock Quantity *</label>
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

            <div>
              <label className="font-bold text-[#171717] block mb-1">Low Stock Alert Threshold</label>
              <input
                type="number"
                name="lowStockThreshold"
                min={1}
                value={formData.lowStockThreshold}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>
          </div>
        </div>

        {/* Media & Imagery */}
        <div className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
          <h3 className="font-serif font-bold text-base text-[#171717] border-b border-[#EBE7DF] pb-2 flex items-center gap-2">
            <ImageIcon size={16} className="text-[#173C2B]" /> Product Imagery & Badges
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-[#171717] block mb-1">Primary Image URL *</label>
              <input
                type="url"
                name="primaryImage"
                required
                value={formData.primaryImage}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
              {formData.primaryImage && (
                <div className="mt-2 flex items-center gap-3 bg-white p-2 rounded-xl border border-[#EBE7DF] w-fit">
                  <img src={formData.primaryImage} alt="Preview" className="w-12 h-12 object-contain rounded-lg" />
                  <span className="text-[11px] text-slate-500 font-semibold">Primary Image Preview</span>
                </div>
              )}
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1">Gallery Image URLs (Comma Separated)</label>
              <input
                type="text"
                name="galleryImages"
                value={formData.galleryImages}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1">Badges & Highlights (Comma Separated)</label>
              <input
                type="text"
                name="badges"
                value={formData.badges}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
          <h3 className="font-serif font-bold text-base text-[#171717] border-b border-[#EBE7DF] pb-2">
            Product Descriptions & Store Visibility
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-[#171717] block mb-1">Short Description (Catalog Summary)</label>
              <textarea
                name="shortDescription"
                rows={2}
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1">Full Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-[#6A1423] rounded focus:ring-[#6A1423]"
              />
              <label htmlFor="featured" className="font-bold text-[#171717] cursor-pointer">
                Feature product in store catalog & search highlights
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
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
            {isSubmitting ? 'Publishing Product...' : 'Publish Product to Storefront'}
          </Button>
        </div>
      </form>
    </div>
  );
};
