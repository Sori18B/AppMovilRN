// src/components/checkout/CheckoutAddressSelector.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AddressCardSimple, AddressData } from '../profile/AddressCardSimple';
import { colors, spacing, shadows, borderRadius } from '../../theme';

// Re-exportamos el tipo para compatibilidad, aunque podríamos importarlo de /types
export type { AddressData };

interface CheckoutAddressSelectorProps {
  title: string;
  iconName: string;
  selectedAddress?: AddressData; // Acepta ambos tipos
  onOpenModal: () => void;
}

export const CheckoutAddressSelector: React.FC<CheckoutAddressSelectorProps> = ({
  title,
  iconName,
  selectedAddress,
  onOpenModal,
}) => {
  
  // Mapeo para normalizar el tipo de Address de la API al de AddressData
  const displayAddress: AddressData | undefined = selectedAddress 
    ? {
        ...selectedAddress,
        addressID: (selectedAddress as any).id || (selectedAddress as any).addressID, // Maneja 'id' o 'addressID'
        isDefault: (selectedAddress as any).isShippingDefault || (selectedAddress as any).isBillingDefault,
    } 
    : undefined;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Icon name={iconName} size={22} color={colors.primary} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onOpenModal}>
          <Text style={styles.changeButton}>Cambiar</Text>
        </TouchableOpacity>
      </View>

      {displayAddress ? (
        <AddressCardSimple address={displayAddress} />
      ) : (
        <Text style={styles.noAddressText}>No hay una dirección seleccionada.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12, // 12px
    padding: spacing.lg, // 16px
    ...shadows.medium,
    marginBottom: spacing.xl, // 20px
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md, // 12px
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: spacing.sm, // 8px
  },
  changeButton: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  noAddressText: {
    fontSize: 16,
    color: colors.textSecondary,
    padding: spacing.lg, // 16px
    textAlign: 'center',
  },
});