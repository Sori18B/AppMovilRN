export interface AddToCartRequest {
  productVariantID: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}