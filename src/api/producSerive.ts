import httpClient from './http';
import * as Keychain from 'react-native-keychain';
import { ProductRequest} from '../types/productequest.interface';
import { ProductResponse } from '../types/product.response.interface';
const getUserData = async (): Promise<ProductResponse> => {
    try {
      const response = await httpClient.get<ProductResponse>('/user/getUser');
      return response.data;
    } catch (error) {
      console.error("Error en el servicio para obtener usuario:", error);
      throw error;
    }
  };
  