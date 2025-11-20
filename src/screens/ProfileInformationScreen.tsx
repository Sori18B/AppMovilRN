import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { ProfileStackParamList } from "../navigation/ProfileStack"; 
import { getUserData } from '../api/userService';
import { getorders } from '../api/orderService';


import { 
  ProfileHeader, 
  UserInfoCard, 
  AddressListSimple, 
  OrderListSimple, 
  OrderData 
} from '../components/profile';
import { LoadingSpinner, ErrorMessage, Button } from '../components/common';
import { colors } from '../theme';

type ProfileInformationScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "ProfileInformation"
>;

export default function ProfileInformationScreen({ navigation, route }: ProfileInformationScreenProps) {
  const [userData, setUserData] = useState<any | null>(null);

  // 👇 NUEVO estado para órdenes
  const [orders, setOrders] = useState<OrderData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userID } = route.params;

  // ===========================
  //   1️⃣ Obtener datos usuario
  // ===========================
  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        if (userID) {
          try {
            setLoading(true);
            const responseData: any = await getUserData(userID);
            setUserData(responseData.data);
            setError(null);
          } catch (err) {
            console.error("Error al obtener los datos del usuario:", err);
            setError("No se pudieron cargar los datos.");
            Alert.alert("Error", "No se pudo obtener la información de tu perfil.");
          } finally {
            setLoading(false);
          }
        } else {
          console.error("Error: No se recibió un userId para cargar el perfil.");
          setError("No se pudo cargar el perfil (ID no encontrado).");
          setLoading(false);
        }
      };
      fetchUserData();
    }, [userID])
  );

  // ===========================
  //   2️⃣ Obtener órdenes
  // ===========================
  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        try {
          const ordersFromApi = await getorders();

          // Si viene vacío, paramos
          if (!ordersFromApi || ordersFromApi.length === 0) {
            setOrders([]);
            return;
          }

          const formatStatus = (status: string): OrderData["status"] => {
             // Convertimos a minúsculas para asegurar coincidencia
             const s = status ? status.toLowerCase() : "";
             if (s === 'delivered' || s === 'entregado') return "Entregado";
             if (s === 'shipped' || s === 'en camino') return "En camino";
             if (s === 'cancelled' || s === 'cancelado') return "Cancelado";
             return "Procesando"; // Default
          };

          // MAPEO EXACTO SEGÚN TU LOG JSON
          const formattedOrders = ordersFromApi.map((order: any): OrderData => ({
            // Tu log dice "orderID" (número), lo convertimos a string
            orderId: String(order.orderID), 
            
            // Tu log dice "orderDate", NO "createdAt"
            date: order.orderDate ? order.orderDate.split('T')[0] : "N/A", 
            
            // Tu log dice "totalAmount"
            total: Number(order.totalAmount),
            
            // Tu log dice "orderStatus"
            status: formatStatus(order.orderStatus)
          }));

          setOrders(formattedOrders);
        } catch (err) {
          console.error("Error al procesar órdenes:", err);
        }
      };
      fetchOrders();
    }, [])
  );
  

  if (loading) {
    return <LoadingSpinner message="Cargando información..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => navigation.goBack()} />;
  }

  // Datos del UserInfoCard
  const userInfo = [
    { label: 'Nombre', value: userData?.name || 'N/A' },
    { label: 'Apellido', value: userData?.lastName || 'N/A' },
    { label: 'Correo', value: userData?.email || 'N/A' },
    { label: 'Teléfono', value: userData?.phoneNumber || 'N/A' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ProfileHeader
        name={`${userData?.name} ${userData?.lastName}`}
        email={userData?.email}
        imageUrl={userData?.profilePicUrl}
        onEditPress={() => navigation.navigate('UpdateUser', { userId: String(userData.userID) })}
      />

      <UserInfoCard
        title="Información Personal"
        iconName="person"
        data={userInfo}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Editar Información"
          onPress={() => navigation.navigate('UpdateUser', { userId: String(userData.userID) })}
          variant="primary"
          size="large"
        />
      </View>

      {/* Direcciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Direcciones</Text>
        <AddressListSimple
          addresses={userData?.addresses || []}
          onEdit={(address) => {
            if (userData?.userID && address.addressID) {
              navigation.navigate("UpdateAddress", {
                userId: String(userData.userID),
                addressId: String(address.addressID),
                addressData: address
              });
            }
          }}
          onAddNew={() => navigation.navigate('createAddress')}
        />
      </View>

      {/* Órdenes (ya reales) */}
      <View style={styles.section}>
        <OrderListSimple
          orders={orders}
          onOrderPress={(orderID) => {
            console.log("Navegando al detalle:", orderID);
            navigation.navigate('OrderDetails', { orderID: orderID });
          }}
          
          onViewAll={() => console.log('Ver todas las órdenes')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
});
