import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { colors } from '../../theme';

/**
 * Componente para manejar la lógica y UI del cupón de descuento.
 */
export default function DiscountCoupon() {
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    if (couponCode.trim() === '') {
      Alert.alert('Cupón inválido', 'Por favor, introduce un código.');
      return;
    }
    // Lógica para validar y aplicar el cupón con la API
    console.log('Aplicando cupón:', couponCode);
    Alert.alert(
      'Cupón aplicado',
      `El código "${couponCode}" se ha aplicado correctamente.`,
    );
  };

  return (
    <View style={styles.couponContainer}>
      <Text style={styles.couponTitle}>Cupón de Descuento</Text>
      <View style={styles.couponInputContainer}>
        <TextInput
          style={styles.couponInput}
          placeholder="Introduce tu código"
          placeholderTextColor={colors.gray400}
          value={couponCode}
          onChangeText={setCouponCode}
          autoCapitalize="characters"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.couponButton}
          onPress={handleApplyCoupon}>
          <Text style={styles.couponButtonText}>Aplicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  couponContainer: {
    backgroundColor: colors.white,
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  couponInputContainer: {
    flexDirection: 'row',
    height: 50,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  couponButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  couponButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});