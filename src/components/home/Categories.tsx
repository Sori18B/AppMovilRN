import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { getCategories } from '../../api/productService';
import { CategoryResponse } from '../../types/product.response.interface';
import { colors } from '../../theme';

const { width } = Dimensions.get('window');

export interface CategoryItem {
  icon?: string;
  categoryID: number;
  categoryName: string;
  description?: string;
  isActive?: boolean;
  _count?: Count;
}

export interface Count {
  products: number;
}

const shortCategories: CategoryItem[] = [
  { categoryID: 4, categoryName: 'Zapatos', icon: 'https://dxvidglz.github.io/VistellaIMG/assets/icons/sneaker.png' },
  { categoryID: 5, categoryName: 'Accesorios', icon: 'https://dxvidglz.github.io/VistellaIMG/assets/icons/watch.png' },
  { categoryID: 6, categoryName: 'Sudaderas', icon: 'https://dxvidglz.github.io/VistellaIMG/assets/icons/hoodie.png' },
  { categoryID: 2, categoryName: 'Pantalones', icon: 'https://dxvidglz.github.io/VistellaIMG/assets/icons/trousers.png' },
  { categoryID: 0, categoryName: 'Ver más', icon: 'https://dxvidglz.github.io/VistellaIMG/assets/icons/more.png' },
];

interface CategoriesProps {
  isShort: boolean;
  onPressCategory?: (id: number) => void;
}

/**
 * Componente para manejar la lógica y UI de las categorías.
 */
export const Categories: React.FC<CategoriesProps> = ({ isShort, onPressCategory }) => {
  const [apiCategories, setApiCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await getCategories();

      let categoriesData: CategoryResponse[] = [];
      if (Array.isArray(response)) {
        categoriesData = response;
      } else if (response && Array.isArray(response.data)) {
        categoriesData = response.data;
      }

      const mapped = categoriesData.map((cat) => ({
        categoryID: cat.categoryID,
        categoryName: cat.categoryName,
        description: cat.description,
        icon: undefined,
      }));

      setApiCategories(mapped);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isShort) fetchCategories();
  }, [isShort, fetchCategories]);

  const listToRender = isShort ? shortCategories : apiCategories;

  if (!isShort && loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (!isShort && error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error al cargar</Text>
      </View>
    );
  }

  // Lista completa de categorías - vertical
  if (!isShort) {
    return (
      <ScrollView style={styles.fullContainer}>
        {listToRender.map((cat) => (
          <TouchableOpacity
            key={cat.categoryID}
            style={styles.longCategoryCard}
            onPress={() => onPressCategory?.(cat.categoryID)}
          >
            <ImageBackground
            source={{uri:'https://dxvidglz.github.io/VistellaIMG/assets/card.png'}}
            style={styles.imageBackground}
            imageStyle={styles.imageBackgroundStyle}
            >
              <Text style={styles.longCategoryText}>{cat.categoryName}</Text>
              <Text style={styles.longCategoryDescription}>{cat.description}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // Lista corta de categorías - horizontal
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesScroll}
    >
      {listToRender.map((cat) => (
        <TouchableOpacity
          key={cat.categoryID}
          style={styles.categoryCard}
          onPress={() => onPressCategory?.(cat.categoryID)}
        >
          <View style={styles.categoryContent}>
            {isShort && cat.icon && <Image source={{ uri: cat.icon }} style={styles.categoryIcon} />}
            <Text style={styles.categoryText}>{cat.categoryName}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoriesScroll: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: colors.white,
    width: width / 4.5,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 7,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  categoryContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  fullContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  longCategoryCard: {
    width: "100%",
    height: 105,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 5,
    marginBottom: 12,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackgroundStyle: {
    borderRadius: 5,
    opacity: 0.2,
  },
  longCategoryText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffffff",
  },
  longCategoryDescription: {
    fontSize: 12,
    fontWeight: "400",
    color: "#e7e7e7ff",
  },
  loadingContainer: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: colors.error,
  },
});
