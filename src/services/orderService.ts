import type { Order, OrderItem, ShippingAddressSnapshot, OrderStatus, PaymentStatus } from '@/types/order';
import type { CartItem } from '@/types/cart';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { logAdminActivity } from '@/services/auditService';

const LOCAL_STORAGE_ORDERS_KEY = 'arogyapath_orders_v1';

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord_demo_sample_1',
    orderNumber: 'AP-849201',
    userId: 'usr_demo_aarav_1',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@example.com',
    customerPhone: '+91 9876543210',
    shippingAddress: {
      fullName: 'Aarav Sharma',
      phone: '+91 9876543210',
      email: 'aarav.sharma@example.com',
      street: '42 Lotus Heights, MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India',
    },
    subtotal: 999,
    shippingFee: 0,
    discount: 0,
    total: 999,
    currency: 'INR',
    orderStatus: 'delivered',
    paymentStatus: 'completed',
    paymentProvider: 'Razorpay (Simulated)',
    items: [
      {
        id: 'item_demo_1',
        orderId: 'ord_demo_sample_1',
        productId: 'prod_testo_power_1',
        productName: 'TESTO Natural Power+ Capsules',
        productImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
        variantId: 'var_testo_30',
        packSize: '30 Veg Capsules (500mg)',
        unitPrice: 999,
        quantity: 1,
        subtotal: 999,
      },
    ],
    createdAt: '2026-02-10T14:30:00.000Z',
    updatedAt: '2026-02-12T09:15:00.000Z',
  },
];

export const getStoredOrders = (): Order[] => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((ord: Partial<Order>) => ({
            id: ord.id || `ord_${Date.now()}`,
            orderNumber: ord.orderNumber || 'AP-000000',
            userId: ord.userId,
            customerName: ord.customerName || 'Valued Customer',
            customerEmail: ord.customerEmail || 'customer@example.com',
            customerPhone: ord.customerPhone || '',
            shippingAddress: ord.shippingAddress || {
              fullName: ord.customerName || 'Customer',
              phone: ord.customerPhone || '',
              email: ord.customerEmail || '',
              street: 'Address Line',
              city: 'City',
              state: 'State',
              pincode: '000000',
              country: 'India',
            },
            subtotal: typeof ord.subtotal === 'number' ? ord.subtotal : 0,
            shippingFee: typeof ord.shippingFee === 'number' ? ord.shippingFee : 0,
            discount: typeof ord.discount === 'number' ? ord.discount : 0,
            total: typeof ord.total === 'number' ? ord.total : 0,
            currency: ord.currency || 'INR',
            orderStatus: (ord.orderStatus || 'pending') as OrderStatus,
            paymentStatus: (ord.paymentStatus || 'pending') as PaymentStatus,
            paymentProvider: ord.paymentProvider || 'Standard',
            items: Array.isArray(ord.items) ? ord.items : [],
            createdAt: ord.createdAt || new Date().toISOString(),
            updatedAt: ord.updatedAt || new Date().toISOString(),
          }));
        }
      }
    }
  } catch {
    // Ignore parse errors
  }
  return INITIAL_DEMO_ORDERS;
};

export const saveOrdersToStorage = (orders: Order[]) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    }
  } catch {
    // Ignore storage errors
  }
};

export const getOrderById = (orderId: string): Order | null => {
  const orders = getStoredOrders();
  return orders.find((o) => o.id === orderId || o.orderNumber === orderId) || null;
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

  // 1. Supabase Atomic Checkout RPC execution if configured
  if (isSupabaseConfigured()) {
    try {
      const itemsPayload = cartItems.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
      }));

      const { data, error } = await supabase.rpc('create_customer_order', {
        p_customer_name: customerName,
        p_customer_email: customerEmail,
        p_customer_phone: customerPhone,
        p_shipping_address: shippingAddress,
        p_items: itemsPayload,
        p_payment_provider: paymentProvider,
      });

      if (!error && data) {
        const orderId = data.id;
        const orderNumber = data.order_number;
        const guestAccessToken = data.guest_access_token;
        const total = data.total;

        const createdOrder: Order = {
          id: orderId,
          orderNumber,
          guestAccessToken,
          userId,
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress,
          subtotal: total,
          shippingFee: 0,
          discount: 0,
          total,
          currency: 'INR',
          orderStatus: 'pending',
          paymentStatus: 'pending',
          paymentProvider,
          items: cartItems.map((item, idx) => ({
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
          })),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const existingOrders = getStoredOrders();
        saveOrdersToStorage([createdOrder, ...existingOrders]);
        return createdOrder;
      }
    } catch (err) {
      console.warn('Atomic checkout RPC error, falling back to local creation:', err);
    }
  }

  // 2. Local Fallback Creation
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

  const existingOrders = getStoredOrders();
  saveOrdersToStorage([newOrder, ...existingOrders]);
  return newOrder;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const mapDbRowToOrder = (row: any): Order => {
  const items: OrderItem[] = Array.isArray(row.order_items)
    ? row.order_items.map((item: any) => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        productName: item.product_name_snapshot || item.product_name || 'Product',
        productImage: item.product_image_snapshot || item.product_image || '',
        variantId: item.variant_id || '',
        packSize: item.pack_size_snapshot || item.pack_size || '',
        unitPrice: Number(item.unit_price_snapshot || item.unit_price || 0),
        quantity: Number(item.quantity || 1),
        subtotal: Number(item.subtotal || 0),
      }))
    : Array.isArray(row.items)
    ? row.items.map((item: any) => ({
        id: item.id,
        orderId: item.order_id || row.id,
        productId: item.product_id,
        productName: item.product_name || 'Product',
        productImage: item.product_image || '',
        variantId: item.variant_id || '',
        packSize: item.pack_size || '',
        unitPrice: Number(item.unit_price || 0),
        quantity: Number(item.quantity || 1),
        subtotal: Number(item.subtotal || 0),
      }))
    : [];

  return {
    id: row.id,
    orderNumber: row.order_number,
    guestAccessToken: row.guest_access_token,
    userId: row.user_id || undefined,
    customerName: row.customer_name || 'Valued Customer',
    customerEmail: row.customer_email || '',
    customerPhone: row.customer_phone || '',
    shippingAddress: row.shipping_address_json || row.shipping_address || {},
    subtotal: Number(row.subtotal || 0),
    shippingFee: Number(row.shipping_fee || 0),
    discount: Number(row.discount || 0),
    total: Number(row.total || 0),
    currency: row.currency || 'INR',
    orderStatus: row.order_status || 'pending',
    paymentStatus: row.payment_status || 'pending',
    paymentProvider: row.payment_provider || 'Standard',
    providerOrderId: row.provider_order_id,
    providerPaymentId: row.provider_payment_id,
    items,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
};

/**
 * Fetch ALL orders globally for Administrators from Supabase DB
 */
export const fetchAdminOrders = async (): Promise<Order[]> => {
  if (!isSupabaseConfigured()) {
    return getStoredOrders();
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[orderService] Error fetching admin orders from Supabase:', error.message);
      return getStoredOrders();
    }

    if (data) {
      return data.map(mapDbRowToOrder);
    }
  } catch (err) {
    console.error('[orderService] Exception during admin orders fetch:', err);
  }

  return getStoredOrders();
};

/**
 * Fetch a single order by ID or order_number for Administrators from Supabase DB
 */
export const fetchAdminOrder = async (orderId: string): Promise<Order | null> => {
  if (!isSupabaseConfigured()) {
    return getOrderById(orderId);
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .or(`id.eq.${orderId},order_number.eq.${orderId}`)
      .maybeSingle();

    if (error) {
      console.warn('[orderService] Error fetching admin order by ID:', error.message);
      return getOrderById(orderId);
    }

    if (data) {
      return mapDbRowToOrder(data);
    }
  } catch (err) {
    console.error('[orderService] Exception during admin order fetch:', err);
  }

  return getOrderById(orderId);
};

/**
 * Fetch orders belonging to a specific logged-in customer from Supabase DB
 */
export const fetchCustomerOrders = async (userId: string): Promise<Order[]> => {
  if (!isSupabaseConfigured()) {
    return getStoredOrders().filter((o) => o.userId === userId);
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[orderService] Error fetching customer orders:', error.message);
      return getStoredOrders().filter((o) => o.userId === userId);
    }

    if (data) {
      return data.map(mapDbRowToOrder);
    }
  } catch (err) {
    console.error('[orderService] Exception during customer orders fetch:', err);
  }

  return getStoredOrders().filter((o) => o.userId === userId);
};

/**
 * Securely fetch guest order details using the SECURITY DEFINER RPC get_guest_order_details
 */
export const fetchGuestOrder = async (orderNumber: string, accessToken: string): Promise<Order | null> => {
  if (!isSupabaseConfigured()) {
    const local = getStoredOrders().find((o) => o.orderNumber === orderNumber);
    return local || null;
  }

  try {
    const { data, error } = await supabase.rpc('get_guest_order_details', {
      p_order_number: orderNumber,
      p_access_token: accessToken,
    });

    if (error) {
      console.warn('[orderService] Guest order lookup error:', error.message);
      return null;
    }

    if (data) {
      return mapDbRowToOrder(data);
    }
  } catch (err) {
    console.error('[orderService] Exception during guest order RPC lookup:', err);
  }

  return null;
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
    if (ord.id === orderId || ord.orderNumber === orderId) {
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
          payment_status: paymentStatus || undefined,
          provider_payment_id: providerPaymentId || undefined,
          updated_at: new Date().toISOString(),
        })
        .or(`id.eq.${orderId},order_number.eq.${orderId}`);
    } catch {
      // Graceful fallback
    }
  }

  await logAdminActivity({
    action: 'UPDATE_ORDER_STATUS',
    entityType: 'order',
    entityId: orderId,
    details: { orderStatus, paymentStatus, providerPaymentId },
  });

  return updatedOrder;
};

// Realtime Order Subscription helper
export const subscribeToOrders = (onUpdate: (order: Order) => void) => {
  if (!isSupabaseConfigured()) return () => {};

  const channel = supabase
    .channel('public:orders')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'orders' },
      (payload) => {
        const row = payload.new;
        if (row) {
          const updated: Order = {
            id: row.id,
            orderNumber: row.order_number,
            userId: row.user_id,
            customerName: row.customer_name,
            customerEmail: row.customer_email,
            customerPhone: row.customer_phone,
            shippingAddress: row.shipping_address_json,
            subtotal: row.subtotal,
            shippingFee: row.shipping_fee,
            discount: row.discount,
            total: row.total,
            currency: row.currency,
            orderStatus: row.order_status as OrderStatus,
            paymentStatus: row.payment_status as PaymentStatus,
            paymentProvider: row.payment_provider,
            items: [],
            createdAt: row.created_at,
            updatedAt: row.updated_at,
          };
          onUpdate(updated);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
