import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Accordion } from '@/components/ui/Accordion';
import { SITE_CONFIG } from '@/config/site';
import { Search, HelpCircle, Mail, Phone } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allFaqs = [
    {
      id: 'faq-1',
      category: 'product',
      title: 'What is TESTO BOOSTER Capsules?',
      content: 'TESTO BOOSTER is a dietary botanical supplement combining 10 classical plant extracts including Ashwagandha, Purified Shilajit, Gokhuru, Safed Musli, and Saffron designed for physical stamina, daily vigor, and stress adaptation.',
    },
    {
      id: 'faq-2',
      category: 'usage',
      title: 'What is the suggested dosage instructions?',
      content: 'As stated on our physical packaging label: One capsule twice a day as directed by dietician or physician, ideally taken post-meals with warm water or milk.',
    },
    {
      id: 'faq-3',
      category: 'ingredients',
      title: 'Is TESTO BOOSTER 100% vegetarian?',
      content: 'Yes. Every capsule shell is manufactured from 100% vegetarian HPMC cellulose (E 464) carrying the official green vegetarian mark.',
    },
    {
      id: 'faq-4',
      category: 'quality',
      title: 'What regulatory certifications does Arogya Path hold?',
      content: `Our products operate under FSSAI License No. ${SITE_CONFIG.fssaiLicense}. Formulated in ISO 9001:2015 and GMP certified manufacturing facilities (Streamline Pharma Private Limited).`,
    },
    {
      id: 'faq-5',
      category: 'ingredients',
      title: 'What active botanicals are included per capsule?',
      content: 'Each capsule discloses: Ashwagandha (100mg), Gokhuru / Tribulus (100mg), Safed Musli (50mg), Sea Buckthorn (50mg), Fenugreek (30mg), Saffron (15mg), and 170mg Proprietary Blend (Kaunch Beej, Purified Shilajit, Talmakhana, Ginger).',
    },
    {
      id: 'faq-6',
      category: 'product',
      title: 'What is the MRP of TESTO BOOSTER?',
      content: 'The Maximum Retail Price (MRP) is ₹1,499 for 30 Veg Capsules as declared on our physical label.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'product', label: 'Product & Pricing' },
    { id: 'usage', label: 'Dosage & Usage' },
    { id: 'ingredients', label: 'Ingredients & Safety' },
    { id: 'quality', label: 'Quality & Regulatory' },
  ];

  const filteredFaqs = allFaqs.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen">
      {/* Hero Stage with explicit Deep Botanical Green background */}
      <Section padding="md" background="deep-green" className="border-b border-[#2E6B4A]/50">
        <Container>
          <Breadcrumb items={[{ label: 'Frequently Asked Questions' }]} className="mb-6 text-[#E2E8F0]" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#F3E5AB] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/20">
              Customer Help & Clarity
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-[#E2E8F0] text-base sm:text-lg leading-relaxed font-normal">
              Find clear answers regarding product formulations, dosage guidelines, FSSAI regulatory licencing, and order fulfillment.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main FAQ Stage */}
      <Section padding="xl" background="white" className="border-b border-[#EBE7DF]">
        <Container size="narrow">
          {/* Controls Bar */}
          <div className="space-y-6 mb-12">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] placeholder-slate-500 focus:outline-none focus:border-[#6A1423]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
          </div>

          {/* Accordion Results */}
          {filteredFaqs.length > 0 ? (
            <Accordion items={filteredFaqs} />
          ) : (
            <div className="py-12 text-center text-slate-600">
              <p className="font-serif text-lg font-bold text-[#171717] mb-2">No matching questions found</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-xs font-bold text-[#6A1423] underline"
              >
                Reset FAQ Filters
              </button>
            </div>
          )}

          {/* Support Callout Banner */}
          <div className="mt-16 bg-[#F7F4ED] rounded-3xl p-8 border border-[#EBE7DF] text-center space-y-4">
            <HelpCircle className="w-8 h-8 text-[#6A1423] mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#171717]">Have Additional Questions?</h3>
            <p className="text-xs text-slate-700 max-w-md mx-auto">
              Our customer support team is available to assist you with order inquiries, product guidance, and regulatory verification.
            </p>
            <div className="flex items-center justify-center gap-6 pt-2 text-xs font-bold text-[#6A1423] flex-wrap">
              <span className="flex items-center gap-2"><Mail size={16} /> {SITE_CONFIG.supportEmail}</span>
              <span className="flex items-center gap-2"><Phone size={16} /> {SITE_CONFIG.supportPhone}</span>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
