
import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../navigation/ProfileStack";
import { ProfileMenuItem } from "../components/profile";
import { colors } from "../theme";

type Props = NativeStackScreenProps<ProfileStackParamList>;

export default function ProfileScreen({ navigation }: Props) {
  const menuItems = [
    { 
      label: "Información Personal", 
      route: "ProfileInformation",
      iconName: "person"
    },
    { 
      label: "Direcciones", 
      route: "Addresses",
      iconName: "location-on"
    },
    { 
      label: "Mis compras", 
      route: "Orders",
      iconName: "shopping-bag"
    },
    { 
      label: "Mis favoritos", 
      route: "Favorites",
      iconName: "favorite"
    },
    { 
      label: "Acerca de", 
      route: "About",
      iconName: "info"
    },
    { 
      label: "Aviso de privacidad", 
      route: "Privacy",
      iconName: "privacy-tip"
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBadge}>
          <View style={styles.logoText}>
            {/* Logo placeholder - puedes agregar tu logo aquí */}
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <ProfileMenuItem
            key={index}
            label={item.label}
            iconName={item.iconName}
            onPress={() => navigation.navigate(item.route as never)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logoBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    // Aquí puedes agregar tu logo o imagen
  },
  menuContainer: {
    marginTop: 20,
  },
});

