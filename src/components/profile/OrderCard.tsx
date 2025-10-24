import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, shadows } from '../../theme';

export interface OrderData {
  orderId: string;
  date: string;
  total: number;
  status: 'Entregado' | 'En camino' | 'Procesando' | 'Cancelado';
}

interface OrderCardProps {
  order: OrderData;
  onPress?: (orderId: string) => void;
}

const statusColors = {
  'Entregado': colors.success,
  'En camino': colors.primary,
  'Procesando': colors.warning,
  'Cancelado': colors.error,
};

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const statusColor = statusColors[order.status] || colors.textSecondary;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(order.orderId)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.orderId}>{order.orderId}</Text>
          <Text style={styles.date}>{order.date}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${order.total.toFixed(2)}</Text>
          <Text style={[styles.status, { color: statusColor }]}>
            {order.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
});
