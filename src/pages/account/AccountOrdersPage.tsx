import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCustomerOrders, subscribeToOrders } from '@/services/orderService';
import { useAuth } from '@/context/AuthContext';
import type { Order } from '@/types/order';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Search, Package, ArrowRight, ChevronRight } from 'lucide-react';

export const AccountOrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    let isMounted = true;
    if (user?.id) {
      fetchCustomerOrders(user.id).then((data) => {
        if (isMounted) {
          setOrders(data);
        }
      });
    }

    // Realtime Order Subscription
    const unsubscribe = subscribeToOrders((updatedOrder) => {
      if (isMounted) {
        setOrders((prev) =>
          prev.map((o) => (o.id === updatedOrder.id || o.orderNumber === updatedOrder.orderNumber ? { ...o, ...updatedOrder } : o))
        );
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [user?.id]);

  const isGuest = user?.isAnonymous === true;

  const filteredOrders = (orders || []).filter((o) => {
    const orderNum = o.orderNumber || '';
    const items = o.items || [];
    const status = o.orderStatus || 'pending';

    const matchesSearch =
      orderNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
      items.some((item) => (item.productName || '').toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' || status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left">
      {isGuest && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-serif font-bold text-amber-900 text-sm block">Guest Order History</span>
            <p className="text-amber-800 mt-0.5">
              These orders are saved on this browser device. Create a free account to access your full order history across all devices.
            </p>
          </div>
          <Link to="/register" className="shrink-0">
            <Button variant="primary" size="sm">
              Create Free Account
            </Button>
          </Link>
        </div>
      )}

      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
          {isGuest ? 'Guest Order History' : 'Order History'}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
          {isGuest ? 'My Guest Orders' : 'My Orders'}
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          {isGuest
            ? 'Review orders placed on this browser device.'
            : 'Track active shipments, inspect purchase invoices, and review past order history.'}
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F7F4ED] p-4 rounded-2xl border border-[#EBE7DF]">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order # or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-[#6A1423] text-white shadow-sm'
                  : 'bg-[#FCFBF8] text-slate-700 hover:border-[#6A1423] border border-[#EBE7DF]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="py-16 bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF] text-center space-y-4">
          <Package className="w-12 h-12 text-slate-400 mx-auto" />
          <h4 className="font-serif text-xl font-bold text-[#171717]">
            {orders.length === 0 ? 'No Orders Placed Yet' : 'No Orders Match Your Filter'}
          </h4>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            {orders.length === 0
              ? 'Your completed order history will appear here with full invoice snapshots.'
              : 'Try clearing your search or status filters to view all orders.'}
          </p>
          <Link to="/testo" className="inline-block pt-2">
            <Button variant="primary" size="md" rightIcon={<ArrowRight size={16} />}>
              Explore TESTO Power+
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-subtle-card hover:border-[#6A1423]/40 transition-all"
            >
              {/* Card Header */}
              <div className="p-5 bg-[#FCFBF8] border-b border-[#EBE7DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-black text-lg text-[#171717]">
                      Order #{ord.orderNumber || 'AP-000000'}
                    </span>
                    <Badge variant="maroon">{(ord.orderStatus || 'pending').toUpperCase()}</Badge>
                    <Badge variant="green">{(ord.paymentStatus || 'pending').toUpperCase()}</Badge>
                  </div>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Placed on {new Date(ord.createdAt || '2026-01-01').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-serif font-extrabold text-xl text-[#6A1423]">
                    ₹{(ord.total || 0).toLocaleString('en-IN')}
                  </span>
                  <Link to={`/account/orders/${ord.id}`}>
                    <Button variant="outline" size="sm" rightIcon={<ChevronRight size={14} />}>
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Items List */}
              <div className="p-5 space-y-3 divide-y divide-[#EBE7DF]">
                {(ord.items || []).map((item) => (
                  <div key={item.id} className="pt-3 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-14 h-14 object-contain bg-white rounded-xl p-1.5 border border-[#EBE7DF]"
                      />
                      <div>
                        <span className="font-bold text-[#171717] block font-serif text-sm">
                          {item.productName}
                        </span>
                        <span className="text-slate-600 font-semibold">
                          {item.packSize} • Qty: {item.quantity}
                        </span>
                      </div>
                    </div>

                    <span className="font-bold text-[#171717] font-serif text-sm">
                      ₹{(item.subtotal || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-[#FCFBF8] border-t border-[#EBE7DF] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
                <span>
                  Ship to: <strong>{ord.shippingAddress?.fullName || 'Customer'}</strong> ({ord.shippingAddress?.city || 'City'}, {ord.shippingAddress?.state || 'State'})
                </span>
                <span className="capitalize text-slate-800 font-semibold">
                  Payment: {ord.paymentProvider || 'Standard'} ({ord.paymentStatus || 'pending'})
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
