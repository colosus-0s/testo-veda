import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCustomers } from '@/repositories/customerRepository';
import type { CustomerProfile } from '@/repositories/customerRepository';
import { Badge } from '@/components/ui/Badge';
import { Search, ChevronRight } from 'lucide-react';

export const AdminCustomersPage: React.FC = () => {
  const [customers] = useState<CustomerProfile[]>(getCustomers());
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = (customers || []).filter(
    (c) =>
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#171717]">Registered Customer Directory</h2>
          <p className="text-xs text-slate-600">Inspect customer profiles, lifetime purchase totals, and order activity.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customer name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-9 pr-3 py-2 text-xs text-[#171717]"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-xs bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF]">
          No customers matching your search criteria.
        </div>
      ) : (
        <div className="overflow-x-auto border border-[#EBE7DF] rounded-2xl shadow-subtle-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F4ED] text-[#171717] font-bold border-b border-[#EBE7DF]">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Registration Date</th>
                <th className="p-4">Orders Placed</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE7DF] bg-[#FCFBF8]">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-[#F7F4ED]/50 transition-colors">
                  <td className="p-4 font-bold text-[#171717]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#6A1423] text-white flex items-center justify-center font-bold text-xs">
                        {cust.fullName ? cust.fullName.charAt(0) : 'C'}
                      </div>
                      <span>{cust.fullName || 'Valued Customer'}</span>
                    </div>
                  </td>

                  <td className="p-4 text-slate-700 font-semibold">{cust.email}</td>

                  <td className="p-4 text-slate-500">
                    {new Date(cust.registeredAt || '2026-01-01').toLocaleDateString('en-IN')}
                  </td>

                  <td className="p-4 font-bold text-[#171717]">
                    {cust.orderCount} order{cust.orderCount === 1 ? '' : 's'}
                  </td>

                  <td className="p-4 font-serif font-extrabold text-[#6A1423]">
                    ₹{(cust.totalSpent || 0).toLocaleString('en-IN')}
                  </td>

                  <td className="p-4">
                    <Badge variant="green">{(cust.status || 'active').toUpperCase()}</Badge>
                  </td>

                  <td className="p-4 text-right">
                    <Link to={`/admin/customers/${cust.id}`} className="font-bold text-[#6A1423] hover:underline flex items-center justify-end gap-1">
                      Details <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
