import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISHABLE_KEY } from '@env';
import OrderProcessingScreen from "../screens/OrderProcessingScreen";

export type CartStackParamList = {
    Cart: undefined;
    Checkout: { userID: string };
    OrderProcessing: undefined;
};

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartStack({ userID }: { userID: string }) {
    const loggedInUserId = userID; 
    return (
        <StripeProvider
            publishableKey={STRIPE_PUBLISHABLE_KEY}
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
                    initialParams={{ userID: loggedInUserId }} 
                />
                <Stack.Screen
                    name="OrderProcessing"
                    component={OrderProcessingScreen}
                    options={{
                        title: 'Confirmación',
                        headerBackVisible: false,
                        gestureEnabled: false,
                    }}
                />
            </Stack.Navigator>
        </StripeProvider>
    );
}