import { Animated, FlatList, View, Text, useColorScheme,  StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import Slides from '../app/data/index'
import SlideItem from './SlideItem';
import Pagination from './Pagination';

const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const theme = useColorScheme()

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View >
      <View style={{ padding: 15, }}>
        <Text style={[styles.BasketballText, { color: theme === 'dark' ? 'white' : 'black' }]}>Best BasketBall Kicks</Text>
      </View>
      <FlatList
        data={Slides}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  CollectionText: {
    fontWeight: 'bold', fontSize: 30,
  },
  BasketballText: {
    fontWeight: 'bold', fontSize: 20,
  },
  DescriptionCollectionText: {
    fontWeight: 'condensed', fontSize: 14, marginTop: 2, tintColor: "gray"
  }
});

export default Slider;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
