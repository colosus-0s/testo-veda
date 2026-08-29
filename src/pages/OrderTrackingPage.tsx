import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchGuestOrder } from '@/services/orderService';
import type { Order } from '@/types/order';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Package, Truck, CheckCircle2, Clock, MapPin, CreditCard, Search, ArrowRight, ShieldCheck } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlOrderNumber = searchParams.get('orderNumber') || '';
  const urlToken = searchParams.get('token') || '';

  const [orderNumberInput, setOrderNumberInput] = useState(urlOrderNumber);
  const [tokenInput, setTokenInput] = useState(urlToken);

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const performLookup = async (num: string, tok: string) => {
    if (!num.trim() || !tok.trim()) {
      setErrorMsg('Please enter both Order Number and Security Access Code.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    const result = await fetchGuestOrder(num.trim(), tok.trim());
    setIsLoading(false);

    if (result) {
      setOrder(result);
    } else {
      setOrder(null);
      setErrorMsg('No order found matching the provided Order Number and Access Code. Please check your credentials.');
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (urlOrderNumber && urlToken) {
      fetchGuestOrder(urlOrderNumber.trim(), urlToken.trim()).then((result) => {
        if (isMounted) {
          if (result) {
            setOrder(result);
            setErrorMsg(null);
          } else {
            setOrder(null);
            setErrorMsg('No order found matching the provided Order Number and Access Code. Please check your credentials.');
          }
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [urlOrderNumber, urlToken]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(orderNumberInput, tokenInput);
  };

  const timelineStages = [
    { status: 'pending', label: 'Order Confirmed', description: 'Your order details have been securely recorded.' },
    { status: 'processing', label: 'Ayurvedic Preparation', description: 'Formulation batch allocation and quality inspection.' },
    { status: 'shipped', label: 'Dispatched in Transit', description: 'Handed over to express logistics partner.' },
    { status: 'delivered', label: 'Delivered', description: 'Safely delivered to your shipping address.' },
  ];

  const currentStatusIndex = order
    ? timelineStages.findIndex((s) => s.status === (order.orderStatus || 'pending'))
    : 0;

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
      <Section padding="lg" background="ivory">
        <Container size="default">
          <div className="text-left space-y-8">
            {/* Page Title */}
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#6A1423] block mb-1">
                Arogya Path Express Logistics
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                Track Your Shipment
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Enter your Order Number and Security Access Token to view real-time fulfillment progress.
              </p>
            </div>

            {/* Manual Lookup Form */}
            <form onSubmit={handleFormSubmit} className="bg-[#FCFBF8] p-6 sm:p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#171717] flex items-center gap-2">
                <Search size={18} className="text-[#6A1423]" /> Order Security Lookup
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                    Order Number
                  </label>
                  <input
                    type="text"
                    required
                    value={orderNumberInput}
                    onChange={(e) => setOrderNumberInput(e.target.value)}
                    placeholder="e.g. AP-849201"
                    className="w-full p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717] focus:outline-none focus:border-[#6A1423]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                    Security Access Token (UUID)
                  </label>
                  <input
                    type="text"
                    required
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="e.g. 3b9e4a12-8f1d-4e92-a1b2-c3d4e5f6a7b8"
                    className="w-full p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717] font-mono focus:outline-none focus:border-[#6A1423]"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button variant="primary" size="md" type="submit" isLoading={isLoading} rightIcon={<ArrowRight size={16} />}>
                  Track Order Details
                </Button>
              </div>
            </form>

            {/* Order Tracking Output */}
            {order && (
              <div className="space-y-6">
                {/* Header Summary Card */}
                <div className="bg-[#FCFBF8] p-6 sm:p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="font-serif text-2xl font-bold text-[#171717]">
                          Order #{order.orderNumber}
                        </h2>
                        <Badge variant="maroon">{(order.orderStatus || 'pending').toUpperCase()}</Badge>
                        <Badge variant="green">{(order.paymentStatus || 'pending').toUpperCase()}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Total Amount</span>
                      <span className="font-serif font-extrabold text-2xl text-[#6A1423]">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Fulfillment Progress Timeline */}
                  <div className="space-y-4">
                    <h4 className="font-serif font-bold text-base text-[#171717] flex items-center gap-2">
                      <Clock size={16} className="text-[#6A1423]" /> Shipment Status Timeline
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {timelineStages.map((stage, idx) => {
                        const isPassed = currentStatusIndex >= idx;
                        const isCurrent = currentStatusIndex === idx;
                        return (
                          <div
                            key={stage.status}
                            className={`p-4 rounded-2xl border transition-all ${
                              isCurrent
                                ? 'bg-[#6A1423] text-white border-[#6A1423] shadow-md'
                                : isPassed
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                                : 'bg-[#F7F4ED] text-slate-400 border-[#EBE7DF]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] uppercase font-bold tracking-wider">Stage {idx + 1}</span>
                              {isPassed && <CheckCircle2 size={16} className={isCurrent ? 'text-white' : 'text-emerald-600'} />}
                            </div>
                            <div className="font-serif font-bold text-sm">{stage.label}</div>
                            <div className="text-[11px] opacity-80 mt-1 leading-snug">{stage.description}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Shipping & Payment Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#EBE7DF] text-xs">
                    <div>
                      <span className="font-bold text-[#171717] flex items-center gap-1 mb-2 font-serif text-sm">
                        <MapPin size={14} className="text-[#6A1423]" /> Shipping Destination
                      </span>
                      <p className="font-bold text-[#171717]">{order.shippingAddress.fullName}</p>
                      <p className="text-slate-600">{order.shippingAddress.street}</p>
                      <p className="text-slate-600">
                        {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-[#171717] flex items-center gap-1 mb-2 font-serif text-sm">
                        <CreditCard size={14} className="text-[#173C2B]" /> Payment Summary
                      </span>
                      <p className="text-slate-700 capitalize">Provider: {order.paymentProvider}</p>
                      <p className="text-slate-700 capitalize">Status: {order.paymentStatus}</p>
                      <p className="text-slate-700 font-bold text-sm text-[#6A1423] mt-1">₹{order.total.toLocaleString('en-IN')}</p>
                    </div>

                    <div>
                      <span className="font-bold text-[#171717] flex items-center gap-1 mb-2 font-serif text-sm">
                        <Truck size={14} className="text-[#173C2B]" /> Express Logistics
                      </span>
                      <p className="text-slate-700 font-semibold">BlueDart Express Dispatch</p>
                      <p className="text-slate-500 text-[11px]">Handled by Arogya Path Fulfillment Network</p>
                    </div>
                  </div>
                </div>

                {/* Items Snapshot */}
                <div className="bg-[#FCFBF8] p-6 sm:p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
                  <h3 className="font-serif font-bold text-lg text-[#171717] border-b border-[#EBE7DF] pb-3 flex items-center gap-2">
                    <Package size={18} className="text-[#6A1423]" /> Formulations in Shipment ({order.items.length})
                  </h3>

                  <div className="divide-y divide-[#EBE7DF]">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
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

                {/* Account Promotion Banner */}
                <div className="bg-[#173C2B] text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-lg flex items-center gap-2">
                      <ShieldCheck size={20} className="text-[#E2C384]" /> Save Your Order History
                    </h4>
                    <p className="text-xs text-emerald-100">
                      Create a free Arogya Path account to track future orders, save addresses, and earn rewards.
                    </p>
                  </div>
                  <Link to="/register">
                    <Button variant="secondary" size="md">
                      Create Free Account
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
};
