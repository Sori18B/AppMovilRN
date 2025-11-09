// ---------- RESPONSE ----------

export interface ProductResponse {
  productID: number;
  name: string;
  description: string;
  basePrice: string;
  isActive: boolean;
  category: CategoryResponse;
  gender: GenderResponse;
  images: ProductImageResponse[];
  variants: ProductVariantResponse[];
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface CategoryResponse {
  categoryID: number;
  categoryName: string;
  description?: string;
  isActive: boolean;
  products: ProductResponse[];
}

export interface GenderResponse {
  genderID: number;
  genderName: string;
}

export interface ProductImageResponse {
  imageID: number;
  imageURL: string;
  altText?: string;
  displayOrder: number;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariantResponse {
  productVariantID: number;
  size: SizeResponse;
  color: ColorResponse;
  sku: string;
  price: number;
  stock: number;
  isActive: boolean;
  stripePriceId?: string;
  currency: string;
  mode?: 'payment' | 'subscription' | 'setup';
  taxBehavior?: 'inclusive' | 'exclusive' | 'unspecified';
  nickname?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SizeResponse {
  sizeID: number;
  sizeLabel: string;
  sizeOrder: number;
}

export interface ColorResponse {
  colorID: number;
  colorName: string;
  hexCode?: string;
}
