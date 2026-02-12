import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../utils/Constants';

const ReminderList = ({ navigation }) => {

    const handleprevoius = () => {
        navigation.replace("home")
    }

    const handleaddreminder = () => {
        navigation.navigate('addreminder');
    }

    const handleaddnewreminder = () => {
        navigation.replace("addremindernote");
    }

    const handleopennotafications = () => {
        navigation.replace("notifications");
    }

    const Card = ({ icon, title, count, dark, onPress }) => (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={[styles.card, dark && styles.darkCard]}>

            {/* ICON */}
            <View style={[styles.iconCircle, dark && styles.darkIcon]}>
                <Icon name={icon} size={22} color={'#fff'} />
            </View>

            {/* COUNT TOP RIGHT */}
            {count !== '' && <Text style={styles.count}>{count}</Text>}

            {/* LABEL */}
            <Text style={[styles.label, dark && styles.darkLabel]}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* HEADER */}
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.circleBtn} onPress={handleprevoius}>
                    <Icon name="arrow-left" size={22} color="#fff" />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity style={styles.circleBtn} onPress={handleopennotafications}>
                        <Icon name="bell-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <Icon name="magnify" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.headerTitle}>
                Reminders &{'\n'}Upcoming Tests
            </Text>

            {/* GRID */}
            <View style={styles.grid}>
                <Card icon="flask-outline" title="Liver Test" count="2"
                    onPress={handleaddreminder} />
                <Card icon="calendar-clock" title="Scheduled" count="2"
                    onPress={handleaddreminder} />
                <Card icon="view-grid-outline" title="All" count="2"
                    onPress={handleaddreminder} />
                <Card icon="flag-outline" title="Flagged" count="2"
                    onPress={handleaddreminder} />
                <Card icon="check-circle-outline" title="Completed" count="2"
                    onPress={handleaddreminder} />

                <Card
                    icon="plus"
                    title="Add Reminder"
                    count=""
                    dark
                    onPress={handleaddnewreminder}
                />
            </View>
        </View>
    );
};

export default ReminderList;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: '#1E1E2C',
        marginTop: 12,
    },

    circleBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
    },

    grid: {
        marginTop: 28,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    card: {
        width: '47%',
        backgroundColor: '#F4F6FA',
        borderRadius: SIZES.body,
        padding: 16,
        marginBottom: 16,
        height: 110,
        justifyContent: 'space-between',
    },

    darkCard: {
        backgroundColor: '#23273F',
    },

    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#00C2B3',
        justifyContent: 'center',
        alignItems: 'center',
    },

    darkIcon: {
        backgroundColor: '#00C2B3',
    },

    count: {
        position: 'absolute',
        top: 14,
        right: 14,
        fontSize: 18,
        fontWeight: '700',
        color: '#1E1E2C',
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1E1E2C',
    },

    darkLabel: {
        color: '#fff',
    },
});
