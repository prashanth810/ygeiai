import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../utils/Constants';

import aifirstimg from '../../assets/aifirstimg.jpg'
import aisecondimg from '../../assets/aisecondimg.png'
import aithirdimg from '../../assets/aithirdimg.png'
import aifourthimg from '../../assets/aifourthimg.png'


const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const SPACING = 15;

const DATA = [
    {
        id: '1',
        title: 'Lifestyle and\nDietary Suggestions',
        sub: 'Lorem ipsum dolor',
        image: aifirstimg,
    },
    {
        id: '2',
        title: 'Exercise & Activity\nGuidance',
        sub: 'Personalized health tips',
        image: aisecondimg,
    },
    {
        id: '3',
        title: 'Sleep & Recovery\nAdvice',
        sub: 'Improve recovery',
        image: aithirdimg,
    },
    {
        id: '4',
        title: 'Hydration & Nutrition',
        sub: 'Daily intake guidance',
        image: aifourthimg,
    },
];

const AiSuggetions = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const flatRef = useRef();

    const handlelistofreminders = () => {
        navigation.replace("reminderlist");
    }

    const renderItem = ({ item }) => (
        <View style={styles.cardWrap}>
            <ImageBackground
                source={item.image}
                style={styles.card}
                imageStyle={{ borderRadius: 20, resizeMode: "cover" }} >
                <View style={styles.overlay} />

                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSub}>{item.sub}</Text>

                    <View style={styles.cardFooter}>
                        <Text style={styles.count}>
                            {index + 1} / {DATA.length}
                        </Text>
                        <TouchableOpacity style={styles.readMoreBtn} onPress={handlelistofreminders}>
                            <Text style={styles.readMore}>Read More</Text>
                            <Icon name="arrow-right" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Back Button */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={22} color="#fff" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>AI-Based Suggestions</Text>
            <Text style={styles.subtitle}>
                Lorem ipsum dolor sit amet, consectetur{"\n"}
                adipiscing elit. Maecenas et condim.
            </Text>

            {/* Carousel */}
            <FlatList
                ref={flatRef}
                data={DATA}
                horizontal
                pagingEnabled
                snapToInterval={CARD_WIDTH + 20}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                onMomentumScrollEnd={(e) => {
                    const i = Math.round(
                        e.nativeEvent.contentOffset.x / (CARD_WIDTH + 20)
                    );
                    setIndex(i);
                }}
            />
        </View>
    );
};

export default AiSuggetions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 25,
    },

    backBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    title: {
        fontSize: SIZES.paddingHorizontal,
        fontWeight: '700',
        color: COLORS.text,
        textAlign: 'center',
    },

    subtitle: {
        color: COLORS.mediumText,
        fontSize: SIZES.medium,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },

    cardWrap: {
        width: CARD_WIDTH,
        marginRight: 20,
    },

    card: {
        height: 350,
        borderRadius: 20,
        justifyContent: 'flex-end',
        padding: 20,
        overflow: 'hidden',
        width: 310,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
    },

    cardContent: {
        zIndex: 2,
    },

    cardTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
    },

    cardSub: {
        color: '#ddd',
        marginBottom: 25,
    },

    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    count: {
        color: '#ccc',
        fontSize: 12,
    },

    readMoreBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    readMore: {
        color: '#fff',
        marginRight: 6,
        fontSize: 13,
    },
});
