import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductPrice } from '@/components/commerce/ProductPrice';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';

export const ProductIntroductionSection: React.FC = () => {
  const product = INITIAL_PRODUCTS[0];

  return (
    <Section padding="xl" className="bg-[#FCFBF8] border-b border-[#EBE7DF] text-[#171717] opacity-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 1. Product Image Stage */}
          <div className="lg:col-span-6 relative opacity-100">
            <div className="relative bg-[#F7F4ED] rounded-3xl p-8 sm:p-12 overflow-hidden flex items-center justify-center min-h-[440px] border border-[#EBE7DF] shadow-subtle-card">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6A1423]/5 via-transparent to-[#173C2B]/5 pointer-events-none" />
              <img
                src={product.images.render3d}
                alt={product.name}
                className="w-full max-w-xs sm:max-w-sm h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* 2. Purchasing & Details Stage */}
          <div className="lg:col-span-6 space-y-6 text-left opacity-100">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] bg-[#6A1423]/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-[#6A1423]/20">
                Core Botanical Supplement
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight mb-2">
                {product.name}
              </h2>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {product.shortDescription}
            </p>

            {/* Pack Size & Regulatory Pills */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-[#171717] font-semibold uppercase tracking-wider bg-[#F7F4ED] border border-[#EBE7DF] px-3 py-1.5 rounded-md">
                {product.packSize}
              </span>
              <span className="text-xs text-[#173C2B] font-semibold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md flex items-center gap-1.5">
                <CheckCircle2 size={14} /> 100% Veg
              </span>
              <span className="text-xs text-amber-900 font-semibold uppercase tracking-wider bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md">
                Lic. #{product.regulatory.fssaiLicense}
              </span>
            </div>

            {/* Discrepancy Notice Banner */}
            {product.discrepancyNotices && product.discrepancyNotices.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-950 font-bold mb-0.5">Dosage Label Note:</strong>
                  <span>{product.discrepancyNotices[0].note}</span>
                </div>
              </div>
            )}

            {/* Price & CTA */}
            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#EBE7DF]">
              <div>
                <span className="text-xs uppercase font-bold text-slate-700 block mb-1">Maximum Retail Price</span>
                <ProductPrice price={product.price} size="xl" textColor="text-[#171717]" showDiscountBadge={false} />
              </div>

              <Link to={`/products/${product.slug}`}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore TESTO BOOSTER
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
