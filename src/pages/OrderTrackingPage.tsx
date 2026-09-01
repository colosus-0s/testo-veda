import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchGuestOrder } from '@/services/orderService';
import type { Order } from '@/types/order';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Package, Truck, CheckCircle2, Clock, MapPin, Search, ShieldCheck, Phone } from 'lucide-react';

const getInitialOrderNumber = (urlParam: string): string => {
  if (urlParam.trim()) return urlParam.trim();
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const saved = window.sessionStorage.getItem('arogyapath_recent_order');
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
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const saved = window.sessionStorage.getItem('arogyapath_recent_order');
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

  const [orderNumberInput, setOrderNumberInput] = useState<string>(() => getInitialOrderNumber(urlOrderNumber));
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [tokenInput] = useState<string>(() => getInitialToken(urlToken));

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const performLookup = async (num: string, phoneStr?: string, tokStr?: string) => {
    const cleanNum = num.trim();
    if (!cleanNum) {
      setErrorMsg('Please enter your Order Number (e.g. AP-849201).');
      return;
    }

    if (!phoneStr?.trim() && !tokStr?.trim()) {
      setErrorMsg('For security, please enter either your registered Mobile Number or Security Token.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    const result = await fetchGuestOrder(cleanNum, tokStr?.trim(), phoneStr?.trim());
    setIsLoading(false);

    if (result) {
      setOrder(result);
    } else {
      setOrder(null);
      setErrorMsg('No authorized order found matching the provided details. Please verify your order number and mobile number.');
    }
  };

  useEffect(() => {
    let isMounted = true;
    const targetNum = urlOrderNumber.trim() || getInitialOrderNumber(urlOrderNumber);
    const targetTok = urlToken.trim() || getInitialToken(urlToken);

    if (targetNum && targetTok) {
      fetchGuestOrder(targetNum, targetTok).then((res) => {
        if (!isMounted) return;
        setIsLoading(false);
        if (res) {
          setOrder(res);
          setErrorMsg(null);
        } else {
          setErrorMsg(`Order ${targetNum} requires authentication. Please enter your registered mobile number below.`);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [urlOrderNumber, urlToken]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(orderNumberInput, phoneInput, tokenInput);
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
            {/* Page Header */}
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#6A1423] block mb-1">
                Arogya Path Express Logistics
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                Track Your Shipment
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Enter your Order Number and registered Mobile Number to view authorized real-time fulfillment progress.
              </p>
            </div>

            {/* Secure Authorized Order Lookup Form */}
            <form onSubmit={handleFormSubmit} className="bg-[#FCFBF8] p-6 sm:p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#171717] flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#6A1423]" /> Authorized Order Lookup
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                    Order Number *
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={orderNumberInput}
                      onChange={(e) => setOrderNumberInput(e.target.value)}
                      placeholder="e.g. AP-948858"
                      className="w-full p-3 pl-9 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717] focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                    Registered Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full p-3 pl-9 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717] focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="primary" size="md" isLoading={isLoading} type="submit" leftIcon={<Search size={16} />}>
                  View Authorized Status
                </Button>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 font-semibold">
                  {errorMsg}
                </div>
              )}
            </form>

            {/* Order Tracking Output Card */}
            {order && (
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
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
};
