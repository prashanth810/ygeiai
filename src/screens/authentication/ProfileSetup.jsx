import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../utils/Constants';
import profileimg from '../../assets/profileimg.png';
import GenderModel from '../../components/GenderModel'

const { width } = Dimensions.get('window');

const ProfileSetup = ({ navigation }) => {
    const [unit, setUnit] = useState('cm');
    const [formData, setFormData] = useState({
        fullName: "",
        gender: "",
        height: "",
        address: "",
        phone: "",
        email: "",
    });
    const [gender, setGender] = useState('');
    const [genderModal, setGenderModal] = useState(false);


    const handleContinue = () => {
        navigation.replace("main");
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20} >
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.header}>Basic Profile Setup</Text>

                    <View style={styles.avatarContainer}>
                        <Image
                            source={profileimg}
                            style={styles.avatar}
                        />
                    </View>

                    {/* Full Name */}
                    <Text style={styles.label}>Full Name <Text style={{ color: COLORS.error }}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        value={formData.fullName}
                        placeholder='Enter your name...'
                        placeholderTextColor={COLORS.lightText}
                        onChangeText={(text) =>
                            setFormData(prev => ({ ...prev, fullName: text }))
                        } />

                    <View style={styles.infoRow}>
                        <Icon name="information-outline" size={16} color={COLORS.mediumText} />
                        <Text style={styles.infoText}>
                            Your profile name needs to match the name in the blood test results you get from the lab.
                        </Text>
                    </View>

                    {/* Gender */}
                    <Text style={styles.label}>Gender</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setGenderModal(true)}
                    >
                        <Text style={[styles.dropdownText, !gender && { color: COLORS.mediumText }]}>
                            {gender || 'Please Choose'}
                        </Text>
                        <Icon name="chevron-down" size={22} color={COLORS.mediumText} />
                    </TouchableOpacity>

                    <GenderModel genderModal={genderModal} setGenderModal={setGenderModal} setGender={setGender} />

                    {/* Height */}
                    <Text style={styles.label}>Height</Text>
                    <View style={styles.heightRow}>
                        <TextInput
                            placeholder='Height'
                            placeholderTextColor={COLORS.lightText}
                            style={[styles.input, { flex: 1, color: COLORS.inputText }]} keyboardType="numeric" />

                        <View style={styles.unitRow}>
                            <TouchableOpacity
                                style={[styles.unitBtn, unit === 'cm' && styles.unitActive]}
                                onPress={() => setUnit('cm')}>
                                <Text style={[styles.unitText, unit === 'cm' && styles.unitTextActive]}>cm</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.unitBtn, unit === 'ft' && styles.unitActive]}
                                onPress={() => setUnit('ft')}>
                                <Text style={[styles.unitText, unit === 'ft' && styles.unitTextActive]}>ft</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Address */}
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        placeholder='Enter your address...'
                        placeholderTextColor={COLORS.lightText}
                        style={[styles.input, { color: COLORS.inputText }]} />

                    {/* Phone */}
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.inputIconWrapper}>
                        <TextInput
                            style={styles.inputFlex}
                            placeholder='Enter your mobile number...'
                            placeholderTextColor={COLORS.lightText}
                            value={formData.phone}
                            onChangeText={(text) =>
                                setFormData(prev => ({ ...prev, phone: text }))
                            }
                            keyboardType="phone-pad" />

                        <Icon name="check" size={20} color={COLORS.success} />
                    </View>

                    {/* Email */}
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputIconWrapper}>
                        <TextInput
                            style={styles.inputFlex}
                            placeholder='Enter your email...'
                            placeholderTextColor={COLORS.lightText}
                            value={formData.email}
                            onChangeText={(text) =>
                                setFormData(prev => ({ ...prev, email: text }))
                            }
                            keyboardType="email-address"
                            autoCapitalize="none"
                        // editable={false}
                        />
                        <Icon name="check" size={20} color={COLORS.success} />
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={handleContinue}>
                        <LinearGradient
                            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ProfileSetup;


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, padding: SIZES.padding },

    header: {
        textAlign: 'center',
        fontSize: width * 0.055,
        fontWeight: SIZES.bold,
        color: COLORS.darkText,
        marginBottom: SIZES.margin,
    },

    avatarContainer: {
        alignItems: 'center', marginBottom: 12
    },
    avatar: {
        width: 100, height: 100, borderRadius: 50
    },

    label: {
        fontSize: SIZES.body2,
        color: COLORS.darkText,
        marginBottom: 6,
        marginTop: 10,
    },

    input: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 25,
        height: 50,
        paddingHorizontal: 18,
        fontSize: SIZES.body,
    },

    infoRow: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'flex-start',
    },

    infoText: {
        fontSize: SIZES.small,
        color: COLORS.mediumText,
        marginLeft: 6,
        flex: 1,
    },

    dropdown: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 25,
        height: 50,
        paddingHorizontal: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    dropdownText: { color: COLORS.mediumText },

    heightRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },

    unitRow: { flexDirection: 'row' },

    unitBtn: {
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 20,
        marginLeft: 8,
    },

    unitActive: { borderColor: COLORS.gradientEnd },

    unitText: { color: COLORS.mediumText },
    unitTextActive: { color: COLORS.gradientEnd },

    inputIconWrapper: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 25,
        height: 50,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },

    inputFlex: { flex: 1, fontSize: SIZES.body },

    buttonContainer: { marginTop: 30 },
    button: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.h5,
        fontWeight: '700',
    },
});
