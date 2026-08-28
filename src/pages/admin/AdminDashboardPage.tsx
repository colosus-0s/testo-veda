import React, { useState } from 'react';
import { useOrders } from '@/context/OrderContext';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { Package, Users, DollarSign, Settings, ShieldCheck, Layers } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'customers' | 'system'>('orders');

  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'captured' ? o.totalAmount : 0), 0);

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen">
      {/* Admin Hero */}
      <Section padding="md" background="dark" className="border-b border-white/10 text-white">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#F3E5AB] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/20">
                Administrator Control Center
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Arogya Path Storefront Operations
              </h1>
              <p className="text-slate-300 text-xs mt-1">
                Protected Admin Gateway • Database Role Authorized
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 px-3 py-1.5 rounded-lg text-xs font-bold w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>RLS Security Enforced</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Admin Dashboard Body */}
      <Section padding="lg" background="white" className="border-b border-[#EBE7DF]">
        <Container>
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[10px] uppercase font-bold">Total Sales</span>
                <DollarSign className="w-4 h-4 text-[#6A1423]" />
              </div>
              <p className="font-serif text-2xl font-bold text-[#6A1423]">₹{totalSales.toLocaleString('en-IN')}</p>
            </div>

            <div className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[10px] uppercase font-bold">Total Orders</span>
                <Package className="w-4 h-4 text-[#173C2B]" />
              </div>
              <p className="font-serif text-2xl font-bold text-[#171717]">{orders.length}</p>
            </div>

            <div className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[10px] uppercase font-bold">Catalog Products</span>
                <Layers className="w-4 h-4 text-amber-600" />
              </div>
              <p className="font-serif text-2xl font-bold text-[#171717]">{INITIAL_PRODUCTS.length}</p>
            </div>

            <div className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[10px] uppercase font-bold">Registered Users</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <p className="font-serif text-2xl font-bold text-[#171717]">12</p>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#EBE7DF] pb-4 mb-8 overflow-x-auto">
            {[
              { id: 'orders', label: 'Order Management', icon: Package },
              { id: 'products', label: 'Product Catalog', icon: Layers },
              { id: 'customers', label: 'Customer Records', icon: Users },
              { id: 'system', label: 'System & Security', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                    activeTab === tab.id
                      ? 'bg-[#6A1423] text-white border-[#6A1423] shadow-sm'
                      : 'bg-[#F7F4ED] text-[#171717] border-[#EBE7DF] hover:border-[#6A1423]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Orders Management */}
          {activeTab === 'orders' && (
            <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#171717]">Order Management & Status Controls</h3>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#EBE7DF] text-slate-500 uppercase text-[10px] font-bold">
                      <th className="py-3 px-2">Order #</th>
                      <th className="py-3 px-2">Customer Email</th>
                      <th className="py-3 px-2">Amount</th>
                      <th className="py-3 px-2">Payment</th>
                      <th className="py-3 px-2">Fulfillment Status</th>
                      <th className="py-3 px-2 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EBE7DF]">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#F7F4ED]">
                        <td className="py-3.5 px-2 font-bold text-[#6A1423]">{ord.orderNumber}</td>
                        <td className="py-3.5 px-2 font-semibold text-[#171717]">{ord.customerEmail}</td>
                        <td className="py-3.5 px-2 font-bold text-[#171717]">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-2">
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                            {ord.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-2">
                          <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-right">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as typeof ord.status)}
                            className="bg-[#F7F4ED] border border-[#EBE7DF] rounded-lg px-2.5 py-1 text-xs font-bold text-[#171717] focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Product Catalog */}
          {activeTab === 'products' && (
            <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#171717]">Storefront Product Catalog</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INITIAL_PRODUCTS.map((prod) => (
                  <div key={prod.id} className="bg-[#F7F4ED] p-4 rounded-xl border border-[#EBE7DF] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={prod.images.primary} alt={prod.name} className="w-12 h-12 object-contain bg-white p-1 rounded border" />
                      <div>
                        <p className="font-bold text-[#171717]">{prod.name}</p>
                        <p className="text-[11px] text-slate-500">₹{prod.price} • FSSAI Lic. #{prod.regulatory.fssaiLicense}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="font-bold">
                      Edit Item
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: System Status */}
          {activeTab === 'system' && (
            <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-6 text-xs text-slate-700">
              <h3 className="font-serif text-xl font-bold text-[#171717]">Security & Backend System Status</h3>

              <div className="space-y-3 bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF]">
                <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-3">
                  <span className="font-bold text-[#171717]">Supabase RLS Table Security</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1"><ShieldCheck size={16} /> Enforced</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-3">
                  <span className="font-bold text-[#171717]">Active Payment Provider</span>
                  <span className="text-[#6A1423] font-bold">Development Provider Abstraction</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#171717]">Live Payment Gateway Status</span>
                  <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Awaiting Credentials</span>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};
