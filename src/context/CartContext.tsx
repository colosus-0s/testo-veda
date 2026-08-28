/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, CartSummary } from '@/types/cart';
import type { Product, ProductVariant } from '@/types/product';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';

export interface CartContextType {
  cartItems: CartItem[];
  cartSummary: CartSummary;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = 'arogyapath_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(LOCAL_STORAGE_CART_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn('Failed to restore cart from localStorage', e);
    }
    const defaultProd = INITIAL_PRODUCTS[0];
    return [
      {
        id: `cart_${defaultProd.id}_${defaultProd.variants[0].id}`,
        productId: defaultProd.id,
        variantId: defaultProd.variants[0].id,
        quantity: 1,
        product: defaultProd,
        variant: defaultProd.variants[0],
      },
    ];
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
      }
    } catch (e) {
      console.warn('Failed to persist cart to localStorage', e);
    }
  }, [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) => {
    const targetVariant = variant || product.variants[0];
    const itemId = `cart_${product.id}_${targetVariant.id}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          variantId: targetVariant.id,
          quantity,
          product,
          variant: targetVariant,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 499;
  const shippingFee = subtotal >= freeShippingThreshold || itemCount === 0 ? 0 : 99;
  const total = subtotal + shippingFee;

  const cartSummary: CartSummary = {
    subtotal,
    discount: 0,
    shippingFee,
    freeShippingThreshold,
    total,
    itemCount,
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartSummary,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
