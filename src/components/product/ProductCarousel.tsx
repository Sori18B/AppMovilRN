import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ProductImageResponse } from '../../types/product.response.interface';

const { width } = Dimensions.get('window');

interface Props {
  images: ProductImageResponse[];
  currentIndex: number;
  onSnapToItem: (index: number) => void;
}

export const ProductCarousel: React.FC<Props> = ({ images, currentIndex, onSnapToItem }) => {
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        width={width}
        height={width * 0.9}
        data={images}
        scrollAnimationDuration={500}
        onSnapToItem={onSnapToItem}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image
              source={{ uri: item.imageURL }}
              style={styles.carouselImage}
              resizeMode="cover"
            />
          </View>
        )}
      />
      <View style={styles.imageCounter}>
        <Text style={styles.imageCounterText}>
          {currentIndex + 1} / {images.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: { alignItems: 'center', justifyContent: 'center' },
  carouselItem: {
    width: width * 0.95,
    alignSelf: 'center',
    borderRadius: 16,
    marginVertical: 10,
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
});