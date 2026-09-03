import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchGuestOrder } from '@/services/orderService';
import type { Order } from '@/types/order';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Package, Truck, CheckCircle2, Clock, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

const getInitialOrderNumber = (urlParam: string): string => {
  if (urlParam.trim()) return urlParam.trim();
  try {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage?.getItem('arogyapath_recent_order') || window.sessionStorage?.getItem('arogyapath_recent_order');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.orderNumber) {
          return parsed.orderNumber;
        }
      }
    }
  } catch {
    // Ignore parse error
  }
  return '';
};

const getInitialToken = (urlParam: string): string => {
  if (urlParam.trim()) return urlParam.trim();
  try {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage?.getItem('arogyapath_recent_order') || window.sessionStorage?.getItem('arogyapath_recent_order');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.guestAccessToken) {
          return parsed.guestAccessToken;
        }
      }
    }
  } catch {
    // Ignore parse error
  }
  return '';
};

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlOrderNumber = searchParams.get('orderNumber') || '';
  const urlToken = searchParams.get('token') || '';

  const [order, setOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const targetNum = urlOrderNumber.trim() || getInitialOrderNumber(urlOrderNumber);
    const targetTok = urlToken.trim() || getInitialToken(urlToken);

    if (targetNum && targetTok) {
      fetchGuestOrder(targetNum, targetTok).then((res) => {
        if (!isMounted) return;
        if (res) {
          setOrder(res);
          setErrorMsg(null);
        } else {
          setErrorMsg('Order details could not be retrieved. Your private order link is required.');
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [urlOrderNumber, urlToken]);

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
          <div className="text-left space-y-8 max-w-4xl mx-auto">
            {/* Page Header */}
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#6A1423] block mb-1">
                Arogya Path Express Logistics
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                Order Details & Tracking
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Review live fulfillment progress for your purchase.
              </p>
            </div>

            {/* Order Tracking Output Card */}
            {order ? (
              <div className="space-y-6">
                <div className="bg-[#FCFBF8] p-6 sm:p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="font-serif text-2xl font-bold text-[#171717]">
                          Order #{order.orderNumber}
                        </h2>
                        <Badge variant="green" size="md">
                          {order.orderStatus ? order.orderStatus.toUpperCase() : 'PENDING'}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Total Amount</p>
                      <p className="text-2xl font-bold text-[#6A1423]">₹{order.total.toLocaleString('en-IN')}</p>
                      <p className="text-[11px] text-emerald-800 font-semibold">{order.paymentProvider || 'Cash on Delivery'}</p>
                    </div>
                  </div>

                  {/* Fulfillment Timeline */}
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#171717] mb-6 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-[#6A1423]" /> Shipment Progress Timeline
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                      {timelineStages.map((stage, idx) => {
                        const isCompleted = idx <= currentStatusIndex;
                        const isCurrent = idx === currentStatusIndex;

                        return (
                          <div
                            key={stage.status}
                            className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                              isCurrent
                                ? 'bg-amber-50/80 border-[#6A1423] shadow-md ring-1 ring-[#6A1423]'
                                : isCompleted
                                ? 'bg-emerald-50/60 border-emerald-200'
                                : 'bg-[#F7F4ED] border-[#EBE7DF] opacity-60'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A1423]">
                                Step 0{idx + 1}
                              </span>
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Clock className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <h4 className="font-bold text-xs text-[#171717]">{stage.label}</h4>
                            <p className="text-[11px] text-slate-600 leading-relaxed">{stage.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Delivery Destination & Purchased Items Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#EBE7DF] pt-6 text-xs">
                    <div className="space-y-2 bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF]">
                      <h4 className="font-bold text-[#171717] uppercase tracking-wider flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#6A1423]" /> Shipping Destination
                      </h4>
                      <p className="font-bold text-sm text-[#171717]">{order.customerName}</p>
                      <p className="text-slate-600">Mobile: {order.customerPhone}</p>
                      {order.shippingAddress && (
                        <p className="text-slate-600 mt-1 leading-relaxed">
                          {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF]">
                      <h4 className="font-bold text-[#171717] uppercase tracking-wider flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#6A1423]" /> Purchased Items ({order.items.length})
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between border-b border-[#EBE7DF] pb-2">
                            <div className="flex items-center gap-2">
                              {item.productImage && (
                                <img src={item.productImage} alt={item.productName} className="w-8 h-8 rounded object-contain bg-white p-0.5" />
                              )}
                              <div>
                                <p className="font-bold text-[#171717] truncate">{item.productName}</p>
                                <p className="text-[10px] text-slate-500">{item.packSize} • Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-bold text-[#171717]">₹{item.subtotal.toLocaleString('en-IN')}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Simple Card when visiting without active order link */
              <div className="bg-[#FCFBF8] p-8 sm:p-12 rounded-3xl border border-[#EBE7DF] shadow-subtle-card text-center space-y-4 max-w-md mx-auto">
                <ShieldCheck className="w-12 h-12 text-[#6A1423] mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#171717]">
                  Private Order Link Required
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {errorMsg || 'Your private order link is required to view order details.'}
                </p>

                <div className="pt-2">
                  <Link to="/testo">
                    <Button variant="primary" size="lg" className="w-full font-bold shadow-md" rightIcon={<ArrowRight size={16} />}>
                      Continue Shopping
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
