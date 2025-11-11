import http from './http';
import {
  CreatePaymentIntentPayload,
  PaymentIntentApiResponse,
} from '../types/stripe.interface';
import { handleApiError, logApiError } from '../utils';

/**
 * Para crear un Stripe Payment Intent.
 * Esto se usa en la app móvil para inicializar el flujo de pago.
 *
 * @param payload Los IDs de dirección y notas necesarios para crear el intent.
 * @returns La respuesta de la API que contiene el clientSecret.
 */
const createPaymentIntent = async (
  payload: CreatePaymentIntentPayload,
): Promise<PaymentIntentApiResponse> => {
  try {
    const { data } = await http.post<PaymentIntentApiResponse>(
      '/orders/create-payment-intent',
      payload,
    );
    return data;
  } catch (error: any) {
    logApiError('CREAR PAYMENT INTENT', error);
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
};

export const stripeService = {
  createPaymentIntent,
};