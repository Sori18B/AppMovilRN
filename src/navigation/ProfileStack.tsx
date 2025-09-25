// ProfileStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileInformationScreen from "../screens/ProfileInformationScreen";
import AddressesScreen from "../screens/AddressScreen";
import UpdateUserScreen from "../screens/UpdateUserScreen";
import UpdateAddresScreen from "../screens/UpdateAddrressesScreen";

// ...importa todas las demás pantallas del menú


export type ProfileStackParamList = {
    Profile: undefined;
    ProfileInformation: undefined;
    Addresses: undefined;
    UpdateUser: undefined;
    UpdateAddress: { userId: string; addressId: string }

    // ...el resto de las rutas
  };

  const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileInformation" component={ProfileInformationScreen} />
      <Stack.Screen name="Addresses" component={AddressesScreen} />
      <Stack.Screen name="UpdateUser" component={UpdateUserScreen}/>
      <Stack.Screen name="UpdateAddress" component={UpdateAddresScreen}/>

      {/* Declara el resto de las pantallas del menú aquí */}
    </Stack.Navigator>
  );
}