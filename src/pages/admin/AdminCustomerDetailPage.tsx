import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCustomerById } from '@/repositories/customerRepository';
import { getStoredOrders } from '@/services/orderService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, User, ShoppingBag, MapPin, Mail, Phone, Calendar, ShieldCheck } from 'lucide-react';

export const AdminCustomerDetailPage: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const customer = customerId ? getCustomerById(customerId) : null;
  const allOrders = getStoredOrders();

  if (!customer) {
    return (
      <div className="space-y-6 text-left py-12">
        <Link to="/admin/customers" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1.5">
          <ArrowLeft size={16} /> Back to Customer Directory
        </Link>
        <div className="py-16 bg-[#F7F4ED] rounded-3xl border border-[#EBE7DF] text-center space-y-3">
          <User className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#171717]">Customer Profile Not Found</h3>
          <p className="text-xs text-slate-600">No registered customer matches the requested ID.</p>
          <Link to="/admin/customers" className="inline-block pt-2">
            <Button variant="primary" size="md">Return to Directory</Button>
          </Link>
        </div>
      </div>
    );
  }

  const customerOrders = allOrders.filter(
    (o) =>
      o.userId === customer.id ||
      (o.customerEmail && o.customerEmail.toLowerCase() === customer.email.toLowerCase())
  );

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
        <div>
          <Link to="/admin/customers" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft size={14} /> Back to Customers Directory
          </Link>
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
              {customer.fullName}
            </h2>
            <Badge variant="gold">{(customer.role || 'customer').toUpperCase()}</Badge>
            <Badge variant="green">{(customer.status || 'active').toUpperCase()}</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">Customer ID: {customer.id}</p>
        </div>
      </div>

      {/* Customer Info Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] space-y-2">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 text-sm font-serif">
            <Mail size={16} className="text-[#6A1423]" /> Contact Identity
          </span>
          <p className="text-slate-800 font-semibold">{customer.email}</p>
          <p className="text-slate-600 flex items-center gap-1"><Phone size={12} /> {customer.phone || 'N/A'}</p>
          <p className="text-slate-500 flex items-center gap-1 pt-1"><Calendar size={12} /> Registered on {new Date(customer.registeredAt).toLocaleDateString('en-IN')}</p>
        </div>

        <div className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] space-y-2">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 text-sm font-serif">
            <ShoppingBag size={16} className="text-[#173C2B]" /> Purchase Performance
          </span>
          <p className="font-serif font-extrabold text-2xl text-[#6A1423]">₹{customer.totalSpent.toLocaleString('en-IN')}</p>
          <p className="text-slate-600 font-semibold">{customerOrders.length} Order{customerOrders.length === 1 ? '' : 's'} Placed</p>
        </div>

        <div className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] space-y-2">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 text-sm font-serif">
            <ShieldCheck size={16} className="text-emerald-700" /> Account Security & Role
          </span>
          <p className="font-bold text-[#171717]">Assigned Role: {(customer.role || 'customer').toUpperCase()}</p>
          <p className="text-slate-600">Standard Customer Privileges</p>
        </div>
      </div>

      {/* Saved Delivery Locations */}
      <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#171717] border-b border-[#EBE7DF] pb-3 flex items-center gap-2">
          <MapPin size={18} className="text-[#6A1423]" /> Saved Delivery Addresses ({customer.addresses.length})
        </h3>
        {customer.addresses.length === 0 ? (
          <p className="text-xs text-slate-500">No saved addresses on file for this customer profile.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {customer.addresses.map((addr, idx) => (
              <div key={idx} className="bg-[#F7F4ED] p-4 rounded-xl border border-[#EBE7DF] space-y-1">
                <p className="font-bold text-[#171717]">{addr.fullName} ({addr.phone})</p>
                <p className="text-slate-700">{addr.street}</p>
                <p className="text-slate-700">{addr.city}, {addr.state} - {addr.pincode}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customer Order History */}
      <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#171717] border-b border-[#EBE7DF] pb-3 flex items-center gap-2">
          <ShoppingBag size={18} className="text-[#6A1423]" /> Customer Order History ({customerOrders.length})
        </h3>
        {customerOrders.length === 0 ? (
          <p className="text-xs text-slate-500">This customer has not placed any orders yet.</p>
        ) : (
          <div className="overflow-x-auto border border-[#EBE7DF] rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F4ED] text-[#171717] font-bold border-b border-[#EBE7DF]">
                <tr>
                  <th className="p-3">Order #</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE7DF]">
                {customerOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F7F4ED]/40">
                    <td className="p-3 font-bold text-[#6A1423]">#{ord.orderNumber}</td>
                    <td className="p-3 text-slate-500">{new Date(ord.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="p-3 font-bold">₹{ord.total.toLocaleString('en-IN')}</td>
                    <td className="p-3"><Badge variant="maroon">{(ord.orderStatus || 'pending').toUpperCase()}</Badge></td>
                    <td className="p-3 text-right">
                      <Link to={`/admin/orders/${ord.id}`} className="font-bold text-[#6A1423] hover:underline">
                        View Order →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
