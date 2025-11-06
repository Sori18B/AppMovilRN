import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { cartService } from '../api/cartService';
import {
  AddToCartRequest,
  UpdateCartItemRequest,
} from '../types/cart.Request.interface';
import { CartResponse } from '../types/cart.Response.interface';
import { useAuth } from './AuthContext';

// Definir el estado
interface CartState {
  cart: CartResponse | null;
  loading: boolean;
  error: string | null;
}

// Definir las acciones del reducer
type CartAction =
  | { type: 'CART_START' }
  | { type: 'CART_SUCCESS'; payload: CartResponse }
  | { type: 'CART_ERROR'; payload: string }
  | { type: 'CART_CLEAR' };

// Definir el estado inicial
const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

// Crear el Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'CART_START':
      return { ...state, loading: true, error: null };
    case 'CART_SUCCESS':
      return { ...state, loading: false, cart: action.payload, error: null };
    case 'CART_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'CART_CLEAR':
      return initialState;
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  loadCart: () => Promise<void>;
  addItemToCart: (item: AddToCartRequest) => Promise<void>;
  updateItemQuantity: (
    itemId: number,
    item: UpdateCartItemRequest,
  ) => Promise<void>;
  removeItemFromCart: (itemId: number) => Promise<void>;
  clearUserCart: () => Promise<void>;
  clearCartOnLogout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  const loadCart = useCallback(async () => {
    dispatch({ type: 'CART_START' });
    try {
      const cartData = await cartService.getCart();
      dispatch({ type: 'CART_SUCCESS', payload: cartData });
    } catch (error) {
      dispatch({ type: 'CART_ERROR', payload: (error as Error).message });
    }
  }, []);

  const clearCartOnLogout = useCallback(() => {
    dispatch({ type: 'CART_CLEAR' });
  }, []);

  // Cargar el carrito inicial
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      clearCartOnLogout();
    }
  }, [isAuthenticated, loadCart, clearCartOnLogout]);

  const addItemToCart = useCallback(
    async (item: AddToCartRequest) => {
      dispatch({ type: 'CART_START' });
      try {
        await cartService.addToCart(item);
        await loadCart();
      } catch (error) {
        const errorMessage = (error as Error).message;
        dispatch({ type: 'CART_ERROR', payload: (error as Error).message });
        throw new Error(errorMessage);
      }
    },
    [loadCart],
  );

  const updateItemQuantity = useCallback(
    async (itemId: number, item: UpdateCartItemRequest) => {
      dispatch({ type: 'CART_START' });
      try {
        await cartService.updateCartItem(itemId, item);
        await loadCart();
      } catch (error) {
        dispatch({ type: 'CART_ERROR', payload: (error as Error).message }); //
      }
    },
    [loadCart],
  );

  const removeItemFromCart = useCallback(
    async (itemId: number) => {
      dispatch({ type: 'CART_START' });
      try {
        await cartService.removeCartItem(itemId);
        await loadCart();
      } catch (error) {
        dispatch({ type: 'CART_ERROR', payload: (error as Error).message });
      }
    },
    [loadCart],
  );

  const clearUserCart = useCallback(async () => {
    dispatch({ type: 'CART_START' });
    try {
      await cartService.clearCart();
      await loadCart();
    } catch (error) {
      dispatch({ type: 'CART_ERROR', payload: (error as Error).message });
    }
  }, [loadCart]);

  const contextValue = useMemo(
    () => ({
      ...state,
      loadCart,
      addItemToCart,
      updateItemQuantity,
      removeItemFromCart,
      clearUserCart,
      clearCartOnLogout,
    }),
    [
      state,
      loadCart,
      addItemToCart,
      updateItemQuantity,
      removeItemFromCart,
      clearUserCart,
      clearCartOnLogout,
    ],
  ); //

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider> //
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};