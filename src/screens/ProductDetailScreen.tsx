import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProductResponse, ColorResponse, SizeResponse } from '../types/product.response.interface';
import {
  ProductCarousel,
  ColorSelector,
  SizeSelector,
  QuantitySelector,
} from '../components/product';
import { getProductId } from '../api/productService';

export default function ProductDetailScreen({ navigation, route }: any) {
  const { productId } = route.params;
  const [product, setProduct] = useState<ProductResponse | null>(null);

  const [selectedColor, setSelectedColor] = useState<ColorResponse | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeResponse | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [maxStock, setMaxStock] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddToCart = async () => {
    console.log('Agregando al carrito:');
    console.log('Cantidad:', quantity);

    // Aquí se encuentra el productVariantID específico basada en color/talla
    const selectedVariant = product?.variants.find(
      v => v.color.colorID === selectedColor?.colorID &&
           v.size.sizeID === selectedSize?.sizeID
    );
    
    if (selectedVariant) {
      console.log('Variant ID:', selectedVariant.productVariantID);
      // Lógica para agregar al carrito
      navigation.navigate('Cart');
    } else {
      console.error('Variante no válida seleccionada');
      // Mostrar alerta al usuario
    }
  };

  // Cargar producto del backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response: any = await getProductId(productId);
        setProduct(response.product);
      } catch (err: any) {
        console.error('Error cargando productos:', err);
      }
    };
    fetchProduct();
  }, [productId]);

  // Arrays únicos para selectores
  const availableColors = product ? Array.from(
    new Set(product.variants.map(v => JSON.stringify(v.color)))
  ).map(c => JSON.parse(c)) : [];

  const availableSizes = product ? Array.from(
    new Set(product.variants.map(v => JSON.stringify(v.size)))
  ).map(s => JSON.parse(s)) : [];

  useEffect(() => {
    if (product && availableColors.length > 0 && availableSizes.length > 0) {
      // Establecer el primer color y talla disponibles por defecto
      if (!selectedColor) {
        setSelectedColor(availableColors[0]);
      }
      if (!selectedSize) {
        setSelectedSize(availableSizes[0]);
      }
    }
  }, [product, availableColors, availableSizes]);

  // Effect para actualizar el stock máximo y resetear la cantidad cada vez que el color o la talla cambien.
  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const variant = product.variants.find(
        v => v.color.colorID === selectedColor.colorID &&
             v.size.sizeID === selectedSize.sizeID
      );

      const newMaxStock = variant ? variant.stock : 0;
      setMaxStock(newMaxStock);

      if (newMaxStock === 0) {
        setQuantity(1);
      } else if (quantity > newMaxStock) {
        setQuantity(newMaxStock);
      }
    }
  }, [selectedColor, selectedSize, product, quantity]);

  if (!product || !selectedColor || !selectedSize) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2D3748" />
        <Text style={{marginTop: 10}}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.detailsContainer}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <ProductCarousel
          images={product.images}
          currentIndex={currentIndex}
          onSnapToItem={setCurrentIndex}
        />

        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.basePrice}</Text>
        <Text style={styles.categoryText}>{product.category.categoryName} · {product.gender.genderName}</Text>

        <ColorSelector
          variants={availableColors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />

        <SizeSelector
          sizes={availableSizes}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />

        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          maxStock={maxStock}
        />

        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>
          {product.description ||
            'Este producto está fabricado con materiales de alta calidad, ofreciendo confort y durabilidad.'}
        </Text>

        <TouchableOpacity 
          style={[
            styles.addToCartButton,
            maxStock === 0 && styles.addToCartDisabled
          ]} 
          onPress={handleAddToCart}
          disabled={maxStock === 0}
        >
          <Icon name="shopping-cart" size={22} color="#fff" />
          <Text style={styles.addToCartText}>
            {maxStock === 0 ? 'No disponible' : 'Agregar al carrito'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1, backgroundColor: '#fff', marginTop: -20,
    borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20,
  },
  productName: { fontSize: 22, fontWeight: 'bold', color: '#2D3748' },
  productPrice: { fontSize: 20, fontWeight: '700', color: 'black', marginVertical: 6 },
  categoryText: { fontSize: 14, color: '#6B7280', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#2D3748', marginTop: 20, marginBottom: 8 },
  description: { fontSize: 15, color: '#4A5568', lineHeight: 22, textAlign: 'justify' },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  addToCartDisabled: {
    backgroundColor: '#A0AEC0',
  },
  addToCartText: { color: '#fff', fontWeight: '600', fontSize: 16, marginLeft: 8 },
});