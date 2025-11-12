// src/components/checkout/AddressModalItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Address } from '../../types/address.Response.interface';
import { colors, spacing, shadows, borderRadius } from '../../theme';

interface AddressModalItemProps {
  address: Address;
  onPress: () => void;
}

export const AddressModalItem: React.FC<AddressModalItemProps> = ({ address, onPress }) => {
  const isDefault = address.isShippingDefault || address.isBillingDefault;

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.7}>
      <Icon name="location-on" size={24} color={colors.primary} style={styles.icon} />
      <View style={styles.content}>
        <Text style={styles.name}>
          {address.firstName} {address.lastName}
        </Text>
        <Text style={styles.addressLine}>
          {address.street}, {address.city}
        </Text>
        <Text style={styles.addressLine}>
          {address.state}, {address.postalCode}, {address.countryCode}
        </Text>
      </View>
      {isDefault && (
        <View style={styles.defaultBadge}>
          <Text style={styles.defaultText}>Default</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12, // 12px
    padding: spacing.lg, // 16px
    marginBottom: spacing.md, // 12px
    ...shadows.small,
  },
  icon: {
    marginRight: spacing.md, // 12px
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  addressLine: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.round,
    marginLeft: spacing.sm,
  },
  defaultText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
});