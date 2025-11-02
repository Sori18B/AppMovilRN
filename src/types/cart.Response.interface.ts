export interface CartResponse {
  success: boolean;
  data:    Data;
}

export interface Data {
  cartID:  number;
  items:   Item[];
  summary: Summary;
}

export interface Item {
  cartItemID:     number;
  quantity:       number;
  addedAt:        Date;
  productVariant: ProductVariant;
  subtotal:       number;
}

export interface ProductVariant {
  productVariantID: number;
  sku:              string;
  price:            string;
  stock:            number;
  size:             string;
  color:            Color;
  product:          Product;
}

export interface Color {
  name:    string;
  hexCode: string;
}

export interface Product {
  productID: number;
  name:      string;
  mainImage: string;
  category:  string;
  gender:    string;
}

export interface Summary {
  totalItems:     number;
  totalQuantity:  number;
  subtotal:       number;
  estimatedTotal: number;
}