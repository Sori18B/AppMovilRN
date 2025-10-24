import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  size?: string;
  color?: string;
  quantity: number;
  image: string;
  inStock: boolean;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  total: number;
  shipping: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = '@ecommerce_cart';
const SHIPPING_COST = 5.99;
const FREE_SHIPPING_THRESHOLD = 50;

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const loadCart = useCallback(async () => {
    try {
      const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (cartData) {
        setItems(JSON.parse(cartData));
      }
    } catch (error) {
      console.error('Error cargando carrito:', error);
    }
  }, []);

  const saveCart = useCallback(async () => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error guardando carrito:', error);
    }
  }, [items]);

  // Cargar carrito desde AsyncStorage al iniciar
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Guardar carrito en AsyncStorage cuando cambie
  useEffect(() => {
    if (items.length > 0) {
      saveCart();
    }
  }, [items, saveCart]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      
      if (existingItem) {
        // Si el item ya existe, incrementar cantidad
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (id: string): boolean => {
    return items.some((item) => item.id === id);
  };

  // Cálculos
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD 
    ? SHIPPING_COST 
    : 0;

  const total = subtotal + shipping;

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const value: CartContextType = {
    items,
    itemCount,
    subtotal,
    total,
    shipping,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};
