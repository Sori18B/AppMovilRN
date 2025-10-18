import httpClient from './http';
import * as Keychain from 'react-native-keychain';
import { Product } from '../types/product.response.interface';
import { Productre } from '../types/productre.interface';
const getUserData = async (): Promise<UserData> => {
    try {
      const response = await httpClient.get<UserData>('/user/getUser');
      return response.data;
    } catch (error) {
      console.error("Error en el servicio para obtener usuario:", error);
      throw error;
    }
  };
  