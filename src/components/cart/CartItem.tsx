import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme';

export interface CartItemData {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  size?: string;
  color?: string;
  quantity: number;
  image: string;
  inStock: boolean;
}

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const [deleteScaleAnim] = useState(new Animated.Value(1));

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
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity 
            onPress={() => onRemove(item.id)} 
            style={styles.deleteButton}
            onPressIn={handleDeletePressIn}
            onPressOut={handleDeletePressOut}
            activeOpacity={1}
          >
            <Animated.View style={{ transform: [{ scale: deleteScaleAnim }] }}>
              <Icon name="delete-outline" size={20} color={colors.error} />
            </Animated.View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.attributes}>
          {item.size && <Text style={styles.attribute}>Talla: {item.size}</Text>}
          {item.color && <Text style={styles.attribute}>Color: {item.color}</Text>}
        </View>
        
        <View style={styles.priceContainer}>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>
              ${item.originalPrice.toFixed(2)}
            </Text>
          )}
          <Text style={styles.currentPrice}>${item.price.toFixed(2)}</Text>
        </View>
        
        {!item.inStock && <Text style={styles.outOfStock}>Agotado</Text>}
      </View>
      
      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
          onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          activeOpacity={0.7}
        >
          <Icon 
            name="remove" 
            size={16} 
            color={item.quantity <= 1 ? colors.gray300 : colors.primary} 
          />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.quantity}</Text>
        
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
          activeOpacity={0.7}
        >
          <Icon name="add" size={16} color={colors.primary} />
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
