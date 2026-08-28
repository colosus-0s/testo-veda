/**
 * Centralized Payment Service & Provider Abstraction
 * Allows seamless integration of live payment gateways (Razorpay/Stripe)
 * without modifying checkout, database, or customer account logic.
 */

export interface PaymentOrderPayload {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerPhone: string;
}

export interface PaymentOrderResult {
  success: boolean;
  providerOrderId: string;
  amount: number;
  currency: string;
  providerKey?: string;
  error?: string;
}

export interface PaymentVerificationPayload {
  orderId: string;
  providerOrderId: string;
  providerPaymentId: string;
  providerSignature?: string;
}

export interface PaymentVerificationResult {
  success: boolean;
  transactionId: string;
  message?: string;
  error?: string;
}

export interface PaymentProvider {
  name: string;
  createOrder(payload: PaymentOrderPayload): Promise<PaymentOrderResult>;
  verifyPayment(payload: PaymentVerificationPayload): Promise<PaymentVerificationResult>;
}

/**
 * Development Payment Provider
 * Simulates gateway authorization for local testing prior to live API key provision.
 */
class DevelopmentPaymentProvider implements PaymentProvider {
  name = 'Development Gateway Simulation';

  async createOrder(payload: PaymentOrderPayload): Promise<PaymentOrderResult> {
    // Simulate server-side provider order creation API latency
    await new Promise((res) => setTimeout(res, 600));

    return {
      success: true,
      providerOrderId: `DEV_ORD_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      amount: payload.amount,
      currency: payload.currency,
      providerKey: 'DEV_PUBLIC_KEY_SIMULATION',
    };
  }

  async verifyPayment(payload: PaymentVerificationPayload): Promise<PaymentVerificationResult> {
    await new Promise((res) => setTimeout(res, 800));

    return {
      success: true,
      transactionId: payload.providerPaymentId || `DEV_TXN_${Date.now()}`,
      message: 'Development payment authorization verified successfully.',
    };
  }
}

class PaymentService {
  private activeProvider: PaymentProvider;

  constructor() {
    // Default to Development Provider; slot in live Razorpay / Stripe provider when credentials arrive
    this.activeProvider = new DevelopmentPaymentProvider();
  }

  public setProvider(provider: PaymentProvider) {
    this.activeProvider = provider;
  }

  public getProviderName(): string {
    return this.activeProvider.name;
  }

  public async createOrder(payload: PaymentOrderPayload): Promise<PaymentOrderResult> {
    return this.activeProvider.createOrder(payload);
  }

  public async verifyPayment(payload: PaymentVerificationPayload): Promise<PaymentVerificationResult> {
    return this.activeProvider.verifyPayment(payload);
  }
}

export const paymentService = new PaymentService();
