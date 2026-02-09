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


const historyData = [
    { id: 1, date: 'June 27, 2025', value: 13 },
    { id: 2, date: 'May 14, 2025', value: 10 },
    { id: 3, date: 'April 02, 2025', value: 8 },
];


const { width } = Dimensions.get('window');
import { COLORS, SIZES } from '../../utils/Constants'

const BiomarkerOverview = ({ navigation }) => {

    const handleprevious = () => {
        navigation.replace("biomarketlist");
    }

    const handleaibasedsuggetions = () => {
        navigation.replace("aisuggetions")
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
        backgroundGradientFrom: '#F5F7FB',   // light grey card bg
        backgroundGradientTo: '#F5F7FB',
        decimalPlaces: 0,

        color: (opacity = 1) => `rgba(120,120,120,${opacity})`, // line color grey
        labelColor: (opacity = 1) => `rgba(130,130,130,${opacity})`, // axis labels grey

        propsForDots: {
            r: '3',
            strokeWidth: '2',
            stroke: '#6D5DF6',   // keep purple dots
        },

        propsForBackgroundLines: {
            stroke: '#E3E7EF',   // soft grey grid lines
            strokeWidth: 1,
        },
    };


    return (
        <View style={styles.container}>
            {/* // top header */}

            <View style={styles.headerspacing}>
                {/* 🔙 Back Button */}
                <TouchableOpacity style={styles.backBtn} onPress={handleprevious}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>

                {/* 🔷 HEADER CARD */}
                <View style={styles.headerCard}>
                    <Text style={styles.small}>Biomarker Overview</Text>

                    <View style={styles.cellscount}>
                        <View>
                            <Text style={styles.title}>White blood cells</Text>
                            <Text style={styles.sub}>WBC</Text>
                        </View>

                        <View style={styles.headerRow}>
                            <Text style={styles.value}>↑ 320</Text>
                            <Text style={styles.date}>June 27, 2025</Text>
                        </View>
                    </View>

                </View>
            </View>

            {/* sub heaer  */}
            <View style={styles.subheader}>
                <ScrollView showsVerticalScrollIndicator={false}>


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

                    <View style={styles.historicaltable}>
                        {/* HISTORICAL TRENDS */}
                        <Text style={styles.sectionTitle}>Historical Trends</Text>

                        {historyData.map((item, index) => (
                            <View
                                key={item.id}
                                style={[
                                    styles.historyCard,
                                    index !== historyData.length - 1 && styles.historyBorder
                                ]} >
                                <Text style={styles.historyText}>{item.date}</Text>
                                <Text style={styles.historyValue}>
                                    {item.value} <Text style={styles.historyUnit}>10⁹/l</Text>
                                </Text>
                                <Icon name="chevron-right" size={24} color={COLORS.mediumText} />
                            </View>
                        ))}


                    </View>

                    {/* AI BUTTON */}
                    <TouchableOpacity style={styles.aiBtn} activeOpacity={0.8}
                        onPress={handleaibasedsuggetions}>
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
        </View>
    )
}

export default BiomarkerOverview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.mediumdark,
        paddingTop: 25,
    },
    subheader: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.big,
        borderTopRightRadius: SIZES.maxbig,
        borderTopLeftRadius: SIZES.maxbig,
        paddingVertical: SIZES.big,
        paddingHorizontal: SIZES.big,
    },



    // latest css 

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
    headerspacing: {
        paddingHorizontal: SIZES.average,
    },
    headerCard: {
        backgroundColor: COLORS.darkBg,
        borderRadius: 20,
        paddingHorizontal: SIZES.small,
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
    },

    sub: {
        color: '#A0A3BD',
        fontSize: 14,
    },

    value: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
        flexDirection: "column",
        alignSelf: "flex-end",
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
    cellscount: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: SIZES.verysmall,
        marginBottom: SIZES.big,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
    },

    chartBox: {
        borderRadius: 16,
        paddingVertical: SIZES.small,
        marginBottom: SIZES.big,
        overflow: 'hidden',
    },

    chart: {
        borderRadius: 16,
        backgroundColor: COLORS.white,
    },

    desc: {
        color: COLORS.lightText,
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 24,
    },
    historicaltable: {
        backgroundColor: COLORS.lightbg,
        flexDirection: "column",
        rowGap: SIZES.medium,
        paddingHorizontal: SIZES.small,
        marginBottom: SIZES.small,
        padding: SIZES.paddingVertical,
        borderRadius: SIZES.medium,
    },

    historyCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 4
    },

    historyBorder: {
        borderBottomWidth: 1,
        borderColor: COLORS.averagegray,
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
})