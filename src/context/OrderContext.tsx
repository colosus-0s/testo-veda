/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem } from '@/types/cart';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export interface ShippingAddressData {
  fullName: string;
  phone: string;
  streetAddress: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItemSnapshot {
  productId: string;
  productName: string;
  variantName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  userId?: string;
  items: OrderItemSnapshot[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  status: 'pending' | 'payment_pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded';
  paymentProvider: string;
  transactionId?: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddressData;
  createdAt: string;
}

interface OrderContextType {
  orders: OrderRecord[];
  createOrder: (
    email: string,
    phone: string,
    address: ShippingAddressData,
    cartItems: CartItem[],
    subtotal: number,
    shippingFee: number,
    total: number,
    userId?: string
  ) => Promise<OrderRecord>;
  getOrderById: (orderId: string) => OrderRecord | undefined;
  updateOrderStatus: (orderId: string, status: OrderRecord['status'], paymentStatus?: OrderRecord['paymentStatus']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const LOCAL_ORDERS_KEY = 'arogyapath_orders_v1';

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_ORDERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // empty
    }
    // Baseline sample order for account preview
    return [
      {
        id: 'ord-sample-101',
        orderNumber: 'AP-2026-8849',
        userId: 'usr_sample',
        items: [
          {
            productId: 'testo-natural-power-capsules',
            productName: 'TESTO Natural Power+ Capsules',
            variantName: '1 Bottle (30 Veg Caps)',
            unitPrice: 999,
            quantity: 1,
            subtotal: 999,
          },
        ],
        subtotal: 999,
        shippingFee: 0,
        totalAmount: 999,
        status: 'processing',
        paymentStatus: 'captured',
        paymentProvider: 'Development Simulation',
        transactionId: 'DEV_TXN_998124',
        customerEmail: 'customer@arogyapath.com',
        customerPhone: '+91 9288515228',
        shippingAddress: {
          fullName: 'Arogya Customer',
          phone: '+91 9288515228',
          streetAddress: 'Ashok Nagar',
          city: 'Logardaga',
          state: 'Jharkhand',
          postalCode: '835302',
          country: 'India',
        },
        createdAt: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // empty
    }
  }, [orders]);

  const createOrder = async (
    email: string,
    phone: string,
    address: ShippingAddressData,
    cartItems: CartItem[],
    subtotal: number,
    shippingFee: number,
    total: number,
    userId?: string
  ): Promise<OrderRecord> => {
    const itemSnapshots: OrderItemSnapshot[] = cartItems.map((item) => ({
      productId: item.productId,
      productName: item.product.name,
      variantName: item.variant.name,
      unitPrice: item.variant.price,
      quantity: item.quantity,
      subtotal: item.variant.price * item.quantity,
    }));

    const orderNum = `AP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      orderNumber: orderNum,
      userId,
      items: itemSnapshots,
      subtotal,
      shippingFee,
      totalAmount: total,
      status: 'paid',
      paymentStatus: 'captured',
      paymentProvider: 'Development Gateway Simulation',
      transactionId: `DEV_TXN_${Date.now()}`,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: address,
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('orders').insert({
          id: newOrder.id,
          order_number: newOrder.orderNumber,
          user_id: userId || null,
          subtotal: newOrder.subtotal,
          shipping_fee: newOrder.shippingFee,
          total_amount: newOrder.totalAmount,
          status: newOrder.status,
          payment_status: newOrder.paymentStatus,
          payment_provider: newOrder.paymentProvider,
          customer_email: newOrder.customerEmail,
          customer_phone: newOrder.customerPhone,
          shipping_address_snapshot: newOrder.shippingAddress,
        });
      } catch (err) {
        console.warn('Supabase order insert fallback:', err);
      }
    }

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderRecord['status'],
    paymentStatus?: OrderRecord['paymentStatus']
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId || o.orderNumber === orderId) {
          return {
            ...o,
            status,
            paymentStatus: paymentStatus || o.paymentStatus,
          };
        }
        return o;
      })
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
