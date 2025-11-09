import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../contexts';
import { CartItem, CartSummary } from '../components/cart';
import DiscountCoupon from '../components/cart/DiscountCoupon';
import { colors } from '../theme';
import { useFocusEffect } from '@react-navigation/native';
import { UpdateCartItemRequest } from '../types/cart.Request.interface';

export default function CartScreen({ navigation }: any) {

  const {
    cart,
    loading,
    error,
    loadCart,
    updateItemQuantity,
    removeItemFromCart,
  } = useCart();

  // Hook para actualizar al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [loadCart]),
  );

  const items = cart?.data?.items || [];
  const summary = cart?.data?.summary;
  const totalItems = summary?.totalItems || 0;
  const subtotal = summary?.subtotal || 0;
  const total = summary?.estimatedTotal || 0;

  // Calcular envío o impuestos (si existe la diferencia)
  const shipping =
    summary && summary.estimatedTotal > summary.subtotal
      ? summary.estimatedTotal - summary.subtotal
      : 0;

  const onRefresh = useCallback(async () => {
    await loadCart();
  }, [loadCart]);

  const handleRemoveItem = (id: number) => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que quieres eliminar este producto del carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => removeItemFromCart(id),
        },
      ],
    );
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      const itemUpdate: UpdateCartItemRequest = { quantity: newQuantity };
      updateItemQuantity(itemId, itemUpdate);
    }
  };

  if (loading && !cart) {
    return (
      <View style={[styles.container, styles.emptyCart]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando tu carrito...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.emptyCart]}>
        <Icon name="error-outline" size={80} color={colors.gray300} />
        <Text style={styles.emptyCartTitle}>Error al cargar el carrito</Text>
        <Text style={styles.emptyCartText}>{error}</Text>
        <TouchableOpacity style={styles.continueShoppingButton} onPress={onRefresh}>
          <Text style={styles.continueShoppingText}>Intentar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isButtonDisabled = loading;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carrito</Text>
        <Text style={styles.itemCount}>{totalItems === 1 ? '1 producto' : `${totalItems} productos`}</Text>
      </View>

      {totalItems === 0 ? (
        // Carrito vacío
        <ScrollView
          contentContainerStyle={styles.emptyCart}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }>
          <View style={styles.emptyCart}>
            <Icon name="shopping-cart" size={80} color={colors.gray300} />
            <Text style={styles.emptyCartTitle}>Tu carrito está vacío</Text>
            <Text style={styles.emptyCartText}>
              Agrega algunos productos increíbles a tu carrito
            </Text>
            <TouchableOpacity
              style={styles.continueShoppingButton}
              onPress={() => navigation.navigate('Products')}>
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
              refreshing={loading}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }>
          <View style={styles.itemsContainer}>
            {items.map(item => (
              <CartItem
                key={item.cartItemID}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </View>

          {/* --- Sección de cupón --- */}
          <DiscountCoupon />

          {/* Resumen del pedido */}
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </ScrollView>
      )}

      {/* Botón de checkout */}
      {totalItems > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity
            style={[
              styles.checkoutButton,
              isButtonDisabled && styles.disabledButton,
            ]}
            disabled={isButtonDisabled}>
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.checkoutButtonText}>
                Proceder al Pago - ${total.toFixed(2)}
              </Text>
            )}
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
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: colors.textSecondary,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
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
    paddingBottom: 0,
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
    minHeight: 50,
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