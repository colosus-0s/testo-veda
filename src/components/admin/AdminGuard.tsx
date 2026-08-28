import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { isDevPreviewActive } from '@/config/devPreview';
import { isSupabaseConfigured } from '@/lib/supabase';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  const devPreview = isDevPreviewActive();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-[#F7F4ED]">
        <div className="w-8 h-8 border-4 border-[#6A1423] border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-bold text-[#171717] tracking-wider uppercase">
          Verifying Admin Authorization...
        </span>
      </div>
    );
  }

  // If development preview is active AND Supabase is not configured, allow local testing
  if (devPreview && !isSupabaseConfigured()) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#F7F4ED] text-left">
        <div className="max-w-md w-full bg-[#FCFBF8] p-8 rounded-3xl border border-red-200 shadow-xl space-y-5 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center mx-auto">
            <Lock size={32} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-700 block mb-1">
              403 Access Denied
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#171717]">
              Admin Portal Authorization Required
            </h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Your account (<strong>{user?.email}</strong>) is assigned the <strong>{user?.role || 'customer'}</strong> role. Access to store management tools is restricted to verified administrative users.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Link to="/admin/login">
              <Button variant="primary" size="md" className="w-full">
                Sign In As Administrative User
              </Button>
            </Link>
            <Link to="/account">
              <Button variant="outline" size="md" className="w-full flex items-center justify-center gap-1.5" leftIcon={<ArrowLeft size={16} />}>
                Return to Customer Account
              </Button>
            </Link>
          </div>
          <div className="pt-4 border-t border-[#EBE7DF] text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <ShieldAlert size={14} className="text-amber-600" />
            <span>Role changes require administrative database promotion.</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
