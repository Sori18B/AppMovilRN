import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { ProductCard } from '../components/product';
import { ErrorMessage } from '../components/common';
import { useCallback } from 'react';
import { getProductdata } from '../api/productService';
import { colors } from '../theme';
import { Categories } from '../components/home/Categories';
import { BannerCarousel } from '../components/home/BannerCarousel';
import HomeScreenSkeleton from '../components/skeleton/HomeScreenSkeleton';

const HEADER_HEIGHT = 70;

interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

const ListHeader = ({ navigation, currentBannerIndex, setCurrentBannerIndex }: any) => (
  <>
    <Categories />
    <BannerCarousel
      navigation={navigation}
      currentBannerIndex={currentBannerIndex}
      setCurrentBannerIndex={setCurrentBannerIndex}
    />
    <Text style={styles.popularTitle}>Popular</Text>
  </>
);

export default function HomeScreen({ navigation }: any) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const clampedScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setError(null);

      const response: any = await getProductdata();
      // Transformar los datos del backend al formato esperado
      const transformedProducts = Array.isArray(response)
        ? response.map((product: any) => ({
          id: product.productID || product.id,
          name: product.name || 'Producto sin nombre',
          price: Number(product.basePrice || product.price || 0),
          // Use the first image if available
          image:
            product.images?.[0]?.imageURL ||
            product.imageUrl ||
            'https://via.placeholder.com/300',
        }))
        : [];

      setProducts(transformedProducts);

    } catch (err: any) {
      console.error('Error cargando productos:', err);
      setError(err.message || 'Error al cargar los productos');
    }
  }, []);

  // Cargar productos del backend
  useEffect(() => {
    setLoading(true);
    fetchProducts().finally(() => setLoading(false));
  }, [fetchProducts]);

  const handleProductPress = useCallback((id: string | number) => {
    navigation.navigate('ProductDetail', { productId: id });
  }, [navigation]);

  // Animación para ocultar/mostrar el header completamente
  const headerTranslateY = clampedScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT], // Mueve el header hacia arriba
    extrapolate: 'clamp',
  });

  // Opacidad del header que desaparece al hacer scroll
  const headerOpacity = clampedScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true },
  );

  // Función para el pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  }, [fetchProducts]);

  if (loading) {
    return <HomeScreenSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchProducts} />;
  }

  return (
    <View style={styles.container}>
      {/* Header que desaparece completamente */}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslateY }],
            opacity: headerOpacity,
          },
        ]}
      >
        <Text style={styles.headerTitle}>Nuestra Colección</Text>
        <Text style={styles.headerSubtitle}>
          Descubre las últimas tendencias
        </Text>
      </Animated.View>

      <Animated.FlatList
        data={products}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        initialNumToRender={6} // Renderiza 6 items al inicio (3 filas)
        windowSize={10} // Mantiene menos items en memoria fuera de la pantalla
        maxToRenderPerBatch={8} // Renderiza en lotes más pequeños
        ListHeaderComponent={
          <ListHeader
            navigation={navigation}
            currentBannerIndex={currentBannerIndex}
            setCurrentBannerIndex={setCurrentBannerIndex}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ProductCard
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              onPress={handleProductPress}
            />
          </View>
        )}
      />
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
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  grid: {
    paddingTop: HEADER_HEIGHT + 16,
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  cardContainer: {
    width: '48%',
    marginBottom: 10,
  },
  popularTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
    marginTop: 10,
    marginLeft: 20,
  },
});