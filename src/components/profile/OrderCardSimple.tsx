import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors } from '../../theme';

export interface OrderData {
  orderId: string;
  date: string;
  total: number;
  status: 'Entregado' | 'En camino' | 'Procesando' | 'Cancelado';
}

interface OrderCardSimpleProps {
  order: OrderData;
  onPress?: (orderId: string) => void;
}

const statusColors = {
  'Entregado': colors.success,
  'En camino': colors.primary,
  'Procesando': colors.warning,
  'Cancelado': colors.error,
};

export const OrderCardSimple: React.FC<OrderCardSimpleProps> = ({ order, onPress }) => {
  const statusColor = statusColors[order.status] || colors.textSecondary;
  const [fadeAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.6,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={() => onPress?.(order.orderId)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <View style={styles.leftContent}>
          <Text style={styles.orderId}>{order.orderId}</Text>
          <Text style={styles.date}>{order.date}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.price}>${order.total.toFixed(2)}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
            <Text style={[styles.status, { color: statusColor }]}>
              {order.status}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftContent: {
    flex: 1,
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
  rightContent: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
  },
});
