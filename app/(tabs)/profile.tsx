import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Text, View, Button, SafeAreaView, Alert } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/app/util/supabase';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [imageUrl, setImageUrl] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleFileInputChange = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.status !== 'granted') {
        Alert.alert('Permission required', 'Permission to access media library is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (pickerResult.cancelled) {
        return;
      }

      const { uri } = pickerResult;
      setShowOverlay(true);

      // Fetch the file and convert it to a blob
      const response = await fetch(uri);
      const blob = await response.blob();

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`avatar_${Date.now()}.jpeg`, blob);

      setShowOverlay(false);

      if (error) {
        console.error('Error uploading file:', error);
        Alert.alert('Upload error', 'There was an error uploading the file.');
        return;
      }

      setImageUrl(uri);
    } catch (error) {
      console.error('Error handling file input change:', error);
      Alert.alert('Error', 'Something went wrong.');
      setShowOverlay(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={handleFileInputChange} />
      <View style={styles.imageContainer}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      </View>
      {showOverlay && <Text>Loading...</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
