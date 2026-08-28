import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '@/context/OrderContext';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ShieldCheck, Truck, ArrowRight, FileText } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrders();

  const order = orderId ? getOrderById(orderId) : undefined;

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen">
      <Section padding="lg" background="white" className="border-b border-[#EBE7DF]">
        <Container size="narrow">
          <div className="bg-[#FCFBF8] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] shadow-subtle-card text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423]">
                Order Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] mt-1">
                Thank You For Your Order!
              </h1>
              <p className="text-xs text-slate-600 mt-2">
                Order Reference: <strong className="text-[#6A1423]">{order?.orderNumber || orderId}</strong>
              </p>
            </div>

            <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] text-left text-xs space-y-4 max-w-lg mx-auto">
              <div className="flex justify-between items-center border-b border-[#EBE7DF] pb-3 font-bold text-[#171717]">
                <span>Status & Fulfillment</span>
                <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded text-[10px] uppercase">
                  {order?.paymentStatus || 'Captured'}
                </span>
              </div>

              <div className="space-y-2 text-slate-700">
                <p className="flex items-center gap-2"><Truck className="w-4 h-4 text-[#173C2B]" /> Express Shipping dispatched to registered address.</p>
                <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#6A1423]" /> FSSAI License No. 12118441000654 Compliant.</p>
                <p className="flex items-center gap-2"><FileText className="w-4 h-4 text-slate-500" /> Digital receipt sent to {order?.customerEmail || 'customer email'}.</p>
              </div>

              {order && (
                <div className="pt-3 border-t border-[#EBE7DF] space-y-1">
                  <span className="font-bold text-slate-900">Total Order Amount:</span>
                  <p className="font-serif text-2xl font-bold text-[#6A1423]">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/account">
                <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  View Account Orders
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold">
                  Continue Storefront Shopping
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
