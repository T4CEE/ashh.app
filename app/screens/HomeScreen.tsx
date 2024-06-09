import { View, Text, Image, Dimensions, ImageBackground, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
// import FadeInView from '../FadeInView';
// import Slider from "@/components/Slider"

const HomeScreen = ({navigation}) => {
  const theme = useColorScheme()
  const insets = useSafeAreaInsets();
  const win = Dimensions.get('window');
  return (
    <View>

      <View style={{
        alignItems: 'center',
        // Paddings to handle safe area
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
        {/* <View style={{ backgroundColor: "white", }}>
          <Image style={{ resizeMode: "cover", height: 380, width: win.width }} source={require('@/assets/images/sports image.jpeg')} />

        </View> */}
        <View style={styles.FlexCon}>
          <View>
            <ImageBackground source={require('@/assets/images/cycling2.jpg')} resizeMode="cover" style={[styles.image, { justifyContent: 'flex-end', height: 480, width: win.width }]}>
            <Text style={styles.text}>SUMMER SPECIAL</Text>
            <Text style={{fontSize:18, color: 'white', marginBottom: 60,  paddingHorizontal: 9,}}>NEWTON GX2s PREMIUM</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SummerScreen')} style={{ backgroundColor: '#353839', alignItems: "flex-end", paddingHorizontal: 12, paddingVertical: 22, }}>
                <Text style={{ color: "white", fontWeight: 'bold' }}>SHOP NOW</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.FlexCon}>
        <View>
            <ImageBackground source={require('@/assets/images/cycling.jpg')} resizeMode="cover" style={[styles.image, { justifyContent: 'flex-end', height: 480, width: win.width }]}>
            <Text style={styles.text}>CYCLING SPECIAL</Text>
            <Text style={{fontSize:18, color: 'white', marginBottom: 60,  paddingHorizontal: 9,}}>SUIT UP FOR AN EXCEPTIONAL EXPERIENCE</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SummerScreen')} style={{ backgroundColor: '#353839', alignItems: "flex-end", paddingHorizontal: 12, paddingVertical: 22, }}>
                <Text style={{ color: "white", fontWeight: 'bold' }}>SHOP NOW</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </View>

      {/* <Slider/> */}
    </View>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  CollectionText: {
    fontWeight: 'bold', fontSize: 30,
  },
  BasketballText: {
    fontWeight: 'bold', fontSize: 20, marginVertical: 12,
  },
  DescriptionCollectionText: {
    fontWeight: 'condensed', fontSize: 14, marginTop: 2, tintColor: "gray"
  },
  FlexCon: {
    marginBottom: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  image: {
    flex: 1,
    width: 180,
    height: 200,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 9,
    paddingVertical: 15
  },
});



export default HomeScreen;




{/* <Text style={{
        transform: [{ rotate: '90deg' }]
      }}>
        #dreaPX2s #kakaNewJerseys@pq #dreaPX2s #kakaNewJerseys@ #dreaPX2s #kakaNewJerseys@
      </Text> */}

{/* replace with picture */ }
{/* <View style={{}}>
        <Text style={{ transform: [{ rotate: '90deg' }] }}>
          #dreaPX2s
        </Text>

      </View> */}


{/* <View style={{ marginTop: 170, justifyContent:'center', }}>
        <Text style={{ fontWeight: "bold", fontSize: 25, letterSpacing: 0.50, margin:20 }}>Collections that Inspire</Text>
      </View> */}