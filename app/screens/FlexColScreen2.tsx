import { View, Text, Button, Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
// import FadeInView from '../FadeInView';
// import Slider from "@/components/Slider"

const FlexColScreen = ({ navigation }: { navigation: any}) => {
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
                marginTop: 40
            }}>
                <View style={{ backgroundColor: "white", }}>
                    <Image style={{ resizeMode: "cover", height: 380, width: win.width }} source={require('@/assets/images/image3.jpg')} />

                </View>
                {/* <FadeInView /> */}
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={[styles.CollectionText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                        #UNISEX GEAR 
                    </Text>
                    <Text style={[styles.DescriptionCollectionText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                        BY De' Antonio
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SummerScreen')} style={{ backgroundColor: theme === 'dark' ? 'white' : 'black', padding: 12, marginTop: 12 }}>
                        <Text style={{ color: theme === 'dark' ? 'black' : 'white', fontWeight: 'bold' }}>MEN'S CLASSICS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SummerScreen')} style={{ backgroundColor: theme === 'dark' ? 'white' : 'black', padding: 12, marginTop: 12 }}>
                        <Text style={{ color: theme === 'dark' ? 'black' : 'white', fontWeight: 'bold' }}>WOMEN'S CLASSICS</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingBottom:20 }}>
                <Text style={[styles.SoccerText, { color: theme === 'dark' ? 'white' : 'black' }]}>Unisex Standouts</Text>
            </View>


            <View style={styles.FlexCon}>
                <View>
                    <ImageBackground source={require('@/assets/images/clothing4.jpg')} resizeMode="cover" style={[styles.image, { justifyContent: 'flex-end', }]}>
                        <Text style={styles.text}>ALEN MAKOVIC UNDISPUTED</Text>
                    </ImageBackground>
                </View>
                <View>
                    <ImageBackground source={require('@/assets/images/clothing5.jpg')} resizeMode="cover" style={[styles.image, { justifyContent: 'flex-end', }]}>
                        <Text style={styles.text}>OSIMHEN CAPSULE COLLECTION</Text>
                    </ImageBackground>
                </View>
            </View>
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
    DescriptionCollectionText: {
        fontWeight: 'condensed', fontSize: 14, marginTop: 2, tintColor: "gray"
    },
    SoccerText: {
        fontWeight: 'bold', fontSize: 25, marginTop: 55, textAlign: 'center'
    },
    FlexCon: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5
    },
    image: {
        flex: 1,
        width: 180,
        height: 200,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingHorizontal: 9,
        paddingVertical: 15
    },
});



export default FlexColScreen;




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