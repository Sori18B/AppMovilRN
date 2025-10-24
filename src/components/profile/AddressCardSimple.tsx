import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme';

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

interface AddressCardSimpleProps {
  address: AddressData;
  onEdit?: (address: AddressData) => void;
}

export const AddressCardSimple: React.FC<AddressCardSimpleProps> = ({
  address,
  onEdit,
}) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Icon name="location-on" size={24} color={colors.primary} />
        </View>
        
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

        {onEdit && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit(address)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.7}
          >
            <Icon name="edit" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
});
