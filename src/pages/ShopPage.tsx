import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/commerce/ProductCard';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ShieldCheck, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Formulations' },
    { id: 'vitality', label: 'Vitality & Stamina' },
    { id: 'vigor', label: 'Daily Vigor' },
    { id: 'adaptogen', label: 'Stress Adaptation' },
  ];

  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase().includes(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen">
      {/* Shop Hero Stage with explicit Deep Botanical Green background */}
      <Section padding="md" background="deep-green" className="border-b border-[#2E6B4A]/50">
        <Container>
          <Breadcrumb items={[{ label: 'Shop All Formulations' }]} className="mb-6 text-[#E2E8F0]" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#F3E5AB] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/20">
              Arogya Path Storefront Catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Botanical Supplement Storefront
            </h1>
            <p className="text-[#E2E8F0] text-base sm:text-lg leading-relaxed font-normal">
              Explore our core dietary formulations crafted with classical botanical extracts and transparent label disclosures.
            </p>

            <div className="flex items-center gap-4 flex-wrap pt-4 text-xs font-semibold text-[#E2E8F0]">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md border border-white/15">
                <ShieldCheck className="w-4 h-4 text-[#F3E5AB]" /> FSSAI Lic. #12118441000654
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md border border-white/15">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Vegetarian Capsules
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md border border-white/15">
                <Sparkles className="w-4 h-4 text-[#F3E5AB]" /> ISO 9001 & GMP Certified
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Filter & Catalog Controls */}
      <Section padding="lg" background="white" className="border-b border-[#EBE7DF]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-[#EBE7DF]">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <Filter className="w-4 h-4 text-[#6A1423] shrink-0 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                    selectedCategory === cat.id
                      ? 'bg-[#6A1423] text-white border-[#6A1423] shadow-sm'
                      : 'bg-[#F7F4ED] text-[#171717] border-[#EBE7DF] hover:border-[#6A1423]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Search Filter */}
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder="Search formulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-lg px-3.5 py-2 text-xs text-[#171717] placeholder-slate-500 focus:outline-none focus:border-[#6A1423] focus:ring-1 focus:ring-[#6A1423]"
              />
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-600 space-y-3">
              <p className="font-serif text-xl font-bold text-[#171717]">No formulations found matching "{searchQuery}"</p>
              <p className="text-xs">Try selecting another category or clear your search input.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-xs font-bold text-[#6A1423] underline pt-2"
              >
                Reset Storefront Filters
              </button>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};
