export interface SupplementIngredient {
  name: string;
  botanicalName?: string;
  amount: string;
  dailyValue?: string;
  description?: string;
  approvedBenefit?: string;
  isPartOfBlend?: boolean;
}

export interface SupplementFacts {
  servingSize: string;
  servingsPerContainer: number;
  ingredients: SupplementIngredient[];
  proprietaryBlend?: {
    name: string;
    amount: string;
    ingredients: string[];
  };
  otherIngredients: string[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  packSize: string;
  capsuleCount: number;
  price: number;
  compareAtPrice?: number;
  stock: number;
  isDefault?: boolean;
  savingsPercentage?: number;
}

export interface ProductSEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface ProductDiscrepancyNotice {
  field: string;
  packagingValue: string;
  promotionalValue: string;
  status: 'PENDING_BUSINESS_CONFIRMATION' | 'RESOLVED';
  note: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  category: string;
  collections: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  stock: number;
  packSize: string;
  servings: number;
  capsuleCount: number;
  
  variants: ProductVariant[];
  supplementFacts: SupplementFacts;
  directions: {
    labelInstruction: string;
    suggestedUse: string;
    timing: string;
    bestResultsDuration: string;
  };
  warnings: string[];
  storage: string;
  disclaimer: string;
  
  images: {
    primary: string;
    label: string;
    render3d: string;
    gallery: string[];
  };
  videos?: string[];
  
  badges: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  tags: string[];
  active?: boolean;
  seo: ProductSEO;

  regulatory: {
    fssaiLicense: string;
    isVegetarian: boolean;
    certifications: string[];
    marketedBy: string;
    manufacturedBy: string;
    mrp: number;
  };

  discrepancyNotices?: ProductDiscrepancyNotice[];
}

export interface Ingredient {
  id: string;
  name: string;
  botanicalName: string;
  image: string;
  shortDescription: string;
  approvedBenefit: string;
  quantity?: string;
  source?: string;
  displayOrder: number;
  featured?: boolean;
}
