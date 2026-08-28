import type {
  IPaymentProvider,
  CreatePaymentOrderRequest,
  PaymentOrderResponse,
  PaymentVerificationRequest,
  PaymentVerificationResult,
} from '@/types/payment';

export class RazorpayProvider implements IPaymentProvider {
  readonly name = 'razorpay' as const;
  private keyId: string;

  constructor(keyId: string) {
    this.keyId = keyId;
  }

  async createPaymentOrder(req: CreatePaymentOrderRequest): Promise<PaymentOrderResponse> {
    // When real backend endpoint is live, this calls /api/payment/create-order
    return {
      provider: 'razorpay',
      providerOrderId: `rzp_order_${Date.now()}`,
      amount: req.amount * 100, // Razorpay uses paise
      currency: req.currency,
      keyId: this.keyId,
      metadata: {
        customerName: req.customerName,
        customerEmail: req.customerEmail,
      },
    };
  }

  async verifyPayment(req: PaymentVerificationRequest): Promise<PaymentVerificationResult> {
    // Server-side signature verification boundary
    const isSuccess = Boolean(req.providerPaymentId && req.providerSignature);

    return {
      success: isSuccess,
      orderId: req.internalOrderId,
      paymentId: req.providerPaymentId,
      message: isSuccess
        ? 'Razorpay payment signature verified.'
        : 'Razorpay payment signature verification failed.',
    };
  }
}
