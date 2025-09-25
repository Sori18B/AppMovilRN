import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { updateAddressData } from '../api/userService';
import { AddressRequest } from '../types/address.Request.interface';

interface Props {
  route: { params: { userId: string; addressId: string } };
  navigation: any;
}

export default function UpdateAddressScreen({ route, navigation }: Props) {
  const { userId, addressId } = route.params;

  const [formData, setFormData] = useState<Partial<AddressRequest>>({});
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Opcional: podrías cargar la dirección inicial si la pasas desde Profile
  useEffect(() => {
    // Aquí podrías setear formData con la dirección existente
  }, []);

  const handleUpdate = async () => {
    if (!userId || !addressId) return;
    setIsUpdating(true);
    try {
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

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Dirección</Text>

      <TextInput
        style={styles.input}
        placeholder="Calle"
        value={formData.street}
        onChangeText={(text) => setFormData({ ...formData, street: text })}
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
        placeholder="País"
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
