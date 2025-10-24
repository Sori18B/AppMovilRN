import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { OrderCardSimple, OrderData } from './OrderCardSimple';
import { colors } from '../../theme';

interface OrderListSimpleProps {
  orders: OrderData[];
  onOrderPress?: (orderId: string) => void;
  onViewAll?: () => void;
  iconName?: string;
}

export const OrderListSimple: React.FC<OrderListSimpleProps> = ({
  orders,
  onOrderPress,
  onViewAll,
  iconName = 'card-giftcard',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} size={20} color={colors.primary} />
        </View>
        <Text style={styles.title}>Órdenes Recientes</Text>
      </View>

      <View style={styles.orderList}>
        {orders.map((order) => (
          <OrderCardSimple
            key={order.orderId}
            order={order}
            onPress={onOrderPress}
          />
        ))}
      </View>

      {onViewAll && (
        <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll}>
          <Text style={styles.viewAllText}>Ver Todas las Órdenes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  orderList: {
    marginBottom: 8,
  },
  viewAllButton: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
