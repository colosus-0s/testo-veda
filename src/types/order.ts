export type OrderStatus =
  | 'pending'
  | 'payment_pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'failed'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  variantId: string;
  packSize: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface ShippingAddressSnapshot {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddressSnapshot;
  
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  currency: string;
  
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentProvider: string;
  providerOrderId?: string;
  providerPaymentId?: string;
  
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
