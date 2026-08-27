import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Accordion } from '@/components/ui/Accordion';

const HOMEPAGE_FAQ = [
  {
    id: 'faq-1',
    title: 'What are the main ingredients in TESTO Natural Power+?',
    content: 'Each vegetarian capsule contains Ashwagandha (100mg), Gokhuru / Tribulus (100mg), Safed Musli (50mg), Sea Buckthorn (50mg), Fenugreek (30mg), Saffron (15mg), and a 170mg extract blend of Kaunch Beej, Purified Shilajit, Talmakhana, and Ginger.',
  },
  {
    id: 'faq-2',
    title: 'How should I consume TESTO Natural Power+ capsules?',
    content: 'As stated on the official packaging label: Take one capsule twice daily after meals with lukewarm milk or water, or as directed by your healthcare dietician. Swallow capsules whole without chewing or crushing.',
  },
  {
    id: 'faq-3',
    title: 'Is this product FSSAI registered and 100% vegetarian?',
    content: 'Yes. Arogya Path TESTO Natural Power+ is manufactured under FSSAI License No. 12118441000654. The capsule shell is made from 100% vegetarian cellulose (E 464) and carries the official green vegetarian mark.',
  },
  {
    id: 'faq-4',
    title: 'How long should I take TESTO Power+ for optimal results?',
    content: 'For best results, we recommend consistent usage for 2–3 months alongside a balanced diet, adequate sleep, and regular physical activity.',
  },
  {
    id: 'faq-5',
    title: 'What are the shipping charges and delivery timelines?',
    content: 'We offer free express delivery across India on orders above ₹499. Typical delivery timelines range from 2 to 5 business days depending on your pincode.',
  },
];

export const FAQPreviewSection: React.FC = () => {
  return (
    <Section padding="xl">
      <Container size="narrow">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8b1528] block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-sm text-neutral-300">
            Clear, transparent details about our formulation, safety, and delivery.
          </p>
        </div>

        <Accordion items={HOMEPAGE_FAQ} defaultOpenId="faq-1" />
      </Container>
    </Section>
  );
};
