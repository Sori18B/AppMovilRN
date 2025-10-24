import httpClient from './http';
import { handleApiError, logApiError } from '../utils';
import { UserData } from '../types/userResponse.interface';
import { UserRequest } from '../types/userRequest.interface';
import { Address } from '../types/address.Response.interface';
import { AddressRequest } from '../types/address.Request.interface';

//Obtiene las direcciones de un usuario
const getAddresData = async (userID: string): Promise<Address[]> => {
  try {
    if (!userID) {
      throw new Error('El ID de usuario es requerido');
    }

    const response = await httpClient.get<UserData>(`/users/getUser/${userID}`);

    if (!response.data) {
      throw new Error('No se recibieron datos del servidor');
    }

    return response.data.address || [];
  } catch (error) {
    logApiError('OBTENER DIRECCIONES', error, { userID });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

// Obtiene los datos completos de un usuario
const getUserData = async (userID: string): Promise<UserData> => {
  try {
    if (!userID) {
      throw new Error('El ID de usuario es requerido');
    }

    const response = await httpClient.get<UserData>(`/users/getUser/${userID}`);

    if (!response.data) {
      throw new Error('No se recibieron datos del usuario');
    }

    console.log('Datos de usuario obtenidos exitosamente');
    return response.data;
  } catch (error) {
    logApiError('OBTENER USUARIO', error, { userID });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

//Actualiza los datos de un usuario
const updateUserData = async (
  userID: string,
  data: Partial<UserRequest>
): Promise<UserData> => {
  try {
    if (!userID) {
      throw new Error('El ID de usuario es requerido');
    }

    if (!data || Object.keys(data).length === 0) {
      throw new Error('No hay datos para actualizar');
    }

    const response = await httpClient.put(`/users/profile/${userID}`, data);

    if (!response.data) {
      throw new Error('No se recibió confirmación de la actualización');
    }

    console.log('Usuario actualizado exitosamente');
    return response.data as UserData;
  } catch (error) {
    logApiError('ACTUALIZAR USUARIO', error, { userID, data });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

/// Actualiza una dirección específica de un usuario
const updateAddressData = async (
  userId: string,
  addressId: string,
  data: Partial<AddressRequest>
): Promise<Address> => {
  try {
    if (!userId || !addressId) {
      throw new Error('Los IDs de usuario y dirección son requeridos');
    }

    if (!data || Object.keys(data).length === 0) {
      throw new Error('No hay datos de dirección para actualizar');
    }

    const response = await httpClient.put(
      `/users/address/${userId}/${addressId}`,
      data
    );

    if (!response.data) {
      throw new Error('No se recibió confirmación de la actualización');
    }

    console.log('Dirección actualizada exitosamente');
    return response.data as Address;
  } catch (error) {
    logApiError('ACTUALIZAR DIRECCIÓN', error, { userId, addressId, data });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

//Crea una nueva dirección para un usuario
const createAddress = async (
  addressData: AddressRequest
): Promise<Address> => {
  try {
    // Validaciones básicas
    if (!addressData.street || !addressData.city || !addressData.state) {
      throw new Error('Los datos de dirección son incompletos');
    }

    const response = await httpClient.post('/users/address', addressData);

    if (!response.data) {
      throw new Error('No se recibió confirmación de la creación');
    }

    console.log('Dirección creada exitosamente');
    return response.data as Address;
  } catch (error) {
    logApiError('CREAR DIRECCIÓN', error, { addressData });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

//Elimina una dirección específica de un usuario
const deleteAddress = async (
  userId: string,
  addressId: string
): Promise<void> => {
  try {
    if (!userId || !addressId) {
      throw new Error('Los IDs de usuario y dirección son requeridos');
    }

    await httpClient.delete(`/users/address/${userId}/${addressId}`);
    console.log('Dirección eliminada exitosamente');
  } catch (error) {
    logApiError('ELIMINAR DIRECCIÓN', error, { userId, addressId });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

export { 
  getUserData, 
  updateUserData, 
  getAddresData, 
  updateAddressData,
  createAddress,
  deleteAddress
};

