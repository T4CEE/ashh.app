import { View, Image, Button, useColorScheme } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { supabase } from '@/app/util/supabase';  // Make sure to adjust the path if needed

const Nav = ({ navigation }: { navigation: any}) => {
  const theme = useColorScheme();
  

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingRight: 30 }}>
        {theme === 'dark' ? (
          <Image
            resizeMode="cover"
            source={require('@/assets/images/ashh_white_logo.png')}
            style={{ width: 120, height: 20 }}
          />
        ) : (
          <Image
            resizeMode="cover"
            source={require('@/assets/images/asshlogo_design.png')}
            style={{ width: 120, height: 20 }}
          />
        )}
        <FontAwesome5
          onPress={() => navigation.navigate('CartScreen')}
          name="shopping-cart"
          size={20}
          style={{ color: theme === 'dark' ? 'white' : 'black' }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Nav;
