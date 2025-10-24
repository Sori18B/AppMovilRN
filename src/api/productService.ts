import httpClient from './http';
import { handleApiError, logApiError } from '../utils';
import { ProductResponse } from '../types/product.response.interface';
import { CategoryResponse } from '../types/product.response.interface';
import { GenderResponse } from '../types/product.response.interface';

//obtenemos productos activos
const getProductdata = async (): Promise<ProductResponse> => {
  try {
    const response = await httpClient.get<ProductResponse>('/products');

    if (!response.data) {
      throw new Error('No se recibieron productos del servidor');
    }

    console.log('Productos obtenidos exitosamente');
    return response.data;
  } catch (error) {
    logApiError('OBTENER PRODUCTOS', error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

//Obtiene un producto específico por ID
const getProductId = async (productID: string): Promise<ProductResponse> => {
  try {
    if (!productID) {
      throw new Error('El ID del producto es requerido');
    }

    const response = await httpClient.get<ProductResponse>(`/products/${productID}`);

    if (!response.data) {
      throw new Error('Producto no encontrado');
    }

    console.log(`Producto ${productID} obtenido exitosamente`);
    return response.data;
  } catch (error) {
    logApiError('OBTENER PRODUCTO', error, { productID });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

//Obtiene todas las categorías disponibles con contador de productos
const getCategories = async (): Promise<CategoryResponse> => {
  try {
    const response = await httpClient.get<CategoryResponse>('/products/categories/all');

    if (!response.data) {
      throw new Error('No se recibieron categorías del servidor');
    }

    console.log('Categorías obtenidas exitosamente');
    return response.data;
  } catch (error) {
    logApiError('OBTENER CATEGORÍAS', error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

//Obtiene una categoría específica por ID
const getCategoryId = async (categoryID: string): Promise<CategoryResponse> => {
  try {
    if (!categoryID) {
      throw new Error('El ID de categoría es requerido');
    }

    const response = await httpClient.get<CategoryResponse>(
      `/products/categories/${categoryID}`
    );

    if (!response.data) {
      throw new Error('Categoría no encontrada');
    }

    console.log(`Categoría ${categoryID} obtenida exitosamente`);
    return response.data;
  } catch (error) {
    logApiError('OBTENER CATEGORÍA', error, { categoryID });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

//Obtiene productos filtrados por categoría
const getProductoCategori = async (categoryID: string): Promise<CategoryResponse> => {
  try {
    if (!categoryID) {
      throw new Error('El ID de categoría es requerido');
    }

    const response = await httpClient.get<CategoryResponse>(
      `/products/by-category/${categoryID}`
    );

    if (!response.data) {
      throw new Error('No se encontraron productos para esta categoría');
    }

    console.log(`Productos de categoría ${categoryID} obtenidos exitosamente`);
    return response.data;
  } catch (error) {
    logApiError('OBTENER PRODUCTOS POR CATEGORÍA', error, { categoryID });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

/// Obtiene productos filtrados por género
const getGender = async (genderID: string): Promise<GenderResponse> => {
  try {
    if (!genderID) {
      throw new Error('El ID de género es requerido');
    }

    const response = await httpClient.get<GenderResponse>(
      `/products/by-gender/${genderID}`
    );

    if (!response.data) {
      throw new Error('No se encontraron productos para este género');
    }

    console.log(`Productos de género ${genderID} obtenidos exitosamente`);
    return response.data;
  } catch (error) {
    logApiError('OBTENER PRODUCTOS POR GÉNERO', error, { genderID });
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

//Obtiene todos los géneros disponibles
const getGenderall = async (): Promise<GenderResponse> => {
  try {
    const response = await httpClient.get<GenderResponse>('/products/genders/all');

    if (!response.data) {
      throw new Error('No se recibieron géneros del servidor');
    }

    console.log('Géneros obtenidos exitosamente');
    return response.data;
  } catch (error) {
    logApiError('OBTENER GÉNEROS', error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

export {
  getProductdata,
  getProductId,
  getCategories,
  getCategoryId,
  getProductoCategori,
  getGender,
  getGenderall
};