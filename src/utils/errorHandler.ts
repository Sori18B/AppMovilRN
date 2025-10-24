import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  statusCode?: number;
  code?: string;
  details?: any;
}

/**
 * Procesa errores de Axios y los convierte en mensajes legibles para el usuario
 */
export const handleApiError = (error: unknown): ApiError => {
  // Si es un error de Axios
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const responseData = error.response?.data;

    // Errores de red
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return {
        message: 'La petición tardó demasiado. Verifica tu conexión a internet.',
        statusCode: 0,
        code: 'TIMEOUT',
      };
    }

    if (error.code === 'ERR_NETWORK' || !error.response) {
      return {
        message: 'No se pudo conectar al servidor. Verifica tu conexión a internet.',
        statusCode: 0,
        code: 'NETWORK_ERROR',
      };
    }

    // Errores HTTP específicos
    switch (status) {
      case 400:
        return {
          message: responseData?.message || 'Los datos enviados son inválidos.',
          statusCode: 400,
          code: 'BAD_REQUEST',
          details: responseData?.errors || responseData?.details,
        };

      case 401:
        return {
          message: 'No estás autenticado. Por favor, inicia sesión nuevamente.',
          statusCode: 401,
          code: 'UNAUTHORIZED',
        };

      case 403:
        return {
          message: 'No tienes permisos para realizar esta acción.',
          statusCode: 403,
          code: 'FORBIDDEN',
        };

      case 404:
        return {
          message: responseData?.message || 'El recurso solicitado no fue encontrado.',
          statusCode: 404,
          code: 'NOT_FOUND',
        };

      case 409:
        return {
          message: responseData?.message || 'Ya existe un registro con estos datos.',
          statusCode: 409,
          code: 'CONFLICT',
        };

      case 422:
        return {
          message: 'Los datos enviados no son válidos.',
          statusCode: 422,
          code: 'VALIDATION_ERROR',
          details: responseData?.errors || responseData?.details,
        };

      case 429:
        return {
          message: 'Demasiadas peticiones. Intenta de nuevo en unos minutos.',
          statusCode: 429,
          code: 'TOO_MANY_REQUESTS',
        };

      case 500:
        return {
          message: 'Error interno del servidor. Intenta de nuevo más tarde.',
          statusCode: 500,
          code: 'INTERNAL_SERVER_ERROR',
        };

      case 502:
      case 503:
      case 504:
        return {
          message: 'El servidor no está disponible temporalmente. Intenta más tarde.',
          statusCode: status,
          code: 'SERVICE_UNAVAILABLE',
        };

      default:
        return {
          message: responseData?.message || 'Ocurrió un error inesperado.',
          statusCode: status,
          code: 'UNKNOWN_ERROR',
        };
    }
  }

  // Error genérico de JavaScript
  if (error instanceof Error) {
    return {
      message: error.message || 'Ocurrió un error inesperado.',
      code: 'JS_ERROR',
    };
  }

  // Error desconocido
  return {
    message: 'Ocurrió un error desconocido.',
    code: 'UNKNOWN',
  };
};

/**
 * Formatea los detalles de error de validación
 */
export const formatValidationErrors = (details: any): string => {
  if (!details) return '';

  if (Array.isArray(details)) {
    return details.map(err => `• ${err.message || err}`).join('\n');
  }

  if (typeof details === 'object') {
    return Object.entries(details)
      .map(([field, messages]) => {
        if (Array.isArray(messages)) {
          return `• ${field}: ${messages.join(', ')}`;
        }
        return `• ${field}: ${messages}`;
      })
      .join('\n');
  }

  return String(details);
};

/**
 * Logs estructurados para debugging
 */
export const logApiError = (context: string, error: unknown, additionalInfo?: any) => {
  const apiError = handleApiError(error);
  
  console.error(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.error(`🔴 ERROR EN: ${context}`);
  console.error(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.error(`Mensaje: ${apiError.message}`);
  console.error(`Código: ${apiError.code || 'N/A'}`);
  console.error(`Status: ${apiError.statusCode || 'N/A'}`);
  
  if (apiError.details) {
    console.error(`Detalles:`, apiError.details);
  }
  
  if (additionalInfo) {
    console.error(`Info adicional:`, additionalInfo);
  }
  
  if (error instanceof AxiosError) {
    console.error(`URL: ${error.config?.url}`);
    console.error(`Método: ${error.config?.method?.toUpperCase()}`);
  }
  
  console.error(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
};
