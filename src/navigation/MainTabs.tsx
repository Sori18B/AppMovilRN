import React from 'react';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs'; // <-- CAMBIO 1
import { StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // <-- CAMBIO 2

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
// (No necesitas importar ProfileInformationScreen o ProfileScreen aquí)
import ProfileStack from './ProfileStack';

// --- CAMBIO 3: Define los parámetros del Stack Principal (de AppNavigator) ---
// (Esto nos sirve para tipar 'route.params' de forma segura)
type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: { userId: string }; // ¡Aquí le decimos que MainTabs recibe un userId!
};

// --- CAMBIO 4: Define los parámetros de ESTE Tab Navigator ---
type MainTabsParamList = {
  Home: undefined;
  Products: undefined;
  Cart: undefined;
  ProfileTab: undefined; // La ruta del tab no necesita params, el stack que contiene sí
};

// --- CAMBIO 5: Define los props de ESTE componente (MainTabs) ---
type MainTabsProps = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;


// --- CAMBIO 6: Pasa el tipo de tus tabs ---
const Tab = createBottomTabNavigator<MainTabsParamList>();

// --- CAMBIO 7: Usa el tipo MainTabsProps en lugar de 'any' ---
export default function MainTabs({ route }: MainTabsProps) {
  const { userId } = route.params; // <-- Ahora esto es 100% seguro y tipado
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1D4ED8',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel
      }}
    >
       <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          // Icono en el header
          headerTitle: () => (
            <Image
              source={require('./../assets/images/logoIcon.png')}
              style={{ width: 120, height: 40, resizeMode: 'contain' }}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductListScreen}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ({ color, size }) => (
            <Icon name="storefront" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      {/* --- ¡AQUÍ ESTÁ LA CORRECCIÓN A TU ERROR! --- */}
      <Tab.Screen
        name="ProfileTab"
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="face" size={size} color={color} />
          ),
        }}
      >
        {/* --- CAMBIO 8: Añade el tipo a 'props' --- */}
        {(props: BottomTabScreenProps<MainTabsParamList, 'ProfileTab'>) => (
          <ProfileStack {...props} userID={userId} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
