/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserAddress } from '@/types/auth';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { fetchUserAddresses } from '@/services/addressService';
import { fetchUserWishlist } from '@/services/wishlistService';
import { claimGuestOrders } from '@/services/orderService';

export interface AuthContextType {
  user: UserProfile | null;
  addresses: UserAddress[];
  wishlistProductIds: string[];
  isAuthenticated: boolean;
  isGuest: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  authReady: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithPhone: (phone: string, pass: string) => Promise<boolean>;
  signInWithPhoneOtp: (phone: string) => Promise<boolean>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<boolean>;
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
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load user profile from Supabase profiles table
  const loadProfile = async (authUserId: string, authEmail: string): Promise<UserProfile | null> => {
    try {
      let profileData;
      const { data: initialProfileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUserId)
        .maybeSingle();

      profileData = initialProfileData;

      if (profileError) {
        console.warn('[Supabase Profile Debug] Error fetching profile:', profileError.message);
      }

      // Self-healing for valid Auth users whose profile was missing or uninitialized
      if (!profileData || profileData.registration_completed !== true) {
        console.info('[Supabase Profile Debug] Profile missing or uncompleted for authenticated user. Initializing profile...');
        const emailPrefix = authEmail ? authEmail.split('@')[0] : 'Valued Customer';
        const formattedName = emailPrefix ? emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1) : 'Valued Customer';

        const { error: rpcErr } = await supabase.rpc('complete_storefront_registration', {
          p_full_name: formattedName,
        });

        if (!rpcErr) {
          const { data: refetchedProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUserId)
            .maybeSingle();
          profileData = refetchedProfile;
        }
      }

      if (!profileData || profileData.registration_completed !== true) {
        console.warn('[Supabase Profile Debug] Profile missing or registration_completed is not true:', profileData);
        return null;
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
      console.error('[Supabase Profile Debug] Exception while fetching profile:', err);
      return null;
    }
  };

  // Synchronize Auth Session on Mount & Auth Change
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setAuthReady(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const handleSession = async (session: import('@supabase/supabase-js').Session | null) => {
      if (session?.user) {
        const isAnon = session.user.is_anonymous === true;
        if (isAnon) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: 'Valued Guest',
            role: 'customer',
            registrationCompleted: true,
            isAnonymous: true,
            createdAt: session.user.created_at || new Date().toISOString(),
          });
        } else {
          // Trigger claim_guest_orders RPC to link unowned orders matching user's verified phone
          claimGuestOrders().catch((err) => console.warn('[AuthContext] claimGuestOrders warning:', err));

          const loadedUser = await loadProfile(session.user.id, session.user.email || '');
          if (loadedUser) {
            setUser({ ...loadedUser, isAnonymous: false });
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              fullName: session.user.user_metadata?.full_name || 'Valued Customer',
              role: 'customer',
              registrationCompleted: true,
              isAnonymous: false,
              createdAt: session.user.created_at || new Date().toISOString(),
            });
          }
        }
      } else {
        // Attempt Anonymous Sign-In transparently via Supabase Auth
        try {
          const { data: anonData, error: anonErr } = await supabase.auth.signInAnonymously();
          if (!anonErr && anonData?.user) {
            setUser({
              id: anonData.user.id,
              email: anonData.user.email || '',
              fullName: 'Valued Guest',
              role: 'customer',
              registrationCompleted: true,
              isAnonymous: true,
              createdAt: anonData.user.created_at || new Date().toISOString(),
            });
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      }
      setIsLoading(false);
      setAuthReady(true);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (_event === 'SIGNED_OUT') {
        setAddresses([]);
        setWishlistProductIds([]);
        try {
          const { data: anonData } = await supabase.auth.signInAnonymously();
          if (anonData?.user) {
            setUser({
              id: anonData.user.id,
              email: '',
              fullName: 'Valued Guest',
              role: 'customer',
              registrationCompleted: true,
              isAnonymous: true,
              createdAt: anonData.user.created_at || new Date().toISOString(),
            });
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
        setIsLoading(false);
        setAuthReady(true);
      } else {
        await handleSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: sbError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: pass,
      });

      if (sbError || !data.user) {
        const msg = sbError?.message?.toLowerCase() || '';
        if (msg.includes('invalid login credentials')) {
          setError('Invalid email address or password. Please check your credentials and try again.');
        } else {
          setError(sbError?.message || 'Invalid login credentials.');
        }
        setIsLoading(false);
        return false;
      }

      const profile = await loadProfile(data.user.id, data.user.email || email);
      if (!profile || profile.registrationCompleted !== true) {
        await supabase.auth.signOut();
        setUser(null);
        setError('Your account profile registration could not be completed.');
        setIsLoading(false);
        return false;
      }

      setUser({ ...profile, isAnonymous: data.user.is_anonymous === true });
      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed.';
      setError(msg);
      setIsLoading(false);
      return false;
    }
  };

  const loginWithPhone = async (phone: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc('customer_phone_login', {
        p_phone: phone.trim(),
        p_password: pass,
      });

      if (rpcError || !data?.customer) {
        setError(rpcError?.message || 'Invalid mobile number or password.');
        setIsLoading(false);
        return false;
      }

      const cust = data.customer;
      const custUser: UserProfile = {
        id: cust.id,
        email: '',
        fullName: cust.full_name,
        phone: cust.phone,
        role: 'customer',
        registrationCompleted: true,
        isAnonymous: false,
        createdAt: new Date().toISOString(),
      };

      setUser(custUser);
      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to authenticate mobile account.';
      setError(msg);
      setIsLoading(false);
      return false;
    }
  };

  // Native Supabase Phone Auth (OTP) Send Request
  const signInWithPhoneOtp = async (phone: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.length === 10 ? `+91${cleanPhone}` : `+${cleanPhone}`;
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (otpError) {
        console.warn('[Supabase Phone Auth] OTP request error:', otpError.message);
        setError(otpError.message || 'Failed to send OTP to mobile number.');
        setIsLoading(false);
        return false;
      }

      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send OTP.';
      setError(msg);
      setIsLoading(false);
      return false;
    }
  };

  // Native Supabase Phone Auth (OTP) Verification
  const verifyPhoneOtp = async (phone: string, token: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.length === 10 ? `+91${cleanPhone}` : `+${cleanPhone}`;
    try {
      const { data, error: verifyErr } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: token.trim(),
        type: 'sms',
      });

      if (verifyErr || !data?.user) {
        setError(verifyErr?.message || 'Invalid or expired OTP code.');
        setIsLoading(false);
        return false;
      }

      // Automatically claim unowned guest orders
      await claimGuestOrders();

      const userProf: UserProfile = {
        id: data.user.id,
        email: data.user.email || '',
        fullName: data.user.user_metadata?.full_name || 'Valued Customer',
        phone: formattedPhone,
        role: 'customer',
        registrationCompleted: true,
        isAnonymous: false,
        createdAt: data.user.created_at || new Date().toISOString(),
      };

      setUser(userProf);
      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to verify OTP.';
      setError(msg);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, pass: string, fullName: string, phone?: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

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

      if (sbError || !data?.user) {
        setError(sbError?.message || 'Registration failed.');
        setIsLoading(false);
        return false;
      }

      await supabase.auth.signOut();
      setUser(null);
      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed.';
      setError(msg);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAddresses([]);
    setWishlistProductIds([]);
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: sbError } = await supabase.auth.resetPasswordForEmail(email);
      if (sbError) throw sbError;
      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Password reset request failed.';
      setError(msg);
      setIsLoading(false);
      return false;
    }
  };

  const changePassword = async (newPass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: sbError } = await supabase.auth.updateUser({ password: newPass });
      if (sbError) throw sbError;
      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update password.';
      setError(msg);
      setIsLoading(false);
      return false;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const safeData = { ...data };
    delete (safeData as Partial<UserProfile> & { role?: string; registrationCompleted?: boolean }).role;
    delete (safeData as Partial<UserProfile> & { role?: string; registrationCompleted?: boolean }).registrationCompleted;

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

  const isGuest = !!user && user.isAnonymous === true;
  const isAuthenticated = !!user && !isGuest;
  const isAdmin = !!user && !isGuest && (user.role === 'admin' || user.role === 'superadmin');

  return (
    <AuthContext.Provider
      value={{
        user,
        addresses,
        wishlistProductIds,
        isAuthenticated,
        isGuest,
        isAdmin,
        isLoading,
        authReady,
        error,
        login,
        loginWithPhone,
        signInWithPhoneOtp,
        verifyPhoneOtp,
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
