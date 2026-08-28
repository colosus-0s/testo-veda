import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useOrders, type ShippingAddressData } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import { paymentService } from '@/services/payment/PaymentService';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Truck, Lock, CreditCard, CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, shippingFee, total, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) {
    return (
      <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-[70vh] flex items-center">
        <Section padding="lg" background="ivory" className="w-full text-center">
          <Container size="narrow">
            <div className="bg-[#FCFBF8] p-8 sm:p-12 rounded-3xl border border-[#EBE7DF] max-w-md mx-auto space-y-4 shadow-subtle-card">
              <ShoppingBag className="w-12 h-12 text-[#6A1423] mx-auto" />
              <h2 className="font-serif text-2xl font-bold text-[#171717]">Your Cart Is Empty</h2>
              <p className="text-xs text-slate-600">Please add formulations to your cart before proceeding to checkout.</p>
              <Link to="/shop">
                <Button variant="primary" size="md" className="font-bold">
                  Browse Storefront
                </Button>
              </Link>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !phone || !fullName || !streetAddress || !city || !state || !postalCode) {
      setError('Please complete all required shipping address fields.');
      return;
    }

    setIsProcessing(true);

    try {
      const addressData: ShippingAddressData = {
        fullName,
        phone,
        streetAddress,
        landmark,
        city,
        state,
        postalCode,
        country: 'India',
      };

      // Create Payment Order via Payment Service Abstraction
      const paymentOrder = await paymentService.createOrder({
        orderId: `DEV_ORD_${Date.now()}`,
        orderNumber: `AP-${Date.now()}`,
        amount: total,
        currency: 'INR',
        customerEmail: email,
        customerPhone: phone,
      });

      if (!paymentOrder.success) {
        throw new Error(paymentOrder.error || 'Payment gateway initialization failed.');
      }

      // Simulate payment verification & record internal order snapshot
      const order = await createOrder(
        email,
        phone,
        addressData,
        items,
        subtotal,
        shippingFee,
        total,
        user?.id
      );

      clearCart();
      navigate(`/order-confirmation/${order.orderNumber}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during checkout processing.';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen">
      {/* Checkout Hero */}
      <Section padding="sm" background="deep-green" className="border-b border-[#2E6B4A]/50 text-white">
        <Container>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#F3E5AB]">
                Secure Express Checkout
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Arogya Path Storefront Order
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#E2E8F0] font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit SSL Encrypted</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Checkout Content Stage */}
      <Section padding="lg" background="white" className="border-b border-[#EBE7DF]">
        <Container>
          <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Shipping & Payment Details Form Stage */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-900 rounded-xl p-3.5 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* 01 Contact Information */}
              <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#171717] border-b border-[#EBE7DF] pb-3">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="customer@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl px-3.5 py-2.5 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Phone Number (10 Digits) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9288515228"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl px-3.5 py-2.5 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>
                </div>
              </div>

              {/* 02 Shipping Address */}
              <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#171717] border-b border-[#EBE7DF] pb-3">
                  2. Shipping Address
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Recipient Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl px-3.5 py-2.5 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Street Address / Flat / House No. *</label>
                    <input
                      type="text"
                      required
                      placeholder="House no., Street, Area"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl px-3.5 py-2.5 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Landmark (Optional)</label>
                    <input
                      type="text"
                      placeholder="Near post office, park, etc."
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl px-3.5 py-2.5 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl px-3.5 py-2.5 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">State *</label>
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl px-3.5 py-2.5 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Pincode *</label>
                      <input
                        type="text"
                        required
                        placeholder="6-digit Pincode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl px-3.5 py-2.5 text-[#171717] focus:outline-none focus:border-[#6A1423]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 03 Payment Selection */}
              <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#171717] border-b border-[#EBE7DF] pb-3">
                  3. Select Payment Method
                </h3>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod('online')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'online'
                        ? 'bg-[#6A1423]/10 border-[#6A1423] ring-1 ring-[#6A1423]'
                        : 'bg-[#F7F4ED] border-[#EBE7DF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#6A1423]" />
                      <div>
                        <span className="text-xs font-bold text-[#171717] block">Online Payment (UPI, Cards, NetBanking)</span>
                        <span className="text-[11px] text-slate-600 block">Instant authorization via Payment Gateway Abstraction</span>
                      </div>
                    </div>
                    {paymentMethod === 'online' && <CheckCircle2 className="w-5 h-5 text-[#6A1423]" />}
                  </label>

                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-[#6A1423]/10 border-[#6A1423] ring-1 ring-[#6A1423]'
                        : 'bg-[#F7F4ED] border-[#EBE7DF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#173C2B]" />
                      <div>
                        <span className="text-xs font-bold text-[#171717] block">Cash On Delivery (COD)</span>
                        <span className="text-[11px] text-slate-600 block">Pay upon doorstep receipt</span>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && <CheckCircle2 className="w-5 h-5 text-[#6A1423]" />}
                  </label>
                </div>
              </div>
            </div>

            {/* Right Order Summary Stage */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] shadow-subtle-card space-y-6 sticky top-24">
                <h3 className="font-serif text-xl font-bold text-[#171717] border-b border-[#EBE7DF] pb-3">
                  Order Summary ({items.length} Formulations)
                </h3>

                <div className="divide-y divide-[#EBE7DF] max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.product.images.primary} alt={item.product.name} className="w-12 h-12 object-contain bg-[#F7F4ED] p-1 rounded-lg border" />
                        <div>
                          <p className="font-bold text-[#171717] line-clamp-1">{item.product.name}</p>
                          <p className="text-[11px] text-slate-500">{item.variant.name} × {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#171717]">₹{(item.variant.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#EBE7DF] pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#171717]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Express Shipping</span>
                    <span className="font-semibold text-emerald-700">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-[#EBE7DF] text-base font-bold text-[#171717]">
                    <span>Total Amount</span>
                    <span className="font-serif text-2xl text-[#6A1423]">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full font-bold shadow-md"
                  disabled={isProcessing}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {isProcessing ? 'Processing Order...' : `Complete Order • ₹${total.toLocaleString('en-IN')}`}
                </Button>

                <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5 pt-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Includes FSSAI Compliance & 100% Authentic Guarantee</span>
                </div>
              </div>
            </div>
          </form>
        </Container>
      </Section>
    </div>
  );
};
