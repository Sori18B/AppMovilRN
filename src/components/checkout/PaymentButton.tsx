// src/components/checkout/PaymentButton.tsx
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button } from '../common/Button';
import { colors, spacing, shadows } from '../../theme';

interface PaymentButtonProps {
  total: number;
  onPress: () => void;
  loading: boolean;
  disabled: boolean;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  total,
  onPress,
  loading,
  disabled,
}) => {
  return (
    <View style={styles.container}>
      <Button
        title={loading ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
        onPress={onPress}
        loading={loading}
        disabled={disabled || loading}
        variant="primary"
        size="large"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg, // 16px
    paddingTop: spacing.md, // 12px
    paddingBottom: Platform.OS === 'ios' ? spacing.xxxl : spacing.lg, // 32px o 16px
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.large,
  },
  button: {
    width: '100%',
  },
});