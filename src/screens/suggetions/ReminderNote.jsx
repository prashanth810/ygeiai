import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from '../../utils/Constants';

const ReminderNote = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const handleprevious = () => {
        navigation.replace("reminderlist");
    }

    const handlesubmit = () => {
        handleprevious();
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* 🔙 Back */}
            <TouchableOpacity style={styles.backBtn} onPress={handleprevious}>
                <Icon name="arrow-left" size={22} color="#fff" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.header}>Add New Reminder</Text>

            {/* Input Card */}
            <View style={styles.card}>
                <TextInput
                    placeholder="Add Title"
                    placeholderTextColor={COLORS.mediumText}
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />

                <View style={styles.line} />

                <TextInput
                    placeholder="Add Note"
                    placeholderTextColor={COLORS.mediumText}
                    style={[styles.input, { marginTop: 12 }]}
                    value={note}
                    onChangeText={setNote}
                    multiline
                />
            </View>

            {/* More Details Row */}
            <TouchableOpacity style={styles.moreRow}>
                <Text style={styles.moreText}>Set more details</Text>
                <Icon name="chevron-right" size={20} color={COLORS.mediumText} />
            </TouchableOpacity>

            {/* Done Button */}
            <TouchableOpacity activeOpacity={0.8} style={styles.btnWrap} onPress={handlesubmit}>
                <LinearGradient
                    colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                    style={styles.doneBtn}>
                    <Text style={styles.doneText}>Done</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default ReminderNote;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 40,
    },

    backBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        textAlign: 'center',
        fontSize: SIZES.big,
        fontWeight: '700',
        color: COLORS.text,
        marginVertical: 20,
    },

    card: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 16,
        padding: 16,
    },

    input: {
        fontSize: 15,
    },

    line: {
        height: 1,
        backgroundColor: '#E5E9F2',
        marginTop: 12,
    },

    moreRow: {
        marginTop: 16,
        backgroundColor: COLORS.lightGray,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    moreText: {
        color: COLORS.text,
        fontSize: 14,
    },

    btnWrap: {
        marginTop: 40,
    },

    doneBtn: {
        height: 55,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    doneText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});
