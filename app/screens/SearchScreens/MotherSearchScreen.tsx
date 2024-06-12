import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainSearchScreen from './MainSearchScreen';
const MotherSearchScreen = ({navigation} : {navigation: any}) => {
  return (
    <SafeAreaProvider>
        <MainSearchScreen navigation={navigation} />
    </SafeAreaProvider>
  )
}

export default MotherSearchScreen;