import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../utils/Constants';

const Addreminder = ({ navigation }) => {

    const handleprevious = () => {
        navigation.navigate('reminderlist')
    }

    const ReminderCard = ({ title, time }) => {
        const [enabled, setEnabled] = useState(false);

        return (
            <View style={styles.card}>
                <View style={styles.rowTop}>
                    <View style={styles.iconCircle}>
                        <Icon name="flask-outline" size={20} color={COLORS.gradientEnd} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Switch
                        value={enabled}
                        onValueChange={(val) => {
                            setEnabled(val);
                            // if (val) navigation.replace('addremindernote');
                        }}
                        trackColor={{
                            false: '#E5E7EB',   // light grey when OFF
                            true: '#6D5DF6',    // purple when ON
                        }}
                        thumbColor={enabled ? '#FFFFFF' : '#FFFFFF'}  // white circle
                        ios_backgroundColor="#E5E7EB"
                    />

                </View>

                <Text style={styles.time}>{time}</Text>

                <View style={styles.rowMeta}>
                    <Icon name="calendar" size={16} color={COLORS.mediumText} />
                    <Text style={styles.meta}>April 01, 2025</Text>
                    <Text style={styles.meta}>Daily</Text>
                    <Text style={styles.meta}>1 hour before</Text>
                </View>

                <Text style={styles.clinic}>Cyprus Dermatology Clinic</Text>
                <Text style={styles.doctor}>Dr. Yiannis Neophytou</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <TouchableOpacity style={styles.backBtn} onPress={handleprevious}>
                <Icon name="arrow-left" size={22} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.header}>List of reminders</Text>
            <ReminderCard title="Blood Test" time="8:45 AM" />
            <ReminderCard title="Follow up visit" time="5:00 PM" />
        </View>
    );
};

export default Addreminder;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },

    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },

    header: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 20,
    },

    card: {
        backgroundColor: COLORS.bglighdrak,
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
    },

    rowTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    iconCircle: {
        width: 35,
        height: 35,
        borderRadius: 18,
        backgroundColor: '#E6F9F8',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: { flex: 1, fontWeight: SIZES.bold, fontSize: SIZES.paddingVertical },
    time: { fontSize: 20, fontWeight: SIZES.imageHeight, marginVertical: 6 },

    rowMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    meta: { color: COLORS.mediumText, fontSize: SIZES.average },

    clinic: { marginTop: 6, fontWeight: SIZES.mediumbold, paddingVertical: 8 },
    doctor: { color: COLORS.lightText, fontSize: SIZES.medium },
});
