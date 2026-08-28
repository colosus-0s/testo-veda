import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { UserAddress } from '@/types/auth';
import { Button } from '@/components/ui/Button';
import { MapPin, Plus, CheckCircle2, Trash2, Edit2, Star, Home, Briefcase, Tag } from 'lucide-react';

export const AccountAddressesPage: React.FC = () => {
  const { user, addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [label, setLabel] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [isDefault, setIsDefault] = useState(false);

  const resetForm = () => {
    setEditingAddressId(null);
    setFullName(user?.fullName || '');
    setPhone(user?.phone || '');
    setStreet('');
    setLandmark('');
    setCity('');
    setState('');
    setPincode('');
    setLabel('Home');
    setIsDefault(false);
    setShowForm(false);
  };

  const handleEditInit = (addr: UserAddress) => {
    setEditingAddressId(addr.id);
    setFullName(addr.fullName);
    setPhone(addr.phone);
    setStreet(addr.street);
    setLandmark(addr.landmark || '');
    setCity(addr.city);
    setState(addr.state);
    setPincode(addr.pincode);
    setLabel((addr.label as 'Home' | 'Work' | 'Other') || 'Home');
    setIsDefault(addr.isDefault);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !street || !city || !state || !pincode) return;

    if (editingAddressId) {
      updateAddress(editingAddressId, {
        fullName,
        phone,
        street,
        landmark,
        city,
        state,
        pincode,
        label,
        isDefault,
      });
      if (isDefault) setDefaultAddress(editingAddressId);
    } else {
      addAddress({
        fullName,
        phone,
        street,
        landmark,
        city,
        state,
        pincode,
        country: 'India',
        label,
        isDefault: isDefault || addresses.length === 0,
      });
    }

    resetForm();
  };

  const getLabelIcon = (lbl?: string) => {
    if (lbl === 'Work') return <Briefcase size={14} />;
    if (lbl === 'Other') return <Tag size={14} />;
    return <Home size={14} />;
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
            Shipping Locations
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
            Saved Addresses
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Manage express delivery addresses for fast 1-click checkout.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          leftIcon={<Plus size={16} />}
        >
          {showForm ? 'Cancel' : 'Add New Address'}
        </Button>
      </div>

      {/* Add / Edit Address Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#F7F4ED] p-6 sm:p-8 rounded-2xl border border-[#EBE7DF] space-y-4 shadow-subtle-card">
          <h3 className="font-serif font-bold text-lg text-[#171717]">
            {editingAddressId ? 'Edit Address' : 'Add New Shipping Address'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Full Name</label>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Aarav Sharma" className="w-full p-3 bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl text-[#171717]" />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Mobile Number</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9876543210" className="w-full p-3 bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl text-[#171717]" />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Flat / House No. / Street Address</label>
              <input type="text" required value={street} onChange={(e) => setStreet(e.target.value)} placeholder="42 Lotus Heights, MG Road" className="w-full p-3 bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl text-[#171717]" />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Landmark (Optional)</label>
              <input type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="Near Central Park" className="w-full p-3 bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl text-[#171717]" />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">City</label>
              <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="Bengaluru" className="w-full p-3 bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl text-[#171717]" />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">State</label>
              <input type="text" required value={state} onChange={(e) => setState(e.target.value)} placeholder="Karnataka" className="w-full p-3 bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl text-[#171717]" />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Pincode</label>
              <input type="text" required value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="560001" className="w-full p-3 bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl text-[#171717]" />
            </div>

            <div>
              <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Address Label</label>
              <div className="flex gap-2">
                {(['Home', 'Work', 'Other'] as const).map((lbl) => (
                  <button
                    key={lbl}
                    type="button"
                    onClick={() => setLabel(lbl)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      label === lbl
                        ? 'bg-[#6A1423] text-white border-[#6A1423]'
                        : 'bg-[#FCFBF8] text-slate-700 border-[#EBE7DF]'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 text-xs">
            <input
              type="checkbox"
              id="isDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="text-[#6A1423] rounded"
            />
            <label htmlFor="isDefault" className="font-semibold text-slate-800">
              Set as default shipping address for checkout
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" size="sm">
              {editingAddressId ? 'Save Changes' : 'Add Address'}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Saved Addresses List */}
      {addresses.length === 0 ? (
        <div className="py-14 bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF] text-center space-y-3">
          <MapPin className="w-12 h-12 text-slate-400 mx-auto" />
          <h4 className="font-serif text-xl font-bold text-[#171717]">No Saved Addresses</h4>
          <p className="text-xs text-slate-600">Save delivery addresses to speed up checkout on future orders.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 rounded-2xl border transition-all space-y-3 text-xs text-slate-800 ${
                addr.isDefault
                  ? 'bg-[#FCFBF8] border-[#6A1423] ring-1 ring-[#6A1423]/30 shadow-subtle-card'
                  : 'bg-[#F7F4ED] border-[#EBE7DF]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#171717] flex items-center gap-1.5 font-serif">
                  {getLabelIcon(addr.label)} {addr.fullName}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {addr.label || 'Home'}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 size={12} /> Default
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-0.5 text-slate-700 font-semibold">
                <p>{addr.street}</p>
                {addr.landmark && <p>Landmark: {addr.landmark}</p>}
                <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                <p className="font-bold text-[#171717] pt-1">Phone: {addr.phone}</p>
              </div>

              <div className="pt-3 border-t border-[#EBE7DF] flex items-center justify-between text-xs">
                {!addr.isDefault ? (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1"
                  >
                    <Star size={14} /> Make Default
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-700">Default Shipping Address</span>
                )}

                <div className="flex items-center gap-3">
                  <button onClick={() => handleEditInit(addr)} className="text-slate-600 hover:text-[#6A1423] p-1">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteAddress(addr.id)} className="text-slate-400 hover:text-red-600 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
