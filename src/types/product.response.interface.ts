
export interface Productreq {
  productID: number;
  name: string;
  description: string;
  basePrice: number;
  isActive: boolean;
  categoryID: number;
  genderID: number;
  createdAt: Date;
  updatedAt: Date;

  // relaciones
  category?: Category;
  gender?: Gender;
  images?: ProductImage[];
  variants?: ProductVariant[];
  favorites?: Favorite[];
}


export interface Category {
    categoryID: number;
    categoryName: string;
    description?: string | null;
    isActive: boolean;
    products?: Productreq[]; // relación inversa
}
  
  export interface Gender {
    genderID: number;
    genderName: string;
    products?: Productreq[];
}

export interface ProductImage {
    imageID: number;
    productID: number;
    imageURL: string;
    altText?: string | null;
    displayOrder: number;
    isMain: boolean;
    createdAt: Date;
    updatedAt: Date;
    product?: Productreq; // relación inversa opcional
}
  
  export interface Size {
    sizeID: number;
    sizeLabel: string;
    sizeOrder: number;
    variants?: ProductVariant[];
}
  
  export interface Color {
    colorID: number;
    colorName: string;
    hexCode?: string | null;
    variants?: ProductVariant[];
}
  
  export interface ProductVariant {
    productVariantID: number;
    productID: number;
    sizeID: number;
    colorID: number;
    sku: string;
    price: number; // Prisma.Decimal → number (puedes ajustar si usas Decimal.js)
    stock: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  
    // relaciones
    product?: Productreq;
    size?: Size;
    color?: Color;
}
  

export interface Favorite {
    favoriteID: number;
    userID: number;
    productID: number;
    addedAt: Date;
  
    // relaciones
    user?: {
      userID: number;
      name: string;
      lastName: string;
      email: string;
    };
    product?: Productreq;
}
  