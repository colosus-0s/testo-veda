import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Accordion } from '@/components/ui/Accordion';

const HOMEPAGE_FAQ = [
  {
    id: 'faq-1',
    title: 'What are the active ingredients in TESTO BOOSTER?',
    content: 'Each vegetarian capsule contains Ashwagandha (100mg), Gokhuru / Tribulus (100mg), Safed Musli (50mg), Sea Buckthorn (50mg), Fenugreek (30mg), Saffron (15mg), and a 170mg extract blend of Kaunch Beej, Purified Shilajit, Talmakhana, and Ginger.',
  },
  {
    id: 'faq-2',
    title: 'How should I consume TESTO BOOSTER capsules?',
    content: 'As stated on our physical packaging label: "One capsule twice a day or as directed by a Healthcare Professional. Swallow whole with lukewarm milk or water after a meal." Do not open, chew, or crush capsules.',
  },
  {
    id: 'faq-3',
    title: 'What is the FSSAI license number and product classification?',
    content: 'Arogya Path TESTO BOOSTER is a botanical dietary health supplement marketed under active FSSAI License No. 12118441000654. The capsule shell is 100% vegetarian HPMC cellulose carrying the official green vegetarian mark.',
  },
  {
    id: 'faq-4',
    title: 'Where is the product manufactured and marketed?',
    content: 'TESTO BOOSTER is manufactured by STREAMLINE PHARMA PVT. LTD., KOTHE AATH CHAK-142026 in ISO 9001:2015 & GMP certified facilities, and marketed by AROGYA PATH MARKETING, Ashok Nagar, Lohardaga - 835302, M: 9288515228.',
  },
  {
    id: 'faq-5',
    title: 'How are orders fulfilled and supported?',
    content: 'Orders are securely packaged and dispatched across India with Cash on Delivery and online payment options. For order inquiries or customer assistance, our support line is M: 9288515228.',
  },
];

export const FAQPreviewSection: React.FC = () => {
  return (
    <Section padding="xl" className="bg-[#F7F4ED] border-b border-[#EBE7DF] text-[#171717] opacity-100">
      <Container size="narrow">
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2"
          >
            Product Clarity & Information
          </motion.span>
          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] mb-3"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-slate-700 font-normal max-w-xl mx-auto"
          >
            Factual information regarding formulation, directions, manufacturing compliance, and order fulfillment.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion items={HOMEPAGE_FAQ} defaultOpenId="faq-1" variant="cards" />
        </motion.div>
      </Container>
    </Section>
  );
};
