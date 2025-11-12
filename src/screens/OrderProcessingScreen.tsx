import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, // Importamos TouchableOpacity en lugar de Button
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing } from '../theme';


export default function OrderProcessingScreen({ navigation }: any) {

  const goToOrders = () => {
    navigation.navigate('ProfileTab'); 
  };

  const goToHome = () => {
    navigation.navigate('HomeTab');
  };

  return (
    // Usamos backgroundLight para el fondo de la pantalla, como en el original
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundLight} />
      <View style={styles.container}>
        {/* Usamos el color 'success' de la guía de estilo */}
        <Icon name="check-circle-outline" size={80} color={colors.success} />
        
        {/* Usamos 'h3' y 'textPrimary' para el título */}
        <Text style={styles.title}>¡Pago Recibido!</Text>
        
        {/* Usamos 'h4' y 'textSecondary' para el subtítulo */}
        <Text style={styles.subtitle}>
          Tu orden está siendo procesada.
        </Text>
        
        {/* Usamos 'body' y 'textSecondary' para el mensaje */}
        <Text style={styles.message}>
          En unos momentos, estará confirmada y aparecerá en tu historial de "Mis Órdenes".
        </Text>

        <View style={styles.buttonContainer}>
          {/* Botón Primario: Reemplazamos <Button> con <TouchableOpacity> */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={goToOrders}
            accessibilityRole="button"
            accessibilityLabel="Ver Mis Órdenes"
          >
            <Text style={styles.primaryButtonText}>Ver Mis Órdenes</Text>
          </TouchableOpacity>
          
          <View style={styles.spacer} />

          {/* Botón Secundario: Reemplazamos <Button> con <TouchableOpacity> */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={goToHome}
            accessibilityRole="button"
            accessibilityLabel="Seguir Comprando"
          >
            <Text style={styles.secondaryButtonText}>Seguir Comprando</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Los estilos ahora usan las variables del tema
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundLight, // De la guía
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl, // De la guía (screenPadding: 20px)
    backgroundColor: colors.backgroundLight, // De la guía
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary, // De la guía
    textAlign: 'center',
    marginTop: spacing.xl, // De la guía
    marginBottom: spacing.md, // De la guía
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textSecondary, // De la guía
    textAlign: 'center',
    marginBottom: spacing.xl, // De la guía
  },
  message: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary, // De la guía
    textAlign: 'center',
    marginBottom: spacing.xxxl, // De la guía (usamos 32px en lugar de 40)
  },
  buttonContainer: {
    width: '100%', // Cambiado de 80% para usar el padding del contenedor
  },
  spacer: {
    height: spacing.lg, // De la guía (16px, cercano a 15)
  },
  // --- Nuevos Estilos de Botón (Basados en la Guía) ---
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg, // 16px (en el rango 12-16px)
    paddingHorizontal: spacing.xl,
    borderRadius: 8, // 8px
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.backgroundLight, // color: white
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: spacing.lg, // 16px
    paddingHorizontal: spacing.xl,
    borderRadius: 8, // 8px
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});