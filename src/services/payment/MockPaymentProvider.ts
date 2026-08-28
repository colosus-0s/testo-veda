import type {
  IPaymentProvider,
  CreatePaymentOrderRequest,
  PaymentOrderResponse,
  PaymentVerificationRequest,
  PaymentVerificationResult,
} from '@/types/payment';

export class MockPaymentProvider implements IPaymentProvider {
  readonly name = 'mock' as const;

  async createPaymentOrder(req: CreatePaymentOrderRequest): Promise<PaymentOrderResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      provider: 'mock',
      providerOrderId: `mock_order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      amount: req.amount,
      currency: req.currency,
      metadata: {
        customerName: req.customerName,
        customerEmail: req.customerEmail,
      },
    };
  }

  async verifyPayment(req: PaymentVerificationRequest): Promise<PaymentVerificationResult> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isSuccess = Boolean(req.providerPaymentId);

    return {
      success: isSuccess,
      orderId: req.internalOrderId,
      paymentId: req.providerPaymentId || `pay_mock_${Date.now()}`,
      message: isSuccess
        ? 'Payment verified successfully by Mock Provider.'
        : 'Payment verification failed.',
    };
  }
}
