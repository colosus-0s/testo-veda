import React from 'react';
import { ShieldCheck, Award, Leaf, Lock, HeartHandshake, CheckCircle } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SITE_CONFIG } from '@/config/site';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      title: 'FSSAI License Compliant',
      desc: `Registered & audited under FSSAI License No. ${SITE_CONFIG.fssaiLicense}.`,
    },
    {
      icon: <Award className="w-8 h-8 text-[#d4af37]" />,
      title: 'ISO 9001:2015 & GMP Seals',
      desc: 'Formulated in WHO-GMP certified facilities following strict quality control.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-emerald-500" />,
      title: '100% Vegetarian Capsules',
      desc: 'Encapsulated in vegetarian cellulose shells (E 464) with no animal gelatin.',
    },
    {
      icon: <Lock className="w-8 h-8 text-[#8b1528]" />,
      title: '100% Authentic Packaging',
      desc: 'Every bottle features tamper-evident safety seals and batch verification.',
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-[#d4af37]" />,
      title: 'Zero Hidden Hormones',
      desc: 'Clean dietary supplement formulation without synthetic steroids or prohibited substances.',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-emerald-400" />,
      title: 'Transparent Labeling',
      desc: 'Full qualitative and quantitative declaration of active botanical extracts.',
    },
  ];

  return (
    <Section id="quality" padding="xl">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-2">
            Quality Assurance
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Built on Evidence & Regulatory Integrity
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            We operate with complete transparency so you can verify our safety standards, manufacturing protocols, and compliance credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-6 flex items-start gap-4 hover:border-neutral-700 transition-colors"
            >
              <div className="shrink-0 p-2 bg-neutral-900/80 rounded-lg border border-neutral-800">
                {item.icon}
              </div>
              <div>
                <h3 className="font-serif-display text-lg font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
