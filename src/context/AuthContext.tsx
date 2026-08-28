/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserAddress } from '@/types/auth';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface AuthContextType {
  user: UserProfile | null;
  addresses: UserAddress[];
  wishlistProductIds: string[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  loginAsDemoAdmin: () => void;
  loginAsDemoCustomer: () => void;
  register: (email: string, pass: string, fullName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  changePassword: (newPass: string) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (addr: Omit<UserAddress, 'id' | 'userId'>) => void;
  updateAddress: (id: string, data: Partial<UserAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'arogyapath_user';
const LOCAL_STORAGE_ADDR_KEY = 'arogyapath_addresses';
const LOCAL_STORAGE_WISHLIST_KEY = 'arogyapath_wishlist';

const DEMO_CUSTOMER_USER: UserProfile = {
  id: 'usr_demo_aarav_1',
  email: 'aarav.sharma@example.com',
  fullName: 'Aarav Sharma',
  role: 'customer',
  createdAt: '2026-01-15T10:00:00.000Z',
};

const DEMO_ADMIN_USER: UserProfile = {
  id: 'usr_demo_admin_1',
  email: 'admin@arogyapath.com',
  fullName: 'Arogya Administrator',
  role: 'admin',
  createdAt: '2026-01-01T08:00:00.000Z',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (saved) return JSON.parse(saved);
      // Default to active demo customer session for instant accessibility without setup friction
      return DEMO_CUSTOMER_USER;
    } catch {
      return DEMO_CUSTOMER_USER;
    }
  });

  const [addresses, setAddresses] = useState<UserAddress[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ADDR_KEY);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'addr_default_1',
              userId: 'usr_demo_aarav_1',
              fullName: 'Aarav Sharma',
              phone: '+91 9876543210',
              street: '42 Lotus Heights, MG Road',
              city: 'Bengaluru',
              state: 'Karnataka',
              pincode: '560001',
              country: 'India',
              label: 'Home',
              isDefault: true,
            },
          ];
    } catch {
      return [];
    }
  });

  const [wishlistProductIds, setWishlistProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY);
      return saved ? JSON.parse(saved) : ['prod_testo_power_1'];
    } catch {
      return ['prod_testo_power_1'];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ADDR_KEY, JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, JSON.stringify(wishlistProductIds));
  }, [wishlistProductIds]);

  const loginAsDemoCustomer = () => {
    setUser(DEMO_CUSTOMER_USER);
  };

  const loginAsDemoAdmin = () => {
    setUser(DEMO_ADMIN_USER);
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured()) {
        const { data, error: sbError } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (sbError) throw sbError;
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || 'Customer',
            role: (data.user.user_metadata?.role as 'customer' | 'admin') || 'customer',
            createdAt: data.user.created_at,
          };
          setUser(profile);
          setIsLoading(false);
          return true;
        }
      }

      // Dev mode fallback
      const isDemoAdmin = email.toLowerCase().includes('admin');
      const fallbackUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        fullName: isDemoAdmin ? 'Arogya Administrator' : email.split('@')[0],
        role: isDemoAdmin ? 'admin' : 'customer',
        createdAt: new Date().toISOString(),
      };
      setUser(fallbackUser);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, pass: string, fullName: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured()) {
        const { data, error: sbError } = await supabase.auth.signUp({
          email,
          password: pass,
          options: { data: { full_name: fullName, role: 'customer' } },
        });
        if (sbError) throw sbError;
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName,
            role: 'customer',
            createdAt: data.user.created_at,
          };
          setUser(profile);
          setIsLoading(false);
          return true;
        }
      }

      const fallbackUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        fullName,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
      setUser(fallbackUser);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured()) {
        const { error: sbError } = await supabase.auth.resetPasswordForEmail(email);
        if (sbError) throw sbError;
      }
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
      setIsLoading(false);
      return false;
    }
  };

  const changePassword = async (newPass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured()) {
        const { error: sbError } = await supabase.auth.updateUser({ password: newPass });
        if (sbError) throw sbError;
      }
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
      setIsLoading(false);
      return false;
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const addAddress = (newAddr: Omit<UserAddress, 'id' | 'userId'>) => {
    const created: UserAddress = {
      ...newAddr,
      id: `addr_${Date.now()}`,
      userId: user?.id || 'usr_guest',
      label: newAddr.label || 'Home',
    };
    if (created.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })));
    }
    setAddresses((prev) => [created, ...prev]);
  };

  const updateAddress = (id: string, data: Partial<UserAddress>) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...data } : a))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const addToWishlist = (productId: string) => {
    if (!wishlistProductIds.includes(productId)) {
      setWishlistProductIds((prev) => [...prev, productId]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistProductIds((prev) => prev.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: string) => wishlistProductIds.includes(productId);

  const toggleWishlist = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        addresses,
        wishlistProductIds,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
        isLoading,
        error,
        login,
        loginAsDemoAdmin,
        loginAsDemoCustomer,
        register,
        logout,
        forgotPassword,
        changePassword,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
