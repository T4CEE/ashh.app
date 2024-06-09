import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, useColorScheme, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from './CartReducer';
import { RootState, CartItem } from './Types';

export default function CartScreen() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [itemInCart, setItemInCart] = useState(false);
  const theme = useColorScheme();

  useEffect(() => {
    setItemInCart(cart.length > 0);
  }, [cart]);

  const increaseQuantity = (item: CartItem) => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = (item: CartItem) => {
    if (item.quantity === 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {!itemInCart ? (
          <Text style={[styles.emptyCartText, { color: theme === 'dark' ? 'white' : 'black' }]}>
            No Item In Cart Yet
          </Text>
        ) : (
          <View>
            <Text style={[styles.headerText, { color: theme === 'dark' ? 'white' : 'black' }]}>Items In Cart</Text>
            {cart.map((item) => (
              <View style={styles.itemContainer} key={item.id}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <Text style={[styles.itemTitle, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.title}</Text>
                <Text style={[styles.itemPrice, { color: theme === 'dark' ? 'white' : 'black' }]}>${item.price}</Text>
                <View style={styles.quantityContainer}>
                  <Pressable onPress={() => decreaseQuantity(item)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </Pressable>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <Pressable onPress={() => increaseQuantity(item)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 0,
    flexGrow: 1,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 300,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 20,
  },
  itemContainer: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 6,
  },
  itemTitle: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#FF3366',
    borderRadius: 5,
    width: 120,
  },
  quantityButton: {
    fontSize: 25,
    color: 'white',
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 10,
  },
});
