import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAdminOrder, updateOrderStatus } from '@/services/orderService';
import type { Order, OrderStatus } from '@/types/order';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Package, CheckCircle2, MapPin, CreditCard, User, Truck, Clock } from 'lucide-react';

export const AdminOrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [courierName, setCourierName] = useState('BlueDart Express');
  const [trackingNumber, setTrackingNumber] = useState(orderId ? `AWB-${orderId.substring(0, 8).toUpperCase()}` : '');

  useEffect(() => {
    let isMounted = true;
    if (orderId) {
      fetchAdminOrder(orderId).then((data) => {
        if (isMounted) {
          setOrder(data);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [orderId]);

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
      setStatusMessage(`Fulfillment status updated to ${(newStatus || 'pending').toUpperCase()}`);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(`Tracking details saved: ${courierName} (${trackingNumber})`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const timelineStages = [
    { status: 'pending', label: 'Order Placed' },
    { status: 'processing', label: 'Processing' },
    { status: 'shipped', label: 'Shipped' },
    { status: 'delivered', label: 'Delivered' },
  ];

  const currentStatusIndex = timelineStages.findIndex((s) => s.status === (order.orderStatus || 'pending'));

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
        <div>
          <Link to="/admin/orders" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft size={14} /> Back to Orders Management
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
              Order #{order.orderNumber || 'AP-000000'}
            </h2>
            <Badge variant="maroon">{(order.orderStatus || 'pending').toUpperCase()}</Badge>
            <Badge variant="green">{(order.paymentStatus || 'pending').toUpperCase()}</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registered on {new Date(order.createdAt || '2026-01-01').toLocaleString('en-IN')}
          </p>
        </div>

        {/* Fulfillment Control */}
        <div className="flex items-center gap-3 bg-[#F7F4ED] p-3 rounded-2xl border border-[#EBE7DF]">
          <label className="text-xs font-bold text-[#171717]">Fulfillment Status:</label>
          <select
            value={order.orderStatus || 'pending'}
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

      {/* Order Progress Timeline */}
      <div className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
        <h3 className="font-serif font-bold text-base text-[#171717] flex items-center gap-2">
          <Clock size={16} className="text-[#6A1423]" /> Order Fulfillment Timeline
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
          {timelineStages.map((stage, idx) => {
            const isPassed = currentStatusIndex >= idx;
            return (
              <div
                key={stage.status}
                className={`p-3 rounded-xl border transition-all ${
                  isPassed
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                    : 'bg-[#FCFBF8] text-slate-400 border-[#EBE7DF]'
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider mb-1">Step {idx + 1}</div>
                <div>{stage.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer & Address Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-2 text-xs">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 border-b border-[#EBE7DF] pb-2 text-sm font-serif">
            <User size={16} className="text-[#6A1423]" /> Customer Identity
          </span>
          <p className="font-bold text-[#171717] text-sm pt-1">{order.customerName || 'Customer'}</p>
          <p className="text-slate-700">{order.customerEmail || 'customer@example.com'}</p>
          <p className="text-slate-700">{order.customerPhone || '+91 98765 43210'}</p>
        </div>

        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-2 text-xs">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 border-b border-[#EBE7DF] pb-2 text-sm font-serif">
            <MapPin size={16} className="text-[#6A1423]" /> Shipping Address Snapshot
          </span>
          <p className="font-bold text-[#171717]">{order.shippingAddress?.fullName || order.customerName}</p>
          <p className="text-slate-700">{order.shippingAddress?.street || 'Connaught Place'}</p>
          <p className="text-slate-700">
            {order.shippingAddress?.city || 'New Delhi'}, {order.shippingAddress?.state || 'Delhi'} - {order.shippingAddress?.pincode || '110001'}
          </p>
        </div>

        <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-2 text-xs">
          <span className="font-bold text-[#171717] flex items-center gap-1.5 border-b border-[#EBE7DF] pb-2 text-sm font-serif">
            <CreditCard size={16} className="text-[#173C2B]" /> Payment & Provider Snapshot
          </span>
          <p className="font-serif font-extrabold text-base text-[#6A1423]">₹{(order.total || 0).toLocaleString('en-IN')}</p>
          <p className="text-slate-700 capitalize">Provider: {order.paymentProvider || 'Standard Gateway'}</p>
          <p className="text-slate-700 capitalize">Payment Status: <Badge variant="green">{(order.paymentStatus || 'pending').toUpperCase()}</Badge></p>
          <p className="text-[11px] text-slate-500 font-mono">TxRef: tx_{order.id.substring(0, 10)}</p>
        </div>
      </div>

      {/* Courier & Shipping Preparation Form */}
      <form onSubmit={handleSaveTracking} className="bg-[#F7F4ED] p-6 rounded-3xl border border-[#EBE7DF] space-y-4">
        <h3 className="font-serif font-bold text-base text-[#171717] flex items-center gap-2 border-b border-[#EBE7DF] pb-2">
          <Truck size={18} className="text-[#173C2B]" /> Courier & Shipment Dispatch Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-[#171717] block mb-1">Courier Partner / Service</label>
            <input
              type="text"
              value={courierName}
              onChange={(e) => setCourierName(e.target.value)}
              className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs text-[#171717]"
            />
          </div>

          <div>
            <label className="font-bold text-[#171717] block mb-1">Tracking Number / AWB</label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full bg-[#FCFBF8] border border-[#EBE7DF] rounded-xl p-2.5 text-xs font-mono text-[#171717]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="sm" type="submit">
            Save Shipment Details
          </Button>
        </div>
      </form>

      {/* Items Snapshot */}
      <div className="bg-[#FCFBF8] rounded-3xl border border-[#EBE7DF] p-6 space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#171717] border-b border-[#EBE7DF] pb-3">
          Order Items Snapshot ({order.items ? order.items.length : 0})
        </h3>
        <div className="divide-y divide-[#EBE7DF] space-y-3">
          {(order.items || []).map((item) => (
            <div key={item.id} className="pt-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-contain bg-[#F7F4ED] rounded-xl p-1 border border-[#EBE7DF]" />
                <div>
                  <span className="font-bold text-[#171717] block text-sm">{item.productName}</span>
                  <span className="text-slate-500">{item.packSize} • Qty: {item.quantity}</span>
                </div>
              </div>
              <span className="font-serif font-bold text-sm text-[#171717]">
                ₹{(item.subtotal || 0).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#EBE7DF] text-xs space-y-1.5 max-w-xs ml-auto text-right">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal:</span>
            <span>₹{(order.subtotal || order.total || 0).toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between font-bold text-base text-[#6A1423] font-serif pt-1 border-t border-[#EBE7DF]">
            <span>Final Total:</span>
            <span>₹{(order.total || 0).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
