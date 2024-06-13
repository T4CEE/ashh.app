import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Nav from '../screens/Nav';
import Slider from '@/components/Slider';
import FlexColScreen from '../screens/FlexColScreen';
import FlexColScreen2 from '../screens/FlexColScreen2';
import Footer from '../screens/Footer';

export default function MotherScreen({ navigation }: { navigation: any }) {
  const Stack = createStackNavigator();
  return (

    <SafeAreaProvider >
      <Nav navigation={navigation} />
      <ScrollView>
        <HomeScreen navigation={navigation} />
        <Slider />
        <FlexColScreen navigation={navigation} />
        <FlexColScreen2 navigation={navigation} />
        <Footer navigation={navigation} />
      </ScrollView>
    </SafeAreaProvider>
  )
}