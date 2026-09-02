import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder } from '@/services/orderService';
import type { Order } from '@/types/order';
import type { UserAddress } from '@/types/auth';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, CheckCircle2, ShoppingBag, Truck, AlertCircle, Phone, User, MapPin } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cartItems, cartSummary, clearCart } = useCart();
  const { user, addresses } = useAuth();

  // Shipping & Customer Information Form State
  const defaultAddr = addresses.find((a: UserAddress) => a.isDefault) || addresses[0];
  const [fullName, setFullName] = useState(user?.fullName || defaultAddr?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || defaultAddr?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [street, setStreet] = useState(defaultAddr?.street || '');
  const [landmark, setLandmark] = useState(defaultAddr?.landmark || '');
  const [city, setCity] = useState(defaultAddr?.city || '');
  const [state, setState] = useState(defaultAddr?.state || '');
  const [pincode, setPincode] = useState(defaultAddr?.pincode || '');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Post-Checkout Completed Order State
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (cartItems.length === 0) {
      setErrorMessage('Your shopping cart is empty.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!fullName.trim() || !street.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
      setErrorMessage('Please complete all required shipping address fields.');
      return;
    }

    setIsProcessing(true);

    try {
      // Create Customer Order in Supabase PostgreSQL
      const created = await createOrder({
        customerName: fullName.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim(),
        shippingAddress: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          street: street.trim(),
          landmark: landmark.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          country: 'India',
        },
        cartItems,
        paymentProvider: 'Cash on Delivery',
      });

      setCompletedOrder(created);

      if (typeof window !== 'undefined') {
        const recentOrderPayload = JSON.stringify({
          orderNumber: created.orderNumber,
          guestAccessToken: created.guestAccessToken,
          timestamp: Date.now(),
        });
        try { window.localStorage.setItem('arogyapath_recent_order', recentOrderPayload); } catch { /* Ignore */ }
        try { window.sessionStorage.setItem('arogyapath_recent_order', recentOrderPayload); } catch { /* Ignore */ }
      }

      clearCart();
      setIsProcessing(false);
    } catch (err: unknown) {
      console.error('[CheckoutPage] Order creation error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to place order. Please check your network and try again.';
      setErrorMessage(msg);
      setIsProcessing(false);
    }
  };

  // 1. ORDER CONFIRMATION VIEW (Immediate Post-Checkout)
  if (completedOrder) {
    return (
      <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
        <Section padding="lg" background="ivory">
          <Container size="narrow">
            <div className="bg-[#FCFBF8] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] shadow-subtle-card text-center space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <Badge variant="green" size="md" className="mb-2">
                  Order Confirmed • Cash on Delivery
                </Badge>
                <h1 className="font-serif text-3xl font-bold text-[#171717]">
                  Thank You For Your Order!
                </h1>
                <p className="text-xs text-slate-600 mt-2">
                  Your order <span className="font-mono font-bold text-[#6A1423]">#{completedOrder.orderNumber}</span> has been securely recorded and dispatched for fulfillment.
                </p>
              </div>

              {/* Order Detail Summary Card */}
              <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-[#EBE7DF] pb-2 font-bold">
                  <span>Order Number</span>
                  <span className="font-mono text-[#6A1423]">#{completedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between border-b border-[#EBE7DF] pb-2">
                  <span>Customer Name</span>
                  <span className="font-semibold">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-[#EBE7DF] pb-2">
                  <span>Mobile Number</span>
                  <span className="font-semibold">{completedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between border-b border-[#EBE7DF] pb-2">
                  <span>Payment Method</span>
                  <span className="font-semibold text-emerald-800">Cash on Delivery (COD)</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#171717] pt-1">
                  <span>Total Payable</span>
                  <span className="text-[#6A1423]">₹{completedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Immediate Post-Checkout Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link to={`/orders/track?orderNumber=${completedOrder.orderNumber}&token=${completedOrder.guestAccessToken || ''}`}>
                  <Button variant="primary" size="md">
                    View Your Order
                  </Button>
                </Link>
                <Link to="/testo">
                  <Button variant="outline" size="md">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  // 2. CHECKOUT FORM VIEW
  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
      <Section padding="lg" background="ivory">
        <Container size="default">
          <Breadcrumb items={[{ label: 'Checkout & Express Delivery' }]} className="mb-6 text-slate-700 text-left" />

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-900 font-semibold text-left">
              <AlertCircle className="w-5 h-5 text-[#6A1423] shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Left Column: Customer & Delivery Address Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#FCFBF8] rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-subtle-card space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
                    No Registration Required
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#171717] flex items-center gap-2">
                    <User className="w-5 h-5 text-[#6A1423]" /> Customer & Shipping Information
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Provide your mobile number and shipping address for express Cash on Delivery.
                  </p>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                  {/* Full Name & Mobile Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Aarav Sharma"
                          className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-9 pr-3 py-3 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                        Mobile Number * (Used for Order Tracking)
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-9 pr-3 py-3 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Optional Email Address */}
                  <div>
                    <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                      Email Address (Optional for Invoice Receipt)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. aarav@example.com"
                      className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl p-3 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                      Street Address / House No. / Building *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="e.g. Flat 402, Lotus Heights, MG Road"
                        className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl pl-9 pr-3 py-3 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                      />
                    </div>
                  </div>

                  {/* Landmark */}
                  <div>
                    <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near HDFC Bank"
                      className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl p-3 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>

                  {/* City, State, Pincode */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Bengaluru"
                        className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl p-3 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="e.g. Karnataka"
                        className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl p-3 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. 560001"
                        className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl p-3 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                      />
                    </div>
                  </div>

                  {/* Payment Method Section (Cash on Delivery ONLY) */}
                  <div className="pt-4 border-t border-[#EBE7DF] space-y-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#6A1423] block">
                      Payment Method
                    </span>
                    <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-emerald-700" />
                        <div>
                          <p className="font-bold text-xs text-emerald-950">Cash on Delivery (COD)</p>
                          <p className="text-[11px] text-emerald-800">Pay cash upon safe doorstep delivery</p>
                        </div>
                      </div>
                      <Badge variant="green" size="sm">Available</Badge>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full font-bold shadow-md text-sm"
                      isLoading={isProcessing}
                    >
                      {isProcessing ? 'Processing Order...' : `Place Cash on Delivery Order • ₹${cartSummary.total.toLocaleString('en-IN')}`}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Order Cart Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FCFBF8] rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-subtle-card space-y-6 sticky top-24">
                <h3 className="font-serif font-bold text-lg text-[#171717] flex items-center justify-between border-b border-[#EBE7DF] pb-3">
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#6A1423]" /> Order Summary
                  </span>
                  <span className="text-xs font-sans text-slate-500 font-normal">
                    {cartSummary.itemCount} item(s)
                  </span>
                </h3>

                {/* Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs border-b border-slate-100 pb-2">
                      <img
                        src={item.product.images.primary}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-xl object-contain bg-[#F7F4ED] p-1 border border-[#EBE7DF]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#171717] truncate">{item.product.name}</p>
                        <p className="text-[11px] text-slate-500">{item.variant.packSize} • Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-[#171717]">₹{(item.variant.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-2 text-xs border-t border-[#EBE7DF] pt-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{cartSummary.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping Fee</span>
                    <span className="font-semibold text-emerald-700">
                      {cartSummary.shippingFee === 0 ? 'FREE' : `₹${cartSummary.shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#171717] border-t border-[#EBE7DF] pt-2">
                    <span>Total Amount</span>
                    <span className="text-[#6A1423]">₹{cartSummary.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Security Trust Badge */}
                <div className="p-3 bg-[#F7F4ED] rounded-xl flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified 100% Genuine Ayurvedic Formulation</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
