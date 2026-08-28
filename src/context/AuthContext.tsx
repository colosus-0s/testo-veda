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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [wishlistProductIds, setWishlistProductIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(() => isSupabaseConfigured());
  const [error, setError] = useState<string | null>(null);

  // Load user profile from Supabase profiles table
  const loadProfile = async (authUserId: string, authEmail: string): Promise<UserProfile | null> => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUserId)
        .single();

      if (profileError || !profileData || profileData.registration_completed !== true) {
        return null; // Profile uninitialized or registration uncompleted
      }

      const userProf: UserProfile = {
        id: profileData.id,
        email: profileData.email || authEmail,
        fullName: profileData.full_name,
        phone: profileData.phone || undefined,
        role: profileData.role as 'customer' | 'admin' | 'superadmin',
        registrationCompleted: profileData.registration_completed,
        createdAt: profileData.created_at,
      };

      // Load associated addresses and wishlist
      const userAddrs = await fetchUserAddresses(authUserId);
      setAddresses(userAddrs);

      const userWish = await fetchUserWishlist(authUserId);
      setWishlistProductIds(userWish);

      return userProf;
    } catch (err) {
      console.error('Error fetching profile from Supabase:', err);
      return null;
    }
  };

  // Synchronize Auth Session on Mount & Auth Change
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      const timer = setTimeout(() => setIsLoading(false), 0);
      return () => clearTimeout(timer);
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const loadedUser = await loadProfile(session.user.id, session.user.email || '');
        if (loadedUser) {
          setUser(loadedUser);
        } else {
          // Reject invalid / uncompleted registration sessions
          await supabase.auth.signOut();
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const loadedUser = await loadProfile(session.user.id, session.user.email || '');
        if (loadedUser) {
          setUser(loadedUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
        setAddresses([]);
        setWishlistProductIds([]);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Strict Login Function: Demands Supabase Auth + registration_completed = true
  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const genericErrorMessage = "We couldn't sign you in. Please register for an Arogya Path account first or check your credentials.";

    if (!isSupabaseConfigured()) {
      setError(genericErrorMessage);
      setIsLoading(false);
      return false;
    }

    try {
      const { data, error: sbError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: pass,
      });

      if (sbError || !data.user) {
        setError(genericErrorMessage);
        setIsLoading(false);
        return false;
      }

      // Verify that registration_completed === true in profiles
      const profile = await loadProfile(data.user.id, data.user.email || email);
      if (!profile || profile.registrationCompleted !== true) {
        // Reject session and sign out immediately
        await supabase.auth.signOut();
        setUser(null);
        setError(genericErrorMessage);
        setIsLoading(false);
        return false;
      }

      setUser(profile);
      setIsLoading(false);
      return true;
    } catch {
      setError(genericErrorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // Storefront Registration Function: SignUp + complete_storefront_registration RPC
  const register = async (
    email: string,
    pass: string,
    fullName: string,
    phone?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError('Database services are currently unavailable. Please try again later.');
      setIsLoading(false);
      return false;
    }

    try {
      const formattedEmail = email.trim().toLowerCase();
      const { data, error: sbError } = await supabase.auth.signUp({
        email: formattedEmail,
        password: pass,
        options: {
          data: {
            full_name: fullName,
            phone,
            role: 'customer',
          },
        },
      });

      if (sbError || !data.user) {
        setError(sbError?.message || 'Registration failed. Please check your information.');
        setIsLoading(false);
        return false;
      }

      // Complete Storefront Registration via SECURITY DEFINER RPC
      const { error: rpcError } = await supabase.rpc('complete_storefront_registration', {
        p_full_name: fullName,
        p_phone: phone || null,
      });

      if (rpcError) {
        console.warn('RPC complete_storefront_registration warning:', rpcError.message);
      }

      const profile = await loadProfile(data.user.id, formattedEmail);
      if (profile) {
        setUser(profile);
      } else {
        setUser({
          id: data.user.id,
          email: formattedEmail,
          fullName,
          phone,
          role: 'customer',
          registrationCompleted: true,
          createdAt: new Date().toISOString(),
        });
      }

      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
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
      setError(err instanceof Error ? err.message : 'Password reset request failed.');
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
      setError(err instanceof Error ? err.message : 'Failed to update password.');
      setIsLoading(false);
      return false;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const safeData = { ...data };
    delete (safeData as Partial<UserProfile> & { role?: string; registrationCompleted?: boolean }).role;
    delete (safeData as Partial<UserProfile> & { role?: string; registrationCompleted?: boolean }).registrationCompleted;

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
