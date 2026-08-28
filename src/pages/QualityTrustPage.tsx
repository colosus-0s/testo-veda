import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SITE_CONFIG } from '@/config/site';
import { ShieldCheck, Award, Leaf, Factory, FileText, CheckCircle2, Building, Mail, Phone } from 'lucide-react';

export const QualityTrustPage: React.FC = () => {
  const compliancePillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#6A1423]" />,
      title: 'FSSAI License Compliance',
      subtitle: `Lic. No. ${SITE_CONFIG.fssaiLicense}`,
      desc: 'Marketed under valid FSSAI license for dietary botanical supplement distribution in India.',
    },
    {
      icon: <Award className="w-8 h-8 text-[#6A1423]" />,
      title: 'ISO & GMP Standards',
      subtitle: 'ISO 9001:2015 & ISO 22000:2018',
      desc: 'Formulated and processed in certified manufacturing facilities maintaining strict quality control systems.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-[#6A1423]" />,
      title: '100% Vegetarian Shells',
      subtitle: 'HPMC Cellulose (E 464)',
      desc: 'Clean vegetarian capsule shells formulated without gelatin, carry the official green vegetarian symbol.',
    },
    {
      icon: <Factory className="w-8 h-8 text-[#6A1423]" />,
      title: 'Verified Manufacturing',
      subtitle: 'Streamline Pharma Pvt. Ltd.',
      desc: 'Manufactured by Streamline Pharma Private Limited (Jagraon - 142026) under rigorous pharmaceutical standards.',
    },
    {
      icon: <FileText className="w-8 h-8 text-[#6A1423]" />,
      title: 'Quantitative Label Disclosure',
      subtitle: 'Full Transparency',
      desc: 'Every active botanical extract and ingredient in our 170mg blend is declared with quantitative accuracy.',
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-[#6A1423]" />,
      title: 'Dietary Supplement Standard',
      subtitle: 'Non-Medicinal Support',
      desc: 'Formulated as a dietary botanical supplement for daily routine integration and physical stamina support.',
    },
  ];

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen">
      {/* Page Hero Stage with explicit Deep Botanical Green background */}
      <Section padding="md" background="deep-green" className="border-b border-[#2E6B4A]/50">
        <Container>
          <Breadcrumb items={[{ label: 'Quality & Trust' }]} className="mb-6 text-[#E2E8F0]" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#F3E5AB] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/20">
              Regulatory Transparency
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Quality & Regulatory Compliance
            </h1>
            <p className="text-[#E2E8F0] text-base sm:text-lg leading-relaxed font-normal">
              We operate with complete factual clarity regarding our regulatory licencing, manufacturing partners, and botanical standards.
            </p>
          </div>
        </Container>
      </Section>

      {/* Compliance Pillars Grid */}
      <Section padding="xl" background="white" className="border-b border-[#EBE7DF]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2">
              Factual Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Six Pillars of Regulatory Integrity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {compliancePillars.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F7F4ED] rounded-2xl p-8 border border-[#EBE7DF] shadow-subtle-card space-y-4 text-left hover:border-[#6A1423]/40 transition-all"
              >
                <div className="p-3 bg-red-50 rounded-xl w-fit border border-red-100">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6A1423] tracking-widest block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#171717] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Manufacturing & Commercial Disclosure Stage */}
      <Section padding="xl" background="ivory" className="border-b border-[#EBE7DF]">
        <Container size="narrow">
          <div className="bg-[#FCFBF8] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] shadow-subtle-card space-y-8 text-left">
            <div className="border-b border-[#EBE7DF] pb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[#173C2B] block mb-2">
                Corporate Entity Details
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
                Manufacturing & Marketing Declaration
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-slate-800 font-normal">
              {/* Marketed By */}
              <div className="space-y-3 bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF]">
                <div className="flex items-center gap-2 text-[#6A1423] font-bold text-sm">
                  <Building size={18} />
                  <span>Marketed By</span>
                </div>
                <p className="font-bold text-[#171717] text-sm">{SITE_CONFIG.brandName} MARKETING</p>
                <p>Ashok Nagar, Logardaga, Jharkhand</p>
                <div className="pt-2 border-t border-[#EBE7DF] space-y-1.5 text-[11px] font-semibold text-slate-700">
                  <p className="flex items-center gap-2"><Mail size={14} className="text-[#6A1423]" /> {SITE_CONFIG.supportEmail}</p>
                  <p className="flex items-center gap-2"><Phone size={14} className="text-[#6A1423]" /> {SITE_CONFIG.supportPhone}</p>
                </div>
              </div>

              {/* Manufactured By */}
              <div className="space-y-3 bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF]">
                <div className="flex items-center gap-2 text-[#173C2B] font-bold text-sm">
                  <Factory size={18} />
                  <span>Manufactured By</span>
                </div>
                <p className="font-bold text-[#171717] text-sm">Streamline Pharma Private Limited</p>
                <p>Jagraon - 142026, Punjab, India</p>
                <div className="pt-2 border-t border-[#EBE7DF] space-y-1.5 text-[11px] font-semibold text-slate-700">
                  <p className="flex items-center gap-2"><ShieldCheck size={14} className="text-[#173C2B]" /> FSSAI Lic. #{SITE_CONFIG.fssaiLicense}</p>
                  <p className="flex items-center gap-2"><Award size={14} className="text-[#173C2B]" /> ISO 9001:2015 & GMP</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
