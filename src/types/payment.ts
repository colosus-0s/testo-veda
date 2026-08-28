import type { Order } from './order';

export type PaymentProviderType = 'mock' | 'razorpay' | 'stripe' | 'phonepe';

export interface CreatePaymentOrderRequest {
  internalOrderId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface PaymentOrderResponse {
  provider: PaymentProviderType;
  providerOrderId: string;
  amount: number;
  currency: string;
  keyId?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentVerificationRequest {
  internalOrderId: string;
  providerOrderId: string;
  providerPaymentId: string;
  providerSignature?: string;
}

export interface PaymentVerificationResult {
  success: boolean;
  orderId: string;
  paymentId: string;
  message: string;
  order?: Order;
}

export interface IPaymentProvider {
  name: PaymentProviderType;
  createPaymentOrder(req: CreatePaymentOrderRequest): Promise<PaymentOrderResponse>;
  verifyPayment(req: PaymentVerificationRequest): Promise<PaymentVerificationResult>;
}
