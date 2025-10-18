// ProfileStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileInformationScreen from "../screens/ProfileInformationScreen";

import UpdateUserScreen from "../screens/UpdateUserScreen";
import UpdateAddresScreen from "../screens/UpdateAddrressesScreen";
import AddressCreateScrenn from "../screens/AddressCreateScreen";

// ...importa todas las demás pantallas del menú


export type ProfileStackParamList = {    
    ProfileInformation: undefined;
    UpdateAddress: { userId: string; addressId: string };
    UpdateUser:{userId:string};
    createAddress:undefined;


    // ...el resto de las rutas
  };

  const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileInformation" component={ProfileInformationScreen} />

      <Stack.Screen name="UpdateUser" component={UpdateUserScreen} options={{title:"Editar Foto"}}/>
      <Stack.Screen name="UpdateAddress" component={UpdateAddresScreen} options={{title:"Editar direccion"}}/>
      <Stack.Screen name="createAddress" component={AddressCreateScrenn} options={{title:"Crear Direccion"}}/>

      {/* Declara el resto de las pantallas del menú aquí */}
    </Stack.Navigator>
  );
}