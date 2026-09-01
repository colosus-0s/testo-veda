import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminOrders } from '@/services/orderService';
import { getProducts, updateStock } from '@/repositories/productRepository';
import { getCustomersFromOrders, type CustomerProfile } from '@/repositories/customerRepository';
import type { Order } from '@/types/order';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DollarSign, ShoppingBag, Package, ChevronRight, Boxes, AlertTriangle, Users } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState(getProducts());
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetchAdminOrders().then((data) => {
      if (isMounted) {
        setOrders(data);
        setCustomers(getCustomersFromOrders(data));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const totalRevenue = (orders || []).reduce((sum: number, ord: Order) => sum + (ord.total || 0), 0);
  const pendingOrders = (orders || []).filter((o: Order) => o.orderStatus === 'pending');
  const processingOrders = (orders || []).filter((o: Order) => o.orderStatus === 'processing');
  const deliveredOrders = (orders || []).filter((o: Order) => o.orderStatus === 'delivered');
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
    const updated = await updateStock(id, 25, 'Quick Restock +25');
    if (updated) {
      setProducts(getProducts());
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#171717]">Command & Control Operations</h1>
        <p className="text-xs text-slate-600 mt-1">Real-time overview of orders, revenue, inventory alerts, and fulfillment metrics.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-[#FCFBF8] p-5 rounded-3xl border border-[#EBE7DF] shadow-subtle-card flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{kpi.label}</p>
                <p className="font-serif text-2xl font-bold text-[#171717] mt-1">{kpi.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${kpi.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-[#FCFBF8] p-6 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-3">
            <h3 className="font-serif font-bold text-lg text-[#171717] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#6A1423]" /> Recent Orders (Live Database)
            </h3>
            <Link to="/admin/orders" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1">
              View All Orders <ChevronRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-[#EBE7DF] text-xs">
            {orders.slice(0, 5).map((ord: Order) => (
              <div key={ord.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#171717]">#{ord.orderNumber} • {ord.customerName}</p>
                  <p className="text-[11px] text-slate-500">Phone: {ord.customerPhone} • {ord.items.length} item(s)</p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="font-bold text-[#6A1423]">₹{ord.total.toLocaleString('en-IN')}</p>
                    <Badge variant="green" size="sm">{ord.orderStatus}</Badge>
                  </div>
                  <Link to={`/admin/orders/${ord.id}`}>
                    <Button variant="ghost" size="sm">Inspect</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Stock Alerts */}
        <div className="lg:col-span-4 bg-[#FCFBF8] p-6 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#171717] flex items-center gap-2 border-b border-[#EBE7DF] pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" /> Stock Level Alerts
          </h3>

          <div className="space-y-3 text-xs">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-amber-950">{p.name}</p>
                  <p className="text-[11px] text-amber-800">Remaining Stock: {p.stock} units</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleQuickRestock(p.id)}>
                  +25 Stock
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
