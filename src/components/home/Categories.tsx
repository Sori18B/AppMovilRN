import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const categories = [
  { id: 1, name: 'Tenis', icon: 'https://static.vecteezy.com/system/resources/thumbnails/047/241/340/small/running-sneaker-isolated-on-transparent-background-free-png.png' },
  { id: 2, name: 'Reloj', icon: 'https://pngimg.com/d/watches_PNG9852.png' },
  { id: 3, name: 'Ropa', icon: 'https://static.vecteezy.com/system/resources/thumbnails/047/249/331/small/sweater-shirt-hoodie-isolated-png.png' },
  { id: 4, name: 'Deporte', icon: 'https://static.vecteezy.com/system/resources/previews/045/756/358/non_2x/young-man-in-athletic-gear-running-against-a-white-backdrop-png.png' },
  { id: 5, name: 'Ver más', icon: 'https://static.vecteezy.com/system/resources/previews/011/912/003/non_2x/plus-sign-icon-free-png.png' },
];

export const Categories: React.FC = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesScroll}
    >
      {categories.map((cat) => (
        <TouchableOpacity key={cat.id} style={styles.categoryCard}>
          <View style={styles.categoryContent}>
            <Image source={{ uri: cat.icon }} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{cat.name}</Text>
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
    backgroundColor: '#fff',
    width: width / 4,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 7,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
});