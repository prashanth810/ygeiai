import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    FlatList,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../utils/Constants';
import logoname from '../../assets/logoname.png';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import DotLoder from '../../components/DotLoder';

const { width } = Dimensions.get('window');

const DATA = [
    { id: 1, title: 'Electrocardiogram (ECG)', percent: '75%' },
    { id: 2, title: 'Lipid Panel', percent: '40%' },
    { id: 3, title: 'Blood Glucose Test', percent: '35%' },
    { id: 4, title: 'Liver Test', percent: '15%' },
];

const ResportList = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState(null);


    const handlenext = () => {
        navigation.navigate('calendar');
    };


    useEffect(() => {
        setTimeout(() => {
            setReport({
                title: 'Urine Tests (Dipstick, Microscopy, Culture)',
                percent: 30,
                date: 'June 24, 2025'
            });
            setLoading(false);
        }, 1000);
    }, []);


    const handleviewdetails = () => {
        navigation.replace("reportdetails");
    }



    const renderItem = ({ item }) => (
        <View style={styles.listCard}>
            <View style={styles.iconCircle}>
                <Icon name="file-document-outline" size={22} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.reportTitle}>{item.title}</Text>
                <Text style={styles.date}>Jun 2, 2025</Text>
            </View>

            <View style={styles.percentBadge}>
                <Text style={styles.percentText}>{item.percent}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.headerlogo}>
                <Image source={logoname} style={styles.logoimage} />
                <View style={[styles.headerlogo, { columnGap: width * 0.04 }]}>
                    <View style={styles.cardIconCircle}>
                        <Icon name="calendar-check-outline" size={21} color={COLORS.white} />
                    </View>

                    <View style={styles.cardIconCircle}>
                        <EvilIcons name="search" size={21} color={COLORS.white} />
                    </View>

                </View>
            </View>
            {/* Header Card */}
            <View style={styles.headerCard}>

                {loading ? (
                    <View style={styles.loaderWrap}>
                        <DotLoder />
                    </View>
                ) : (
                    <>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.headerSmall}>Your latest report</Text>
                            <Text style={styles.headerBig}>{report.title}</Text>
                            <Text style={styles.date}>{report.date}</Text>

                            <TouchableOpacity style={styles.moreBtn} onPress={handleviewdetails}>
                                <LinearGradient
                                    colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                                    style={styles.moreBtnInner}>
                                    <Text style={styles.moreText}>More Details</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {/* Donut UI (no svg, just design) */}
                        <View style={styles.donutWrap}>
                            <View style={styles.donutOuter}>
                                <View style={styles.donutInner}>
                                    <Text style={styles.donutText}>{report.percent}%</Text>
                                </View>
                            </View>
                        </View>
                    </>
                )}
            </View>

            <View style={styles.rowHeader}>
                <Text style={styles.sectionTitle}>Past 12 months</Text>
                <Text style={styles.sort}>Sort by</Text>
            </View>

            <FlatList
                data={DATA}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 120 }}
            />

            <TouchableOpacity style={styles.newTestBtn} onPress={handlenext}>
                <LinearGradient
                    colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                    style={styles.newTestInner}>
                    <Text style={styles.newText}>Start a new test</Text>
                    <Icon name="arrow-top-right" size={18} color="#fff" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default ResportList;


const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },

    headerCard: {
        backgroundColor: '#2C2F4A',
        borderRadius: 20,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    headerSmall: { color: '#ccc' },
    headerBig: { color: '#fff', fontSize: 18, fontWeight: '700', marginVertical: 4 },

    moreBtn: { marginTop: 10 },
    moreBtnInner: {
        paddingVertical: SIZES.tiny,
        borderRadius: SIZES.buttonRadius,
        width: width * 0.36,
        alignItems: "center"
    },
    moreText: { color: '#fff' },

    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    sectionTitle: { fontWeight: '600' },

    listCard: {
        backgroundColor: '#F6F7FB',
        borderRadius: 16,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },

    iconCircle: {
        width: 45,
        height: 45,
        borderRadius: 22,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    reportTitle: { fontWeight: '600' },
    date: { color: COLORS.mediumText, fontSize: 12 },

    percentBadge: {
        backgroundColor: '#7D7BFF',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },

    percentText: { color: '#fff' },

    newTestBtn: { position: 'absolute', bottom: 100, left: 20, right: 20 },
    newTestInner: {
        height: 55,
        borderRadius: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    newText: { color: '#fff', fontWeight: '700', marginRight: 6 },
    headerlogo: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingBottom: SIZES.small
    },
    logoimage: {
        width: 80,
        height: 40,
        resizeMode: 'contain',
    },
    cardIconCircle: {
        width: 35,
        height: 35,
        borderRadius: SIZES.buttonRadius,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    loaderWrap: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },

    donutWrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    donutOuter: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 10,
        borderColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
    },

    donutInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    donutText: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.gradientEnd,
    },

});
