import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Platform, Image } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    withSpring
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../utils/Constants';
import brandlogo from '../assets/brandlogo.png'

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.5);

    useEffect(() => {
        // Fade in and scale animation
        opacity.value = withTiming(1, { duration: 900 });
        scale.value = withSpring(1, {
            damping: 26,
            stiffness: 100,
        });

        // Navigate to next screen after 2.5 seconds
        const timer = setTimeout(() => {
            navigation.replace('onboardone');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    return (
        <>

            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <LinearGradient
                colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} >
                <Animated.View style={[styles.logoContainer, animatedStyle]}>
                    {/* Replace with your actual logo */}
                    <View style={styles.logoPlaceholder}>
                        <Image
                            source={brandlogo}
                            style={{ width: 140, height: 145, resizeMode: 'contain' }}
                        />
                    </View>
                </Animated.View>
            </LinearGradient>
        </>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: width * 0.12, // Responsive font size (12% of screen width)
        fontWeight: 'bold',
        color: COLORS.white,
        letterSpacing: 2,
        marginBottom: height * 0.01, // Responsive spacing
    },
    tagline: {
        fontSize: width * 0.035, // Responsive font size (3.5% of screen width)
        color: COLORS.white,
        opacity: 0.9,
        letterSpacing: 1,
    },
});