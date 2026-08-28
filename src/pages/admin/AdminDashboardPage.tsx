import React from 'react';
import { Link } from 'react-router-dom';
import { getStoredOrders } from '@/services/orderService';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { Badge } from '@/components/ui/Badge';
import { DollarSign, ShoppingBag, Package, ChevronRight, Boxes } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const orders = getStoredOrders();
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending' || o.orderStatus === 'processing');

  const kpis = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: DollarSign, color: 'text-emerald-700' },
    { label: 'Total Orders', value: orders.length.toString(), icon: ShoppingBag, color: 'text-[#6A1423]' },
    { label: 'Pending Fulfillment', value: pendingOrders.length.toString(), icon: Boxes, color: 'text-amber-700' },
    { label: 'Active Catalog', value: INITIAL_PRODUCTS.length.toString(), icon: Package, color: 'text-blue-700' },
  ];

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#171717]">Executive Storefront Overview</h2>
        <p className="text-xs text-slate-600">Real-time KPI metrics and order processing pipeline.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{kpi.label}</span>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <p className="font-serif font-extrabold text-2xl text-[#171717]">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#171717]">Recent Customer Orders</h3>
          <Link to="/admin/orders" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1">
            View All Orders ({orders.length}) <ChevronRight size={14} />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="py-10 text-center text-slate-500 text-xs bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF]">
            No customer orders registered yet. Orders created via checkout will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto border border-[#EBE7DF] rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F4ED] text-[#171717] border-b border-[#EBE7DF] font-bold">
                <tr>
                  <th className="p-3.5">Order #</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE7DF]">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F7F4ED]/50">
                    <td className="p-3.5 font-bold text-[#6A1423]">#{ord.orderNumber}</td>
                    <td className="p-3.5 font-semibold text-[#171717]">{ord.customerName}</td>
                    <td className="p-3.5 font-bold">₹{ord.total.toLocaleString('en-IN')}</td>
                    <td className="p-3.5"><Badge variant="green">{ord.paymentStatus.toUpperCase()}</Badge></td>
                    <td className="p-3.5"><Badge variant="maroon">{ord.orderStatus.toUpperCase()}</Badge></td>
                    <td className="p-3.5 text-slate-500">{new Date(ord.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="p-3.5 text-right">
                      <Link to={`/admin/orders/${ord.id}`} className="font-bold text-[#6A1423] hover:underline">
                        Details →
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
