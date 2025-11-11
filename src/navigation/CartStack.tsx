import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import { StripeProvider } from '@stripe/stripe-react-native';
import { PUBLISHABLE_KEY } from '@env';

export type CartStackParamList = {
    Cart: undefined;
    Checkout: undefined;
};

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartStack() {
    return (
        <StripeProvider
            publishableKey={PUBLISHABLE_KEY}
        >
            <Stack.Navigator>
                <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{ headerShown: false, }}
                />
                <Stack.Screen
                    name="Checkout"
                    component={CheckoutScreen}
                    options={{ title: 'Detalles de compra' }}
                />
            </Stack.Navigator>
        </StripeProvider>
    );
}