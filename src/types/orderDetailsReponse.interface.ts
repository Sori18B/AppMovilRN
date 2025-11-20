import { ProductVariantResponse } from "./product.response.interface";

export interface DetailsResponse {

    orderDetailID: number;
    orderID: number;
    productVariantID: number;
    productName: string;
    variantSKU: string;
    priceAtPurchase: string;    
    quantity: number;
    subtotal: string;
    discountAmount: string; 
    discountType?: string | null;
    discountCode?: string | null;
    unitPrice: string; 
    totalPrice: string; 
    createdAt: string; 
    updatedAt: string; 

    productVariant?: ProductVariantResponse | null;
    
}