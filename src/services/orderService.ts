import type { Order, OrderItem, ShippingAddressSnapshot, OrderStatus, PaymentStatus } from '@/types/order';
import type { CartItem } from '@/types/cart';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { logAdminActivity } from '@/services/auditService';

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
    orderStatus: (row.order_status || 'pending') as OrderStatus,
    paymentStatus: (row.payment_status || 'pending') as PaymentStatus,
    paymentProvider: row.payment_provider || 'Cash on Delivery',
    providerOrderId: row.provider_order_id,
    providerPaymentId: row.provider_payment_id,
    items,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
};

export interface CreateOrderParams {
  userId?: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  shippingAddress: ShippingAddressSnapshot;
  cartItems: CartItem[];
  paymentProvider?: string;
}

/**
 * Atomic Customer Order Creation in Supabase PostgreSQL
 */
export const createOrder = async (params: CreateOrderParams): Promise<Order> => {
  const {
    customerName,
    customerEmail = '',
    customerPhone,
    shippingAddress,
    cartItems,
    paymentProvider = 'Cash on Delivery',
  } = params;

  if (cartItems.length === 0) {
    throw new Error('Cannot create an order with an empty cart.');
  }

  if (!isSupabaseConfigured()) {
    throw new Error('Supabase database configuration is missing.');
  }

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

  if (error || !data) {
    console.error('[orderService] Failed to create order in Supabase:', error?.message);
    throw new Error(`Failed to place order in database: ${error?.message || 'Unknown error'}`);
  }

  const orderId = data.id;
  const orderNumber = data.order_number;
  const guestAccessToken = data.guest_access_token;
  const total = data.total;

  const createdOrder: Order = {
    id: orderId,
    orderNumber,
    guestAccessToken,
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

  // Cache recent order in sessionStorage for immediate post-checkout tracking on current browser
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem('arogyapath_recent_order', JSON.stringify(createdOrder));
    }
  } catch {
    // Ignore storage quota errors
  }

  return createdOrder;
};

/**
 * Fetch ALL orders globally for Administrators directly from Supabase DB
 */
export const fetchAdminOrders = async (): Promise<Order[]> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase database configuration is missing.');
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[orderService] Error fetching admin orders from Supabase:', error.message);
      return [];
    }

    if (data) {
      return data.map(mapDbRowToOrder);
    }
  } catch (err) {
    console.error('[orderService] Exception during admin orders fetch:', err);
  }

  return [];
};

/**
 * Fetch a single order by ID or order_number for Administrators from Supabase DB
 */
export const fetchAdminOrder = async (orderId: string): Promise<Order | null> => {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .or(`id.eq.${orderId},order_number.eq.${orderId}`)
      .maybeSingle();

    if (error) {
      console.error('[orderService] Error fetching admin order by ID:', error.message);
      return null;
    }

    if (data) {
      return mapDbRowToOrder(data);
    }
  } catch (err) {
    console.error('[orderService] Exception during admin order fetch:', err);
  }

  return null;
};

/**
 * Fetch orders belonging to a specific logged-in customer from Supabase DB
 */
export const fetchCustomerOrders = async (userId: string): Promise<Order[]> => {
  if (!isSupabaseConfigured() || !userId) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[orderService] Error fetching customer orders:', error.message);
      return [];
    }

    if (data) {
      return data.map(mapDbRowToOrder);
    }
  } catch (err) {
    console.error('[orderService] Exception during customer orders fetch:', err);
  }

  return [];
};

/**
 * Securely fetch guest order details via authorized SECURITY DEFINER RPC
 */
export const fetchGuestOrder = async (
  orderNumber: string,
  accessToken?: string,
  phone?: string
): Promise<Order | null> => {
  if (!isSupabaseConfigured() || !orderNumber.trim()) {
    return null;
  }

  try {
    const cleanNum = orderNumber.trim();
    const { data, error } = await supabase.rpc('get_guest_order_details', {
      p_order_number: cleanNum,
      p_access_token: accessToken || null,
      p_phone: phone || null,
    });

    if (error) {
      console.warn('[orderService] Authorized guest order lookup warning:', error.message);
      return null;
    }

    if (data) {
      return mapDbRowToOrder(data);
    }
  } catch (err) {
    console.error('[orderService] Exception during guest order lookup:', err);
  }

  return null;
};

export const updateOrderStatus = async (
  orderId: string,
  orderStatus: OrderStatus,
  paymentStatus?: PaymentStatus,
  providerPaymentId?: string
): Promise<Order | null> => {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({
        order_status: orderStatus,
        payment_status: paymentStatus || undefined,
        provider_payment_id: providerPaymentId || undefined,
        updated_at: new Date().toISOString(),
      })
      .or(`id.eq.${orderId},order_number.eq.${orderId}`)
      .select('*, order_items(*)')
      .maybeSingle();

    if (error) {
      console.error('[orderService] Error updating order status:', error.message);
      return null;
    }

    await logAdminActivity({
      action: 'UPDATE_ORDER_STATUS',
      entityType: 'order',
      entityId: orderId,
      details: { orderStatus, paymentStatus, providerPaymentId },
    });

    return data ? mapDbRowToOrder(data) : null;
  } catch (err) {
    console.error('[orderService] Exception during updateOrderStatus:', err);
    return null;
  }
};

// Realtime Order Subscription helper for Admin Panel & Customers
export const subscribeToOrders = (onUpdate: (order: Order) => void) => {
  if (!isSupabaseConfigured()) return () => {};

  const channel = supabase
    .channel('public:orders')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'orders' },
      (payload) => {
        const row = payload.new as any;
        if (row && row.id) {
          const updated = mapDbRowToOrder(row);
          onUpdate(updated);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
