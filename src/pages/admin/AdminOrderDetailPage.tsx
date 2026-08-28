import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById, updateOrderStatus } from '@/services/orderService';
import type { Order, OrderStatus } from '@/types/order';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Package, CheckCircle2, MapPin, CreditCard, User } from 'lucide-react';

export const AdminOrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(orderId ? getOrderById(orderId) : null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!order) {
    return (
      <div className="space-y-6 text-left py-12">
        <Link to="/admin/orders" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1.5">
          <ArrowLeft size={16} /> Back to Admin Orders
        </Link>
        <div className="py-16 bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF] text-center space-y-3">
          <Package className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#171717]">Order Record Not Found</h3>
          <p className="text-xs text-slate-600">No order matches the requested ID.</p>
          <Link to="/admin/orders" className="inline-block pt-2">
            <Button variant="primary" size="md">Return to Orders Directory</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    const updated = await updateOrderStatus(order.id, newStatus);
    if (updated) {
      setOrder(updated);
      setStatusMessage(`Fulfillment status updated to ${newStatus.toUpperCase()}`);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
        <div>
          <Link to="/admin/orders" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft size={14} /> Back to Orders Management
          </Link>
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
              Order #{order.orderNumber}
            </h2>
            <Badge variant="maroon">{order.orderStatus.toUpperCase()}</Badge>
            <Badge variant="green">{order.paymentStatus.toUpperCase()}</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registered on {new Date(order.createdAt).toLocaleString('en-IN')}
          </p>
        </div>

        {/* Fulfillment Control */}
        <div className="flex items-center gap-3 bg-[#F7F4ED] p-3 rounded-2xl border border-[#EBE7DF]">
          <label className="text-xs font-bold text-[#171717]">Update Order Status:</label>
          <select
            value={order.orderStatus}
            onChange={(e) => handleStatusUpdate(e.target.value as OrderStatus)}
            className="p-2 bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl text-xs font-bold text-[#171717] focus:outline-none focus:border-[#6A1423]"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-900 font-bold">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Customer & Address Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-2 text-xs">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 border-b border-[#EBE7DF] pb-2 text-sm font-serif">
            <User size={16} className="text-[#6A1423]" /> Customer Identity
          </span>
          <p className="font-bold text-[#171717] text-sm pt-1">{order.customerName}</p>
          <p className="text-slate-700">{order.customerEmail}</p>
          <p className="text-slate-700">{order.customerPhone}</p>
        </div>

        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-2 text-xs">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 border-b border-[#EBE7DF] pb-2 text-sm font-serif">
            <MapPin size={16} className="text-[#6A1423]" /> Shipping Address
          </span>
          <p className="font-bold text-[#171717]">{order.shippingAddress.fullName}</p>
          <p className="text-slate-700">{order.shippingAddress.street}</p>
          <p className="text-slate-700">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
        </div>

        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-2 text-xs">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 border-b border-[#EBE7DF] pb-2 text-sm font-serif">
            <CreditCard size={16} className="text-[#173C2B]" /> Payment Snapshot
          </span>
          <p className="font-serif font-extrabold text-base text-[#6A1423]">₹{order.total.toLocaleString('en-IN')}</p>
          <p className="text-slate-700 capitalize">Provider: {order.paymentProvider}</p>
          <p className="text-slate-700 capitalize">Payment Status: <Badge variant="green">{order.paymentStatus}</Badge></p>
        </div>
      </div>

      {/* Items Snapshot */}
      <div className="bg-[#FCFBF8] rounded-2xl border border-[#EBE7DF] p-6 space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#171717] border-b border-[#EBE7DF] pb-3">
          Order Items Snapshot ({order.items.length})
        </h3>
        <div className="divide-y divide-[#EBE7DF] space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="pt-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-contain bg-[#F7F4ED] rounded-xl p-1 border border-[#EBE7DF]" />
                <div>
                  <span className="font-bold text-[#171717] block text-sm">{item.productName}</span>
                  <span className="text-slate-500">{item.packSize} • Qty: {item.quantity}</span>
                </div>
              </div>
              <span className="font-serif font-bold text-sm text-[#171717]">
                ₹{item.subtotal.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
