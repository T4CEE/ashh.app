// import { View, Text, useWindowDimensions, StyleSheet,Image } from 'react-native'
// import React from 'react'

// export default function SlideItem({ item }) {
//   const { width } = useWindowDimensions()
//   return (
//     <View style={[styles.container, { width }]}>
//       <Image source={item.img} style={[styles.image, { width }]}/>
//       <View style={{flex: 0.3}}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.description}>{item.description}</Text>
//          </View>
//     </View >
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//    justifyContent:'center',
//     alignItems: 'center',
//   },
//   image: {
//     flex: 0.6,
//     resizeMode: 'center'
//   },
//   content: {
//     flex: 0.4,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   description: {
//     fontSize: 18,
//     marginVertical: 12,
//     color: '#333',
//   },
//   price: {
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
// });








import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  useColorScheme
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('screen');

const SlideItem = ({item}) => {
  const theme = useColorScheme()
  const translateYImage = new Animated.Value(5);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={item.img}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.title}</Text>
        <Text style={[styles.description, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.description}</Text>
        <Text style={[styles.price, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.price}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height:430,
    alignItems: 'center',
  },
  image: {
    flex: 0.5,
    width: '90%',
  },
  content: {
    flex: 0.5,
    alignItems: 'center',
    paddingHorizontal:40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
