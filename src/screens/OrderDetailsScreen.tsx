import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// ⚠️ Asegúrate de que este import apunte a tu archivo ProfileStack correcto
import { ProfileStackParamList } from "../navigation/ProfileStack"; 
import { getOrderDetails } from '../api/orderService';
import { colors, shadows } from '../theme'; 
import { Button, ErrorMessage } from '../components/common'; 

// ⚠️ Nota que aquí usamos "OrderDetails" (Plural) para coincidir con tu Stack
type Props = NativeStackScreenProps<ProfileStackParamList, "OrderDetails">;

export default function OrderDetailsScreen({ route, navigation }: Props) {
  const { orderID } = route.params; 
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDetails();
  }, [orderID]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      // Asegúrate que el ID sea string
      const data = await getOrderDetails(String(orderID));
      setOrder(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No pudimos cargar los detalles.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10 }}>Cargando detalles...</Text>
      </View>
    );
  }

  if (error || !order) {
    return <ErrorMessage message={error || "Orden no encontrada"} onRetry={fetchDetails} />;
  }

  // Helpers visuales
  const formatDate = (isoString: string) => isoString ? isoString.split('T')[0] : "N/A";
  
  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes('delivered') || s.includes('entregado')) return colors.success;
    if (s.includes('shipped') || s.includes('camino')) return colors.primary;
    if (s.includes('cancel')) return colors.error;
    return colors.warning; 
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Cabecera */}
      <View style={styles.headerCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.orderIdTitle}>Orden #{order.orderID}</Text>
          <View style={[styles.badge, { backgroundColor: getStatusColor(order.orderStatus) + '20' }]}>
            <Text style={[styles.badgeText, { color: getStatusColor(order.orderStatus) }]}>
              {order.orderStatus || "Procesando"}
            </Text>
          </View>
        </View>
        <Text style={styles.dateText}>Fecha: {formatDate(order.orderDate || order.createdAt)}</Text>
      </View>

      {/* Items */}
      <Text style={styles.sectionTitle}>Productos</Text>
      <View style={styles.card}>
        {order.items && order.items.length > 0 ? (
          order.items.map((item: any, index: number) => (
            <View key={index} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.productName || "Producto"}</Text>
                <Text style={styles.itemQty}>Cant: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>
                ${(Number(item.price || 0) * (item.quantity || 1)).toFixed(2)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No hay detalles de productos.</Text>
        )}
      </View>

      {/* Dirección */}
      <Text style={styles.sectionTitle}>Dirección de Envío</Text>
      <View style={styles.card}>
        {order.shippingAddress ? (
          <>
            <Text style={styles.addressText}>{order.shippingAddress.street}</Text>
            <Text style={styles.addressText}>
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </Text>
            <Text style={styles.addressText}>{order.shippingAddress.postalCode}</Text>
          </>
        ) : (
          <Text style={styles.emptyText}>Sin dirección registrada.</Text>
        )}
      </View>

      {/* Totales */}
      <View style={styles.totalContainer}>
        <View style={styles.rowBetween}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.grandTotalValue}>${Number(order.totalAmount).toFixed(2)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 20, ...shadows.small },
  headerCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 24, borderLeftWidth: 5, borderLeftColor: colors.primary },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 12 },
  orderIdTitle: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary },
  dateText: { color: colors.textSecondary, marginTop: 4 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  itemName: { fontSize: 16, color: colors.textPrimary, fontWeight: '500' },
  itemQty: { fontSize: 14, color: colors.textSecondary },
  itemPrice: { fontSize: 16, fontWeight: 'bold' },
  addressText: { fontSize: 15, color: colors.textSecondary, marginBottom: 4 },
  emptyText: { fontStyle: 'italic', color: colors.textSecondary },
  totalContainer: { backgroundColor: 'white', padding: 16, borderRadius: 12 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  totalLabel: { fontSize: 16, color: colors.textSecondary },
  grandTotalValue: { fontSize: 20, fontWeight: 'bold', color: colors.primary },
});