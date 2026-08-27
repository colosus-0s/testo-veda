import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ReviewCard } from '@/components/commerce/ReviewCard';
import { ProductRating } from '@/components/commerce/ProductRating';
import type { Review } from '@/types/review';

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-testo-natural-power-plus',
    author: 'Vikram S.',
    location: 'Mumbai, MH',
    rating: 5,
    title: 'Genuine botanical supplement that actually feels premium',
    body: 'I appreciate the clean vegetarian capsule and clear ingredient disclosure. Noticeable improvement in daily stamina after 3 weeks of consistent use.',
    verifiedPurchase: true,
    date: '14 Aug 2026',
    featured: true,
  },
  {
    id: 'rev-2',
    productId: 'prod-testo-natural-power-plus',
    author: 'Rahul M.',
    location: 'Bengaluru, KA',
    rating: 5,
    title: 'Great energy support without jitters',
    body: 'Taking 1 capsule twice daily post meals. Ashwagandha and Shilajit combination works well for recovery after workout sessions.',
    verifiedPurchase: true,
    date: '02 Aug 2026',
    featured: true,
  },
  {
    id: 'rev-3',
    productId: 'prod-testo-natural-power-plus',
    author: 'Aniket R.',
    location: 'Delhi, NCR',
    rating: 5,
    title: 'Authentic packaging and FSSAI verified',
    body: 'Received order in 2 days. Bottle comes with authentic security seals and clear manufacturing details. Highly satisfied.',
    verifiedPurchase: true,
    date: '28 Jul 2026',
    featured: true,
  },
];

export const ReviewsSection: React.FC = () => {
  return (
    <Section padding="xl" dark className="border-t border-neutral-800/80">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-2">
              Verified Buyer Feedback
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white">
              Customer Experiences
            </h2>
          </div>

          <div className="glass-card px-5 py-3 rounded-lg flex items-center gap-4 border border-neutral-800">
            <div className="text-3xl font-serif-display font-extrabold text-white">4.8</div>
            <div>
              <ProductRating rating={4.8} showCount={false} size="sm" />
              <span className="text-xs text-neutral-400 block mt-0.5">Based on 142 verified ratings</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
