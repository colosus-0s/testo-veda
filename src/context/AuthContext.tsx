/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserAddress } from '@/types/auth';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface AuthContextType {
  user: UserProfile | null;
  addresses: UserAddress[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (email: string, pass: string, fullName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (addr: Omit<UserAddress, 'id' | 'userId'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'arogyapath_user';
const LOCAL_STORAGE_ADDR_KEY = 'arogyapath_addresses';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
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
              userId: 'usr_demo_1',
              fullName: 'Aarav Sharma',
              phone: '+91 9876543210',
              street: '42 Lotus Heights, MG Road',
              city: 'Bengaluru',
              state: 'Karnataka',
              pincode: '560001',
              country: 'India',
              isDefault: true,
            },
          ];
    } catch {
      return [];
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

      // Local fallback for dev/demo mode
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

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const addAddress = (newAddr: Omit<UserAddress, 'id' | 'userId'>) => {
    const created: UserAddress = {
      ...newAddr,
      id: `addr_${Date.now()}`,
      userId: user?.id || 'usr_guest',
    };
    setAddresses((prev) => [created, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        addresses,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isLoading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        updateProfile,
        addAddress,
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
