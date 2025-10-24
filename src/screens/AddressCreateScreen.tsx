import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../navigation/ProfileStack";
import { createAddress } from '../api/userService';
import { AddressRequest } from '../types/address.Request.interface';

// Tipos del Stack
type CreateAddressScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "createAddress"
>;

// Enum opcional para AddressType
enum AddressType {
  BILLING = "BILLING",
  SHIPPING = "SHIPPING",
}

// Estado inicial
const INITIAL_FORM_DATA: AddressRequest = {
    firstName: '',
    lastName: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    postalCode: '',
    countryCode: '',
    isBillingDefault: false,
    isShippingDefault: false,
    addressType: AddressType.BILLING, 
};

export default function CreateAddressScreen({ navigation }: CreateAddressScreenProps) {
  const [formData, setFormData] = useState<AddressRequest>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof AddressRequest, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    if (!formData.street || !formData.city || !formData.postalCode) {
        Alert.alert("Error", "Por favor, completa los campos obligatorios.");
        return;
    }

    setIsSubmitting(true);
    try {
      await createAddress(formData); 
      Alert.alert("Éxito", "Nueva dirección creada correctamente ");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo guardar la nueva dirección.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Añadir Nueva Dirección</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={formData.firstName}
        onChangeText={(text) => handleChange('firstName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={formData.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Calle y Número"
        value={formData.street}
        onChangeText={(text) => handleChange('street', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Colonia / Barrio (Opcional)"
        value={formData.neighborhood}
        onChangeText={(text) => handleChange('neighborhood', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={formData.city}
        onChangeText={(text) => handleChange('city', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={formData.state}
        onChangeText={(text) => handleChange('state', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Código Postal"
        value={formData.postalCode}
        onChangeText={(text) => handleChange('postalCode', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Código de País (Ej. MX)"
        value={formData.countryCode}
        onChangeText={(text) => handleChange('countryCode', text)}
      />



      <Button
        title={isSubmitting ? "Creando..." : "Crear Dirección"}
        onPress={handleCreate}
        disabled={isSubmitting}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
});
