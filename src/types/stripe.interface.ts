/**
 * Payload para crear un Payment Intent.
 *
 */
export interface CreatePaymentIntentPayload {
  shippingAddressID: number;
  billingAddressID: number;
  customerNote?: string;
}

/**
 * Resumen del carrito devuelto por la API.
 *
 */
export interface CartSummary {
  itemsCount: number;
  totalQuantity: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

/**
 * Objeto 'data' devuelto al crear un Payment Intent.
 *
 */
export interface PaymentIntentData {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  cartSummary: CartSummary;
}

/**
 * La respuesta completa de la API para el Payment Intent.
 */
export interface PaymentIntentApiResponse {
  success: boolean;
  message: string;
  data: PaymentIntentData;
}