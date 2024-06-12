import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Slides from '@/app/data/index'
import CartData from './CartData'

export default function CartInfo({navigation} : {navigation: any}) {
  return (
    <View style={{paddingVertical:30}}>
      <FlatList
        data={Slides}
        renderItem={({ item }) => <CartData item={item} />}
      />
      
    </View>
  )
}