import React, { useState } from 'react';
import { MessageSquare, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const MobileCustomerReviews: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && review) {
      setSubmitted(true);
      setShowForm(false);
    }
  };

  return (
    <section aria-label="Customer Reviews" className="py-8 bg-[#FCFBF8] border-b border-[#EBE7DF] overflow-hidden select-none">
      <div className="px-4 text-center max-w-lg mx-auto">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A1423] block mb-1">
          Storefront Feedback
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#171717] mb-2">
          Customer Reviews
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          We believe in authentic, unembellished feedback. If you have incorporated TESTO BOOSTER CAPSULES into your daily routine, we welcome your experience.
        </p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-serif text-base font-bold text-emerald-950">Thank You for Sharing</h4>
            <p className="text-xs text-emerald-800">
              Your review has been received and will be verified by our team prior to publication.
            </p>
          </div>
        ) : showForm ? (
          <form onSubmit={handleSubmit} className="bg-[#F7F4ED] border border-[#EBE7DF] rounded-2xl p-6 text-left space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#171717]">Share Your Experience</h4>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-white border border-[#EBE7DF] rounded-lg px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Review Comments</label>
              <textarea
                required
                rows={3}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Describe your experience with the formulation and daily usage"
                className="w-full bg-white border border-[#EBE7DF] rounded-lg px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="primary" size="sm" className="flex-1 font-bold">
                Submit Review
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="bg-[#F7F4ED] border border-[#EBE7DF] rounded-2xl p-6 text-center space-y-3">
            <MessageSquare className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-600">
              No verified customer reviews have been published for this batch yet.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowForm(true)}
              className="border-[#6A1423] text-[#6A1423] hover:bg-[#6A1423] hover:text-white font-bold"
            >
              Write First Review
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
