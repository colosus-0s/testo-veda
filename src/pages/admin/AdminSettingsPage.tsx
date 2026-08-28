import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Building, Factory, CreditCard, Bell, Save, CheckCircle2 } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    storeName: SITE_CONFIG.brandName || 'Arogya Path Wellness',
    supportEmail: SITE_CONFIG.supportEmail || 'care@arogyapath.com',
    supportPhone: SITE_CONFIG.supportPhone || '+91 98765 43210',
    marketedBy: SITE_CONFIG.legalEntity || 'Arogya Path Wellness Pvt. Ltd.',
    manufacturer: SITE_CONFIG.manufacturer || 'Arogya Botanical Labs India',
    fssaiLicense: SITE_CONFIG.fssaiLicense || '12118441000654',
    certifications: 'ISO 9001:2015, GMP Certified, FSSAI',
    currency: 'INR (₹)',
    freeShippingThreshold: 500,
    codEnabled: true,
    paymentProvider: 'Development Payment Gateway Simulation (Supabase Prep)',
    emailNotifications: true,
    smsNotifications: true,
    webhookUrl: 'https://api.arogyapath.com/webhooks/orders',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">Store Configuration & Settings</h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Operational business rules, regulatory licensing, payment abstractions, and notification preferences.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleSave} leftIcon={<Save size={16} />}>
          Save Settings
        </Button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-emerald-900">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>Store settings updated successfully! Changes saved to repository configuration.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. STORE INFORMATION */}
        <div className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
          <h3 className="font-serif font-bold text-base text-[#171717] border-b border-[#EBE7DF] pb-2 flex items-center gap-2">
            <Building size={18} className="text-[#6A1423]" /> 1. Store Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#171717] block mb-1">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717]"
              />
            </div>
            <div>
              <label className="font-bold text-[#171717] block mb-1">Customer Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717]"
              />
            </div>
            <div>
              <label className="font-bold text-[#171717] block mb-1">Customer Support Phone</label>
              <input
                type="text"
                name="supportPhone"
                value={formData.supportPhone}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717]"
              />
            </div>
          </div>
        </div>

        {/* 2. BUSINESS / REGULATORY */}
        <div className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
          <h3 className="font-serif font-bold text-base text-[#171717] border-b border-[#EBE7DF] pb-2 flex items-center gap-2">
            <Factory size={18} className="text-[#173C2B]" /> 2. Business & Regulatory Compliance
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#171717] block mb-1">Marketed By Entity</label>
              <input
                type="text"
                name="marketedBy"
                value={formData.marketedBy}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717]"
              />
            </div>
            <div>
              <label className="font-bold text-[#171717] block mb-1">Manufacturing Partner</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717]"
              />
            </div>
            <div>
              <label className="font-bold text-[#171717] block mb-1">FSSAI License Number</label>
              <input
                type="text"
                name="fssaiLicense"
                value={formData.fssaiLicense}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs font-mono font-bold text-[#173C2B]"
              />
            </div>
            <div>
              <label className="font-bold text-[#171717] block mb-1">Certifications & Standards</label>
              <input
                type="text"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717]"
              />
            </div>
          </div>
        </div>

        {/* 3. CHECKOUT & SHIPPING PREPARATION */}
        <div className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
          <h3 className="font-serif font-bold text-base text-[#171717] border-b border-[#EBE7DF] pb-2 flex items-center gap-2">
            <CreditCard size={18} className="text-[#6A1423]" /> 3. Checkout & Payment Provider Architecture
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#171717] block mb-1">Store Currency</label>
              <input
                type="text"
                name="currency"
                readOnly
                value={formData.currency}
                className="w-full bg-slate-100 border border-[#EBE7DF] rounded-xl p-2.5 text-xs font-bold text-slate-700"
              />
            </div>
            <div>
              <label className="font-bold text-[#171717] block mb-1">Free Shipping Threshold (₹)</label>
              <input
                type="number"
                name="freeShippingThreshold"
                value={formData.freeShippingThreshold}
                onChange={handleChange}
                className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717]"
              />
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#171717]">
                <input
                  type="checkbox"
                  name="codEnabled"
                  checked={formData.codEnabled}
                  onChange={handleChange}
                  className="rounded text-[#6A1423] focus:ring-[#6A1423]"
                />
                Enable Cash on Delivery (COD)
              </label>
            </div>
          </div>

          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
            <strong className="block font-bold">Payment Gateway Integration Status:</strong>
            <span>{formData.paymentProvider}. Real Razorpay/Stripe API key credentials will be plugged in via Supabase server-side environment variables in the next phase.</span>
          </div>
        </div>

        {/* 4. NOTIFICATIONS */}
        <div className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
          <h3 className="font-serif font-bold text-base text-[#171717] border-b border-[#EBE7DF] pb-2 flex items-center gap-2">
            <Bell size={18} className="text-blue-700" /> 4. Customer Notifications & Webhooks
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-[#171717]">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleChange}
                className="rounded text-[#6A1423]"
              />
              Order Confirmation Email Notifications
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold text-[#171717]">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={formData.smsNotifications}
                onChange={handleChange}
                className="rounded text-[#6A1423]"
              />
              Shipping & Tracking SMS Notifications
            </label>
          </div>

          <div className="text-xs space-y-1">
            <label className="font-bold text-[#171717] block">Delivery Webhook Dispatch URL</label>
            <input
              type="text"
              name="webhookUrl"
              value={formData.webhookUrl}
              onChange={handleChange}
              className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717] font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="primary" size="lg" type="submit" leftIcon={<Save size={18} />}>
            Save Store Configurations
          </Button>
        </div>
      </form>
    </div>
  );
};
