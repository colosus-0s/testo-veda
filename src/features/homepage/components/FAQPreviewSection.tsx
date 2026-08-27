import React from 'react';
import { motion } from 'framer-motion';
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
    content: 'Yes. Arogya Path TESTO Natural Power+ is marketed under FSSAI License No. 12118441000654. The capsule shell is made from 100% vegetarian cellulose (E 464) and carries the official green vegetarian mark.',
  },
  {
    id: 'faq-4',
    title: 'Where is the product manufactured?',
    content: 'TESTO Natural Power+ is manufactured by Streamline Pharma Private Limited in Jagraon (Punjab) in ISO 9001:2015 & GMP certified facilities, and marketed by Arogyapath Marketing.',
  },
  {
    id: 'faq-5',
    title: 'What are the shipping charges and delivery timelines?',
    content: 'We offer free delivery across India on orders above ₹499. Standard delivery timelines range from 2 to 5 business days depending on destination pincode.',
  },
];

export const FAQPreviewSection: React.FC = () => {
  return (
    <Section padding="xl" className="bg-[#f5f5f7] border-y border-neutral-300 text-[#111115]">
      <Container size="narrow">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase font-bold tracking-widest text-[#8b1528] block mb-2"
          >
            Frequently Asked Questions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#111115] mb-3"
          >
            Clear Product Clarity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-slate-600 font-normal"
          >
            Factual details about our formulation, usage, regulatory license, and delivery.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm"
        >
          <Accordion items={HOMEPAGE_FAQ} defaultOpenId="faq-1" />
        </motion.div>
      </Container>
    </Section>
  );
};
