import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/Badge';

export const AdminCustomersPage: React.FC = () => {
  const { user, addresses } = useAuth();

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#171717]">Registered Customers</h2>
        <p className="text-xs text-slate-600">Customer account directory and saved delivery locations.</p>
      </div>

      {user ? (
        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6A1423] text-white flex items-center justify-center font-bold">
                {user.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-[#171717]">{user.fullName}</h3>
                <span className="text-slate-500">{user.email}</span>
              </div>
            </div>
            <Badge variant="gold">{user.role.toUpperCase()}</Badge>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[#171717] block">Saved Shipping Addresses ({addresses.length})</span>
            {addresses.map((a) => (
              <div key={a.id} className="bg-[#FCFBF8] p-3 rounded-xl border border-[#EBE7DF] text-slate-700">
                <p className="font-semibold text-[#171717]">{a.fullName} ({a.phone})</p>
                <p>{a.street}, {a.city}, {a.state} - {a.pincode}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-slate-500 text-xs bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF]">
          No customers registered yet.
        </div>
      )}
    </div>
  );
};
