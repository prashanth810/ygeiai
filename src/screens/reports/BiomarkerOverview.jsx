import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const COLORS = {
    white: '#FFFFFF',
    gradientStart: '#00D9D5',
    gradientEnd: '#6C5CE7',
    darkBg: '#2C2F4A',
    lightBg: '#F5F7FF',
    lightText: '#7C8DB5',
    mediumText: '#5A6B8C',
    purple: '#6D5DF6',
    text: '#1A1D3D',
};

const SIZES = {
    big: 20,
};

const BiomarkerOverview = ({ navigation }) => {

    const handleprevious = () => {
        navigation.replace("biomarketlist");
    }

    // Chart data
    const chartData = {
        labels: ['0', '1', '2', '3', '4'],
        datasets: [{
            data: [8, 12, 10, 16, 11, 20, 14],
            strokeWidth: 2,
        }],
    };

    const chartConfig = {
        backgroundGradientFrom: COLORS.lightBg,
        backgroundGradientTo: COLORS.lightBg,
        color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: COLORS.purple,
        },
        propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: '#E5E9F2',
        },
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 🔙 Back Button */}
                <TouchableOpacity style={styles.backBtn} onPress={handleprevious}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>

                {/* 🔷 HEADER CARD */}
                <View style={styles.headerCard}>
                    <Text style={styles.small}>Biomarker Overview</Text>
                    <Text style={styles.title}>White blood cells</Text>
                    <Text style={styles.sub}>WBC</Text>

                    <View style={styles.headerRow}>
                        <Text style={styles.value}>↑ 320</Text>
                        <Text style={styles.date}>June 27, 2025</Text>
                    </View>

                    <View style={styles.row}>
                        {/* Left: Abnormal Section */}
                        <View style={styles.abnormalWrap}>
                            <View style={styles.abnormalHeader}>
                                <Text style={styles.label}>Abnormal</Text>
                                <Text style={styles.abnormalValue}>13</Text>
                            </View>
                            <View style={styles.progressBar}>
                                <LinearGradient
                                    colors={['#A78BFA', '#6D5DF6']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[styles.progressFill, { width: '65%' }]}
                                />
                            </View>
                            <Text style={styles.smallText}>Worse from last result 10%</Text>
                        </View>

                        {/* Right: Specific Range Section */}
                        <View style={styles.rangeWrap}>
                            <Text style={styles.label}>Specific Range</Text>

                            <LinearGradient
                                colors={['#8B7BFF', '#6D5DF6']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.rangeItem}>
                                <Text style={styles.rangeText}>1 - 5</Text>
                                <Text style={styles.rangeText}>10⁹/l</Text>
                            </LinearGradient>

                            <LinearGradient
                                colors={['#8B7BFF', '#6D5DF6']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.rangeItem}>
                                <Text style={styles.rangeText}>5 - 10</Text>
                                <Text style={styles.rangeText}>10⁹/l</Text>
                            </LinearGradient>

                            <LinearGradient
                                colors={['#8B7BFF', '#6D5DF6']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.rangeItem}>
                                <Text style={styles.rangeText}>10 - 15</Text>
                                <Text style={styles.rangeText}>10⁹/l</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </View>

                {/* 📈 MARKERS CHART */}
                <Text style={styles.sectionTitle}>Markers</Text>
                <View style={styles.chartBox}>
                    <LineChart
                        data={chartData}
                        width={width - 40}
                        height={180}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                        withInnerLines={true}
                        withOuterLines={false}
                        withVerticalLines={false}
                        withHorizontalLines={true}
                        withDots={true}
                        withShadow={false}
                        fromZero={true}
                    />
                </View>

                {/* DESCRIPTION */}
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit lorem, sollicitudin eu facilisis et, condimentum eu orci. Ut non pulvinar purus, eu vestibulum enim. Suspendisse dignissim suscipit nulla.
                </Text>

                {/* HISTORICAL TRENDS */}
                <Text style={styles.sectionTitle}>Historical Trends</Text>

                <View style={styles.historyCard}>
                    <Text style={styles.historyText}>June 27, 2025</Text>
                    <Text style={styles.historyValue}>13 <Text style={styles.historyUnit}>10⁹/l</Text></Text>
                    <Icon name="chevron-right" size={20} color={COLORS.mediumText} />
                </View>

                <View style={styles.historyCard}>
                    <Text style={styles.historyText}>June 27, 2025</Text>
                    <Text style={styles.historyValue}>13 <Text style={styles.historyUnit}>10⁹/l</Text></Text>
                    <Icon name="chevron-right" size={20} color={COLORS.mediumText} />
                </View>

                <View style={styles.historyCard}>
                    <Text style={styles.historyText}>June 27, 2025</Text>
                    <Text style={styles.historyValue}>13 <Text style={styles.historyUnit}>10⁹/l</Text></Text>
                    <Icon name="chevron-right" size={20} color={COLORS.mediumText} />
                </View>

                {/* AI BUTTON */}
                <TouchableOpacity style={styles.aiBtn} activeOpacity={0.8}>
                    <LinearGradient
                        colors={['#00D9D5', '#6C5CE7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.aiInner}>
                        <Text style={styles.aiText}>AI-Based Suggestions</Text>
                        <Icon name="arrow-top-right" size={20} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>

                <View style={{ height: 100 }} />

            </ScrollView>
        </View>
    );
};

export default BiomarkerOverview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 50,
    },

    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 4,
        shadowColor: COLORS.gradientEnd,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    headerCard: {
        backgroundColor: COLORS.darkBg,
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },

    small: {
        color: '#A0A3BD',
        fontSize: 12,
        marginBottom: 4,
    },

    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 2,
    },

    sub: {
        color: '#A0A3BD',
        fontSize: 14,
        marginBottom: 16,
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    value: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },

    date: {
        color: '#A0A3BD',
        fontSize: 13,
    },

    row: {
        flexDirection: 'row',
        gap: 12,
    },

    abnormalWrap: {
        flex: 1,
    },

    abnormalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    label: {
        color: '#D1D5E8',
        fontSize: 12,
        fontWeight: '500',
    },

    abnormalValue: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

    progressBar: {
        height: 8,
        backgroundColor: '#3E4157',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 6,
    },

    progressFill: {
        height: '100%',
        borderRadius: 4,
    },

    smallText: {
        color: '#A0A3BD',
        fontSize: 11,
    },

    rangeWrap: {
        flex: 1,
    },

    rangeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginTop: 6,
    },

    rangeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 12,
        marginTop: 8,
    },

    chartBox: {
        backgroundColor: COLORS.lightBg,
        borderRadius: 16,
        padding: 10,
        marginBottom: 24,
        overflow: 'hidden',
    },

    chart: {
        borderRadius: 16,
    },

    desc: {
        color: COLORS.lightText,
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 24,
    },

    historyCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.lightBg,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 14,
        marginBottom: 10,
    },

    historyText: {
        color: COLORS.mediumText,
        fontSize: 14,
        flex: 1,
    },

    historyValue: {
        fontWeight: '700',
        fontSize: 15,
        color: COLORS.text,
        marginRight: 8,
    },

    historyUnit: {
        fontWeight: '400',
        fontSize: 13,
        color: COLORS.mediumText,
    },

    aiBtn: {
        marginVertical: 24,
        borderRadius: 30,
        elevation: 8,
        shadowColor: COLORS.gradientEnd,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },

    aiInner: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },

    aiText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});