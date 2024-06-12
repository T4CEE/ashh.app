import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Image, useColorScheme } from 'react-native';
import { supabase } from '@/app/util/supabase';
import { Button, Input } from '@rneui/themed';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useColorScheme();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme === 'dark' ? 'black' : 'white', height: '100%' }}>
      <View style={styles.container}>
      {theme === 'dark' ? (
          <Image
            resizeMode="cover"
            source={require('@/assets/images/ashh_white_logo.png')}
            style={{ width: 190, height: 120, marginHorizontal: 'auto' }}
          />
        ) : (
          <Image
            resizeMode="cover"
            source={require('@/assets/images/asshlogo_design.png')}
            style={{ width: 190, height: 120, marginHorizontal: 'auto' }}
          />
        )}
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: theme === 'dark'?  'white' : '#353839' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
            style={{color: theme === 'dark'? 'white' : 'black'}}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock', color: theme === 'dark'?  'white' : '#353839' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={{color: theme === 'dark'? 'white' : 'black'}}
          />
        </View>

        <TouchableOpacity style={styles.button} disabled={loading} onPress={signInWithEmail}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} disabled={loading} onPress={signUpWithEmail}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  logo: {
    resizeMode: 'contain',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#353839',
    padding: 13,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
