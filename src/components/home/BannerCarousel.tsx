import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const banners = [
  { id: 1, image: 'https://previews.123rf.com/images/stickerside/stickerside2207/stickerside220700124/189853956-big-sale-banner-template-up-to-50-percent-off-special-offer-great-discount-promotion-price.jpg', url: 'https://example.com/tenis' },
  { id: 2, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', url: 'https://example.com/relojes' },
  { id: 3, image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1000&q=80', url: 'https://example.com/ropa' },
];

interface BannerCarouselProps {
  navigation: any;
  currentBannerIndex: number;
  setCurrentBannerIndex: (index: number) => void;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ navigation, currentBannerIndex, setCurrentBannerIndex }) => {
  return (
    <View style={{ marginVertical: 15 }}>
      <Carousel
        width={width}
        height={180}
        autoPlay
        autoPlayInterval={3000}
        data={banners}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentBannerIndex(index)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('WebView', { url: item.url })}>
            <Image source={{ uri: item.image }} style={styles.bannerImage} />
          </TouchableOpacity>
        )}
      />
      <View style={styles.dotContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentBannerIndex ? styles.activeDot : null
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    width: width * 0.92,
    height: 180,
    borderRadius: 12,
    alignSelf: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'black',
  },
});