import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen'; // <-- Import the new screen

// Define params for this stack
export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetail: { product: any }; // Expects a 'product' object
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