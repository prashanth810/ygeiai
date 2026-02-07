import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from '../../utils/Constants';
import onboardingone from '../../assets/onboardingone.png';

const { width, height } = Dimensions.get('window');

const OnboardingTwo = ({ navigation }) => {
    const handleSkip = () => {
        // Navigate to main screen or last onboarding
        navigation.navigate('MainApp'); // Change to your route name
    };

    const handleGetStarted = () => {
        // Navigate to next onboarding screen
        navigation.navigate('OnboardingTwo'); // Change to your next screen
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Image Section */}
            <View style={styles.imageContainer}>
                <Image
                    source={onboardingone} // Replace with your image
                    style={styles.image}
                    resizeMode="cover"
                />

            </View>

            {/* Content Section */}
            <View style={styles.contentContainer}>
                {/* Title */}
                <Text style={styles.title}>Onboarding screen 01</Text>
                <Text style={styles.subtitle}>lorem ipsum dolor sit amet</Text>

                {/* Description */}
                <Text style={styles.description}>
                    Fusce sagittis quis est ut tempor.{'\n'}
                    Praesent ultricies dolor nec erat ultrices,{'\n'}
                    interdum suscipit neque auctor.
                </Text>

                {/* Dot Indicators */}
                <View style={styles.dotContainer}>
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>

                {/* Get Started Button */}
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleGetStarted}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={[COLORS.activeDot, COLORS.gradientStart]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Get started</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OnboardingTwo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    skipButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 40,
        right: 20,
        zIndex: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    skipText: {
        fontSize: SIZES.body2,
        color: COLORS.mediumText,
        fontWeight: '500',
    },
    imageContainer: {
        width: width,
        height: height * 0.5,
        backgroundColor: COLORS.lightGray,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: SIZES.paddingHorizontal,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    title: {
        fontSize: width * 0.055, // Responsive
        fontWeight: '700',
        color: COLORS.darkText,
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: width * 0.045, // Responsive
        fontWeight: '600',
        color: COLORS.darkText,
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: width * 0.038, // Responsive
        color: COLORS.mediumText,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 'auto',
        marginBottom: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.inactiveDot,
    },
    activeDot: {
        width: 24,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.activeDot,
    },
    buttonContainer: {
        width: '100%',
        height: 56,
        borderRadius: SIZES.buttonRadius,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: COLORS.gradientEnd,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.buttonRadius,
    },
    buttonText: {
        fontSize: SIZES.h5,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
});