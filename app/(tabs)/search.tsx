import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SummerData from '@/app/data/Collection Data/SummerSpecialData'; // Correct the path if needed

const search = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ItemDetailScreen', { item })}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(response => {
        setData(response);
      });
  }, []);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        ref={searchRef}
        placeholder="Search items here"
        style={styles.searchInput}
        value={search}
        onChangeText={text => setSearch(text)}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: 'contain'
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTitle: {
    fontSize: 16,
    color: '#555',
  },
  itemDescription: {
    fontSize: 14,
    color: '#777',
  },
  itemPrice: {
    fontSize: 14,
    color: '#999',
    marginVertical:9
  },
  searchInput: {
    height: 40,
    marginHorizontal: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default search;
