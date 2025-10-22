// En ProfileStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// (Aquí NO va el import de authService)

import ProfileInformationScreen from "../screens/ProfileInformationScreen";
import UpdateUserScreen from "../screens/UpdateUserScreen";
import UpdateAddresScreen from "../screens/UpdateAddrressesScreen";
import AddressCreateScrenn from "../screens/AddressCreateScreen";

// Tu tipo está bien
export type ProfileStackParamList = {    
    ProfileInformation: { userID: string };
    UpdateAddress: { userId: string; addressId: string , addressData: any;};
    UpdateUser:{userId:string};
    createAddress:undefined;
    
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

// --- Aquí está la clave ---
// Acepta 'userId' como un prop
export default function ProfileStack({ userID }: { userID: string }) {
  
  const loggedInUserId = userID; 

  if (!loggedInUserId) {
    return null; 
  }

  return (
    <Stack.Navigator>
      
      <Stack.Screen 
        name="ProfileInformation" 
        component={ProfileInformationScreen} 
        options={{ headerShown: false }}
        // Pasa el ID a la primera pantalla
        initialParams={{ userID: loggedInUserId }} 
      />

      {/* ... Tus otras pantallas ... */}
      <Stack.Screen name="UpdateUser" component={UpdateUserScreen} options={{title:"Editar Foto"}}/>
      <Stack.Screen name="UpdateAddress" component={UpdateAddresScreen} options={{title:"Editar direccion"}}/>
      <Stack.Screen name="createAddress" component={AddressCreateScrenn} options={{title:"Crear Direccion"}}/>
      
    </Stack.Navigator>
  );
}