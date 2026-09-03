import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/commerce/ProductCard';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { Button } from '@/components/ui/Button';

export const CollectionPreviewSection: React.FC = () => {
  const product = INITIAL_PRODUCTS[0];

  return (
    <Section padding="xl" className="bg-[#FCFBF8] border-b border-[#EBE7DF] text-[#171717] opacity-100">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] bg-[#6A1423]/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-[#6A1423]/20">
              Catalog Storefront
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Featured Botanical Formulations
            </h2>
          </div>

          <div>
            <Link to="/shop">
              <Button
                variant="primary"
                size="md"
                className="bg-[#6A1423] text-white border border-[#6A1423] hover:bg-[#3D0B15] hover:border-[#3D0B15] font-semibold opacity-100 shadow-md transition-colors duration-200"
                rightIcon={<ArrowRight className="w-4 h-4 text-white shrink-0" />}
              >
                View Full Storefront
              </Button>
            </Link>
          </div>
        </div>

        {/* Balanced Showcase Stage (No Giant Empty Area) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Product Card (Lg Col 7) */}
          <div className="lg:col-span-7">
            <ProductCard product={product} className="h-full shadow-md border-slate-300" />
          </div>

          {/* Complementary Merchandising Showcase Banner (Lg Col 5) */}
          <div className="lg:col-span-5 bg-[#F7F4ED] rounded-2xl p-8 border border-[#EBE7DF] shadow-subtle-card flex flex-col justify-between space-y-6 text-left">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#173C2B] bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full inline-block mb-4">
                Storefront Standards
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#171717] mb-3">
                Quantitative Botanical Formulation
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed font-normal mb-6">
                Every bottle contains 30 vegetarian capsules formulated with 10 classical plant extracts including Ashwagandha, Shilajit, Gokhuru, and Saffron.
              </p>

              <div className="space-y-3 border-t border-[#EBE7DF] pt-4">
                <div className="flex items-center gap-3 text-xs font-bold text-[#171717]">
                  <CheckCircle2 size={16} className="text-[#173C2B] shrink-0" />
                  <span>100% Vegetarian HPMC Capsules (E 464)</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-[#171717]">
                  <ShieldCheck size={16} className="text-[#173C2B] shrink-0" />
                  <span>FSSAI License No. {product.regulatory.fssaiLicense}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-[#171717]">
                  <Award size={16} className="text-[#173C2B] shrink-0" />
                  <span>ISO 9001:2015 & GMP Certified Facilities</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EBE7DF]">
              <Link to={`/products/${product.slug}`}>
                <Button variant="primary" size="md" className="w-full shadow-md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore TESTO BOOSTER Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
