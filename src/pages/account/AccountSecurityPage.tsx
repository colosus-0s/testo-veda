import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Lock, Mail, ShieldCheck, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';

export const AccountSecurityPage: React.FC = () => {
  const { user, changePassword, logout } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (newPassword.length < 6) {
      setStatusMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setIsUpdating(true);
    const success = await changePassword(newPassword);
    setIsUpdating(false);

    if (success) {
      setStatusMessage({ type: 'success', text: 'Your account password has been updated securely.' });
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setStatusMessage({ type: 'error', text: 'Failed to update password. Please try again.' });
    }
  };

  return (
    <div className="space-y-8 text-left max-w-xl">
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
          Account Security
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
          Login & Security Controls
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Update password credentials and manage active security sessions.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-bold ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : 'bg-red-50 text-red-900 border-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#6A1423] shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Account Email Stage */}
      <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-2 text-xs">
        <span className="font-bold text-[#171717] uppercase tracking-wider block">Registered Email</span>
        <div className="flex items-center gap-2 font-bold text-sm text-[#171717]">
          <Mail size={16} className="text-[#6A1423]" /> {user?.email}
        </div>
        <p className="text-slate-600 text-[11px]">
          Your email address is your unique identity across Arogya Path storefront & Supabase authentication.
        </p>
      </div>

      {/* Change Password Form */}
      <form onSubmit={handlePasswordChange} className="bg-[#F7F4ED] p-6 sm:p-8 rounded-2xl border border-[#EBE7DF] space-y-5 shadow-subtle-card">
        <h3 className="font-serif text-lg font-bold text-[#171717]">Change Password</h3>

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
              className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
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
              placeholder="Re-enter new password"
              className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" size="md" disabled={isUpdating} className="font-bold">
          {isUpdating ? 'Updating Password...' : 'Update Password Credentials'}
        </Button>
      </form>

      {/* Active Session & Logout Card */}
      <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 text-sm font-serif">
            <ShieldCheck size={18} className="text-emerald-600" /> Active Customer Session
          </span>
          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
            Secured Session
          </span>
        </div>
        <p className="text-slate-600 text-xs leading-relaxed">
          Signing out will invalidate your current session token and require email & password verification upon return.
        </p>
        <div className="pt-2">
          <Button variant="outline" size="sm" onClick={() => logout()} leftIcon={<LogOut size={14} />}>
            Sign Out Current Session
          </Button>
        </div>
      </div>
    </div>
  );
};
