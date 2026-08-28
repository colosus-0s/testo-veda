import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await forgotPassword(email);
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
      <Section padding="lg" background="ivory">
        <Container size="narrow">
          <Breadcrumb items={[{ label: 'Reset Password' }]} className="mb-8 text-slate-700" />

          <div className="bg-[#FCFBF8] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] shadow-subtle-card max-w-md mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2">
                Account Recovery
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#171717] mb-2">
                Reset Your Password
              </h1>
              <p className="text-xs text-slate-600">
                Enter your registered email address to receive password reset instructions.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#171717]">Reset Instructions Sent</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  We have sent password recovery instructions to <strong>{email}</strong>. Please check your inbox.
                </p>
                <Link to="/login" className="inline-block pt-2">
                  <Button variant="primary" size="md">
                    Return to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aarav.sharma@example.com"
                      className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] placeholder-slate-400 focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full shadow-md font-bold text-sm"
                  disabled={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Sending Instructions...' : 'Send Recovery Email'}
                </Button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-[#EBE7DF] text-center text-xs text-slate-700">
              <p>
                Remember your password?{' '}
                <Link to="/login" className="font-bold text-[#6A1423] hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
