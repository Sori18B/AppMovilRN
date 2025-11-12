import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import type { RootStackParamList } from './AppNavigator';

// Screens
import HomeStack from './HomeStack';
import ProductStack from './ProductStack';
import CartStack from './CartStack';
import ProfileStack from './ProfileStack';

// Define los parámetros de este Tab Navigator
type MainTabsParamList = {
  HomeTab: undefined;
  Products: undefined;
  CartTab: undefined;
  ProfileTab: undefined;
};

// Define los props de este componente
type MainTabsProps = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

const Tab = createBottomTabNavigator<MainTabsParamList>();

// Componentes de íconos extraídos para evitar re-renders
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="home" size={size} color={color} />
);

const ProductsIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="storefront" size={size} color={color} />
);

const CartIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="shopping-cart" size={size} color={color} />
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="face" size={size} color={color} />
);

// Componente de header con logo
const HeaderLogo = () => (
  <Image
    source={require('./../assets/images/logoIcon.png')}
    style={styles.headerLogo}
  />
);

export default function MainTabs({ route }: MainTabsProps) {
  const { userId } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={({ route }) => {
          // Obtiene el nombre de la ruta activa dentro del HomeStack
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
          const isDetailScreen = routeName === 'ProductDetail';
          return {
            tabBarLabel: 'Home',
            tabBarIcon: HomeIcon,
            headerTitle: HeaderLogo,
            headerTitleAlign: 'center',
            headerShown: !isDetailScreen,
          };
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductStack}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ProductsIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CartTab"
        options={{
          tabBarLabel: 'Cart',
          headerShown: false,
          tabBarIcon: CartIcon,
        }}
      >
        {() => <CartStack userID={userId}/>}
      </Tab.Screen>
      <Tab.Screen
        name="ProfileTab"
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ProfileIcon,
        }}
      >
        {() => <ProfileStack userID={userId} />}
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
  headerLogo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
});
