import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { getUserData, updateUserData } from '../api/userService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/ProfileStack'; // Importa tu tipo de Stack

// --- 1. DEFINE EL TIPO DE LOS PROPS ---
type UpdateUserScreenProps = NativeStackScreenProps<ProfileStackParamList, 'UpdateUser'>;

// --- 2. ELIMINAMOS TU 'interface UserData' LOCAL ---
//    El estado solo guardará lo que nos interesa: la URL de la imagen.
type FormState = {
  imageURL?: string;
};

export default function UpdateUserScreen({ navigation, route }: UpdateUserScreenProps) { // <-- 3. AÑADE 'route'
  
  // --- 4. OBTÉN EL 'userId' DE LA RUTA ---
  // (Tu ProfileStack lo pasa como 'userId' con 'd' minúscula)
  const { userId } = route.params;

  const [formData, setFormData] = useState<FormState>({}); // <-- 5. USA EL NUEVO TIPO
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      // 6. Valida que el 'userId' exista
      if (!userId) {
        Alert.alert("Error", "No se recibió un ID de usuario.");
        setLoading(false);
        return;
      }

      try {
        // 7. Llama a la API con el 'userId' correcto
        const response: any = await getUserData(userId); // Recibimos como 'any'
        
        // 8. Asumimos que la URL de la foto está en 'response.data.profilePicUrl'
        // (¡Ajusta 'profilePicUrl' si se llama diferente en tu API!)
        if (response.data?.profilePicUrl) {
          setFormData({ imageURL: response.data.profilePicUrl });
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        Alert.alert("Error", "No se pudo cargar la información del usuario.");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUserData();
  }, [userId]); // <-- 9. AÑADE 'userId' A LAS DEPENDENCIAS

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 0.7 },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Error al seleccionar imagen');
          return;
        }
        const uri = response.assets?.[0].uri;
        if (uri) setFormData({ imageURL: uri }); // Solo guardamos la URL
      }
    );
  };

  const handleUpdate = async () => {
    // 10. Valida contra 'userId' (de la ruta) y 'formData.imageUrl' (del estado)
    if (!userId || !formData.imageURL) {
      Alert.alert("Error", "No hay imagen para actualizar o no se encontró al usuario.");
      return;
    }

    setIsUpdating(true);
    try {
      // 11. Envía el 'userId' y el objeto solo con la imagen
      const updatedResponse: any = await updateUserData(userId, { imageUrl: formData.imageURL });
      
      // 12. Actualiza el estado con la nueva URL (si la API la devuelve)
      if (updatedResponse.data?.imageUrl) {
        setFormData({ imageURL: updatedResponse.data.imageUrl });
      }
      ;
      Alert.alert("Éxito", "Tu foto ha sido actualizada.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "No se pudo actualizar la foto.");
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
;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualizar Foto</Text>
      
      {formData.imageURL ? (
        <Image source={{ uri: formData.imageURL }} style={styles.imagePreview} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text>No hay foto</Text>
        </View>
      )}

      <Button title="Seleccionar Imagen" onPress={selectImage} />

      <View style={{ marginTop: 20 }}>
        <Button
          title={isUpdating ? "Actualizando..." : "Guardar Cambios"}
          onPress={handleUpdate}
          disabled={isUpdating}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  imagePreview: { width: 150, height: 150, borderRadius: 75, marginBottom: 10 },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});