/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserAddress } from '@/types/auth';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { fetchUserAddresses } from '@/services/addressService';
import { fetchUserWishlist } from '@/services/wishlistService';

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
  register: (email: string, pass: string, fullName: string, phone?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  changePassword: (newPass: string) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
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
    if (isSupabaseConfigured()) {
      return null;
    }
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (saved) return JSON.parse(saved);
      return DEMO_CUSTOMER_USER;
    } catch {
      return DEMO_CUSTOMER_USER;
    }
  });

  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [wishlistProductIds, setWishlistProductIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(() => isSupabaseConfigured());
  const [error, setError] = useState<string | null>(null);

  // Synchronize with Supabase Auth session & DB profile
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    const loadProfile = async (authUserId: string, authEmail: string) => {
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUserId)
          .single();

        if (profileError || !profileData) {
          // Profile fallback
          setUser({
            id: authUserId,
            email: authEmail,
            fullName: 'Valued Customer',
            role: 'customer',
            createdAt: new Date().toISOString(),
          });
        } else {
          setUser({
            id: profileData.id,
            email: profileData.email,
            fullName: profileData.full_name,
            phone: profileData.phone || undefined,
            role: profileData.role as 'customer' | 'admin' | 'superadmin',
            createdAt: profileData.created_at,
          });
        }

        // Fetch addresses & wishlist for logged in user
        const userAddrs = await fetchUserAddresses(authUserId);
        setAddresses(userAddrs);

        const userWish = await fetchUserWishlist(authUserId);
        setWishlistProductIds(userWish);
      } catch (err) {
        console.error('Error loading Supabase profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Initialize session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user.id, session.user.email || '');
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    // Listen to Auth State Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile(session.user.id, session.user.email || '');
      } else {
        setUser(null);
        setAddresses([]);
        setWishlistProductIds([]);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
    }
  }, [user]);

  const loginAsDemoCustomer = () => {
    if (!isSupabaseConfigured()) {
      setUser(DEMO_CUSTOMER_USER);
    }
  };

  const loginAsDemoAdmin = () => {
    if (!isSupabaseConfigured()) {
      setUser(DEMO_ADMIN_USER);
    }
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured()) {
        const { data, error: sbError } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (sbError) throw sbError;
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          setUser({
            id: data.user.id,
            email: data.user.email || email,
            fullName: profile?.full_name || 'Customer',
            phone: profile?.phone || undefined,
            role: (profile?.role as 'customer' | 'admin' | 'superadmin') || 'customer',
            createdAt: data.user.created_at,
          });
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

  const register = async (
    email: string,
    pass: string,
    fullName: string,
    phone?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured()) {
        const { data, error: sbError } = await supabase.auth.signUp({
          email,
          password: pass,
          options: {
            data: {
              full_name: fullName,
              phone,
              role: 'customer', // STRICTLY DEFAULT TO CUSTOMER
            },
          },
        });
        if (sbError) throw sbError;

        if (data.user) {
          // Ensure profile is inserted
          await supabase.from('profiles').upsert({
            id: data.user.id,
            email,
            full_name: fullName,
            phone: phone || null,
            role: 'customer', // STRICTLY ENFORCE CUSTOMER ROLE
          });

          setUser({
            id: data.user.id,
            email,
            fullName,
            phone,
            role: 'customer',
            createdAt: data.user.created_at,
          });
          setIsLoading(false);
          return true;
        }
      }

      const fallbackUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        fullName,
        phone,
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
    setAddresses([]);
    setWishlistProductIds([]);
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

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const safeData = { ...data };
    delete (safeData as Partial<UserProfile> & { role?: string }).role;

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('profiles')
          .update({
            full_name: safeData.fullName || user.fullName,
            phone: safeData.phone || user.phone,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      } catch (err) {
        console.error('Error updating profile in Supabase:', err);
      }
    }
    setUser((prev) => (prev ? { ...prev, ...safeData } : null));
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
