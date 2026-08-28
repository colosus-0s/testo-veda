import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
      <Section padding="lg" background="ivory">
        <Container size="narrow">
          <Breadcrumb items={[{ label: 'Create New Password' }]} className="mb-8 text-slate-700" />

          <div className="bg-[#FCFBF8] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] shadow-subtle-card max-w-md mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-2">
                Security Update
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#171717] mb-2">
                Set New Password
              </h1>
              <p className="text-xs text-slate-600">
                Please choose a new password for your Arogya Path account.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#171717]">Password Updated!</h3>
                <p className="text-xs text-slate-700">
                  Your password has been reset. Redirecting to login page...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <p className="text-xs text-red-700 font-bold bg-red-50 p-3 rounded-lg border border-red-200">
                    {error}
                  </p>
                )}

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] placeholder-slate-400 focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
                    Confirm New Password
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
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Update Password
                </Button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-[#EBE7DF] text-center text-xs text-slate-700">
              <Link to="/login" className="font-bold text-[#6A1423] hover:underline">
                Back to Sign In
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
