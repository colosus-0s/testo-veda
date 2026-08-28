import type { Product } from '@/types/product';
import { INITIAL_PRODUCTS } from '@/features/products/data/initialProducts';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { logAdminActivity } from '@/services/auditService';

const LOCAL_STORAGE_PRODUCTS_KEY = 'arogyapath_products_v2';
const LOCAL_STORAGE_MOVEMENTS_KEY = 'arogyapath_inventory_movements_v1';

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  quantityChange: number;
  previousStock: number;
  newStock: number;
  type: 'initial' | 'purchase' | 'restock' | 'manual_adjustment' | 'damaged' | 'deactivated';
  reason?: string;
  timestamp: string;
}

export const getInventoryMovements = (productId?: string): InventoryMovement[] => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(LOCAL_STORAGE_MOVEMENTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          if (productId) return parsed.filter((m) => m.productId === productId);
          return parsed;
        }
      }
    }
  } catch {
    // Fallback
  }
  return [];
};

export const recordInventoryMovement = (
  productId: string,
  productName: string,
  quantityChange: number,
  previousStock: number,
  newStock: number,
  type: InventoryMovement['type'],
  reason?: string
) => {
  try {
    const existing = getInventoryMovements();
    const movement: InventoryMovement = {
      id: `mov_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      productId,
      productName,
      quantityChange,
      previousStock,
      newStock,
      type,
      reason: reason || type,
      timestamp: new Date().toISOString(),
    };
    const updated = [movement, ...existing];
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(LOCAL_STORAGE_MOVEMENTS_KEY, JSON.stringify(updated));
    }
  } catch {
    // Ignore storage errors
  }
};

export const getProducts = (): Product[] => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    }
  } catch {
    // Ignore parse errors
  }
  return INITIAL_PRODUCTS;
};

export const saveProductsToStorage = (products: Product[]) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    }
  } catch {
    // Ignore storage errors
  }
};

export const getActiveProducts = (): Product[] => {
  const products = getProducts();
  return products.filter((p) => p.active !== false && p.stock > 0);
};

export const getProductById = (id: string): Product | null => {
  const products = getProducts();
  return products.find((p) => p.id === id || p.slug === id) || null;
};

export const getProductBySlug = (slug: string): Product | null => {
  const products = getProducts();
  return products.find((p) => p.slug === slug || p.id === slug) || null;
};

export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  const existing = getProducts();
  const id = productData.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const slug = productData.slug || (productData.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const defaultVariant = {
    id: `var_${id}_default`,
    sku: productData.sku || `AP-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    name: productData.name || 'Standard Pack',
    packSize: productData.packSize || '30 Capsules',
    capsuleCount: productData.capsuleCount || 30,
    price: productData.price || 999,
    compareAtPrice: productData.compareAtPrice || 1499,
    stock: productData.stock || 50,
    isDefault: true,
  };

  const newProduct: Product = {
    id,
    slug,
    sku: productData.sku || `AP-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    name: productData.name || 'Botanical Formulation',
    subtitle: productData.subtitle || 'Ayurvedic Dietary Supplement',
    shortDescription: productData.shortDescription || 'Botanical dietary supplement formulated with high-potency herbs.',
    description: productData.description || 'Comprehensive Ayurvedic dietary formulation crafted according to classic texts.',
    category: productData.category || 'vitality',
    collections: productData.collections || ['all', 'vitality'],
    price: productData.price || 999,
    compareAtPrice: productData.compareAtPrice || 1499,
    currency: 'INR',
    stock: typeof productData.stock === 'number' ? productData.stock : 50,
    packSize: productData.packSize || '30 Veg Capsules (500mg)',
    servings: 30,
    capsuleCount: productData.capsuleCount || 30,
    active: true,
    variants: productData.variants && productData.variants.length > 0 ? productData.variants : [defaultVariant],
    supplementFacts: productData.supplementFacts || {
      servingSize: '1 Capsule Daily',
      servingsPerContainer: 30,
      ingredients: [
        { name: 'Ashwagandha Extract', amount: '250mg', approvedBenefit: 'Vitality' },
      ],
      otherIngredients: ['Vegetable Capsule Shell (HPMC)', 'Microcrystalline Cellulose'],
    },
    directions: productData.directions || {
      labelInstruction: 'Take 1 capsule twice daily with warm milk or water.',
      suggestedUse: 'Take 1 capsule twice daily after meals.',
      timing: 'Morning and Evening',
      bestResultsDuration: 'Consistent use for 60-90 days recommended.',
    },
    warnings: productData.warnings || [
      'Dietary supplement, not for medicinal use.',
      'Consult a physician if pregnant or taking medication.',
    ],
    storage: productData.storage || 'Store in a cool, dry place away from direct sunlight.',
    disclaimer: productData.disclaimer || 'THESE STATEMENTS HAVE NOT BEEN EVALUATED BY THE FOOD AND DRUG ADMINISTRATION.',
    images: productData.images || {
      primary: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
      label: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
      render3d: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
      ],
    },
    badges: productData.badges || ['100% Ayurvedic', 'FSSAI Approved'],
    rating: 4.9,
    reviewCount: 12,
    featured: productData.featured !== undefined ? productData.featured : true,
    bestSeller: productData.bestSeller !== undefined ? productData.bestSeller : false,
    newArrival: productData.newArrival !== undefined ? productData.newArrival : true,
    tags: productData.tags || ['ayurveda', 'vitality', 'herbal'],
    seo: productData.seo || {
      title: productData.name || 'Botanical Supplement',
      description: productData.shortDescription || 'Ayurvedic dietary supplement',
    },
    regulatory: productData.regulatory || {
      fssaiLicense: '12118441000654',
      isVegetarian: true,
      certifications: ['GMP Certified', 'ISO 9001:2015', 'FSSAI'],
      marketedBy: 'Arogya Path Wellness Pvt. Ltd.',
      manufacturedBy: 'Arogya Botanical Labs India',
      mrp: productData.compareAtPrice || 1499,
    },
  };

  const updatedProducts = [newProduct, ...existing];
  saveProductsToStorage(updatedProducts);
  recordInventoryMovement(newProduct.id, newProduct.name, newProduct.stock, 0, newProduct.stock, 'initial', 'Product Created');

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('products').insert({
        id: newProduct.id,
        slug: newProduct.slug,
        sku: newProduct.sku,
        name: newProduct.name,
        price: newProduct.price,
        compare_at_price: newProduct.compareAtPrice,
        stock: newProduct.stock,
        category: newProduct.category,
        primary_image: newProduct.images.primary,
        images_json: newProduct.images,
        badges_json: newProduct.badges,
        short_description: newProduct.shortDescription,
        description: newProduct.description,
        is_active: true,
      });
    } catch {
      // Fallback
    }
  }

  await logAdminActivity({
    action: 'CREATE_PRODUCT',
    entityType: 'product',
    entityId: newProduct.id,
    details: { name: newProduct.name, sku: newProduct.sku, price: newProduct.price, stock: newProduct.stock },
  });

  return newProduct;
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product | null> => {
  const existing = getProducts();
  let updatedProduct: Product | null = null;

  const updatedList = existing.map((p) => {
    if (p.id === id || p.slug === id) {
      updatedProduct = {
        ...p,
        ...productData,
        active: productData.active !== undefined ? productData.active : p.active,
        images: {
          ...p.images,
          ...(productData.images || {}),
        },
        regulatory: {
          ...p.regulatory,
          ...(productData.regulatory || {}),
        },
      };
      return updatedProduct;
    }
    return p;
  });

  if (updatedProduct) {
    const prodToSave: Product = updatedProduct;
    saveProductsToStorage(updatedList);

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('products')
          .update({
            name: prodToSave.name,
            price: prodToSave.price,
            compare_at_price: prodToSave.compareAtPrice,
            stock: prodToSave.stock,
            category: prodToSave.category,
            is_active: prodToSave.active !== false,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);
      } catch {
        // Fallback
      }
    }

    await logAdminActivity({
      action: 'UPDATE_PRODUCT',
      entityType: 'product',
      entityId: id,
      details: { name: prodToSave.name, price: prodToSave.price, stock: prodToSave.stock },
    });
  }

  return updatedProduct;
};

export const deactivateProduct = async (id: string): Promise<boolean> => {
  const existing = getProducts();
  let prevStock = 0;
  let prodName = '';
  const updatedList = existing.map((p) => {
    if (p.id === id || p.slug === id) {
      prevStock = p.stock;
      prodName = p.name;
      return { ...p, active: false, stock: 0, featured: false };
    }
    return p;
  });
  saveProductsToStorage(updatedList);
  if (prodName) {
    recordInventoryMovement(id, prodName, -prevStock, prevStock, 0, 'damaged', 'Product Deactivated/Archived');
  }

  if (isSupabaseConfigured()) {
    try {
      await supabase
        .from('products')
        .update({ is_active: false, stock: 0, updated_at: new Date().toISOString() })
        .eq('id', id);
    } catch {
      // Fallback
    }
  }

  await logAdminActivity({
    action: 'DEACTIVATE_PRODUCT',
    entityType: 'product',
    entityId: id,
    details: { name: prodName, previousStock: prevStock },
  });

  return true;
};

export const reactivateProduct = async (id: string): Promise<Product | null> => {
  const existing = getProducts();
  let updated: Product | null = null;
  let prevStock = 0;

  const updatedList = existing.map((p) => {
    if (p.id === id || p.slug === id) {
      prevStock = p.stock;
      const targetStock = p.stock > 0 ? p.stock : 50;
      updated = { ...p, active: true, stock: targetStock, featured: true };
      return updated;
    }
    return p;
  });

  if (updated) {
    const prod: Product = updated;
    saveProductsToStorage(updatedList);
    recordInventoryMovement(prod.id, prod.name, prod.stock - prevStock, prevStock, prod.stock, 'restock', 'Product Reactivated');

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('products')
          .update({ is_active: true, stock: prod.stock, updated_at: new Date().toISOString() })
          .eq('id', id);
      } catch {
        // Fallback
      }
    }

    await logAdminActivity({
      action: 'REACTIVATE_PRODUCT',
      entityType: 'product',
      entityId: id,
      details: { name: prod.name, stock: prod.stock },
    });
  }
  return updated;
};

export const updateStock = async (id: string, newStock: number, reason?: string): Promise<Product | null> => {
  const existing = getProducts();
  let updated: Product | null = null;
  let prevStock = 0;

  const updatedList = existing.map((p) => {
    if (p.id === id || p.slug === id) {
      prevStock = p.stock;
      const clampedStock = Math.max(0, newStock);
      updated = { ...p, stock: clampedStock };
      return updated;
    }
    return p;
  });

  if (updated) {
    const prod: Product = updated;
    const delta = prod.stock - prevStock;
    saveProductsToStorage(updatedList);
    recordInventoryMovement(
      prod.id,
      prod.name,
      delta,
      prevStock,
      prod.stock,
      delta >= 0 ? 'restock' : 'manual_adjustment',
      reason || 'Stock Adjustment'
    );

    if (isSupabaseConfigured()) {
      try {
        // Call atomic update_product_stock RPC in PostgreSQL
        await supabase.rpc('update_product_stock', {
          p_product_id: id,
          p_delta: delta,
          p_movement_type: delta >= 0 ? 'restock' : 'manual_adjustment',
          p_notes: reason || 'Stock Adjustment',
        });
      } catch (err) {
        console.warn('Supabase update_product_stock RPC fallback:', err);
      }
    }

    await logAdminActivity({
      action: 'UPDATE_STOCK',
      entityType: 'product',
      entityId: id,
      details: { previousStock: prevStock, newStock: prod.stock, delta, reason },
    });
  }
  return updated;
};
