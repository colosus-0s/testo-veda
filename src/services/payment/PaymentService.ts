import type { IPaymentProvider } from '@/types/payment';
import { MockPaymentProvider } from './MockPaymentProvider';
import { RazorpayProvider } from './RazorpayProvider';

const getEnvVar = (key: string): string | undefined => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key];
    }
  } catch {
    // Ignore
  }
  return undefined;
};

class PaymentService {
  private provider: IPaymentProvider;

  constructor() {
    const providerType = getEnvVar('VITE_PAYMENT_PROVIDER') || 'mock';
    const rzpKey = getEnvVar('VITE_RAZORPAY_KEY_ID');

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
