export type UserRole = 'customer' | 'admin' | 'superadmin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
}

export interface UserAddress {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  label?: 'Home' | 'Work' | 'Other' | string;
  isDefault: boolean;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  addresses: UserAddress[];
  wishlistProductIds: string[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
