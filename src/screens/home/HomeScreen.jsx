import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../utils/Constants';
import brandlogo from '../../assets/brandlogo2.png'

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {


    const handlelatestreports = () => {
        navigation.replace("latestReportFlow");
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.headerRow}>
                <Text />
                <Text style={styles.headerText}>Hi, David</Text>
                <TouchableOpacity style={styles.bellBtn}>
                    <Icon name="bell-outline" size={22} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {/* Welcome */}
            <Text style={styles.welcome}>Welcome to the</Text>

            <Image
                source={brandlogo}
                style={styles.logo}
                resizeMode="contain" />

            <Text style={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur {"\n"} adipiscing elit.
                Duis sodales neque vel mi {"\n"} scelerisque, sit amet tincidunt nulla hendrerit.{"\n"}
                Nullam at tincidunt nibh.
            </Text>

            {/* Main Button */}
            <TouchableOpacity style={styles.reportBtn} onPress={handlelatestreports}>
                <LinearGradient
                    colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                    style={styles.reportGradient} >
                    <Text style={styles.reportText}>Go to the latest report</Text>
                    <View style={styles.arrowCircle}>
                        <Icon name="arrow-top-right" size={18} color={COLORS.linkText} />
                    </View>
                </LinearGradient>
            </TouchableOpacity>

            {/* Cards */}
            <View style={styles.cardRow}>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.cardIconCircle}>
                        <Icon name="calendar-check-outline" size={25} color={COLORS.white} />
                    </View>
                    <Text style={styles.cardText}>Upcoming reminders</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <View style={styles.cardIconCircle}>
                        <Icon name="lightbulb-on-outline" size={25} color={COLORS.white} />
                    </View>
                    <Text style={styles.cardText}>Go to your latest suggestions</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerText: {
        fontSize: width * 0.055,
        fontWeight: '700',
        color: COLORS.darkText,
        paddingLeft: width * 0.10
    },

    bellBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
    },

    welcome: {
        marginTop: 5,
        fontSize: SIZES.body,
        textAlign: 'center',
        color: COLORS.mediumText,
    },

    logo: {
        width: width * 0.5,
        height: 75,
        alignSelf: 'center',
        marginVertical: 18,
    },

    desc: {
        textAlign: 'center',
        fontSize: SIZES.small,
        color: COLORS.lightText,
        lineHeight: 18,
        marginHorizontal: 20,
        lineHeight: width * 0.06,
    },

    reportBtn: { marginTop: 20 },

    reportGradient: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    reportText: {
        color: COLORS.white,
        fontSize: SIZES.body,
        fontWeight: '600',
    },

    arrowCircle: {
        marginLeft: 10,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },

    card: {
        width: '48%',
        backgroundColor: '#F6F7FB',
        borderRadius: 18,
        padding: 20,
        alignItems: 'center',
        elevation: 2,
    },

    cardIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    cardText: {
        textAlign: 'center',
        fontSize: SIZES.medium,
        color: COLORS.mediumdark,
        fontWeight: SIZES.bold,
    },

    bottomNav: {
        position: 'absolute',
        bottom: 15,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: COLORS.white,
        borderRadius: 35,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 10,
    },

    centerBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
    },
});
