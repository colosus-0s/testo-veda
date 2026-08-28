import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoredOrders } from '@/services/orderService';
import { getProducts, updateStock } from '@/repositories/productRepository';
import { getCustomers } from '@/repositories/customerRepository';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DollarSign, ShoppingBag, Package, ChevronRight, Boxes, AlertTriangle, Users } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [orders] = useState(getStoredOrders());
  const [products, setProducts] = useState(getProducts());
  const customers = getCustomers();

  const totalRevenue = (orders || []).reduce((sum, ord) => sum + (ord.total || 0), 0);
  const pendingOrders = (orders || []).filter((o) => o.orderStatus === 'pending');
  const processingOrders = (orders || []).filter((o) => o.orderStatus === 'processing');
  const deliveredOrders = (orders || []).filter((o) => o.orderStatus === 'delivered');
  const lowStockProducts = (products || []).filter((p) => p.stock <= 15);

  const kpis = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: DollarSign, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { label: 'Total Orders', value: (orders ? orders.length : 0).toString(), icon: ShoppingBag, color: 'text-[#6A1423] bg-rose-50 border-rose-200' },
    { label: 'Pending / Processing', value: `${pendingOrders.length + processingOrders.length}`, icon: Boxes, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { label: 'Delivered Shipments', value: deliveredOrders.length.toString(), icon: Package, color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { label: 'Total Customers', value: customers.length.toString(), icon: Users, color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { label: 'Active Formulations', value: products.length.toString(), icon: Package, color: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
  ];

  const handleQuickRestock = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (target) {
      await updateStock(id, target.stock + 50);
      setProducts(getProducts());
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
          Store Operations
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">Operational Dashboard</h2>
        <p className="text-xs text-slate-600 mt-1">Real-time KPI analytics, recent transactions, and inventory alerts.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] flex items-center justify-between shadow-subtle-card">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">{kpi.label}</span>
                <p className="font-serif font-extrabold text-2xl text-[#171717]">{kpi.value}</p>
              </div>
              <div className={`p-3 rounded-2xl border ${kpi.color}`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Low Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-amber-900 flex items-center gap-2">
              <AlertTriangle className="text-amber-600" size={20} /> Low Stock Inventory Alerts ({lowStockProducts.length})
            </h3>
            <Link to="/admin/inventory" className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1">
              Manage Inventory <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {lowStockProducts.map((prod) => (
              <div key={prod.id} className="bg-[#FCFBF8] p-4 rounded-xl border border-amber-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={prod.images?.primary} alt={prod.name} className="w-10 h-10 object-contain bg-white rounded-lg p-1 border border-[#EBE7DF]" />
                  <div>
                    <span className="font-bold text-[#171717] block font-serif">{prod.name}</span>
                    <span className="text-amber-800 font-extrabold">{prod.stock} units remaining</span>
                  </div>
                </div>
                <Button variant="primary" size="sm" onClick={() => handleQuickRestock(prod.id)}>
                  +50 Restock
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[#171717]">Recent Transactions</h3>
          <Link to="/admin/orders" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1">
            View All Orders ({orders ? orders.length : 0}) <ChevronRight size={14} />
          </Link>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="py-10 text-center text-slate-500 text-xs bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF]">
            No customer orders registered yet. Orders created via checkout will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto border border-[#EBE7DF] rounded-2xl shadow-subtle-card">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F4ED] text-[#171717] border-b border-[#EBE7DF] font-bold">
                <tr>
                  <th className="p-3.5">Order #</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Payment Status</th>
                  <th className="p-3.5">Fulfillment</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE7DF] bg-[#FCFBF8]">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F7F4ED]/50 transition-colors">
                    <td className="p-3.5 font-bold text-[#6A1423]">#{ord.orderNumber || 'AP-000000'}</td>
                    <td className="p-3.5 font-semibold text-[#171717]">{ord.customerName || 'Customer'}</td>
                    <td className="p-3.5 font-bold font-serif text-[#171717]">₹{(ord.total || 0).toLocaleString('en-IN')}</td>
                    <td className="p-3.5"><Badge variant="green">{(ord.paymentStatus || 'pending').toUpperCase()}</Badge></td>
                    <td className="p-3.5"><Badge variant="maroon">{(ord.orderStatus || 'pending').toUpperCase()}</Badge></td>
                    <td className="p-3.5 text-slate-500">{new Date(ord.createdAt || '2026-01-01').toLocaleDateString('en-IN')}</td>
                    <td className="p-3.5 text-right">
                      <Link to={`/admin/orders/${ord.id}`} className="font-bold text-[#6A1423] hover:underline">
                        View Details →
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
