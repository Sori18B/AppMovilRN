// src/components/product/QuantitySelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  /** El stock máximo disponible para la variante seleccionada */
  maxStock: number;
}

export const QuantitySelector: React.FC<Props> = ({
  quantity,
  onQuantityChange,
  maxStock,
}) => {
  const handleDecrease = () => {
    // No permitir bajar de 1
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    // No permitir subir más allá del stock disponible
    // Si maxStock es 0, no debería permitir aumentar
    if (quantity < maxStock) {
      onQuantityChange(quantity + 1);
    }
  };

  // Deshabilitar botones si se llega a los límites
  const isMin = quantity <= 1;
  const isMax = quantity >= maxStock;
  // Deshabilitar todo si no hay stock
  const isDisabled = maxStock === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cantidad</Text>
      <View style={styles.selector}>
        <TouchableOpacity
          style={[
            styles.button,
            (isMin || isDisabled) && styles.buttonDisabled,
          ]}
          onPress={handleDecrease}
          disabled={isMin || isDisabled}
        >
          <Icon
            name="remove"
            size={24}
            color={isMin || isDisabled ? '#A0AEC0' : '#2D3748'}
          />
        </TouchableOpacity>

        <Text style={styles.quantityText}>{isDisabled ? 0 : quantity}</Text>

        <TouchableOpacity
          style={[
            styles.button,
            (isMax || isDisabled) && styles.buttonDisabled,
          ]}
          onPress={handleIncrease}
          disabled={isMax || isDisabled}
        >
          <Icon
            name="add"
            size={24}
            color={isMax || isDisabled ? '#A0AEC0' : '#2D3748'}
          />
        </TouchableOpacity>
      </View>
      {maxStock === 0 && (
        <Text style={styles.noStockText}>
          Esta combinación de color y talla no está disponible.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 44, // Área táctil ligeramente más grande
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  buttonDisabled: {
    backgroundColor: '#F8F9FA',
    borderColor: '#F1F5F9',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  noStockText: {
    fontSize: 14,
    color: '#E53E3E', // Un color de error/advertencia
    marginTop: 8,
  },
});