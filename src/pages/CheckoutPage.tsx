import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder, updateOrderStatus } from '@/services/orderService';
import { paymentService } from '@/services/payment/PaymentService';
import type { Order } from '@/types/order';
import type { UserAddress } from '@/types/auth';
import type { CartItem } from '@/types/cart';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, ShoppingBag, CreditCard, AlertCircle } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cartItems, cartSummary, clearCart } = useCart();
  const { user, addresses } = useAuth();

  // Form State
  const defaultAddr = addresses.find((a: UserAddress) => a.isDefault) || addresses[0];
  const [fullName, setFullName] = useState(user?.fullName || defaultAddr?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || defaultAddr?.phone || '+91 ');
  const [street, setStreet] = useState(defaultAddr?.street || '');
  const [landmark, setLandmark] = useState(defaultAddr?.landmark || '');
  const [city, setCity] = useState(defaultAddr?.city || '');
  const [state, setState] = useState(defaultAddr?.state || '');
  const [pincode, setPincode] = useState(defaultAddr?.pincode || '');

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Completed Order Confirmation State
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (cartItems.length === 0) {
      setErrorMessage('Your shopping cart is empty.');
      return;
    }

    if (!fullName || !email || !phone || !street || !city || !state || !pincode) {
      setErrorMessage('Please fill in all required shipping address fields.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Server Order Creation with Price Snapshot
      const internalOrder = await createOrder({
        userId: user?.id,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: {
          fullName,
          email,
          phone,
          street,
          landmark,
          city,
          state,
          pincode,
          country: 'India',
        },
        cartItems,
        paymentProvider: paymentMethod === 'cod' ? 'cod' : 'mock',
      });

      if (paymentMethod === 'cod') {
        // Cash on Delivery flow
        await updateOrderStatus(internalOrder.id, 'processing', 'pending');
        setCompletedOrder({ ...internalOrder, orderStatus: 'processing', paymentStatus: 'pending' });
        clearCart();
        setIsProcessing(false);
        return;
      }

      // 2. Online Payment Gateway Order Creation
      const provider = paymentService.getProvider();
      const paymentReq = await provider.createPaymentOrder({
        internalOrderId: internalOrder.id,
        amount: internalOrder.total,
        currency: 'INR',
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
      });

      // 3. Payment Verification
      const verification = await provider.verifyPayment({
        internalOrderId: internalOrder.id,
        providerOrderId: paymentReq.providerOrderId,
        providerPaymentId: `pay_verification_${Date.now()}`,
        providerSignature: 'sig_mock_verified',
      });

      if (verification.success) {
        const finalOrder = await updateOrderStatus(
          internalOrder.id,
          'paid',
          'completed',
          verification.paymentId
        );
        setCompletedOrder(finalOrder || internalOrder);
        clearCart();
      } else {
        await updateOrderStatus(internalOrder.id, 'failed', 'failed');
        setErrorMessage(verification.message || 'Payment verification failed.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred while processing your order.');
    } finally {
      setIsProcessing(false);
    }
  };

  // ORDER CONFIRMATION SCREEN
  if (completedOrder) {
    return (
      <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen py-16">
        <Container size="narrow">
          <div className="bg-[#FCFBF8] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] shadow-subtle-card text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#173C2B] block mb-1">
                Order Confirmed
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#171717] mb-2">
                Thank You For Your Order!
              </h1>
              <p className="text-xs text-slate-600">
                Your order number is <strong className="text-[#6A1423]">#{completedOrder.orderNumber}</strong>. We have sent a confirmation email to <strong>{completedOrder.customerEmail}</strong>.
              </p>
            </div>

            <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] text-left text-xs space-y-3">
              <div className="flex justify-between border-b border-[#EBE7DF] pb-2 font-bold">
                <span>Order Total:</span>
                <span className="text-[#6A1423] font-serif font-extrabold text-sm">₹{completedOrder.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Payment Method:</span>
                <span className="capitalize font-bold text-[#171717]">{completedOrder.paymentProvider} ({completedOrder.paymentStatus})</span>
              </div>
              <div className="text-slate-700">
                <span className="font-bold text-[#171717] block mb-1">Shipping Address:</span>
                <p>{completedOrder.shippingAddress.fullName}</p>
                <p>{completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} - {completedOrder.shippingAddress.pincode}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link to={`/orders/track?orderNumber=${completedOrder.orderNumber}`}>
                <Button variant="primary" size="md">
                  Track Your Order Status
                </Button>
              </Link>
              <Link to="/account/orders">
                <Button variant="secondary" size="md">
                  View My Orders
                </Button>
              </Link>
              <Link to="/testo">
                <Button variant="outline" size="md">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {(!user || user.isAnonymous) && (
              <div className="mt-6 p-5 bg-[#173C2B] text-white rounded-2xl text-xs text-center space-y-2">
                <p className="font-serif font-bold text-sm">Save Your Order History for Future Purchases</p>
                <p className="text-emerald-100 text-[11px]">
                  Create a free account to save your address, manage orders across devices, and earn rewards.
                </p>
                <Link to="/register" className="inline-block pt-1">
                  <span className="font-bold underline text-[#E2C384]">Create Free Account &rarr;</span>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>
    );
  }

  // EMPTY CART CHECKOUT SCREEN
  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen py-20">
        <Container size="narrow">
          <div className="bg-[#FCFBF8] rounded-3xl p-12 border border-[#EBE7DF] text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-[#171717]">Your Cart Is Empty</h2>
            <p className="text-xs text-slate-600">Please add formulations to your cart before proceeding to checkout.</p>
            <Link to="/shop" className="inline-block pt-2">
              <Button variant="primary" size="md">
                Browse Storefront
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
      <Section padding="lg" background="ivory">
        <Container>
          <Breadcrumb items={[{ label: 'Cart', href: '/cart' }, { label: 'Secure Checkout' }]} className="mb-8 text-slate-700" />

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Shipping & Payment Details Stage */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs text-red-900 font-semibold">
                  <AlertCircle className="w-4 h-4 text-[#6A1423] shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Customer Contact Info */}
              <div className="bg-[#FCFBF8] p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#171717] flex items-center gap-2">
                  <Badge variant="maroon">1</Badge> Customer Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Full Name</label>
                    <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Aarav Sharma" className="w-full p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                  </div>
                  <div>
                    <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="aarav.sharma@example.com" className="w-full p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Mobile Number (For Express Delivery Updates)</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9876543210" className="w-full p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="bg-[#FCFBF8] p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#171717] flex items-center gap-2">
                  <Badge variant="maroon">2</Badge> Shipping Address
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Flat / House No. / Street Address</label>
                    <input type="text" required value={street} onChange={(e) => setStreet(e.target.value)} placeholder="42 Lotus Heights, MG Road" className="w-full p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                  </div>
                  <div>
                    <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Landmark (Optional)</label>
                    <input type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="Near Central Park" className="w-full p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">City</label>
                      <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="Bengaluru" className="w-full p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                    </div>
                    <div>
                      <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">State</label>
                      <input type="text" required value={state} onChange={(e) => setState(e.target.value)} placeholder="Karnataka" className="w-full p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                    </div>
                    <div>
                      <label className="font-bold text-[#171717] block mb-1 uppercase tracking-wider">Pincode</label>
                      <input type="text" required value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="560001" className="w-full p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Provider Method */}
              <div className="bg-[#FCFBF8] p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#171717] flex items-center gap-2">
                  <Badge variant="maroon">3</Badge> Select Payment Method
                </h3>
                <div className="space-y-3">
                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'online' ? 'bg-[#6A1423]/10 border-[#6A1423] ring-1 ring-[#6A1423]' : 'bg-[#F7F4ED] border-[#EBE7DF]'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="text-[#6A1423]" />
                      <div>
                        <span className="font-bold text-xs text-[#171717] flex items-center gap-1.5"><CreditCard size={16} className="text-[#6A1423]" /> Online Payment (UPI / Cards / NetBanking)</span>
                        <span className="text-[11px] text-slate-600 block">Instant order confirmation with 256-bit encrypted gateway provider.</span>
                      </div>
                    </div>
                  </label>

                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'cod' ? 'bg-[#6A1423]/10 border-[#6A1423] ring-1 ring-[#6A1423]' : 'bg-[#F7F4ED] border-[#EBE7DF]'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="text-[#6A1423]" />
                      <div>
                        <span className="font-bold text-xs text-[#171717]">Cash On Delivery (COD)</span>
                        <span className="text-[11px] text-slate-600 block">Pay in cash upon doorstep delivery across India.</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Order Summary Stage */}
            <div className="lg:col-span-5 space-y-6 text-left sticky top-24">
              <div className="bg-[#FCFBF8] p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#171717] border-b border-[#EBE7DF] pb-4">
                  Order Summary ({cartSummary.itemCount} Items)
                </h3>

                <div className="space-y-4 max-h-64 overflow-y-auto divide-y divide-[#EBE7DF] pr-1">
                  {cartItems.map((item: CartItem) => (
                    <div key={item.id} className="pt-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.product.images.primary} alt={item.product.name} className="w-12 h-12 object-contain bg-[#F7F4ED] rounded-lg p-1 border border-[#EBE7DF]" />
                        <div>
                          <span className="font-bold text-[#171717] block line-clamp-1">{item.product.name}</span>
                          <span className="text-slate-500 font-semibold">{item.variant.packSize} • Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#171717]">₹{(item.variant.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#EBE7DF] space-y-2.5 text-xs text-slate-700 font-semibold">
                  <div className="flex justify-between"><span>Items Subtotal:</span><span>₹{cartSummary.subtotal.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Express Shipping:</span><span className="text-emerald-700 font-bold">{cartSummary.shippingFee === 0 ? 'FREE' : `₹${cartSummary.shippingFee}`}</span></div>
                  <div className="flex justify-between font-serif font-black text-lg text-[#171717] pt-3 border-t border-[#EBE7DF]">
                    <span>Total Amount:</span>
                    <span className="text-[#6A1423]">₹{cartSummary.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full shadow-md font-bold text-base"
                  disabled={isProcessing}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {isProcessing ? 'Processing Order...' : `Complete Order • ₹${cartSummary.total.toLocaleString('en-IN')}`}
                </Button>

                <div className="pt-2 text-center text-[11px] text-slate-600 space-y-2">
                  <p className="flex items-center justify-center gap-1.5 text-[#173C2B] font-bold"><ShieldCheck size={14} className="text-emerald-600" /> FSSAI Lic. #12118441000654 Compliant</p>
                  <p className="flex items-center justify-center gap-1.5 text-slate-600"><Lock size={14} /> 256-bit Encrypted Checkout Security</p>
                </div>
              </div>
            </div>
          </form>
        </Container>
      </Section>
    </div>
  );
};
