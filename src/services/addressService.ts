import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { ShippingAddressSnapshot } from '@/types/order';

export interface CustomerAddress extends ShippingAddressSnapshot {
  id: string;
  userId: string;
  landmark?: string;
  label: string;
  isDefault: boolean;
  createdAt?: string;
}

const LOCAL_STORAGE_ADDRESSES_KEY = 'arogyapath_customer_addresses_v1';

export const getStoredAddresses = (userId?: string): CustomerAddress[] => {
  if (isSupabaseConfigured() && userId) {
    // Handled async via fetchUserAddresses
  }
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(LOCAL_STORAGE_ADDRESSES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
  } catch {
    // Ignore error
  }
  return [
    {
      id: 'addr_demo_home',
      userId: userId || 'usr_demo_aarav_1',
      fullName: 'Aarav Sharma',
      phone: '+91 9876543210',
      email: 'aarav.sharma@example.com',
      street: '42 Lotus Heights, MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India',
      label: 'Home',
      isDefault: true,
    },
  ];
};

export const fetchUserAddresses = async (userId: string): Promise<CustomerAddress[]> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId)
        .order('is_default', { ascending: false });

      if (!error && data) {
        return data.map((row) => ({
          id: row.id,
          userId: row.user_id,
          fullName: row.full_name,
          phone: row.phone,
          email: '',
          street: row.street,
          landmark: row.landmark || '',
          city: row.city,
          state: row.state,
          pincode: row.pincode,
          country: row.country,
          label: row.label,
          isDefault: row.is_default,
          createdAt: row.created_at,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return getStoredAddresses(userId);
};

export const saveCustomerAddress = async (
  userId: string,
  address: Omit<CustomerAddress, 'id' | 'userId'>
): Promise<CustomerAddress | null> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .insert({
          user_id: userId,
          full_name: address.fullName,
          phone: address.phone,
          street: address.street,
          landmark: address.landmark || null,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: address.country || 'India',
          label: address.label || 'Home',
          is_default: address.isDefault || false,
        })
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          userId: data.user_id,
          fullName: data.full_name,
          phone: data.phone,
          email: '',
          street: data.street,
          landmark: data.landmark || '',
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          country: data.country,
          label: data.label,
          isDefault: data.is_default,
          createdAt: data.created_at,
        };
      }
    } catch {
      // Fallback
    }
  }

  // Local fallback
  const newAddr: CustomerAddress = {
    ...address,
    id: `addr_${Date.now()}`,
    userId,
  };
  const existing = getStoredAddresses(userId);
  const updated = [newAddr, ...existing];
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(LOCAL_STORAGE_ADDRESSES_KEY, JSON.stringify(updated));
    }
  } catch {
    // Ignore
  }
  return newAddr;
};
