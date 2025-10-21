import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput,
  Alert,
  RefreshControl,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

// Datos de ejemplo
const initialCartItems = [
  {
    id: '1',
    name: 'Camiseta Básica Negra',
    price: 29.99,
    originalPrice: 39.99,
    size: 'M',
    color: 'Negro',
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    inStock: true
  },
  {
    id: '2',
    name: 'Jeans Slim Fit',
    price: 59.99,
    size: '32',
    color: 'Azul',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    inStock: true
  },
  {
    id: '3',
    name: 'Zapatos Casuales',
    price: 79.99,
    originalPrice: 99.99,
    size: '42',
    color: 'Blanco',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    inStock: false
  }
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que quieres eliminar este producto del carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simula actualización de datos
    setTimeout(() => {
      setCartItems(initialCartItems);
      setRefreshing(false);
    }, 100);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    const originalTotal = cartItems.reduce((total, item) => 
      total + ((item.originalPrice || item.price) * item.quantity), 0
    );
    return originalTotal - calculateSubtotal();
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 0 ? 5.99 : 0;
    return subtotal + shipping;
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const total = calculateTotal();
  const shipping = subtotal > 0 ? 5.99 : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carrito de Compras</Text>
        <Text style={styles.itemCount}>{cartItems.length} productos</Text>
      </View>

      {cartItems.length === 0 ? (
        // Carrito vacío
        <ScrollView
          contentContainerStyle={styles.emptyCart}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#4C1D95']}
              tintColor="#4C1D95"
              title="Actualizando..."
            />
          }
        >
          <View style={styles.emptyCart}>
            <Icon name="shopping-cart" size={80} color="#D1D5DB" />
            <Text style={styles.emptyCartTitle}>Tu carrito está vacío</Text>
            <Text style={styles.emptyCartText}>
              Agrega algunos productos increíbles a tu carrito
            </Text>
            <TouchableOpacity style={styles.continueShoppingButton}>
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
              colors={['#4C1D95']}
              tintColor="#4C1D95"
              title="Actualizando..."
            />
          }
        >
          <View style={styles.itemsContainer}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                
                <View style={styles.itemDetails}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <TouchableOpacity 
                      onPress={() => removeItem(item.id)}
                      style={styles.deleteButton}
                    >
                      <Icon name="delete-outline" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.itemAttributes}>
                    <Text style={styles.attribute}>Talla: {item.size}</Text>
                    <Text style={styles.attribute}>Color: {item.color}</Text>
                  </View>
                  
                  <View style={styles.priceContainer}>
                    {item.originalPrice && (
                      <Text style={styles.originalPrice}>
                        ${item.originalPrice.toFixed(2)}
                      </Text>
                    )}
                    <Text style={styles.currentPrice}>${item.price.toFixed(2)}</Text>
                  </View>
                  
                  {!item.inStock && (
                    <Text style={styles.outOfStock}>Agotado</Text>
                  )}
                </View>
                
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Icon name="remove" size={16} color={item.quantity <= 1 ? "#D1D5DB" : "#4C1D95"} />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Icon name="add" size={16} color="#4C1D95" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Código promocional */}
          <View style={styles.promoSection}>
            <Text style={styles.sectionTitle}>Código Promocional</Text>
            <View style={styles.promoInputContainer}>
              <TextInput
                style={styles.promoInput}
                placeholder="Ingresa tu código"
                value={promoCode}
                onChangeText={setPromoCode}
              />
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Resumen */}
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Descuento</Text>
                <Text style={[styles.summaryValue, styles.discountText]}>
                  -${discount.toFixed(2)}
                </Text>
              </View>
            )}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Envío</Text>
              <Text style={styles.summaryValue}>
                {shipping > 0 ? `$${shipping.toFixed(2)}` : 'Gratis'}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Botón de checkout */}
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity 
            style={[
              styles.checkoutButton,
              cartItems.some(item => !item.inStock) && styles.disabledButton
            ]}
            disabled={cartItems.some(item => !item.inStock)}
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EAECEF',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  itemCount: {
    fontSize: 14,
    color: '#718096',
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
    color: '#2D3748',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 22,
  },
  continueShoppingButton: {
    backgroundColor: '#4C1D95',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  continueShoppingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  itemsContainer: {
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
  },
  itemAttributes: {
    flexDirection: 'row',
    marginTop: 5,
  },
  attribute: {
    fontSize: 14,
    color: '#718096',
    marginRight: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C1D95',
  },
  outOfStock: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    height: 40,
    alignSelf: 'flex-start',
    minWidth: 100,
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  promoSection: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
  },
  promoInputContainer: {
    flexDirection: 'row',
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#4C1D95',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  summarySection: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 12,
    marginBottom: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#718096',
  },
  summaryValue: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
  },
  discountText: {
    color: '#10B981',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAECEF',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C1D95',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#EAECEF',
  },
  checkoutButton: {
    backgroundColor: '#4C1D95',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});