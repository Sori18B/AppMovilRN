import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { updateAddressData } from '../api/userService';
import { AddressRequest } from '../types/address.Request.interface';

// --- 1. IMPORTA LOS TIPOS NECESARIOS ---
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/ProfileStack'; // (Asegúrate de que esta ruta sea correcta)

// --- 2. ELIMINA TU 'interface Props' ANTIGUA ---
// interface Props {
//   route: { params: { userId: string; addressId: string } };
//   navigation: any;
// }

// --- 3. DEFINE EL TIPO DE PROPS CORRECTO ---
type UpdateAddressProps = NativeStackScreenProps<
  ProfileStackParamList,
  'UpdateAddress'
>;

// --- 4. USA EL NUEVO TIPO EN LA FUNCIÓN ---
export default function UpdateAddressScreen({ route, navigation }: UpdateAddressProps) {
  
  // (El resto de tu código ya es compatible con este tipo,
  // porque 'route.params' contendrá 'userId', 'addressId' y 'addressData'
  // gracias a la definición en 'ProfileStackParamList')
  
  const { userId, addressId, addressData } = route.params;

  const [formData, setFormData] = useState<Partial<AddressRequest>>(addressData || {});
  const [isUpdating, setIsUpdating] = useState(false);
  const handleUpdate = async () => {
    if (!userId || !addressId) return;
    setIsUpdating(true);
    try {
      // (Tu lógica de 'update' está perfecta)
      const updatedAddress = await updateAddressData(userId, addressId, formData);
      Alert.alert("Éxito", "Dirección actualizada");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo actualizar la dirección");
    } finally {
      setIsUpdating(false);
    }
  };

  // 6. Ya no necesitas este 'return' de 'loading'
  // if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Dirección</Text>

      {/* ¡LISTO! Estos campos ahora se rellenarán automáticamente
        porque 'formData' se inicializó con 'addressData'
      */}

      <TextInput
        style={styles.input}
        placeholder="Calle"
        value={formData.street}
        onChangeText={(text) => setFormData({ ...formData, street: text })}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={formData.city}
        onChangeText={(text) => setFormData({ ...formData, city: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={formData.state}
        onChangeText={(text) => setFormData({ ...formData, state: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Código Postal"
        value={formData.postalCode}
        onChangeText={(text) => setFormData({ ...formData, postalCode: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="País (ej. MX)"
        value={formData.countryCode}
        onChangeText={(text) => setFormData({ ...formData, countryCode: text })}
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
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});