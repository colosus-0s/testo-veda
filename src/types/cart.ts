import type { Product, ProductVariant } from './product';

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  total: number;
  itemCount: number;
  couponCode?: string;
}
