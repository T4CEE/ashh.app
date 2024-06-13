import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  useColorScheme,
  Pressable,
  Platform,
  StatusBar
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

interface Item {
  id: number;
  title: string;
  price: number;
  image: string;
}

const MainSearchScreen = ({ navigation }: { navigation: any }) => {
  const theme = useColorScheme();

  const [data, setData] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isPickerVisible, setIsPickerVisible] = useState(false); // State for picker visibility
  const searchRef = useRef<TextInput>(null);

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          backgroundColor: theme === 'dark' ? 'black' : 'white',
          borderWidth: 1,
          borderColor: theme === 'dark' ? '#353839' : 'white'
        }
      ]}
      onPress={() => navigation.navigate('ItemDetailScreen', { item })}
    >
      <View style={{ backgroundColor: 'white', paddingVertical: 9, borderRadius: 6 }}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
      <Text style={[styles.itemTitle, { color: theme === 'dark' ? 'white' : 'black' }]}>
        {item.title}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#353839',
          alignItems: 'flex-end',
          paddingHorizontal: 12,
          paddingVertical: 9,
          borderRadius: 4,
          marginTop: 20
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>${item.price}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((response) => {
        setData(response);
      });
  }, []);

  const filteredData = data
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable onPress={() => setIsPickerVisible(true)} style={styles.searchButton}>
          <Ionicons name="search" size={24} color={theme === 'dark' ? '#C5C6D0' : 'black'} />
        </Pressable>
        <TextInput
          ref={searchRef}
          placeholder="Search"
          style={[styles.searchInput, { color: theme === 'dark' ? 'white' : 'black' }]}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Pressable onPress={() => setIsPickerVisible(true)} style={styles.sortButton}>
          <Ionicons name="filter-circle-sharp" size={33} color={theme === 'dark' ? 'white' : 'black'} />
        </Pressable>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <Modal
        transparent={true}
        visible={isPickerVisible}
        animationType="fade"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme === 'dark' ? 'black' : 'white',
                borderWidth: 1,
                borderColor: theme === 'dark' ? '#353839' : 'white'
              }
            ]}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.modalTitle, { color: theme === 'dark' ? 'white' : 'black' }]}>
                Sort by price
              </Text>
              <View style={{ marginRight: 10 }}>
                <FontAwesome
                  name="close"
                  size={24}
                  color={theme === 'dark' ? 'white' : 'black'}
                  onPress={() => setIsPickerVisible(false)}
                />
              </View>
            </View>
            <Picker
              selectedValue={sortOrder}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setSortOrder(itemValue);
                setIsPickerVisible(false);
              }}
            >
              <Picker.Item label="Lower" value="asc" color={theme === 'dark' ? 'white' : 'black'} />
              <Picker.Item label="Higher" value="desc" color={theme === 'dark' ? 'white' : 'black'} />
            </Picker>
          </View>
        </View>
      </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  itemContainer: {
    borderRadius: 5,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 2,
    margin: 5,
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: 'contain'
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10
  },
  itemPrice: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    marginLeft: 20
  },
  searchInput: {
    flex: 5,
    height: 40,
    padding: 10,
    borderRadius: 5,
    fontSize: 18
  },
  sortButton: {
    flex: 1,
    marginRight: 15,
    borderRadius: 5
  },
  searchButton: {
    flex: 1,
    marginLeft: 25,
    borderRadius: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    marginHorizontal: 20,
    padding: 20,
    height: 300,
    borderRadius: 10
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  picker: {
    height: 50,
    width: '100%'
  }
});

export default MainSearchScreen;
