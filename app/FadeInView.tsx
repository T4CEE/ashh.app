import React, { useRef, useEffect } from 'react';
import { Animated, Text, Image, View, Pressable, Easing } from 'react-native';
import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

const FadeInView: React.FC<FadeInViewProps> = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const rotateValueHolder = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 4000, // Adjusted to 4000 ms (4 seconds) for demonstration
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    // const startImageRotation = () => {
    //     rotateValueHolder.setValue(0);
    //     Animated.timing(rotateValueHolder, {
    //         toValue: 1,
    //         duration: 3000,
    //         easing: Easing.linear,
    //         useNativeDriver: true,
    //     }).start();
    // };

    // const RotateData = rotateValueHolder.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '360deg'],
    // });

    return (
        <Animated.View // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim, // Bind opacity to animated value
            }}>
            {props.children}
        </Animated.View>
    );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <FadeInView style={{ width: 200}}>
                <Image
                    style={{
                        width: 200,
                        height: 150,
                    }}
                    source={require('@/assets/images/BLACK-BRAND_LOGO.png')}
                />
            </FadeInView>
        </View>
    );
};
