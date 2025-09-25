
import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


import { ProfileStackParamList } from "../navigation/ProfileStack";

type Props = NativeStackScreenProps<ProfileStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const menuItems = [
    { label: "Información Personal", route: "ProfileInformation" },
    { label: "Direcciones", route: "Addresses" },
    { label: "Mis compras", route: "Orders" },
    { label: "Mis favoritos", route: "Favorites" },
    { label: "Acerca de", route: "About" },
    { label: "Aviso de privacidad", route: "Privacy" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Eros</Text>
      <View style={styles.divider} />

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.route as never)}
          style={styles.menuItem}
        >
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  logo: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginTop: 10 },
  greeting: { fontSize: 16, marginTop: 10 },
  divider: { height: 1, backgroundColor: "#000", marginVertical: 20 },
  menuItem: { paddingVertical: 12 },
  menuText: { fontSize: 18, fontWeight: "500" },
});

