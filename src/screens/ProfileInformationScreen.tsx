import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ScrollView,Image } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { ProfileStackParamList } from "../navigation/ProfileStack"; 
import { UserData } from '../types/userResponse.interface';
import { getUserData } from '../api/userService';


type ProfileInformationScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "ProfileInformation"
>;

export default function ProfileInformationScreen({ navigation, route }: ProfileInformationScreenProps) {
  // --- CAMBIO 1: El estado guardará 'any' para ser más flexibles con la API
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userID } = route.params; // Esto está bien, coincide con tu ProfileStack

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        
        if (userID) {
          try {
            setLoading(true);
            
            // responseData es el objeto completo: { success: true, data: {...} }
            const responseData : any =await getUserData(userID); 
            
            // (Tu console.log para ver el JSON va aquí)
            
            // --- CAMBIO 2: ¡Guarda solo el objeto 'data' interno! ---
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
      <Text style={styles.title}>Perfil</Text>
  
      {/* --- INICIO: SECCIÓN DE FOTO DE PERFIL --- */}
      <View style={styles.profileHeader}>
        <Image
          style={styles.profilePicture}
          // Cambia esto por la URL real de la foto de tu usuario
          // Ejemplo: { uri: userData?.profilePicUrl }
           // <-- Puse un placeholder
        />
        <Text style={styles.userName}>{userData?.name} {userData?.lastName}</Text>
        <TouchableOpacity 
          style={styles.changePhotoButton}
          // Navega a la pantalla de 'UpdateUser' (como la tienes en tu Stack)
          onPress={() => navigation.navigate('UpdateUser', { userId: String(userData.userID) })}
        >
          <Text style={styles.changePhotoButtonText}>Cambiar foto</Text>
        </TouchableOpacity>
      </View>
      {/* --- FIN: SECCIÓN DE FOTO DE PERFIL --- */}

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Nombre: {userData?.name}</Text>
        <Text style={styles.infoText}>Apellido: {userData?.lastName}</Text>
        <Text style={styles.infoText}>Correo: {userData?.email}</Text>
        <Text style={styles.infoText}>Teléfono: {userData?.phoneNumber}</Text>
      </View>
  
      {/* Sección de Direcciones */}
      {userData?.addresses?.length > 0 && (
        <View style={styles.addressSection}>
          <Text style={styles.subtitle}>Direcciones</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            
            {userData?.addresses.map((addr: any) => (
              <View key={addr.addressID} style={styles.card}>
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
                    if (userData?.userID && addr.addressID) {
                        navigation.navigate("UpdateAddress", {
                          userId: String(userData.userID), 
                          addressId: String(addr.addressID),
                          addressData: addr
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
          </ScrollView>

          {/* --- INICIO: BOTÓN DE AÑADIR DIRECCIÓN (MOVIDO) --- */}
          {/* Lo movimos fuera del ScrollView horizontal */}
          <TouchableOpacity 
            style={styles.addAddressButton}
            onPress={() => navigation.navigate('createAddress')}
          >
            <Text style={styles.addAddressButtonText}>+ Añadir Nueva Dirección</Text>
          </TouchableOpacity>
          {/* --- FIN: BOTÓN DE AÑADIR DIRECCIÓN --- */}

        </View>
      )}

      {/* --- INICIO: BOTÓN DE CERRAR SESIÓN --- */}
      <TouchableOpacity 
        style={styles.logoutButton}
        
      >
        <Text style={styles.logoutButtonText}>Salir de la aplicación</Text>
      </TouchableOpacity>
      {/* --- FIN: BOTÓN DE CERRAR SESIÓN --- */}

    </ScrollView>
  );
  
};

// --- TUS ESTILOS MODIFICADOS ---
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // 'flexGrow' es mejor que 'flex' para ScrollView
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  
  // --- ESTILOS AÑADIDOS PARA LA FOTO DE PERFIL ---
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20, // Espacio antes de la info card
    marginTop: 10,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60, // Círculo perfecto
    borderWidth: 3,
    borderColor: '#4F46E5',
    marginBottom: 10,
    backgroundColor: '#E0E0E0', // Color de fondo por si la imagen no carga
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  changePhotoButton: {
    backgroundColor: '#E5E7EB', // Color gris claro
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  changePhotoButtonText: {
    color: '#1F2937',
    fontWeight: '600',
  },
  // ------------------------------------------------

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
  card: {
    backgroundColor: "#FFFFFF", // Fondo blanco para la tarjeta
    padding: 16,
    borderRadius: 8,
    marginRight: 15, // Espacio entre tarjetas
    width: 300, // Ancho fijo para las tarjetas
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  editButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonprofile: {
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
  addressSection:{
    marginBottom: 30, // Espacio después de la sección de dirección
  },
  horizontalScroll:{
    paddingBottom: 10, // Deja espacio para la sombra de la tarjeta
  },
  
  // --- ESTILOS PARA EL NUEVO BOTÓN "AÑADIR DIRECCIÓN" ---
  addAddressButton: {
    backgroundColor: '#E5E7EB', // Color gris claro
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  addAddressButtonText: {
    backgroundColor: '#E5E7EB', // Color gris claro
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  
  // --- ESTILOS PARA EL NUEVO BOTÓN "LOGOUT" ---
  logoutButton: {
    backgroundColor: '#EF4444', // Rojo para "Salir"
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40, // Espacio al final del scroll
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Estilos de Carga y Error
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

  // (Borré los estilos vacíos 'addCard' y 'addCardText')
});