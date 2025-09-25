import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { getUserData, updateUserData } from '../api/authService';

// Define el tipo de dato del usuario
interface UserData {
  id: string;
  imageUrl: string;
}

export default function UpdateUserScreen({ navigation }: any) {
  // El estado inicial es un objeto vacío, no nulo.
  const [formData, setFormData] = useState<Partial<UserData>>({});
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      try {
        const data: UserData = await getUserData();
        setFormData(data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        Alert.alert("Error", "No se pudo cargar la información actual del usuario.");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUserData();
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      if (!formData || !formData.id) {
          Alert.alert("Error", "No se encontraron datos de usuario para actualizar.");
          return;
      }

      // Captura y utiliza la respuesta de la función de servicio
      const updatedData = await updateUserData(formData.id, formData);
      setFormData(updatedData); // Actualiza el estado del formulario con los nuevos datos
      
      Alert.alert("Éxito", "Tus datos han sido actualizados.");
      // No regreses de inmediato, permite que la interfaz muestre los cambios
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "No se pudieron actualizar los datos.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando información...</Text>
      </View>
    );
  }
  
  if (!formData || !Object.keys(formData).length) {
    return (
      <View style={styles.center}>
        <Text>No se encontraron datos de usuario.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualizar Foto</Text>
      
      <TextInput
        style={styles.input}
        value={formData.imageUrl
        }
        onChangeText={(text) => setFormData({ ...formData, imageUrl: text })}
      />
      
      
      <Button
        title={isUpdating ? "Actualizando..." : "Guardar Cambios"}
        onPress={handleUpdate}
        disabled={isUpdating}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});