import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../..//utils/Constants';
import { Share, Alert } from 'react-native';
import WaveProgressUI from '../../components/WaveProgressUI';


const { width } = Dimensions.get('window');

const ReportDetails = ({ navigation }) => {

    const handleShare = async () => {
        try {
            await Share.share({
                message:
                    'Lab Report: Urine Tests (Dipstick, Microscopy, Culture)\n' +
                    'Date: June 24, 2025\n' +
                    'Status: 20% Abnormal\n\n' +
                    'Shared from YGEIAI App.',
            });
        } catch (error) {
            Alert.alert('Error', 'Unable to share report');
        }
    };


    const handlebiomarketlist = () => {
        navigation.replace("biomarketlist")
    }

    const handleprevious = () => {
        navigation.replace("reports")
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 🔙 Top Icons */}
                <View style={styles.topRow}>
                    <TouchableOpacity style={styles.iconCircle} onPress={handleprevious}>
                        <Icon name="arrow-left" size={22} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.rowRight}>
                        <TouchableOpacity style={styles.iconCircle} onPress={handleShare}>
                            <Icon name="share-variant" size={20} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconCircle}>
                            <Icon name="download-outline" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 🔷 Header Card */}
                <View style={styles.headerbg}>
                    <View style={styles.headerCard}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.small}>Lab panel</Text>
                            <Text style={styles.title}>
                                Urine Tests {'\n'}
                                (Dipstick, Microscopy, Culture)
                            </Text>
                            <Text style={styles.date}>June 24, 2025</Text>

                        </View>

                        {/* Donut */}
                        <WaveProgressUI />
                    </View>

                    <Text style={styles.testTitle}>Testing Reason</Text>
                    <Text style={styles.reason}>
                        Lower urinary tract symptoms: dysuria, frequency,
                        incomplete emptying
                    </Text>

                </View>

                {/* 🟦 Sections */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>General Interpretation</Text>
                    <Text style={styles.sectionText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut elit lorem, sollicitudin eu facilisis et, condimentum eu orci.
                        Ut non sollicitudin purus, eu scelerisque enim. Suspendisse dignissim at quam a varius.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Overview</Text>
                    <Text style={styles.bullet}>• Lorem ipsum dolor sit amet</Text>
                    <Text style={styles.bullet}>• Ut elit lorem, sollicitudin eu facilisis et</Text>
                    <Text style={styles.bullet}>• Condimentum eu orci</Text>
                    <Text style={styles.bullet}>• Ut non sollicitudin purus</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Risk Factors</Text>
                    <Text style={styles.bullet}>• Lorem ipsum dolor sit amet</Text>
                    <Text style={styles.bullet}>• Consectetur adipiscing elit</Text>
                    <Text style={styles.bullet}>• Ut elit lorem</Text>
                </View>

                {/* Buttons */}
                <TouchableOpacity
                    style={styles.borderBtn}
                    onPress={handlebiomarketlist} >
                    <Text style={styles.borderText}>Go to Biomarkers List</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryBtn}>
                    <LinearGradient
                        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                        style={styles.primaryInner}
                    >
                        <Text style={styles.primaryText}>Start a new test</Text>
                        <Icon name="arrow-top-right" size={18} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

export default ReportDetails;


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    rowRight: { flexDirection: 'row', gap: 12 },

    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerbg: {
        backgroundColor: '#2C2F4A',
        marginBottom: 20,
        paddingHorizontal: SIZES.small,
        paddingVertical: SIZES.medium,
        borderRadius: 20,
    },

    headerCard: {
        flexDirection: 'row',
    },

    small: { color: '#ccc' },
    title: { color: '#fff', fontSize: 17, fontWeight: '700', marginVertical: 5 },
    date: { color: '#bbb', marginBottom: 10 },

    testTitle: { color: '#aaa', },
    reason: { color: COLORS.white, fontSize: SIZES.small },

    donutWrap: { justifyContent: 'center', alignItems: 'center' },
    donutOuter: {
        width: 95,
        height: 95,
        borderRadius: 48,
        borderWidth: 10,
        borderColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center'
    },
    donutInner: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    percent: { color: '#fff', fontSize: 18, fontWeight: '700' },
    abnormal: { color: '#8a80ff', fontSize: 12 },

    card: {
        backgroundColor: '#F5F7FF',
        padding: 16,
        borderRadius: 18,
        marginBottom: 16
    },

    sectionTitle: {
        fontWeight: SIZES.bold,
        fontSize: SIZES.paddingVertical,
        marginBottom: 6,
    },
    sectionText: {
        color: COLORS.lightText,
        lineHeight: SIZES.big,
    },
    bullet: {
        color: COLORS.lightText,
        marginVertical: 2,
        lineHeight: 22
    },

    borderBtn: {
        borderWidth: 2,
        borderColor: '#6D5DF6',
        paddingVertical: 12,
        borderRadius: 28,
        alignItems: 'center',
        marginBottom: 12
    },
    borderText: { color: '#6D5DF6', fontWeight: '600' },

    primaryBtn: { marginBottom: 80 },
    primaryInner: {
        height: 55,
        borderRadius: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryText: { color: '#fff', fontWeight: '700', marginRight: 6 }
});
