import { OrdersResponse } from "../types/orderResponse.interface";
import httpClient from "./http";
import { handleApiError, logApiError } from '../utils';
import { DetailsResponse } from "../types/orderDetailsReponse.interface";



export const getorders = async (): Promise<OrdersResponse[]> => {
  try {
    const response = await httpClient.get<any>('/orders');
    

    // Accedemos paso a paso para evitar errores
    const apiBody = response.data; // { success: true, data: {...} }
    
    // Verificamos si existe .data y luego .orders dentro de él
    if (apiBody && apiBody.data && Array.isArray(apiBody.data.orders)) {
        console.log(`✅ Se encontraron ${apiBody.data.orders.length} órdenes.`);
        return apiBody.data.orders;
    }

    console.warn("⚠️ Estructura recibida no compatible:", apiBody);
    return []; 

  } catch (error) {
    logApiError('Obtener mis órdenes', error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

export const getOrderDetails = async (orderID: string): Promise<DetailsResponse> => {
  try {
    const response = await httpClient.get<any>(`/orders/${orderID}`);

    // DIAGNÓSTICO: Para ver qué llega
    console.log(`🔍 DETALLE RAW ${orderID}:`, JSON.stringify(response.data, null, 2));

    const apiBody = response.data;

    // CASO 1: Estructura anidada (Lo más probable según tu backend)
    // response.data -> data -> (objeto del detalle)
    if (apiBody && apiBody.data && apiBody.data.orderID) {
       return apiBody.data;
    }

    // CASO 2: Si llega directo
    if (apiBody && apiBody.orderID) {
       return apiBody;
    }
    
    // Si llegamos aquí, algo anda mal
    throw new Error("La respuesta no tiene el formato de detalle esperado.");

  } catch (error) {
    logApiError(`Obtener detalles de la orden ${orderID}`, error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};
