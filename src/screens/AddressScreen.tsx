// /src/screens/ProfileInformationScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { getUserData } from '../api/authService';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../navigation/ProfileStack"; 

// Define el tipo de la pantalla
type ProfileInformationScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "Addresses"
>;

// Interfaz del usuario
interface User {
    //varibales de direccion agregar como en perfil de usuario 
}

export default function  AddressScreen({ navigation }: ProfileInformationScreenProps) {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
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
  }, []);

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
    //cambiar por varibales de direccion 
    <View style={styles.container}>
      <Text style={styles.title}>Información Personal</Text>
        
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Direcciones</Text>
        <Text style={styles.infoText}>Nombre: {userData?.name}</Text>
        <Text style={styles.infoText}>Apellido: {userData?.lastName}</Text>
        <Text style={styles.infoText}>Correo: {userData?.email}</Text>
        <Text style={styles.infoText}>Teléfono: {userData?.phoneNumber}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("UpdateAddress")}
      >
        <Text style={styles.editButtonText}>Editar direcciones</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#111827",
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
});































/*


export default function AddressScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Noteworthy technology acquisitions 2021
        </Text>
        <Text style={styles.cardDescription}>
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Read more</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F3F4F6", // gris claro
  },
  card: {
    maxWidth: 400, // equivalente a max-w-sm
    width: "100%",
    padding: 24, // p-6
    backgroundColor: "#FFFFFF", // bg-white
    borderWidth: 1,
    borderColor: "#E5E7EB", // border-gray-200
    borderRadius: 12, // rounded-lg
    shadowColor: "#000",
    shadowOpacity: 0.05, // shadow-sm
    shadowRadius: 4,
    elevation: 2,
    alignSelf: "center", // centrar como max-w-sm
  },
  cardTitle: {
    marginBottom: 8, // mb-2
    fontSize: 22, // text-2xl
    fontWeight: "bold", // font-bold
    color: "#111827", // text-gray-900
    letterSpacing: -0.5, // tracking-tight
  },
  cardDescription: {
    marginBottom: 12, // mb-3
    fontSize: 14, // font-normal
    color: "#374151", // text-gray-700
  },
  button: {
    flexDirection: "row", // inline-flex + items-center
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8, // py-2
    paddingHorizontal: 12, // px-3
    backgroundColor: "#1D4ED8", // bg-blue-700
    borderRadius: 8, // rounded-lg
  },
  buttonText: {
    fontSize: 14, // text-sm
    fontWeight: "600", // font-medium
    color: "#FFFFFF", // text-white
  },
});*/
