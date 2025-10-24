import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { ProductCard } from './ProductCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 48 = padding lateral + espacio entre cards

interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

interface ProductGridProps {
  products: Product[];
  onProductPress?: (id: string | number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onProductPress 
}) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.grid}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <ProductCard
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            onPress={onProductPress}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: CARD_WIDTH,
  },
});
