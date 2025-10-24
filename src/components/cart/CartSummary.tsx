import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface CartSummaryProps {
  subtotal: number;
  discount?: number;
  shipping: number;
  total: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  discount = 0,
  shipping,
  total,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del Pedido</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>
      
      {discount > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Descuento</Text>
          <Text style={[styles.value, styles.discount]}>
            -${discount.toFixed(2)}
          </Text>
        </View>
      )}
      
      <View style={styles.row}>
        <Text style={styles.label}>Envío</Text>
        <Text style={styles.value}>
          {shipping > 0 ? `$${shipping.toFixed(2)}` : 'Gratis'}
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  discount: {
    color: colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
