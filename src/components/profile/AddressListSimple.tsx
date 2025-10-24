import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AddressCardSimple, AddressData } from './AddressCardSimple';
import { colors } from '../../theme';

interface AddressListSimpleProps {
  addresses: AddressData[];
  onEdit?: (address: AddressData) => void;
  onAddNew?: () => void;
}

export const AddressListSimple: React.FC<AddressListSimpleProps> = ({
  addresses,
  onEdit,
  onAddNew,
}) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const firstAddress = addresses.length > 0 ? addresses[0] : null;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {firstAddress && (
        <AddressCardSimple
          address={firstAddress}
          onEdit={onEdit}
        />
      )}
      
      {onAddNew && (
        <TouchableOpacity
          onPress={onAddNew}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <Animated.View style={[styles.addButton, { transform: [{ scale: scaleAnim }] }]}>
            <Icon name="add" size={20} color={colors.primary} />
            <Text style={styles.addButtonText}>Añadir Nueva Dirección</Text>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primaryLight + '40',
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: '600',
  },
});
