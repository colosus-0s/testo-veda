import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminOrders, updateOrderStatus, subscribeToOrders } from '@/services/orderService';
import type { Order, OrderStatus } from '@/types/order';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, ChevronRight, Filter } from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [fulfillmentFilter, setFulfillmentFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const loadOrders = async () => {
    const data = await fetchAdminOrders();
    setOrders(data);
  };

  useEffect(() => {
    let isMounted = true;
    fetchAdminOrders().then((data) => {
      if (isMounted) {
        setOrders(data);
      }
    });
    const unsubscribe = subscribeToOrders(() => {
      loadOrders();
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const updated = await updateOrderStatus(orderId, newStatus);
    if (updated) {
      loadOrders();
    }
  };

  const filteredOrders = (orders || []).filter((o) => {
    const orderNum = o.orderNumber || '';
    const name = o.customerName || '';
    const email = o.customerEmail || '';
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      orderNum.toLowerCase().includes(q) ||
      name.toLowerCase().includes(q) ||
      email.toLowerCase().includes(q);

    const matchesFulfillment =
      fulfillmentFilter === 'all' || (o.orderStatus || 'pending').toLowerCase() === fulfillmentFilter.toLowerCase();

    const matchesPayment =
      paymentFilter === 'all' || (o.paymentStatus || 'pending').toLowerCase() === paymentFilter.toLowerCase();

    return matchesSearch && matchesFulfillment && matchesPayment;
  });

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">Order Operations & Fulfillment</h2>
          <p className="text-xs text-slate-600 mt-0.5">Inspect customer purchases, delivery addresses, and update fulfillment status.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order #, customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-9 pr-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#6A1423]"
          />
        </div>
      </div>

      {/* Status Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F7F4ED] p-4 rounded-2xl border border-[#EBE7DF] text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 font-bold text-[#171717]">
            <Filter size={14} className="text-[#6A1423]" /> Fulfillment:
          </div>
          <select
            value={fulfillmentFilter}
            onChange={(e) => setFulfillmentFilter(e.target.value)}
            className="bg-[#FCFBF8] border border-[#EBE7DF] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#171717]"
          >
            <option value="all">All Fulfillment Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="flex items-center gap-1.5 font-bold text-[#171717] ml-2">
            Payment:
          </div>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-[#FCFBF8] border border-[#EBE7DF] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#171717]"
          >
            <option value="all">All Payment Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed / Captured</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <span className="font-bold text-slate-500">
          Showing {filteredOrders.length} Order{filteredOrders.length === 1 ? '' : 's'}
        </span>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-xs bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF]">
          No matching orders found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((ord) => (
            <div key={ord.id} className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EBE7DF] pb-3">
                <div className="space-y-1">
                  <span className="font-serif font-black text-base text-[#6A1423]">
                    Order #{ord.orderNumber || 'AP-000000'}
                  </span>
                  <span className="text-slate-500 block">Placed on {new Date(ord.createdAt || '2026-01-01').toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center gap-3">
                  <label className="font-bold text-[#171717]">Fulfillment Status:</label>
                  <select
                    value={ord.orderStatus || 'pending'}
                    onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                    className="p-1.5 bg-[#FCFBF8] border border-[#EBE7DF] rounded-lg text-xs font-bold text-[#171717] focus:outline-none focus:border-[#6A1423]"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <Link to={`/admin/orders/${ord.id}`}>
                    <Button variant="outline" size="sm" rightIcon={<ChevronRight size={14} />}>
                      Details
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-800">
                <div>
                  <span className="font-bold text-[#171717] block mb-1">Customer Info</span>
                  <p className="font-semibold">{ord.customerName || 'Customer'}</p>
                  <p>{ord.customerEmail || ''}</p>
                  <p>{ord.customerPhone || ''}</p>
                </div>

                <div>
                  <span className="font-bold text-[#171717] block mb-1">Shipping Address Snapshot</span>
                  <p>{ord.shippingAddress?.street || ''}</p>
                  <p>{ord.shippingAddress?.city || ''}, {ord.shippingAddress?.state || ''} - {ord.shippingAddress?.pincode || ''}</p>
                </div>

                <div>
                  <span className="font-bold text-[#171717] block mb-1">Payment & Items</span>
                  <p className="font-bold text-[#6A1423]">Total: ₹{(ord.total || 0).toLocaleString('en-IN')}</p>
                  <p>Provider: {ord.paymentProvider || 'Standard'}</p>
                  <p>Payment: <Badge variant="green">{(ord.paymentStatus || 'pending').toUpperCase()}</Badge></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
