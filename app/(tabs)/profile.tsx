import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, Button, SafeAreaView, Alert, TouchableOpacity, useColorScheme, Platform, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/app/util/supabase';
import { decode } from 'base64-arraybuffer';
import { EvilIcons } from '@expo/vector-icons';

export default function TabTwoScreen() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [avatarUploaded, setAvatarUploaded] = useState<boolean>(false);

  const theme =useColorScheme()

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need permission to access your camera roll.');
      }
    };
    requestPermission();

    const fetchUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email);
        checkAvatarUploaded(user.email);
      } else {
        Alert.alert('Error', 'No user is logged in.');
      }
    };
    fetchUserEmail();
  }, []);

  const checkAvatarUploaded = async (email: string) => {
    const avatarFlag = await AsyncStorage.getItem(`avatarUploaded_${email}`);
    if (avatarFlag === 'true') {
      setAvatarUploaded(true);
      const storedImageUrl = await AsyncStorage.getItem(`uploadedImageUrl_${email}`);
      if (storedImageUrl) {
        setImageUrl(storedImageUrl);
      }
    }
  };

  const pickImage = async () => {
    if (!email) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setShowOverlay(true);
      const { base64 } = result.assets[0];

      if (base64) {
        try {
          const fileName = `public/avatar_${Date.now()}.png`;
          const { error: uploadError } = await supabase
            .storage
            .from('avatars')
            .upload(fileName, decode(base64), {
              contentType: 'image/png',
            });

          if (uploadError) {
            throw uploadError;
          }

          const { data } = supabase
            .storage
            .from('avatars')
            .getPublicUrl(fileName);

          const imageUrl = data.publicUrl;
          setImageUrl(imageUrl);
          await AsyncStorage.setItem(`uploadedImageUrl_${email}`, imageUrl);
          await AsyncStorage.setItem(`avatarUploaded_${email}`, 'true');
          setAvatarUploaded(true);
          setShowOverlay(false);
        } catch (error) {
          if (typeof error === 'string') {
            Alert.alert('Error uploading image', error);
          } else {
            Alert.alert('Error uploading image', 'An error occurred while uploading the image.');
          }
          setShowOverlay(false);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container}>
      {avatarUploaded ? (
        <>
          <View style={styles.imageContainer}>
            {imageUrl && 
            <Image source={{ uri: imageUrl }} style={styles.image} />}
          </View>
          <TouchableOpacity style={{backgroundColor:'#E0E0E0' ,padding: 6, position: 'absolute', top:93, right: 135, width:30, height:30, borderRadius:20}} onPress={pickImage}>
          <EvilIcons name="camera" size={20} color='black' />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={{marginTop: 50}} onPress={pickImage}>
          <EvilIcons name="plus" size={60} style={{color: theme === 'dark' ? 'white': 'black'}}/>
        </TouchableOpacity>
      )}
      <Text style={{fontSize: 20, fontWeight:'600', marginVertical: 10, color: theme === 'dark' ? 'white': 'black'}}> {email}</Text>
      {showOverlay &&<EvilIcons name="spinner" size={40} color='black'/>}
      <TouchableOpacity style={{backgroundColor: '#353839', padding: 9, borderRadius: 5}} onPress={() => supabase.auth.signOut()}>
        <Text style={{color: 'white', fontWeight: '600'}}>Sign Out</Text>
      </TouchableOpacity>
      <View>
        <Text style={{marginTop:90, fontWeight:'600', fontSize:25, color: theme === 'dark' ? 'white': 'black'}}>Wallet balance: $0.00</Text>
      </View>

      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
  },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    overflow: 'hidden',
    borderColor:'#353839',
    borderWidth: 2
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
