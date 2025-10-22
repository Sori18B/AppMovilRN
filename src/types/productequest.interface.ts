

export interface ProductRequest {
  name: string;
  description: string;
  basePrice: number;
  isActive?: boolean;
  categoryID: number;
  genderID: number;
  images?: ProductImageRequest[];
  variants?: ProductVariantRequest[];
}

export interface ProductImageRequest {
  imageURL: string;
  altText?: string;
  displayOrder?: number;
  isMain?: boolean;
}

export interface ProductVariantRequest {
  sizeID: number;
  colorID: number;
  sku: string;
  price: number;
  stock?: number;
  isActive?: boolean;
  stripePriceId?: string;
  currency?: string;
  mode?: 'payment' | 'subscription' | 'setup';
  taxBehavior?: 'inclusive' | 'exclusive' | 'unspecified';
  nickname?: string;
}
