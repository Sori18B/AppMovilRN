import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { API_URL } from '@env';

// Configuración del cliente HTTP
const httpClient = axios.create({
  baseURL: 'https://ecommerce-api-produccion.onrender.com',
  timeout: 15000, // 15 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// INTERCEPTOR DE PETICIONES
// ==========================================
httpClient.interceptors.request.use(
  async (config) => {
    try {
      // Obtener token del Keychain
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.password) {
        config.headers.Authorization = `Bearer ${credentials.password}`;
      }

      // Log de peticiones en desarrollo
      if (__DEV__) {
        console.log(`${config.method?.toUpperCase()} ${config.url}`);
        if (config.data) {
          console.log('Body:', JSON.stringify(config.data, null, 2));
        }
      }
    } catch (error) {
      console.warn('No se pudo obtener el token del Keychain');
      // Continuar sin token - la API decidirá si es necesario
    }
    return config;
  },
  (error) => {
    console.error('Error en interceptor de petición:', error);
    return Promise.reject(error);
  }
);

// ==========================================
// INTERCEPTOR DE RESPUESTAS
// ==========================================
httpClient.interceptors.response.use(
  (response) => {
    // Log de respuestas exitosas en desarrollo
    if (__DEV__) {
      console.log(`${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Log estructurado de errores
    if (__DEV__) {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('ERROR EN PETICIÓN HTTP');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error(`URL: ${error.config?.url}`);
      console.error(`Método: ${error.config?.method?.toUpperCase()}`);
      console.error(`Status: ${error.response?.status || 'Sin respuesta'}`);
      console.error(`Mensaje: ${error.message}`);
      
      if (error.response?.data) {
        console.error('Data:', JSON.stringify(error.response.data, null, 2));
      }
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }

    // Manejo especial de errores 401 (no autorizado)
    if (error.response?.status === 401) {
      // mejorarlo xd
      console.warn('Sesión expirada o no autorizada');
    }

    return Promise.reject(error);
  }
);

export default httpClient;