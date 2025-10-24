import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, shadows } from '../../theme';

export interface AddressData {
  addressID: string | number;
  firstName: string;
  lastName: string;
  street: string;
  neighborhood?: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  address: AddressData;
  onEdit?: (address: AddressData) => void;
  onDelete?: (addressId: string | number) => void;
  showActions?: boolean;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  return (
    <View style={styles.card}>
      {address.isDefault && (
        <View style={styles.defaultBadge}>
          <Text style={styles.defaultText}>Predeterminada</Text>
        </View>
      )}
      
      <Text style={styles.name}>
        {address.firstName} {address.lastName}
      </Text>
      
      <Text style={styles.addressLine}>
        {address.street}
      </Text>
      
      {address.neighborhood && (
        <Text style={styles.addressLine}>
          {address.neighborhood}
        </Text>
      )}
      
      <Text style={styles.addressLine}>
        {address.city}, {address.state}
      </Text>
      
      <Text style={styles.addressLine}>
        CP {address.postalCode}, {address.countryCode}
      </Text>

      {showActions && (
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => onEdit(address)}
            >
              <Icon name="edit" size={18} color={colors.white} />
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>
          )}
          
          {onDelete && (
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => onDelete(address.addressID)}
            >
              <Icon name="delete" size={18} color={colors.white} />
              <Text style={styles.actionText}>Eliminar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 280,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  defaultBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  defaultText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  addressLine: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  actionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
