import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from './CartReducer';

const ItemDetailScreen = ({ route }) => {
  const theme = useColorScheme()
  const { item } = route.params;
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        {cart.some((value) => value.id === item.id) ? (
          <Pressable style={[styles.button, {borderColor:theme === 'dark' ? 'gray' : 'black'}]} onPress={() => removeItemFromCart(item)}>
            <Text style={styles.buttonTextRemove}>REMOVE FROM CART</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.button, {borderColor:theme === 'dark' ? 'gray' : 'black'}]} onPress={() => addItemToCart(item)}>
            <Text style={styles.buttonTextAdd}>ADD TO CART</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 0, 
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  itemTitle: {
    marginHorizontal: 10,
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#555',
  },
  itemDescription: {
    marginHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },
  itemPrice: {
    fontSize: 40,
    color: '#3944BC',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 9,
    width: 200,
    alignSelf: 'center',
    borderRadius: 6,
  },
  buttonTextAdd: {
    color: '#3944BC',
    textAlign: 'center',
  },
  buttonTextRemove: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ItemDetailScreen;
