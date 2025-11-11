import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { stripeService } from '../api/stripeService';

export default function CheckoutScreen () {
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Mock de API para crear Payment Intent
      const payload = {
        shippingAddressID: 3,
        billingAddressID: 3,
      };
      
      const apiResponse = await stripeService.createPaymentIntent(payload);

      if (!apiResponse.success) {
        throw new Error(apiResponse.message);
      }

      const { clientSecret } = apiResponse.data;

      // Inicializar el Payment Sheet de Stripe
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'Vistella',
        paymentIntentClientSecret: clientSecret,
        // customerEphemeralKeySecret: ... (opcional, si lo generas)
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          // Se puede pre-rellenar esto
          name: 'Jane Doe',
        },
      });

      if (initError) {
        Alert.alert('Error', 'No se pudo inicializar el pago.');
        setLoading(false);
        return;
      }

      // Mostrar el Payment Sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        if (presentError.code !== 'Canceled') {
          Alert.alert('Error', 'Pago fallido. Intenta de nuevo.');
          console.error('Error en Payment Sheet:', presentError);
        }
      } else {
        Alert.alert('Éxito', '¡Tu pago se ha completado!');
      }

    } catch (error: any) {
      Alert.alert('Error', error.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      title={loading ? 'Procesando...' : 'Pagar Ahora'}
      onPress={handleCheckout}
      disabled={loading}
    />
  );
};