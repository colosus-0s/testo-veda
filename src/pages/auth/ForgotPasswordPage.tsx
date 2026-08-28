import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { forgotPassword, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    const res = await forgotPassword(email);
    if (res.success) {
      setMessage(res.message || 'Password reset instructions sent to your email.');
    } else {
      setError(res.error || 'Failed to send reset link.');
    }
  };

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-[80vh] flex items-center">
      <Section padding="lg" background="ivory" className="w-full">
        <Container size="narrow">
          <div className="bg-[#FCFBF8] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] shadow-subtle-card max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423]">
                Account Recovery
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#171717]">
                Reset Your Password
              </h1>
              <p className="text-xs text-slate-600">
                Enter your registered email address to receive password recovery instructions.
              </p>
            </div>

            {message && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3.5 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-900 rounded-xl p-3.5 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#171717] block">Registered Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-2 font-bold"
                disabled={loading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {loading ? 'Sending Request...' : 'Send Reset Link'}
              </Button>
            </form>

            <div className="pt-4 border-t border-[#EBE7DF] text-center text-xs text-slate-600">
              <Link to="/login" className="font-bold text-[#6A1423] hover:underline">
                ← Return to Sign In
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
