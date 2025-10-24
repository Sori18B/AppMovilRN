import httpClient from './http';
import * as Keychain from 'react-native-keychain';
import { handleApiError, logApiError } from '../utils';

// Interfaces
import { RegisterRequest } from '../types/registerRequest.interface';
import { LoginRequest } from '../types/loginRequest.interface';
import { RegisterResponse } from '../types/registerResponse.interface';
import { LoginResponse } from '../types/loginResponse.interface';

// Registra un nuevo usuario
const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    // Validación de datos antes de enviar
    if (!data.email || !data.password || !data.name || !data.lastName) {
      throw new Error('Todos los campos obligatorios deben estar completos');
    }

    if (data.password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    const response = await httpClient.post<RegisterResponse>('/users', data);

    if (!response.data) {
      throw new Error('El servidor no devolvió datos de registro');
    }

    console.log('Usuario registrado exitosamente');
    return response.data;
  } catch (error) {
    logApiError('REGISTRO DE USUARIO', error, { email: data.email });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

// Inicia sesión de un usuario
const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    // Validación de datos
    if (!data.email || !data.password) {
      throw new Error('Email y contraseña son requeridos');
    }

    const response = await httpClient.post<LoginResponse>('/auth/login', data);

    // Validar que recibimos un token
    if (!response.data?.access_token) {
      throw new Error('El servidor no devolvió un token de acceso válido');
    }

    // Guardar token en Keychain
    try {
      await Keychain.setGenericPassword(
        'userToken',
        response.data.access_token
      );
      console.log('Token guardado en Keychain');
    } catch (keychainError) {
      console.error('Error crítico al guardar token:', keychainError);
      throw new Error('No se pudo guardar la sesión de forma segura');
    }

    console.log('Inicio de sesión exitoso');
    return response.data;
  } catch (error) {
    logApiError('LOGIN', error, { email: data.email });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

//Función para cerrar sesión
const logout = async (): Promise<void> => {
  try {
    const hasCredentials = await Keychain.getGenericPassword();
    
    if (!hasCredentials) {
      console.log('No hay sesión activa para cerrar');
      return;
    }

    await Keychain.resetGenericPassword();
    console.log('Sesión cerrada exitosamente');
  } catch (error) {
    logApiError('LOGOUT', error);
    throw new Error('No se pudo cerrar la sesión. Intenta de nuevo.');
  }
};

//Función para verificar si hay una sesión activa
const isLoggedIn = async (): Promise<boolean> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return !!credentials && !!credentials.password;
  } catch (error) {
    console.error('Error al verificar sesión:', error);
    return false;
  }
};

//Función para obtener el token almacenado
const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Error al obtener token:', error);
    return null;
  }
};

export { register, login, logout, isLoggedIn, getToken };
