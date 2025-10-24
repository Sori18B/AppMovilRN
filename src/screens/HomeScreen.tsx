import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { ProductGrid } from '../components/product';
import { LoadingSpinner, ErrorMessage } from '../components/common';
import { getProductdata } from '../api/productService';
import { colors } from '../theme';

const HEADER_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = 70;

interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

export default function HomeScreen() {
  const [scrollY] = useState(new Animated.Value(0));
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar productos del backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: any = await getProductdata();
      
      // Transformar los datos del backend al formato esperado
      const transformedProducts = Array.isArray(response.data) 
        ? response.data.map((product: any) => ({
            id: product.productID || product.id,
            name: product.name || 'Producto sin nombre',
            price: product.price || 0,
            image: product.imageUrl || product.image || 'https://via.placeholder.com/300',
          }))
        : [];
      
      setProducts(transformedProducts);
    } catch (err: any) {
      console.error('Error cargando productos:', err);
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (id: string | number) => {
    console.log('Producto seleccionado:', id);
    // TODO: Navegar a la pantalla de detalle del producto
  };

  // Animación para ocultar/mostrar el header completamente
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  // Opacidad del header que desaparece al hacer scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Mostrar loading
  if (loading) {
    return <LoadingSpinner message="Cargando productos..." />;
  }

  // Mostrar error
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchProducts} />;
  }

  return (
    <View style={styles.container}>
      {/* Header que desaparece completamente */}
      <Animated.View style={[
        styles.header, 
        { 
          transform: [{ translateY: headerTranslateY }],
          opacity: headerOpacity
        }
      ]}>
        <Text style={styles.headerTitle}>Nuestra Colección</Text>
        <Text style={styles.headerSubtitle}>Descubre las últimas tendencias</Text>
      </Animated.View>
      
      {/* Galería de productos con componente reutilizable */}
      <Animated.View 
        style={[styles.scrollView, { paddingTop: HEADER_HEIGHT + 10 }]}
      >
        <ProductGrid 
          products={products} 
          onProductPress={handleProductPress}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    zIndex: 10,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
});