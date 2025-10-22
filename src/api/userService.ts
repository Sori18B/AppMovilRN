import httpClient from './http';
import * as Keychain from 'react-native-keychain';
import { UserData } from '../types/userResponse.interface';
import { UserRequest } from '../types/userRequest.interface';
import { Address } from '../types/address.Response.interface';
import { AddressRequest } from '../types/address.Request.interface';

// Obtener solo dirección
const getAddresData = async (userID: string): Promise<Address[]> => {
  try {
    // CAMBIOS: "users" (plural) y se añade el /${userId}
    const response = await httpClient.get<UserData>(`/users/getUser/${userID}`);
    return response.data.address;
  } catch (error) {
    console.error("Error en el servicio para obtener dirección:", error);
    throw error;
  }
};

// Obtener datos del usuario completo
const getUserData = async (userID: string): Promise<UserData> => {
  try {
    // CAMBIOS: "users" (plural) y se añade el /${userId}
    const response = await httpClient.get<UserData>(`/users/getUser/${userID}`);
    return response.data;
  } catch (error) {
    console.error("Error en el servicio para obtener usuario:", error);
    throw error;
  }
};

// Actualizar datos del usuario
const updateUserData = async (
  userID: string,
  data: Partial<UserRequest>
): Promise<UserData> => {
  try {
    const response = await httpClient.put(`/users/profile/${userID}`, data);
    return response.data as UserData;
  } catch (error) {
    console.error("Error en el servicio de actualización de usuario:", error);
    throw error;
  }
};

const updateAddressData = async (
  userId: string,
  addressId: string,
  data: Partial<AddressRequest>
): Promise<Address> => {
  try {
    // CAMBIO: "address" en lugar de "profile"
    const response = await httpClient.put(`/users/address/${userId}/${addressId}`, data);
    return response.data as Address;
  } catch (error) {
    console.error("Error en el servicio de actualización de dirección:", error);
    throw error;
  }
};

export const createAddress = async (
  addressData: AddressRequest
): Promise<Address> => {
  try {
    // CAMBIO: Se quitó la / del final
    const response = await httpClient.post('/users/address', addressData);
    
    return response.data as Address;
    
  } catch (error) {
    console.error("Error en el servicio al crear la dirección:", error);
    throw error;
  }
};


export { getUserData, updateUserData, getAddresData, updateAddressData };

