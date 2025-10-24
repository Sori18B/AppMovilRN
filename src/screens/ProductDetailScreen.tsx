// ProductDetailScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ navigation, route }: any) {
  const { product } = route.params;

  // Ejemplo de variantes de producto (normalmente vienen de la tabla ProductVariant)
  const colorVariants = [
    {
      colorID: 1,
      colorName: 'Azul marino',
      imageURL: 'https://img.freepik.com/fotos-premium/diseno-fondo-creativo-abstracto-azul-oscuro-oxford_851755-194762.jpg?semt=ais_hybrid&w=740&q=80',
      price: 375.0,
    },
    {
      colorID: 2,
      colorName: 'Negro',
      imageURL: 'https://i.pinimg.com/236x/cd/c4/78/cdc4788651bf6381ecbdbd88bd99aa94.jpg',
      price: 341.05,
    },
  ];
  const defaultData = {
    "images": [
      {
        "imageUrl": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTpvRRub-ODLG5AAHLD4g1Hyx1X1RAbvUPuBpdM1whwQqdOOQiZzfSvuDtGrRgADTc-HMNwlumHxyAG4GFg7IKcs25oU0D2Qm9lWmwBpz0",
        "altText": "Playera negra talla M",
        "displayOrder": 0,
        "isMain": true
      },
      {
        "imageUrl": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTpvRRub-ODLG5AAHLD4g1Hyx1X1RAbvUPuBpdM1whwQqdOOQiZzfSvuDtGrRgADTc-HMNwlumHxyAG4GFg7IKcs25oU0D2Qm9lWmwBpz0",
        "altText": "Playera negra talla M",
        "displayOrder": 1,
        "isMain": true
      },
      {
        "imageUrl": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTpvRRub-ODLG5AAHLD4g1Hyx1X1RAbvUPuBpdM1whwQqdOOQiZzfSvuDtGrRgADTc-HMNwlumHxyAG4GFg7IKcs25oU0D2Qm9lWmwBpz0",
        "altText": "Playera negra talla M",
        "displayOrder": 2,
        "isMain": true
      }
    ]
  };

  const sizeVariants = [30, 32, 34, 36, 38];

  const [selectedColor, setSelectedColor] = useState(colorVariants[0]);
  const [selectedSize, setSelectedSize] = useState(34);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.detailsContainer}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* ---------- Carrusel ---------- */}
        <View style={styles.carouselContainer}>
          <Carousel
            width={width}
            height={width * 0.9}
            data={defaultData.images}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
              </View>
            )}
          />

          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              {currentIndex + 1} / {defaultData.images.length}
            </Text>
          </View>

        </View>

        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.categoryText}>{product.categoryName}&#123;Categoría&#125; · &#123;Género&#125;{product.genderName}</Text>

        {/* ---------- Selección de color ---------- */}
        <Text style={styles.sectionTitle}>Color: <Text style={{ fontWeight: '700' }}>{selectedColor.colorName}</Text></Text>

        <View style={styles.colorContainer}>
          {colorVariants.map((variant) => (
            <TouchableOpacity
              key={variant.colorID}
              style={[
                styles.colorOption,
                selectedColor.colorID === variant.colorID && styles.colorSelected,
              ]}
              onPress={() => setSelectedColor(variant)}
            >
              <Image source={{ uri: variant.imageURL }} style={styles.colorImage} />
              <Text style={styles.colorLabel}>{variant.colorName}</Text>
              <Text style={styles.colorPrice}>${variant.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- Selección de talla ---------- */}
        <Text style={styles.sectionTitle}>Talla: <Text style={{ fontWeight: '700' }}>{selectedSize}</Text></Text>
        <View style={styles.sizeContainer}>
          {sizeVariants.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeBox,
                selectedSize === size && styles.sizeSelected,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.sizeTextSelected,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- Descripción ---------- */}
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>
          {product.description ||
            'Este producto está fabricado con materiales de alta calidad, ofreciendo confort y durabilidad.'}
        </Text>

        {/* ---------- Botón agregar ---------- */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Icon name="shopping-cart" size={22} color="#fff" />
          <Text style={styles.addToCartText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  carouselContainer: { alignItems: 'center', justifyContent: 'center' },
  carouselItem: {
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageCounter: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  imageCounterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  detailsContainer: {
    flex: 1, backgroundColor: '#fff', marginTop: -20,
    borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20,
  },
  productName: { fontSize: 22, fontWeight: 'bold', color: '#2D3748' },
  productPrice: { fontSize: 20, fontWeight: '700', color: 'black', marginVertical: 6 },
  categoryText: { fontSize: 14, color: '#6B7280', marginBottom: 10 },

  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#2D3748', marginTop: 20, marginBottom: 8 },

  // ---- Colores ----
  colorContainer: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  colorOption: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    width: width / 4.5,
  },
  colorSelected: { borderColor: 'black', borderWidth: 2 },
  colorImage: { width: 60, height: 60, borderRadius: 8, marginBottom: 5 },
  colorLabel: { fontSize: 13, fontWeight: '500', color: '#2D3748' },
  colorPrice: { fontSize: 13, color: 'black', fontWeight: '600' },

  // ---- Tallas ----
  sizeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  sizeBox: {
    width: 55, height: 45, borderRadius: 8,
    borderWidth: 1, borderColor: '#E5E7EB',
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#fff',
  },
  sizeSelected: { borderColor: 'black', borderWidth: 2 },
  sizeText: { fontSize: 15, color: '#2D3748' },
  sizeTextSelected: { color: 'black', fontWeight: '700' },

  // ---- Descripción ----
  description: { fontSize: 15, color: '#4A5568', lineHeight: 22, textAlign: 'justify' },

  // ---- Botón ----
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  addToCartText: { color: '#fff', fontWeight: '600', fontSize: 16, marginLeft: 8 },
});
