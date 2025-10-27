import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32 - 16) / 2;

// Componente reutilizable de Placeholder
const Placeholder = ({ width, height, borderRadius, style }:any) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Crea un bucle de animación que va de opacidad 1 a 0.6 y de vuelta
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        styles.placeholder,
        { width, height, borderRadius: borderRadius || 4 },
        { opacity: pulseAnim },
        style, // Permite estilos adicionales (como márgenes)
      ]}
    />
  );
};

const HomeScreenSkeleton = () => (
  <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    {/* Cabecera */}
    <Placeholder width={180} height={28} />
    <Placeholder width={220} height={20} style={{ marginTop: 8 }} />

    {/* Categorías */}
    <View style={styles.row}>
      <Placeholder width={85} height={40} borderRadius={20} />
      <Placeholder width={85} height={40} borderRadius={20} />
      <Placeholder width={85} height={40} borderRadius={20} />
      <Placeholder width={85} height={40} borderRadius={20} />
    </View>

    {/* Banner */}
    <Placeholder width={width - 32} height={150} borderRadius={8} style={{ marginTop: 24 }} />

    {/* Título "Popular" */}
    <Placeholder width={120} height={24} style={{ marginTop: 24 }} />

    {/* Cuadrícula de Productos */}
    <View style={styles.row}>
      <View>
        <Placeholder width={CARD_WIDTH} height={180} borderRadius={8} />
        <Placeholder width={CARD_WIDTH} height={20} style={{ marginTop: 8 }} />
        <Placeholder width={80} height={18} style={{ marginTop: 6 }} />
      </View>
      <View>
        <Placeholder width={CARD_WIDTH} height={180} borderRadius={8} />
        <Placeholder width={CARD_WIDTH} height={20} style={{ marginTop: 8 }} />
        <Placeholder width={80} height={18} style={{ marginTop: 6 }} />
      </View>
    </View>

    {/* Segunda fila */}
    <View style={styles.row}>
      <View>
        <Placeholder width={CARD_WIDTH} height={180} borderRadius={8} />
        <Placeholder width={CARD_WIDTH} height={20} style={{ marginTop: 8 }} />
        <Placeholder width={80} height={18} style={{ marginTop: 6 }} />
      </View>
      <View>
        <Placeholder width={CARD_WIDTH} height={180} borderRadius={8} />
        <Placeholder width={CARD_WIDTH} height={20} style={{ marginTop: 8 }} />
        <Placeholder width={80} height={18} style={{ marginTop: 6 }} />
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  placeholder: {
    backgroundColor: '#E1E9EE',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});

export default HomeScreenSkeleton;