import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../utils/Constants';

const { width } = Dimensions.get('window');

const DATA = Array(6).fill({
    title: 'LDH',
    subtitle: 'Lactate dehydrogenase',
    value: '320',
    status: 'Abnormal',
    change: 'Worse from last result 10%'
});

const BiomarkerList = ({ navigation }) => {

    const handleprevious = () => {
        navigation.replace("reportdetails");
    }

    const handleoverview = () => {
        navigation.replace("overview");
    }


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={handleoverview}>
            {/* LEFT */}
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.sub}>{item.subtitle}</Text>
            </View>

            {/* MIDDLE VALUE */}
            <View style={styles.centerWrap}>
                <Icon name="arrow-up" size={18} color="#000" />
                <Text style={styles.value}>{item.value}</Text>
            </View>

            {/* RIGHT STATUS */}
            <View style={styles.rightWrap}>
                <Text style={styles.abnormal}>{item.status}</Text>

                <View style={styles.progressBar}>
                    <View style={styles.progressFill} />
                    <View style={styles.progressDot} />
                </View>

                <Text style={styles.change}>{item.change}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* HEADER */}
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.iconCircle} onPress={handleprevious}>
                    <Icon name="arrow-left" size={22} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Biomarker List</Text>

                <TouchableOpacity style={styles.iconCircle}>
                    <Icon name="magnify" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* FILTER ROW */}
            <View style={styles.filterRow}>
                <Text style={styles.dot}> ●  <Text style={styles.abnormalCount}>Abnormal Biomarkers 10%</Text></Text>
                <Text style={styles.sort}>Sort by <Icon name="filter-variant" size={16} /></Text>
            </View>

            <FlatList
                data={DATA}
                keyExtractor={(_, i) => i.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default BiomarkerList;


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },

    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText
    },

    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },

    dot: {
        color: COLORS.linkText,
    },
    abnormalCount: { color: COLORS.lightText, fontWeight: '600' },
    sort: { color: COLORS.mediumText },

    card: {
        backgroundColor: '#F6F7FB',
        borderRadius: 18,
        padding: 15,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2
    },

    title: { fontWeight: '700', color: COLORS.darkText },
    sub: { color: COLORS.lightText, fontSize: 12 },

    centerWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15
    },

    value: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 5,
        color: COLORS.darkText
    },

    rightWrap: { alignItems: 'flex-end' },

    abnormal: {
        color: '#6D5DF6',
        fontWeight: '700',
        marginBottom: 5
    },

    progressBar: {
        width: 80,
        height: 6,
        borderRadius: 4,
        backgroundColor: '#E3E5FF',
        marginBottom: 5,
        overflow: 'hidden'
    },

    progressFill: {
        width: '70%',
        height: '100%',
        backgroundColor: '#6D5DF6'
    },

    progressDot: {
        position: 'absolute',
        right: 5,
        top: -3,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#6D5DF6'
    },

    change: { fontSize: 11, color: COLORS.lightText }
});
