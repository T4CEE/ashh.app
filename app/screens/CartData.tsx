import React from 'react';
import { View, Text, Pressable, SafeAreaView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addToCart, removeFromCart } from './CartReducer';

export default function CartData({ item }) {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <SafeAreaView>
      <Image style={{ width: 100, height: 100, borderRadius: 8, marginTop: 6 }} source={item.img} />
      <Text>{item.description}</Text>
      {cart.some((value) => value.id === item.id) ? (
        <Pressable onPress={() => removeItemFromCart(item)}>
          <Text
            style={{
              borderColor: 'red',
              borderWidth: 1,
              marginVertical: 10,
              padding: 4,
            }}
          >
            REMOVE FROM CART
          </Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => addItemToCart(item)}>
          <Text
            style={{
              borderColor: 'red',
              borderWidth: 1,
              marginVertical: 10,
              padding: 4,
            }}
          >
            ADD TO CART
          </Text>
        </Pressable>
      )}
     
    </SafeAreaView>
  );
}
