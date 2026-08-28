/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (fullName: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_AUTH_KEY = 'arogyapath_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_AUTH_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // empty
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || 'Valued Customer',
            role: session.user.user_metadata?.role || 'customer',
          });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || 'Valued Customer',
            role: session.user.user_metadata?.role || 'customer',
          };
          setUser(profile);
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(profile));
        } else {
          setUser(null);
          localStorage.removeItem(LOCAL_AUTH_KEY);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) return { success: false, error: error.message };

        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || 'Valued Customer',
            role: email.includes('admin') ? 'admin' : 'customer',
          };
          setUser(profile);
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(profile));
          return { success: true };
        }
      }

      // Development / Local Auth Fallback
      if (pass.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters.' };
      }

      const role: 'customer' | 'admin' = email.includes('admin') ? 'admin' : 'customer';
      const devProfile: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        fullName: email.split('@')[0].toUpperCase(),
        role,
      };

      setUser(devProfile);
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(devProfile));
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName: string, email: string, pass: string) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: { data: { full_name: fullName, role: 'customer' } },
        });
        if (error) return { success: false, error: error.message };

        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName,
            role: 'customer',
          };
          setUser(profile);
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(profile));
          return { success: true };
        }
      }

      if (pass.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters.' };
      }

      const devProfile: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        fullName,
        role: 'customer',
      };

      setUser(devProfile);
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(devProfile));
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) return { success: false, error: error.message };
      }
      return {
        success: true,
        message: 'Password reset link sent to your registered email address.',
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(LOCAL_AUTH_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        forgotPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
