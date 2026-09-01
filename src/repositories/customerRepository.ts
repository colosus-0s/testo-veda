import type { Order, ShippingAddressSnapshot } from '@/types/order';
import { fetchAdminOrders } from '@/services/orderService';

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

export const getCustomersFromOrders = (orders: Order[]): CustomerProfile[] => {
  const customerMap = new Map<string, CustomerProfile>();

  (orders || []).forEach((ord: Order) => {
    const key = ord.customerPhone || ord.customerEmail || ord.userId || 'guest';
    const existing: CustomerProfile = customerMap.get(key) || {
      id: ord.userId || `cust_${key}`,
      fullName: ord.customerName || 'Valued Customer',
      email: ord.customerEmail || '',
      phone: ord.customerPhone || '',
      role: 'customer',
      registeredAt: ord.createdAt || new Date().toISOString(),
      orderCount: 0,
      totalSpent: 0,
      status: 'active',
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

export const getCustomers = (): CustomerProfile[] => {
  return [];
};

export const getCustomerById = async (id: string): Promise<CustomerProfile | null> => {
  const orders = await fetchAdminOrders();
  const customers = getCustomersFromOrders(orders);
  return (
    customers.find(
      (c) => c.id === id || c.phone === id || c.email.toLowerCase() === id.toLowerCase()
    ) || null
  );
};
