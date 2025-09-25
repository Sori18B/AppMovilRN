import httpClient from './http';
import * as Keychain from 'react-native-keychain';
import { UserData } from '../types/userResponse.interface';
import { UserRequest } from '../types/userRequest.interface';
import { Address } from '../types/address.Response.interface';
import { AddressRequest } from '../types/address.Request.interface';

// Obtener solo dirección
const getAddresData = async (): Promise<Address[]> => {
  try {
    const response = await httpClient.get<UserData>('/user/getUser');
    return response.data.address;
  } catch (error) {
    console.error("Error en el servicio para obtener dirección:", error);
    throw error;
  }
};

// Obtener datos del usuario completo
const getUserData = async (): Promise<UserData> => {
  try {
    const response = await httpClient.get<UserData>('/user/getUser');
    return response.data;
  } catch (error) {
    console.error("Error en el servicio para obtener usuario:", error);
    throw error;
  }
};

// Actualizar datos del usuario
const updateUserData = async (
  userId: string,
  data: Partial<UserRequest>
): Promise<UserData> => {
  try {
    const response = await httpClient.put(`/users/profile/${userId}`, data);
    return response.data as UserData;
  } catch (error) {
    console.error("Error en el servicio de actualización de usuario:", error);
    throw error;
  }
};

// Actualizar dirección del usuario
const updateAddressData = async (
  userId: string,
  addressId: string,
  data: Partial<AddressRequest>
): Promise<Address> => {
  try {
    const response = await httpClient.put(`/users/profile/${userId}/${addressId}`, data);
    return response.data as Address;
  } catch (error) {
    console.error("Error en el servicio de actualización de dirección:", error);
    throw error;
  }
};

export { getUserData, updateUserData, getAddresData, updateAddressData };
