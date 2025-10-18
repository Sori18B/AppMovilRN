import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { ProfileStackParamList } from "../navigation/ProfileStack"; 
import { UserData } from '../types/userResponse.interface';
import { getUserData } from '../api/userService';


type ProfileInformationScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "ProfileInformation"
>;

export default function ProfileInformationScreen({ navigation }: ProfileInformationScreenProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Refrescar cada vez que entras a la pantalla

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const data = await getUserData();
          setUserData(data);
        } catch (err) {
          console.error("Error al obtener los datos del usuario:", err);
          setError("No se pudieron cargar los datos.");
          Alert.alert("Error", "No se pudo obtener la información de tu perfil.");
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Cargando información...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Información Personal</Text>
  
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Nombre: {userData?.name}</Text>
        <Text style={styles.infoText}>Apellido: {userData?.lastName}</Text>
        <Text style={styles.infoText}>Correo: {userData?.email}</Text>
        <Text style={styles.infoText}>Teléfono: {userData?.phoneNumber}</Text>
      </View>
  
      {/* Sección de Direcciones */}
      {userData?.address?.length  && (
        <View style={styles.addressSection}>
          <Text style={styles.subtitle}>Direcciones</Text>
          
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            
            {userData?.address.map((addr) => (
              // Usamos View en lugar de TouchableOpacity si no necesitas el efecto de "toque"
              // aunque el botón "Editar" está dentro.
              <View key={addr.id} style={styles.card}>
                <Text style={styles.infoText}>
                  {addr.firstName} {addr.lastName}
                </Text>
                <Text style={styles.infoText}>
                  {addr.street}, {addr.city}
                </Text>
                <Text style={styles.infoText}>
                  {addr.state}, {addr.postalCode}, {addr.countryCode}
                </Text>
    
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    // Usa userData.id en su lugar
                    if (userData?.id && addr.id) {
                        navigation.navigate("UpdateAddress", {
                            userId: userData.id, 
                            addressId: addr.id
                        });
                    } else {
                        Alert.alert("Error", "No se puede editar esta dirección.");
                    }
                }}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Opcional: Agregar un Card de "Agregar Nueva Dirección" */}
            <TouchableOpacity style={styles.addCard}>
              <Text style={styles.addCardText}>+</Text>
              <Text style={styles.addCardText}>Añadir Dirección</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      )}

    </ScrollView>
  );
  
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  // --- ESTILOS AGREGADOS PARA LA FOTO DE PERFIL ---
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4F46E5',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  // ------------------------------------------------
  card: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#111827",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1F2937",
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#374151",
  },
  editButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#374151",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  addressSection:{
    flex: 1,

  },
  addCardText:{

  },
  addCard:{

  },
horizontalScroll:{

},
  
  
});
