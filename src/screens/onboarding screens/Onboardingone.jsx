import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from '../../utils/Constants';
import onboardingimageone from '../../assets/onboardingone.png';
import onboardingimagetwo from '../../assets/onboardingtwo.png';
import onboardingimagethree from '../../assets/onboardingtthree.png';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        image: onboardingimageone,
        title: 'Onboarding screen 01 lorem ipsum dolor sit amet',
        desc: 'Fusce sagittis quis est ut tempor. Praesent ultricies dolor nec erat ultrices, interdum suscipit neque auctor.',
    },
    {
        id: '2',
        image: onboardingimagetwo,
        title: 'Onboarding screen 02',
        subtitle: 'discover new features',
        desc: 'Aliquam erat volutpat.\nDonec sit amet ligula id leo luctus viverra.',
    },
    {
        id: '3',
        image: onboardingimagethree,
        title: 'Onboarding screen 03',
        subtitle: 'ready to start?',
        desc: 'Curabitur tincidunt, nisl eget pretium,\nligula urna facilisis libero.',
    },
];

const Onboardingone = ({ navigation }) => {
    const flatListRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace('login');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.description}>{item.desc}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            <TouchableOpacity style={styles.skipButton} onPress={() => navigation.replace('login')}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={(e) =>
                    setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width))
                }
            />

            <View style={styles.footer}>
                <View style={styles.dotContainer}>
                    {slides.map((_, i) => (
                        <View
                            key={i}
                            style={[styles.dot, currentIndex === i && styles.activeDot]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
                    <LinearGradient
                        colors={[COLORS.activeDot, COLORS.gradientStart]}
                        style={styles.button} >
                        <Text style={styles.buttonText}>
                            Get Started
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Onboardingone;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },

    slide: { width },

    skipButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    },
    skipText: {
        fontSize: SIZES.body2,
        color: COLORS.mediumText,
    },

    imageContainer: {
        width,
        height: height * 0.5,
        // backgroundColor: COLORS.lightGray,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    image: { width: '100%', height: '100%', resizeMode: 'cover' },

    contentContainer: {
        padding: SIZES.paddingHorizontal,
        alignItems: 'center',
        marginTop: 30,
    },
    title: {
        fontSize: width * 0.055,
        fontWeight: '700',
        color: COLORS.darkText,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: width * 0.045,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 16,
    },
    description: {
        fontSize: width * 0.038,
        color: COLORS.mediumText,
        textAlign: 'center',
        lineHeight: 22,
    },

    footer: {
        position: 'absolute',
        bottom: 40,
        width,
        alignItems: 'center',
    },

    dotContainer: { flexDirection: 'row', marginBottom: 20 },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: COLORS.inactiveDot,
    },
    activeDot: {
        width: 24,
        backgroundColor: COLORS.activeDot,
    },

    buttonContainer: {
        width: '90%',
        height: 56,
        borderRadius: SIZES.buttonRadius,
        overflow: 'hidden',
    },
    button: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    buttonText: {
        fontSize: SIZES.h5,
        fontWeight: '700',
        color: COLORS.white,
    },
});
