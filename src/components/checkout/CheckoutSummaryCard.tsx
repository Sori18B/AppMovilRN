// src/components/checkout/CheckoutSummaryCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, shadows, borderRadius } from '../../theme';

interface CheckoutSummaryCardProps {
  subtotal: number;
  discount?: number;
  shipping: number;
  total: number;
}

export const CheckoutSummaryCard: React.FC<CheckoutSummaryCardProps> = ({
  subtotal,
  discount = 0,
  shipping,
  total,
}) => {
  return (
    <View style={styles.card}>
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
  card: {
    backgroundColor: colors.white,
    borderRadius: 12, // 12px
    padding: spacing.lg, // 16px
    ...shadows.medium,
    marginBottom: spacing.xl, // 20px
  },
  title: {
    fontSize: 20, // Más grande
    fontWeight: '600', // 600
    color: colors.textPrimary,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16, // 16px
    color: colors.textSecondary,
    fontWeight: '400', // 400
  },
  value: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500', // 500
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
    fontSize: 18, // 18px
    fontWeight: 'bold', // bold
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary, // Color primario
  },
});