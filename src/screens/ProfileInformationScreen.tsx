import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { ProfileStackParamList } from "../navigation/ProfileStack"; 
import { getUserData } from '../api/userService';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userID } = route.params;

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

  if (loading) {
    return <LoadingSpinner message="Cargando información..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => navigation.goBack()} />;
  }

  // Preparar datos para UserInfoCard
  const userInfo = [
    { label: 'Nombre', value: userData?.name || 'N/A' },
    { label: 'Apellido', value: userData?.lastName || 'N/A' },
    { label: 'Correo', value: userData?.email || 'N/A' },
    { label: 'Teléfono', value: userData?.phoneNumber || 'N/A' },
  ];

  // Mock de órdenes recientes (reemplazar con datos reales)
  const recentOrders: OrderData[] = [
    {
      orderId: 'ORD-2024-001',
      date: '15 Ene 2024',
      total: 1250.00,
      status: 'Entregado',
    },
    {
      orderId: 'ORD-2024-002',
      date: '10 Ene 2024',
      total: 890.00,
      status: 'En camino',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header con foto de perfil */}
      <ProfileHeader
        name={`${userData?.name} ${userData?.lastName}`}
        email={userData?.email}
        imageUrl={userData?.profilePicUrl}
        onEditPress={() => navigation.navigate('UpdateUser', { userId: String(userData.userID) })}
      />

      {/* Información Personal */}
      <UserInfoCard
        title="Información Personal"
        iconName="person"
        data={userInfo}
      />

      {/* Botón Editar Información */}
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

      {/* Órdenes Recientes */}
      <View style={styles.section}>
        <OrderListSimple
          orders={recentOrders}
          onOrderPress={(orderId) => console.log('Ver orden:', orderId)}
          onViewAll={() => console.log('Ver todas las órdenes')}
        />
      </View>
    </ScrollView>
  );
};

// --- ESTILOS MODIFICADOS ---
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