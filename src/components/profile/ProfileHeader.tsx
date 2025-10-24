import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, shadows } from '../../theme';

interface ProfileHeaderProps {
  name?: string;
  email?: string;
  imageUrl?: string;
  onEditPress?: () => void;
  showEditButton?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  imageUrl,
  onEditPress,
  showEditButton = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon name="person" size={60} color={colors.gray400} />
          </View>
        )}
        {showEditButton && onEditPress && (
          <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
            <Icon name="camera-alt" size={20} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
      {name && <Text style={styles.name}>{name}</Text>}
      {email && <Text style={styles.email}>{email}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    ...shadows.medium,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
