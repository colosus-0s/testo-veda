import type { Order, OrderItem, ShippingAddressSnapshot, OrderStatus, PaymentStatus } from '@/types/order';
import type { CartItem } from '@/types/cart';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const LOCAL_STORAGE_ORDERS_KEY = 'arogyapath_orders_v1';

export const getStoredOrders = (): Order[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore parse errors
  }
  return [];
};

export const saveOrdersToStorage = (orders: Order[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // Ignore storage errors
  }
};

export interface CreateOrderParams {
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddressSnapshot;
  cartItems: CartItem[];
  paymentProvider?: string;
}

export const createOrder = async (params: CreateOrderParams): Promise<Order> => {
  const {
    userId,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    cartItems,
    paymentProvider = 'mock',
  } = params;

  if (cartItems.length === 0) {
    throw new Error('Cannot create an order with an empty cart.');
  }

  // Calculate trusted subtotal from unit prices
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );
  const freeShippingThreshold = 499;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 49;
  const discount = 0;
  const total = subtotal + shippingFee - discount;

  const orderId = `ord-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const orderNumber = `AP-${Math.floor(100000 + Math.random() * 900000)}`;

  // Create immutable snapshot of items
  const items: OrderItem[] = cartItems.map((item, idx) => ({
    id: `item-${orderId}-${idx + 1}`,
    orderId,
    productId: item.productId,
    productName: item.product.name,
    productImage: item.product.images.primary,
    variantId: item.variantId,
    packSize: item.variant.packSize,
    unitPrice: item.variant.price,
    quantity: item.quantity,
    subtotal: item.variant.price * item.quantity,
  }));

  const newOrder: Order = {
    id: orderId,
    orderNumber,
    userId,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    subtotal,
    shippingFee,
    discount,
    total,
    currency: 'INR',
    orderStatus: 'pending',
    paymentStatus: 'pending',
    paymentProvider,
    items,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 1. Local Storage Sync
  const existingOrders = getStoredOrders();
  saveOrdersToStorage([newOrder, ...existingOrders]);

  // 2. Supabase DB Insertion (if credentials configured)
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('orders').insert({
        id: newOrder.id,
        order_number: newOrder.orderNumber,
        user_id: userId || null,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        shipping_address_json: shippingAddress,
        subtotal: newOrder.subtotal,
        shipping_fee: newOrder.shippingFee,
        discount: newOrder.discount,
        total: newOrder.total,
        currency: newOrder.currency,
        order_status: newOrder.orderStatus,
        payment_status: newOrder.paymentStatus,
        payment_provider: paymentProvider,
      });

      const orderItemRows = items.map((item) => ({
        order_id: item.orderId,
        product_id: item.productId,
        product_name_snapshot: item.productName,
        product_image_snapshot: item.productImage,
        variant_id: item.variantId,
        pack_size_snapshot: item.packSize,
        unit_price_snapshot: item.unitPrice,
        quantity: item.quantity,
        subtotal: item.subtotal,
      }));

      await supabase.from('order_items').insert(orderItemRows);
    } catch {
      // Graceful fallback to local state
    }
  }

  return newOrder;
};

export const updateOrderStatus = async (
  orderId: string,
  orderStatus: OrderStatus,
  paymentStatus?: PaymentStatus,
  providerPaymentId?: string
): Promise<Order | null> => {
  const existing = getStoredOrders();
  let updatedOrder: Order | null = null;

  const updatedOrders = existing.map((ord) => {
    if (ord.id === orderId) {
      updatedOrder = {
        ...ord,
        orderStatus,
        paymentStatus: paymentStatus || ord.paymentStatus,
        providerPaymentId: providerPaymentId || ord.providerPaymentId,
        updatedAt: new Date().toISOString(),
      };
      return updatedOrder;
    }
    return ord;
  });

  saveOrdersToStorage(updatedOrders);

  if (isSupabaseConfigured()) {
    try {
      await supabase
        .from('orders')
        .update({
          order_status: orderStatus,
          payment_status: paymentStatus,
          provider_payment_id: providerPaymentId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId);
    } catch {
      // Graceful fallback
    }
  }

  return updatedOrder;
};
