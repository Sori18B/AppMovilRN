import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme';
import { Item } from '../../types/cart.Response.interface';

interface CartItemProps {
  item: Item;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const [deleteScaleAnim] = useState(new Animated.Value(1));

  const { cartItemID, quantity, productVariant } = item;
  const { product, size, color, price, stock } = productVariant;

  const imageUrl = product.mainImage || 'https://via.placeholder.com/150';

  const currentPrice = parseFloat(price);

  const inStock = stock > 0;

  const handleDeletePressIn = () => {
    Animated.spring(deleteScaleAnim, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const handleDeletePressOut = () => {
    Animated.spring(deleteScaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.name}>{product.name}</Text>
          <TouchableOpacity
            onPress={() => onRemove(cartItemID)}
            style={styles.deleteButton}
            onPressIn={handleDeletePressIn}
            onPressOut={handleDeletePressOut}
            activeOpacity={1}>
            <Animated.View style={{ transform: [{ scale: deleteScaleAnim }] }}>
              <Icon name="delete-outline" size={20} color={colors.error} />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.attributes}>
          {size && <Text style={styles.attribute}>Talla: {size}</Text>}
          {color.name && (
            <Text style={styles.attribute}>Color: {color.name}</Text>
          )}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>${currentPrice.toFixed(2)}</Text>
        </View>

        {!inStock && <Text style={styles.outOfStock}>Agotado</Text>}
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={[
            styles.quantityButton,
            quantity <= 1 && styles.quantityButtonDisabled,
          ]}
          onPress={() => onUpdateQuantity(cartItemID, quantity - 1)}
          disabled={quantity <= 1}
          activeOpacity={0.7}>
          <Icon
            name="remove"
            size={16}
            color={quantity <= 1 ? colors.gray300 : colors.primary}
          />
        </TouchableOpacity>

        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(cartItemID, quantity + 1)}
          activeOpacity={0.7}
          disabled={!inStock || quantity >= stock}
        >
          <Icon
            name="add"
            size={16}
            color={
              !inStock || quantity >= stock ? colors.gray300 : colors.primary
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
  },
  attributes: {
    flexDirection: 'row',
    marginTop: 5,
  },
  attribute: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.gray400,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  outOfStock: {
    fontSize: 14,
    color: colors.error,
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray100,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    height: 40,
    alignSelf: 'flex-start',
    minWidth: 100,
  },
  quantityButton: {
    padding: 5,
    backgroundColor: colors.primaryLight + '15',
    borderRadius: 6,
  },
  quantityButtonDisabled: {
    backgroundColor: colors.gray100,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});