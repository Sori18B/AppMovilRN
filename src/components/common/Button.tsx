import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, shadows } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  iconName?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  iconName,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  style,
}) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
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

  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={1}
    >
      <Animated.View style={[buttonStyle, { transform: [{ scale: scaleAnim }] }]}>
        {loading ? (
          <ActivityIndicator color={variant === 'primary' ? colors.white : colors.primary} />
        ) : (
          <>
            {iconName && iconPosition === 'left' && (
              <Icon
                name={iconName}
                size={size === 'small' ? 18 : size === 'large' ? 24 : 20}
                color={variant === 'primary' ? colors.white : colors.primary}
                style={styles.iconLeft}
              />
            )}
            <Text style={textStyle}>{title}</Text>
            {iconName && iconPosition === 'right' && (
              <Icon
                name={iconName}
                size={size === 'small' ? 18 : size === 'large' ? 24 : 20}
                color={variant === 'primary' ? colors.white : colors.primary}
                style={styles.iconRight}
              />
            )}
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    ...shadows.small,
  },
  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  // Disabled
  disabled: {
    opacity: 0.5,
  },
  // Text styles
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.primary,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  // Icons
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
