import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { createStackNavigator } from '@react-navigation/stack';
import MotherSearchScreen from '../screens/SearchScreens/MotherSearchScreen';
import SearchDetailsScreen from '../screens/SearchScreens/SearchDetailsScreen';

const Drawer = createDrawerNavigator();
export default function search() {
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="MotherSearchScreen" component={MotherSearchScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  );
}