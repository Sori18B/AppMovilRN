// src/components/checkout/AddressSelectionModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Address } from '../../types/address.Response.interface';
import { AddressModalItem } from './index';
import { colors, spacing } from '../../theme';

interface AddressSelectionModalProps {
  visible: boolean;
  title: string;
  addresses: Address[];
  onClose: () => void;
  onSelect: (address: Address) => void;
}

export const AddressSelectionModal: React.FC<AddressSelectionModalProps> = ({
  visible,
  title,
  addresses,
  onClose,
  onSelect,
}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={28} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={addresses}
          keyExtractor={item => String(item.addressID)} // Asumiendo 'id' de la API
          renderItem={({ item }) => (
            <AddressModalItem address={item} onPress={() => onSelect(item)} />
          )}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fondo suave
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg, // 16px
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  closeButton: {
    padding: spacing.xs, // 4px
  },
  list: {
    padding: spacing.md, // 12px
  },
});