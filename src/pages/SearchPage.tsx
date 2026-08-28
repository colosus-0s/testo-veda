import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const SearchPage: React.FC = () => {
  return (
    <Section padding="lg" background="ivory" className="text-left">
      <Container>
        <h1 className="font-serif text-3xl font-bold text-[#171717] mb-6">
          Search Storefront Products & Botanicals
        </h1>
        <input
          type="text"
          placeholder="Search catalog by name, botanical ingredient (e.g. Ashwagandha, Shilajit)..."
          className="w-full max-w-xl p-4 bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl text-xs text-[#171717] focus:outline-none focus:border-[#6A1423] mb-8"
        />
      </Container>
    </Section>
  );
};

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen flex items-center justify-center py-20">
      <Container size="narrow" className="text-center space-y-6">
        <h1 className="font-serif font-black text-7xl text-[#6A1423]">404</h1>
        <h2 className="font-serif text-2xl font-bold text-[#171717]">Page Not Found</h2>
        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          The page or route you are looking for does not exist or may have been relocated.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<ArrowLeft size={16} />}>
              Return to Storefront Homepage
            </Button>
          </Link>
          <Link to="/account">
            <Button variant="outline" size="md">
              My Account
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};
