import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Prueba Icono:</Text>
      <Icon name="home" size={50} color="blue" />
      <Icon name="home" size={50} color="purple" />  
    </View>
  );
}
