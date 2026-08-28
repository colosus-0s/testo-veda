import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { User, Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const { register, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName || !email || !password) {
      setFormError('Please complete all required fields.');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    const success = await register(email, password, fullName);
    if (success) {
      navigate('/account');
    }
  };

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
      <Section padding="lg" background="ivory">
        <Container size="narrow">
          <Breadcrumb items={[{ label: 'Create Account' }]} className="mb-8 text-slate-700" />

          <div className="bg-[#FCFBF8] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] shadow-subtle-card max-w-md mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2">
                Join Arogya Path
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#171717] mb-2">
                Create Customer Account
              </h1>
              <p className="text-xs text-slate-600">
                Register to enjoy seamless express checkout, order tracking, and profile management.
              </p>
            </div>

            {(formError || authError) && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs text-red-900 font-semibold">
                <AlertCircle className="w-4 h-4 text-[#6A1423] shrink-0 mt-0.5" />
                <span>{formError || authError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aarav Sharma"
                    className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] placeholder-slate-400 focus:outline-none focus:border-[#6A1423]"
                  />
                </div>
              </div>

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

              <div>
                <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] placeholder-slate-400 focus:outline-none focus:border-[#6A1423]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] placeholder-slate-400 focus:outline-none focus:border-[#6A1423]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full shadow-md font-bold text-sm mt-2"
                disabled={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {isLoading ? 'Creating Account...' : 'Register Account'}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#EBE7DF] text-center text-xs text-slate-700 space-y-3">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-[#6A1423] hover:underline">
                  Sign In Here
                </Link>
              </p>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#173C2B] font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Confidential & Secure Data Policy</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
