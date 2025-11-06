import http from './http';
import {
  AddToCartRequest,
  UpdateCartItemRequest,
} from '../types/cart.Request.interface';
import { CartResponse } from '../types/cart.Response.interface';
import { handleApiError, logApiError } from '../utils';

const BASE_URL = '/cart';

/**
 * Obtiene el carrito actual del usuario.
 */
const getCart = async (): Promise<CartResponse> => {
  const { data } = await http.get<CartResponse>(BASE_URL);
  return data;
};

/**
 * Añade un producto al carrito del usuario.
 * @param item - Datos del producto a añadir (productVariantID, quantity)
 */
const addToCart = async (item: AddToCartRequest): Promise<CartResponse> => {
    try {
        console.log('Añadiendo al carrito:', item);
        const { data } = await http.post<CartResponse>(`${BASE_URL}/items`, item);
        console.log('Respuesta del carrito después de añadir:', data);
        return data;
    } catch (error) {
        logApiError('AGREGAR AL CARRITO', error, { item });
        const apiError = handleApiError(error);
        throw new Error(apiError.message);
    }
};

/**
 * Actualiza la cantidad de un ítem específico en el carrito.
 * @param itemId - ID del CartItem (no del producto)
 * @param item - Nuevos datos (solo quantity)
 */
const updateCartItem = async (
  itemId: number,
  item: UpdateCartItemRequest,
): Promise<CartResponse> => {
  const { data } = await http.put<CartResponse>(`${BASE_URL}/items/${itemId}`, item);
  return data;
};

/**
 * Elimina un ítem específico del carrito.
 * @param itemId - ID del CartItem
 */
const removeCartItem = async (itemId: number): Promise<CartResponse> => {
  const { data } = await http.delete<CartResponse>(`${BASE_URL}/items/${itemId}`);
  return data;
};

/**
 * Elimina todos los productos del carrito del usuario.
 */
const clearCart = async (): Promise<CartResponse> => {
  const { data } = await http.delete<CartResponse>(BASE_URL);
  return data;
};

export const cartService = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};