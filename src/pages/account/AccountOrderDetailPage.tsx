import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '@/services/orderService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, CheckCircle2, Package, MapPin, CreditCard, Clock } from 'lucide-react';

export const AccountOrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = orderId ? getOrderById(orderId) : null;

  if (!order) {
    return (
      <div className="space-y-6 text-left py-12">
        <Link to="/account/orders" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1.5">
          <ArrowLeft size={16} /> Back to My Orders
        </Link>
        <div className="py-16 bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF] text-center space-y-3">
          <Package className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#171717]">Order Not Found</h3>
          <p className="text-xs text-slate-600">The requested order number could not be located in your account history.</p>
          <Link to="/account/orders" className="inline-block pt-2">
            <Button variant="primary" size="md">Return to Orders List</Button>
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { label: 'Order Placed', done: true },
    { label: 'Payment Confirmed', done: order.paymentStatus === 'completed' },
    { label: 'Processing', done: order.orderStatus === 'processing' || order.orderStatus === 'shipped' || order.orderStatus === 'delivered' },
    { label: 'Shipped', done: order.orderStatus === 'shipped' || order.orderStatus === 'delivered' },
    { label: 'Delivered', done: order.orderStatus === 'delivered' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
        <div>
          <Link to="/account/orders" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft size={14} /> Back to Orders
          </Link>
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
              Order #{order.orderNumber || 'AP-000000'}
            </h2>
            <Badge variant="maroon">{(order.orderStatus || 'pending').toUpperCase()}</Badge>
            <Badge variant="green">{(order.paymentStatus || 'pending').toUpperCase()}</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Placed on {new Date(order.createdAt || '2026-01-01').toLocaleString('en-IN')}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="w-fit"
        >
          Print Invoice
        </Button>
      </div>

      {/* Fulfillment Status Timeline */}
      <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-4">
        <h3 className="font-serif font-bold text-sm text-[#171717] flex items-center gap-2">
          <Clock size={16} className="text-[#6A1423]" /> Order Fulfillment Progress
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {steps.map((st, idx) => (
            <div
              key={st.label}
              className={`p-3 rounded-xl border text-center space-y-1 ${
                st.done
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold'
                  : 'bg-[#FCFBF8] border-[#EBE7DF] text-slate-400 font-semibold'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                {st.done ? <CheckCircle2 size={14} className="text-emerald-600" /> : <span className="text-[10px]">{idx + 1}</span>}
              </div>
              <span className="text-[11px] block">{st.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Address & Payment Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-800">
        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-2">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 border-b border-[#EBE7DF] pb-2 text-sm font-serif">
            <MapPin size={16} className="text-[#6A1423]" /> Shipping Address Snapshot
          </span>
          <p className="font-bold text-[#171717] text-sm pt-1">{order.shippingAddress?.fullName || order.customerName}</p>
          <p>{order.shippingAddress?.street || ''}</p>
          <p>{order.shippingAddress?.city || ''}, {order.shippingAddress?.state || ''} - {order.shippingAddress?.pincode || ''}</p>
          <p className="text-slate-500">Phone: {order.shippingAddress?.phone || order.customerPhone}</p>
        </div>

        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-2">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 border-b border-[#EBE7DF] pb-2 text-sm font-serif">
            <CreditCard size={16} className="text-[#173C2B]" /> Payment Snapshot
          </span>
          <p className="font-serif font-extrabold text-base text-[#6A1423]">₹{(order.total || 0).toLocaleString('en-IN')}</p>
          <p className="capitalize">Provider: {order.paymentProvider || 'Standard'}</p>
          <p className="capitalize">Status: <Badge variant="green">{(order.paymentStatus || 'pending').toUpperCase()}</Badge></p>
          <p className="text-slate-500">Subtotal: ₹{(order.subtotal || 0).toLocaleString('en-IN')} | Shipping: ₹{(order.shippingFee || 0).toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Items Snapshot */}
      <div className="bg-[#FCFBF8] rounded-2xl border border-[#EBE7DF] p-6 space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#171717] border-b border-[#EBE7DF] pb-3">
          Order Items Snapshot ({order.items ? order.items.length : 0})
        </h3>
        <div className="divide-y divide-[#EBE7DF] space-y-3">
          {(order.items || []).map((item) => (
            <div key={item.id} className="pt-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <img src={item.productImage} alt={item.productName} className="w-14 h-14 object-contain bg-[#F7F4ED] rounded-xl p-1 border border-[#EBE7DF]" />
                <div>
                  <span className="font-bold text-[#171717] block text-sm font-serif">{item.productName}</span>
                  <span className="text-slate-600 font-semibold">{item.packSize} • Qty: {item.quantity}</span>
                </div>
              </div>
              <span className="font-serif font-bold text-sm text-[#171717]">
                ₹{(item.subtotal || 0).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
