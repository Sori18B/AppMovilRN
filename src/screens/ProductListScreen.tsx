import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getCategoryId } from '../api/productService';
import { ProductResponse } from '../types/product.response.interface';
import { ProductGrid } from '../components/product';

interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

export default function ProductListScreen({ navigation, route }: any) {
  const { categoryID } = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar productos de la categoría del backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: any = await getCategoryId(categoryID);

        if (response.category && response.category.categoryName) {
          setCategoryName(response.category.categoryName);
        }

        const productsArray: ProductResponse[] = response.category && Array.isArray(response.category.products)
          ? response.category.products
          : [];

        // Transformar los datos del backend al formato esperado
        const transformedProducts = productsArray.map((product) => {
          const mainImage = product.images?.find(img => img.isMain);
          const firstImage = product.images?.[0]?.imageURL;

          return {
            id: product.productID,
            name: product.name || 'Producto sin nombre',
            price: Number(product.basePrice || 0),
            image: mainImage?.imageURL || firstImage || 'https://via.placeholder.com/300',
          };
        });

        setProducts(transformedProducts);

      } catch (err: any) {
        console.error('Error cargando productos:', err);
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryID]);

  useEffect(() => {
    const productCount = products.length;
    const subtitle = productCount === 1 ? '1 producto' : `${productCount} productos`;

    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{categoryName}</Text>
          {categoryName && productCount > 0 && (
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
          )}
        </View>
      ),
      headerTitleAlign: 'left',
    });
  }, [navigation, categoryName, products.length]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      {products.length === 0 ? (
        <Text style={{ padding: 10 }}>No hay productos en esta categoría.</Text>
      ) : (
        <ProductGrid
          products={products}
          onProductPress={(id) => navigation.navigate('ProductDetail', { productId: id })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#555',
  },
});