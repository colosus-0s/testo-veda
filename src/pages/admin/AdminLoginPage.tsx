import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, Mail, Lock, ArrowRight, ShieldCheck, ArrowLeft, Zap } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, loginAsDemoAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';

  const handleDemoAdminLogin = () => {
    loginAsDemoAdmin();
    navigate('/admin', { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both your admin email address and password.');
      return;
    }

    const success = await login(email, password);
    if (success) {
      const savedUser = JSON.parse(localStorage.getItem('arogyapath_user') || '{}');
      if (savedUser?.role === 'admin' || savedUser?.role === 'superadmin') {
        navigate(from, { replace: true });
      } else {
        setErrorMessage('Access Denied: Your account does not have administrative privileges.');
      }
    } else {
      setErrorMessage('Invalid credentials or authentication failure.');
    }
  };

  return (
    <div className="w-full bg-[#173C2B] text-white min-h-screen flex flex-col justify-between py-10">
      <Container size="narrow">
        <div className="mb-8 text-left">
          <Link to="/" className="text-xs font-bold text-[#F3E5AB] hover:underline inline-flex items-center gap-1.5">
            <ArrowLeft size={16} /> Return to Storefront
          </Link>
        </div>

        <div className="bg-[#FCFBF8] text-[#171717] rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#6A1423] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
              <ShieldAlert size={28} />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
              Arogya Path Control Portal
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#171717] mb-2">
              Administrator Login
            </h1>
            <p className="text-xs text-slate-600">
              Authorized access portal for storefront order fulfillment, product inventory, and customer management.
            </p>
          </div>

          {/* Quick Demo Access Button */}
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2 text-left">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span className="flex items-center gap-1.5"><Zap size={16} className="text-[#6A1423]" /> Development & Review Access</span>
              <span className="text-[10px] bg-amber-200 px-2 py-0.5 rounded uppercase">Instant</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Click below to test the Admin Panel with full administrative privileges immediately.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDemoAdminLogin}
              className="w-full bg-[#6A1423] text-white border-[#6A1423] hover:bg-[#3D0B15] font-bold text-xs shadow-sm mt-1"
            >
              ⚡ Enter Admin Panel (Demo Admin)
            </Button>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-[#EBE7DF]"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Or Sign In With Supabase</span>
            <div className="flex-grow border-t border-[#EBE7DF]"></div>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs text-red-900 font-semibold text-left">
              <ShieldAlert className="w-4 h-4 text-[#6A1423] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-left">
              <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@arogyapath.com"
                  className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
                />
              </div>
            </div>

            <div className="text-left">
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
                  placeholder="••••••••"
                  className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
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
              {isLoading ? 'Authenticating Role...' : 'Sign In To Admin Portal'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#EBE7DF] text-center text-xs text-slate-600 space-y-2">
            <p className="flex items-center justify-center gap-1.5 text-[#173C2B] font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Supabase Role-Based Auth Security
            </p>
          </div>
        </div>
      </Container>

      <div className="text-center text-xs text-[#E2E8F0] opacity-75">
        &copy; {new Date().getFullYear()} Arogya Path • Internal Administrative Access Only
      </div>
    </div>
  );
};
