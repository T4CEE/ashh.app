import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/CartSreen';
import MotherScreen from '../screens/MotherScreen';
import SummerScreen from '../screens/SummerScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="MotherScreen" component={MotherScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SummerScreen" component={SummerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ItemDetailScreen" component={ItemDetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  );
}