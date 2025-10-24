import httpClient from './http';
import * as Keychain from 'react-native-keychain';
import { ProductRequest} from '../types/productequest.interface';
import { ProductResponse } from '../types/product.response.interface';
import { CategoryResponse } from '../types/product.response.interface';
import { GenderResponse } from '../types/product.response.interface';








//obtenemos productos acttivos
const getProductdata = async (): Promise<ProductResponse> => {
    try {
      const response = await httpClient.get<ProductResponse>('/products');
      return response.data;
    } catch (error) {
      console.error("Error para obtener los productos:", error);
      throw error;
    }
};

//funcion para obtener un producto especifico por id
const getProductId = async (productID : string): Promise<ProductResponse> =>{
  try {
    // CAMBIOS: "users" (plural) y se añade el /${userId}
    const response = await httpClient.get<ProductResponse>(`/products/${productID}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
}
//obtenemos todas las categorias
const getCategories = async (): Promise<CategoryResponse> =>{
  try {
  
    const response = await httpClient.get<CategoryResponse>(`/products/categories/all`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
    throw error;
  }
}

//obtener categoria especifica de un producto 

const getCategoryId = async (categoryID:string): Promise<CategoryResponse> =>{
  try {
    
    const response = await httpClient.get<CategoryResponse>(`/products/categories/${categoryID}`)
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos filtrados:", error);
    throw error;
  }

}

//obtener productos por categoria 

const getProductoCategori = async (categoryID:string): Promise<CategoryResponse> =>{
  try {
    
    const response = await httpClient.get<CategoryResponse>(`/products/by-category/${categoryID}`)
    return response.data
  } catch (error) {
    console.error("Error al obtener los productos filtrados por catgeoria:", error);
    throw error;
  }

}

//obtener productos por genero

const getGender= async (genderID:string): Promise<GenderResponse> =>{
  try {
    
    const response = await httpClient.get<GenderResponse>(`/products/by-gender/${genderID}`)
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos por genero", error);
    throw error;
  }

}

//obtener todos los generos con contador 

const getGenderall= async (): Promise<GenderResponse> =>{
  try {
    
    const response = await httpClient.get<GenderResponse>(`/products/genders/all`)
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos filtrados por catgeoria:", error);
    throw error;
  }

}



export{getProductoCategori, getCategoryId,getCategories,getProductId,getProductdata,getGender,getGenderall};