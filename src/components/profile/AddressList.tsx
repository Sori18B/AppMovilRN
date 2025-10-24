import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AddressCard, AddressData } from './AddressCard';
import { colors } from '../../theme';

interface AddressListProps {
  addresses: AddressData[];
  onEdit?: (address: AddressData) => void;
  onDelete?: (addressId: string | number) => void;
  onAddNew?: () => void;
  title?: string;
  showAddButton?: boolean;
}

export const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onEdit,
  onDelete,
  onAddNew,
  title = 'Direcciones',
  showAddButton = true,
}) => {
  if (addresses.length === 0 && !showAddButton) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showAddButton && onAddNew && (
          <TouchableOpacity style={styles.addButton} onPress={onAddNew}>
            <Icon name="add" size={20} color={colors.primary} />
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        )}
      </View>

      {addresses.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {addresses.map((address) => (
            <AddressCard
              key={address.addressID}
              address={address}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Icon name="location-off" size={48} color={colors.gray300} />
          <Text style={styles.emptyText}>No tienes direcciones guardadas</Text>
          {onAddNew && (
            <TouchableOpacity style={styles.emptyAddButton} onPress={onAddNew}>
              <Text style={styles.emptyAddButtonText}>Agregar primera dirección</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    gap: 4,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
    marginBottom: 20,
  },
  emptyAddButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyAddButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
