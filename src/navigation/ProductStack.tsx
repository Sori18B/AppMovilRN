import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { ProductResponse } from '../types/product.response.interface';

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetail: { product: ProductResponse };
};

const Stack = createNativeStackNavigator<ProductStackParamList>();

export default function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Products' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
}