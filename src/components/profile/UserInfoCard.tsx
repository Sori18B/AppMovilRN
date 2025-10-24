import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, shadows } from '../../theme';

interface InfoRow {
  label: string;
  value: string;
}

interface UserInfoCardProps {
  title?: string;
  iconName?: string;
  data: InfoRow[];
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({ 
  title = 'Información Personal',
  iconName = 'person',
  data 
}) => {
  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Icon name={iconName} size={20} color={colors.primary} />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        {data.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.row,
              index === data.length - 1 && styles.lastRow
            ]}
          >
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    ...shadows.medium,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  value: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
});
