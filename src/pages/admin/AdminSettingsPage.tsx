import React from 'react';
import { SITE_CONFIG } from '@/config/site';
import { Building, Factory, ShieldCheck, Mail, Phone } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#171717]">Storefront & Entity Settings</h2>
        <p className="text-xs text-slate-600">FSSAI regulatory licenses, corporate details, and support contacts.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-800">
        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-3">
          <div className="flex items-center gap-2 text-[#6A1423] font-bold text-sm">
            <Building size={18} /> Marketed By Entity
          </div>
          <p className="font-bold text-[#171717]">{SITE_CONFIG.legalEntity}</p>
          <p>{SITE_CONFIG.address}</p>
          <div className="pt-2 border-t border-[#EBE7DF] space-y-1">
            <p className="flex items-center gap-2"><Mail size={14} /> {SITE_CONFIG.supportEmail}</p>
            <p className="flex items-center gap-2"><Phone size={14} /> {SITE_CONFIG.supportPhone}</p>
          </div>
        </div>

        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-3">
          <div className="flex items-center gap-2 text-[#173C2B] font-bold text-sm">
            <Factory size={18} /> Manufactured By Entity
          </div>
          <p className="font-bold text-[#171717]">{SITE_CONFIG.manufacturer}</p>
          <p>Jagraon - 142026, Punjab, India</p>
          <div className="pt-2 border-t border-[#EBE7DF] space-y-1">
            <p className="flex items-center gap-2 font-bold text-[#173C2B]"><ShieldCheck size={14} /> FSSAI Lic. #{SITE_CONFIG.fssaiLicense}</p>
            <p>{SITE_CONFIG.isoCertification} • {SITE_CONFIG.gmpCertification}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
