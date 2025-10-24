import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme';

interface ProfileMenuItemProps {
  label: string;
  iconName?: string;
  onPress: () => void;
  showChevron?: boolean;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  label,
  iconName,
  onPress,
  showChevron = true,
}) => {
  const [bgColorAnim] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    Animated.timing(bgColorAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(bgColorAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.white, colors.background],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.menuItem, { backgroundColor }]}>
        <View style={styles.leftContent}>
          {iconName && (
            <Icon name={iconName} size={24} color={colors.primary} style={styles.icon} />
          )}
          <Text style={styles.menuText}>{label}</Text>
        </View>
        {showChevron && (
          <Icon name="chevron-right" size={24} color={colors.gray400} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});
