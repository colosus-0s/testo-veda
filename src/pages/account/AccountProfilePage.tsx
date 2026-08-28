import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, Calendar, CheckCircle2 } from 'lucide-react';

export const AccountProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, phone });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-left max-w-xl">
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
          Personal Information
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
          Profile Details
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Manage your personal details and contact preferences.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-900 font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Profile details updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#F7F4ED] p-6 sm:p-8 rounded-2xl border border-[#EBE7DF] space-y-5 shadow-subtle-card">
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
              className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
            Email Address (Primary Account Identity)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full bg-slate-100 border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-slate-600 cursor-not-allowed font-semibold"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Email changes must follow a secure verification link sent to your registered address.
          </p>
        </div>

        <div>
          <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
            Mobile Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#171717] block mb-1.5 uppercase tracking-wider">
            Member Since
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              disabled
              value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Recently'}
              className="w-full bg-slate-100 border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-3 text-xs text-slate-600 cursor-not-allowed font-semibold"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto font-bold">
          Save Profile Changes
        </Button>
      </form>
    </div>
  );
};
