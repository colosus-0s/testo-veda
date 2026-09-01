import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Lock, Phone, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const { login, loginWithPhone, isLoading, error: authError, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as { from?: { pathname?: string }; message?: string } | null;
  const from = locationState?.from?.pathname || '/account/orders';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (loginMethod === 'phone') {
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        setFormError('Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!password) {
        setFormError('Please enter your account password.');
        return;
      }

      const success = await loginWithPhone(phone, password);
      if (success) {
        navigate('/account/orders', { replace: true });
      }
    } else {
      if (!email || !password) {
        setFormError('Please enter both your email address and password.');
        return;
      }

      const success = await login(email, password);
      if (success) {
        if (from === '/account' && (user?.role === 'admin' || user?.role === 'superadmin')) {
          navigate('/admin', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      }
    }
  };

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
      <Section padding="lg" background="ivory">
        <Container size="narrow">
          <Breadcrumb items={[{ label: 'Access My Orders' }]} className="mb-8 text-slate-700 text-left" />

          <div className="bg-[#FCFBF8] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] shadow-subtle-card max-w-md mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2">
                Arogya Path Customer Access
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#171717] mb-2">
                Access My Orders
              </h1>
              <p className="text-xs text-slate-600">
                Enter your mobile number and password to view your past purchases and track active deliveries.
              </p>
            </div>

            {/* Login Method Toggle Tabs */}
            <div className="flex border border-[#EBE7DF] bg-[#F7F4ED] p-1 rounded-2xl mb-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setLoginMethod('phone'); setFormError(null); }}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  loginMethod === 'phone'
                    ? 'bg-[#6A1423] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#171717]'
                }`}
              >
                Mobile Number
              </button>
              <button
                type="button"
                onClick={() => { setLoginMethod('email'); setFormError(null); }}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  loginMethod === 'email'
                    ? 'bg-[#6A1423] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#171717]'
                }`}
              >
                Admin / Email
              </button>
            </div>

            {(formError || authError) && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs text-red-900 font-semibold text-left">
                <AlertCircle className="w-4 h-4 text-[#6A1423] shrink-0 mt-0.5" />
                <span>{formError || authError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {loginMethod === 'phone' ? (
                <div className="text-left">
                  <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] placeholder-slate-400 focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-left">
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
                      placeholder="you@example.com"
                      className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] placeholder-slate-400 focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>
                </div>
              )}

              <div className="text-left">
                <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
                  Password / Account Security PIN
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
                {isLoading ? 'Verifying...' : 'Access My Orders'}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#EBE7DF] text-center text-xs text-slate-700 space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#173C2B] font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Protected by Arogya Path Secure Identity</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
