// CheckoutScreen.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { stripeService } from '../api/stripeService';
import { getUserData } from '../api/userService';
import { useCart } from '../contexts';
import { UserData } from '../types/userResponse.interface.ts';
import { Address } from '../types/address.Response.interface.ts';
import { Summary } from '../types/cart.Response.interface.ts';

import {
  CheckoutAddressSelector,
  CheckoutSummaryCard,
  PaymentButton,
  AddressSelectionModal,
} from '../components/checkout';
import { colors, spacing } from '../theme';
import { LoadingSpinner } from '../components/common';

// Tipos locales
type AddressModalState = {
  visible: boolean;
  type: 'shipping' | 'billing' | null;
};

export default function CheckoutScreen({ navigation, route }: any) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { userID } = route.params;
  const { cart } = useCart();

  // Estado de la pantalla
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado de los datos
  // Normalizamos las direcciones para incluir `id` (necesario para algunos componentes)
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState<string | number | null>(null);
  const [selectedBillingId, setSelectedBillingId] = useState<string | number | null>(null);

  // Estado del modal
  const [modalState, setModalState] = useState<AddressModalState>({
    visible: false,
    type: null,
  });

  // 1. Cargar datos del usuario (direcciones)
  useEffect(() => {
    let mounted = true;

    const loadUserData = async () => {
      try {
        setDataLoading(true);
        const response: any = await getUserData(userID);
        const userData: UserData = response.data;

        if (!mounted) return;

        if (!userData.addresses || userData.addresses.length === 0) {
          Alert.alert(
            'Sin Dirección',
            'Necesitas agregar una dirección a tu perfil antes de continuar.',
            [{ text: 'OK', onPress: () => navigation.goBack() }],
          );
          return;
        }

        // Normalizar: añadir `id` = addressID para compatibilidad con los componentes
        const normalized: Address[] = userData.addresses.map((a: any) => ({
          ...a,
          id: a.addressID ?? a.id, // aseguro que exista 'id'
        }));

        setAddresses(normalized);

        // 2. Establecer direcciones por defecto (prioridad: isDefault -> tipo específico -> BOTH -> first)
        const defaultShipping =
          normalized.find(a => Boolean(a.isShippingDefault)) ||
          normalized.find(a => (a.addressType ?? '').toUpperCase() === 'SHIPPING') ||
          normalized.find(a => (a.addressType ?? '').toUpperCase() === 'BOTH') ||
          normalized[0];

        const defaultBilling =
          normalized.find(a => Boolean(a.isBillingDefault)) ||
          normalized.find(a => (a.addressType ?? '').toUpperCase() === 'BILLING') ||
          normalized.find(a => (a.addressType ?? '').toUpperCase() === 'BOTH') ||
          normalized[0];

        setSelectedShippingId(defaultShipping?.addressID ?? null);
        setSelectedBillingId(defaultBilling?.addressID ?? null);

      } catch (err: any) {
        setError(err?.message || 'No se pudieron cargar tus datos.');
        Alert.alert('Error', 'No se pudieron cargar tus datos de perfil.');
      } finally {
        if (mounted) setDataLoading(false);
      }
    };

    loadUserData();

    return () => { mounted = false; };
  }, [navigation, userID]);

  // 3. Memoizar datos para los componentes
  const { shippingAddresses, billingAddresses, summary } = useMemo(() => {
    const shipping = addresses.filter(
      a => (a.addressType ?? '').toUpperCase() === 'SHIPPING' || (a.addressType ?? '').toUpperCase() === 'BOTH',
    );
    const billing = addresses.filter(
      a => (a.addressType ?? '').toUpperCase() === 'BILLING' || (a.addressType ?? '').toUpperCase() === 'BOTH',
    );
    const cartSummary = cart?.data?.summary as Summary | undefined;

    return {
      shippingAddresses: shipping.length > 0 ? shipping : addresses,
      billingAddresses: billing.length > 0 ? billing : addresses,
      summary: cartSummary,
    };
  }, [addresses, cart]);

  const selectedShippingAddress = useMemo(
    () => addresses.find(a => (a.addressID) === selectedShippingId),
    [addresses, selectedShippingId],
  );

  const selectedBillingAddress = useMemo(
    () => addresses.find(a => (a.addressID) === selectedBillingId),
    [addresses, selectedBillingId],
  );

  // 4. Lógica de Checkout
  const handleCheckout = async () => {

    setPaymentLoading(true);

    try {
      // 4.1. Crear Payment Intent
      const payload = {
        shippingAddressID: Number(selectedShippingId),
        billingAddressID: Number(selectedBillingId),
      };

      const apiResponse = await stripeService.createPaymentIntent(payload);

      if (!apiResponse.success || !apiResponse.data?.clientSecret) {
        throw new Error(apiResponse.message || 'No se pudo obtener el client secret.');
      }

      const { clientSecret } = apiResponse.data;

      // 4.2. Inicializar el Payment Sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'Vistella',
        paymentIntentClientSecret: clientSecret,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: `${selectedBillingAddress?.firstName ?? ''} ${selectedBillingAddress?.lastName ?? ''}`.trim(),
          // puedes añadir phone/address si lo deseas
        },
      });

      if (initError) {
        Alert.alert('Error', `No se pudo inicializar el pago: ${initError.message}`);
        setPaymentLoading(false);
        return;
      }

      // 4.3. Mostrar el Payment Sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        if (presentError.code !== 'Canceled') {
          Alert.alert('Error', `Pago fallido: ${presentError.message}`);
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [
            { name: 'Cart' },
            { name: 'OrderProcessing' },
          ],
        });
      }

    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Ocurrió un error inesperado.');
    } finally {
      setPaymentLoading(false);
    }
  };

  // 5. Handlers del Modal
  const openModal = (type: 'shipping' | 'billing') => {
    setModalState({ visible: true, type });
  };

  const handleSelectAddress = (address: Address) => {
    // Soportar address.addressID o address.id
    const id = address.addressID ?? (address as any).id;
    if (modalState.type === 'shipping') {
      setSelectedShippingId(id);
    } else if (modalState.type === 'billing') {
      setSelectedBillingId(id);
    }
    setModalState({ visible: false, type: null });
  };

  // 6. Renderizado
  // Sólo mostramos spinner mientras cargan datos o faltan datos críticos (summary)
  if (dataLoading || !summary) {
    return <LoadingSpinner message="Cargando checkout..." />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>

        {/* Selector de Dirección de Envío */}
        <CheckoutAddressSelector
          title="Dirección de Envío"
          iconName="local-shipping"
          selectedAddress={selectedShippingAddress as any}
          onOpenModal={() => openModal('shipping')}
        />

        {/* Selector de Dirección de Facturación */}
        <CheckoutAddressSelector
          title="Dirección de Facturación"
          iconName="receipt-long"
          selectedAddress={selectedBillingAddress as any}
          onOpenModal={() => openModal('billing')}
        />

        {/* Resumen del Pedido */}
        <CheckoutSummaryCard
          subtotal={summary.subtotal}
          shipping={Math.max(0, (summary.estimatedTotal - summary.subtotal) || 0)}
          total={summary.estimatedTotal}
        />
      </ScrollView>

      {/* Botón de Pago Fijo: deshabilitado mientras falte selección o mientras cargue/ejecute pago */}
      <PaymentButton
        total={summary.estimatedTotal}
        onPress={handleCheckout}
        loading={paymentLoading}
        disabled={dataLoading || paymentLoading || !selectedShippingId || !selectedBillingId}
      />

      {/* Modal para seleccionar dirección */}
      <AddressSelectionModal
        visible={modalState.visible}
        title={modalState.type === 'shipping' ? 'Seleccionar Envío' : 'Seleccionar Facturación'}
        addresses={modalState.type === 'shipping' ? shippingAddresses : billingAddresses}
        onClose={() => setModalState({ visible: false, type: null })}
        onSelect={handleSelectAddress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: 140, // espacio para el botón fijo
  },
});
