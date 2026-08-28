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
          <ArrowLeft size={16} /> Back to Order History
        </Link>
        <div className="py-16 bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF] text-center space-y-3">
          <Package className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#171717]">Order Not Found</h3>
          <p className="text-xs text-slate-600">The requested order ID or reference does not exist in your account history.</p>
          <Link to="/account/orders" className="inline-block pt-2">
            <Button variant="primary" size="md">View All Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Order Timeline Steps Calculation
  const steps = [
    { label: 'Order Placed', status: 'completed' },
    { label: 'Payment Confirmed', status: order.paymentStatus === 'completed' || order.orderStatus === 'paid' || order.orderStatus === 'processing' || order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'completed' : 'pending' },
    { label: 'Processing', status: order.orderStatus === 'processing' || order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'completed' : 'pending' },
    { label: 'Shipped', status: order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'completed' : 'pending' },
    { label: 'Delivered', status: order.orderStatus === 'delivered' ? 'completed' : 'pending' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
        <div>
          <Link to="/account/orders" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft size={14} /> Back to My Orders
          </Link>
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
              Order #{order.orderNumber}
            </h2>
            <Badge variant="maroon">{order.orderStatus.toUpperCase()}</Badge>
            <Badge variant="green">{order.paymentStatus.toUpperCase()}</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Placed on {new Date(order.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => window.print()} className="w-fit">
          Print Invoice
        </Button>
      </div>

      {/* Dynamic Fulfillment Timeline */}
      <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-4">
        <h3 className="font-serif font-bold text-base text-[#171717] flex items-center gap-2">
          <Clock size={18} className="text-[#6A1423]" /> Order Fulfillment Timeline
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {steps.map((st, idx) => (
            <div key={st.label} className="flex flex-col items-center text-center space-y-1.5 relative">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border ${
                  st.status === 'completed'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-[#FCFBF8] text-slate-400 border-[#EBE7DF]'
                }`}
              >
                {st.status === 'completed' ? <CheckCircle2 size={18} /> : idx + 1}
              </div>
              <span className={`text-[11px] font-bold ${st.status === 'completed' ? 'text-[#171717]' : 'text-slate-400'}`}>
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Items Snapshot */}
      <div className="bg-[#FCFBF8] rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-subtle-card space-y-4">
        <div className="p-5 bg-[#F7F4ED] border-b border-[#EBE7DF]">
          <h3 className="font-serif text-lg font-bold text-[#171717]">
            Purchased Formulations ({order.items.length})
          </h3>
        </div>

        <div className="p-5 divide-y divide-[#EBE7DF] space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 object-contain bg-[#F7F4ED] rounded-xl p-2 border border-[#EBE7DF]"
                />
                <div className="space-y-1">
                  <span className="font-serif font-bold text-base text-[#171717] block">
                    {item.productName}
                  </span>
                  <span className="text-slate-600 font-semibold block">
                    Pack Size: {item.packSize}
                  </span>
                  <span className="text-slate-500 block">
                    Unit Price: ₹{item.unitPrice.toLocaleString('en-IN')} • Quantity: {item.quantity}
                  </span>
                </div>
              </div>

              <span className="font-serif font-extrabold text-lg text-[#6A1423]">
                ₹{item.subtotal.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Address & Payment Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Shipping Address Snapshot */}
        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-sm text-[#171717] border-b border-[#EBE7DF] pb-2">
            <MapPin size={18} className="text-[#6A1423]" /> Shipping Address Snapshot
          </div>
          <div className="space-y-1 text-slate-800 font-semibold">
            <p className="font-bold text-sm text-[#171717]">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.street}</p>
            {order.shippingAddress.landmark && <p>Landmark: {order.shippingAddress.landmark}</p>}
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            <p className="text-slate-900 pt-1">Phone: {order.shippingAddress.phone}</p>
            <p className="text-slate-600">Email: {order.customerEmail}</p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-sm text-[#171717] border-b border-[#EBE7DF] pb-2">
            <CreditCard size={18} className="text-[#173C2B]" /> Payment & Charges Breakdown
          </div>
          <div className="space-y-2 text-slate-700 font-semibold">
            <div className="flex justify-between"><span>Items Subtotal:</span><span>₹{order.subtotal.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span>Express Shipping:</span><span className="text-emerald-700 font-bold">{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-emerald-700"><span>Discount Applied:</span><span>-₹{order.discount}</span></div>}
            <div className="flex justify-between font-serif font-black text-lg text-[#171717] pt-2 border-t border-[#EBE7DF]">
              <span>Total Paid:</span>
              <span className="text-[#6A1423]">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 text-[11px] text-slate-600 space-y-1 border-t border-[#EBE7DF]">
              <p>Payment Method: <strong className="capitalize text-[#171717]">{order.paymentProvider}</strong></p>
              {order.providerPaymentId && <p>Payment Ref ID: <code>{order.providerPaymentId}</code></p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
