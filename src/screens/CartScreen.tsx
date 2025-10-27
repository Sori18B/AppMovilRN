import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../contexts';
import { CartItem, CartSummary } from '../components/cart';
import { colors } from '../theme';

export default function CartScreen({navigation}: any) {
  const { items, updateQuantity, removeItem, subtotal, shipping, total } = useCart();
  const [refreshing, setRefreshing] = useState(false);

  const handleRemoveItem = (id: string) => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que quieres eliminar este producto del carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => removeItem(id)
        }
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simula actualización de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const hasOutOfStockItems = items.some(item => !item.inStock);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carrito</Text>
        <Text style={styles.itemCount}>{items.length} productos</Text>
      </View>

      {items.length === 0 ? (
        // Carrito vacío
        <ScrollView
          contentContainerStyle={styles.emptyCart}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
              title="Actualizando..."
            />
          }
        >
          <View style={styles.emptyCart}>
            <Icon name="shopping-cart" size={80} color={colors.gray300} />
            <Text style={styles.emptyCartTitle}>Tu carrito está vacío</Text>
            <Text style={styles.emptyCartText}>
              Agrega algunos productos increíbles a tu carrito
            </Text>
            <TouchableOpacity style={styles.continueShoppingButton} onPress={() => navigation.navigate('Products')}>
              <Text style={styles.continueShoppingText}>Continuar Comprando</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        // Carrito con productos
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
              title="Actualizando..."
            />
          }
        >
          <View style={styles.itemsContainer}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </View>

          {/* Resumen del pedido */}
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </ScrollView>
      )}

      {/* Botón de checkout */}
      {items.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity 
            style={[
              styles.checkoutButton,
              hasOutOfStockItems && styles.disabledButton
            ]}
            disabled={hasOutOfStockItems}
          >
            <Text style={styles.checkoutButtonText}>
              Proceder al Pago - ${total.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  itemCount: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  continueShoppingButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  continueShoppingText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  itemsContainer: {
    padding: 15,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.gray400,
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});