import { getStoredOrders } from '@/services/orderService';
import type { ShippingAddressSnapshot } from '@/types/order';

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'superadmin';
  registeredAt: string;
  orderCount: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'verified';
  addresses: ShippingAddressSnapshot[];
}

export const getCustomers = (): CustomerProfile[] => {
  const orders = getStoredOrders();
  const customerMap = new Map<string, CustomerProfile>();

  // Default customer profile (e.g. Aarav Sharma)
  customerMap.set('usr_demo_aarav_1', {
    id: 'usr_demo_aarav_1',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 9876543210',
    role: 'customer',
    registeredAt: '2026-01-15T10:00:00.000Z',
    orderCount: 0,
    totalSpent: 0,
    status: 'verified',
    addresses: [
      {
        fullName: 'Aarav Sharma',
        phone: '+91 9876543210',
        email: 'aarav.sharma@example.com',
        street: '42 Lotus Heights, MG Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        country: 'India',
      },
    ],
  });

  // Compile customer statistics from real order transactions
  orders.forEach((ord) => {
    const key = ord.customerEmail ? ord.customerEmail.toLowerCase() : ord.userId || 'guest';
    const existing = customerMap.get(key) || {
      id: ord.userId || `cust_${Math.abs(key.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0))}`,
      fullName: ord.customerName || 'Valued Customer',
      email: ord.customerEmail || 'customer@example.com',
      phone: ord.customerPhone || '',
      role: 'customer' as const,
      registeredAt: ord.createdAt || new Date().toISOString(),
      orderCount: 0,
      totalSpent: 0,
      status: 'active' as const,
      addresses: [],
    };

    existing.orderCount += 1;
    existing.totalSpent += ord.total || 0;
    if (ord.shippingAddress && !existing.addresses.some((a) => a.street === ord.shippingAddress.street)) {
      existing.addresses.push(ord.shippingAddress);
    }

    customerMap.set(key, existing);
  });

  return Array.from(customerMap.values());
};

export const getCustomerById = (id: string): CustomerProfile | null => {
  const customers = getCustomers();
  return (
    customers.find(
      (c) => c.id === id || c.email.toLowerCase() === id.toLowerCase()
    ) || null
  );
};
