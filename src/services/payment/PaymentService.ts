import type { IPaymentProvider } from '@/types/payment';
import { MockPaymentProvider } from './MockPaymentProvider';
import { RazorpayProvider } from './RazorpayProvider';

class PaymentService {
  private provider: IPaymentProvider;

  constructor() {
    const providerType = import.meta.env.VITE_PAYMENT_PROVIDER || 'mock';
    const rzpKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (providerType === 'razorpay' && rzpKey) {
      this.provider = new RazorpayProvider(rzpKey);
    } else {
      this.provider = new MockPaymentProvider();
    }
  }

  getProvider(): IPaymentProvider {
    return this.provider;
  }
}

export const paymentService = new PaymentService();
