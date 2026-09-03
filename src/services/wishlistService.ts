import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const LOCAL_STORAGE_WISHLIST_KEY = 'arogyapath_wishlist_v1';

export const getStoredWishlistIds = (): string[] => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY);
      if (saved) return JSON.parse(saved);
    }
  } catch {
    // Ignore
  }
  return ['a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'];
};

export const fetchUserWishlist = async (userId: string): Promise<string[]> => {
  if (isSupabaseConfigured() && userId) {
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('product_id')
        .eq('user_id', userId);

      if (!error && data) {
        return data.map((item) => item.product_id);
      }
    } catch {
      // Fallback
    }
  }
  return getStoredWishlistIds();
};

export const toggleWishlistItem = async (userId: string, productId: string): Promise<boolean> => {
  if (isSupabaseConfigured() && userId) {
    try {
      const existing = await fetchUserWishlist(userId);
      const isSaved = existing.includes(productId);

      if (isSaved) {
        await supabase
          .from('wishlist_items')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId);
        return false;
      } else {
        await supabase
          .from('wishlist_items')
          .insert({ user_id: userId, product_id: productId });
        return true;
      }
    } catch {
      // Fallback
    }
  }

  // Local fallback
  const current = getStoredWishlistIds();
  const exists = current.includes(productId);
  const updated = exists ? current.filter((id) => id !== productId) : [...current, productId];
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, JSON.stringify(updated));
    }
  } catch {
    // Ignore
  }
  return !exists;
};
