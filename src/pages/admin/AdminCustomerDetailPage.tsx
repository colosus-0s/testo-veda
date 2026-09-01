import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAdminOrders } from '@/services/orderService';
import { getCustomersFromOrders, type CustomerProfile } from '@/repositories/customerRepository';
import type { Order } from '@/types/order';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, User, ShoppingBag, Phone } from 'lucide-react';

export const AdminCustomerDetailPage: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (customerId) {
      fetchAdminOrders().then((allOrders) => {
        if (!isMounted) return;
        setIsLoading(false);
        const customers = getCustomersFromOrders(allOrders);
        const found = customers.find((c) => c.id === customerId || c.phone === customerId || c.email === customerId);
        setCustomer(found || null);
        if (found) {
          const matchedOrders = allOrders.filter(
            (o: Order) => o.customerPhone === found.phone || o.userId === found.id
          );
          setCustomerOrders(matchedOrders);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [customerId]);

  if (isLoading) {
    return (
      <div className="py-16 text-center text-xs font-bold text-slate-600">
        Loading customer profile from database...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="space-y-6 text-left py-12">
        <Link to="/admin/customers" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1.5">
          <ArrowLeft size={16} /> Back to Customer Directory
        </Link>
        <div className="py-16 bg-[#F7F4ED] rounded-3xl border border-[#EBE7DF] text-center space-y-3">
          <User className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#171717]">Customer Profile Not Found</h3>
          <p className="text-xs text-slate-600">No customer matches the requested ID.</p>
          <Link to="/admin/customers" className="inline-block pt-2">
            <Button variant="primary" size="md">Return to Directory</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/admin/customers" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1.5">
          <ArrowLeft size={16} /> Back to Directory
        </Link>
        <Badge variant="green" size="md">Verified Customer Account</Badge>
      </div>

      {/* Customer Profile Banner */}
      <div className="bg-[#FCFBF8] p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-6">
        <div className="flex items-center gap-4 border-b border-[#EBE7DF] pb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#6A1423] text-white flex items-center justify-center font-serif font-bold text-2xl">
            {customer.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#171717]">{customer.fullName}</h1>
            <p className="text-xs text-slate-600 flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1"><Phone size={14} /> {customer.phone}</span>
            </p>
          </div>
        </div>

        {/* Customer Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#F7F4ED] p-4 rounded-2xl border border-[#EBE7DF]">
            <p className="text-slate-500 uppercase tracking-wider font-bold">Total Purchases</p>
            <p className="font-serif text-xl font-bold text-[#171717] mt-1">{customer.orderCount} order(s)</p>
          </div>
          <div className="bg-[#F7F4ED] p-4 rounded-2xl border border-[#EBE7DF]">
            <p className="text-slate-500 uppercase tracking-wider font-bold">Lifetime Value</p>
            <p className="font-serif text-xl font-bold text-[#6A1423] mt-1">₹{customer.totalSpent.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-[#F7F4ED] p-4 rounded-2xl border border-[#EBE7DF]">
            <p className="text-slate-500 uppercase tracking-wider font-bold">Account Status</p>
            <p className="font-serif text-xl font-bold text-emerald-800 mt-1 uppercase">{customer.status}</p>
          </div>
        </div>
      </div>

      {/* Customer Orders History */}
      <div className="bg-[#FCFBF8] p-6 sm:p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#171717] flex items-center gap-2 border-b border-[#EBE7DF] pb-3">
          <ShoppingBag className="w-5 h-5 text-[#6A1423]" /> Order History ({customerOrders.length})
        </h3>

        <div className="divide-y divide-[#EBE7DF] text-xs">
          {customerOrders.map((ord: Order) => (
            <div key={ord.id} className="py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-[#171717]">Order #{ord.orderNumber}</p>
                  <Badge variant="green" size="sm">{ord.orderStatus}</Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN')} • {ord.items.length} item(s)
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-bold text-sm text-[#6A1423]">₹{ord.total.toLocaleString('en-IN')}</p>
                <Link to={`/admin/orders/${ord.id}`}>
                  <Button variant="outline" size="sm">Inspect Order</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
