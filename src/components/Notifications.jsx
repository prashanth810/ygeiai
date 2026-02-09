import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../utils/Constants';

const DATA = [
    { id: '1', icon: 'flask-outline' },
    { id: '2', icon: 'calendar-check-outline' },
    { id: '3', icon: 'clipboard-text-outline' },
    { id: '4', icon: 'heart-pulse' },
    { id: '5', icon: 'dna' },
    { id: '6', icon: 'power-plug-outline' },
];

const Notifications = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.iconCircle}>
                <Icon name={item.icon} size={20} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
                <View style={styles.row}>
                    <Text style={styles.title}>Notification Title</Text>
                    <View style={styles.dateRow}>
                        <Text style={styles.date}>Jun 2, 2025</Text>
                        <View style={styles.dot} />
                    </View>
                </View>

                <Text style={styles.desc}>
                    Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Maecenas etcon..
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={22} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Notifications</Text>

                <View style={{ width: 42 }} />
            </View>

            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    backBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerTitle: {
        fontSize: SIZES.big,
        fontWeight: '700',
        color: COLORS.text,
    },

    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.bglighdrak,
        padding: 16,
        borderRadius: 16,
        marginBottom: 14,
        alignItems: 'flex-start',
    },

    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontWeight: '600',
        fontSize: 14,
        color: COLORS.text,
    },

    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    date: {
        fontSize: 12,
        color: COLORS.mediumText,
        marginRight: 6,
    },

    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#6D5DF6',
    },

    desc: {
        marginTop: 6,
        fontSize: 12,
        color: COLORS.mediumText,
        lineHeight: 18,
    },
});
