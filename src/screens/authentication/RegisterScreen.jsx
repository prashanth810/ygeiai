import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    StatusBar,
    Platform,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../utils/Constants';
import brandlogo2 from '../../assets/brandlogo2.png';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { handleRegister } from '../../redux/slices/AuthSlice';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading, error, data } = useSelector(state => state.Auth.register);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    // Email validation
    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(text));
    };

    // Handle successful registration
    useEffect(() => {
        if (data && !loading) {
            Alert.alert(
                'Success',
                'Registration successful! Please login.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('login')
                    }
                ]
            );
        }
    }, [data, loading]);

    // Handle registration error
    useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
        }
    }, [error]);

    const handleSignup = async () => {
        if (emailValid && password.length >= 6 && name.trim() && agreeToTerms) {
            try {
                await dispatch(handleRegister({
                    name,
                    email,
                    password,
                    phone: phone || undefined,
                    address: address || undefined,
                })).unwrap();
            } catch (error) {
                console.error('Registration failed:', error);
            }
        } else {
            Alert.alert('Validation Error', 'Please fill all required fields');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image
                        source={brandlogo2}
                        style={{ width: 140, height: 145, resizeMode: 'contain' }}
                    />
                </View>

                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.title}>Create your account</Text>
                    <Text style={styles.subtitle}>
                        Join us and start your journey
                    </Text>
                </View>

                {/* Form Section */}
                <View style={styles.formContainer}>
                    {/* Name Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name <Text style={styles.required}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="John Doe"
                                placeholderTextColor={COLORS.placeholderText}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                        </View>
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="youremail@gmail.com"
                                placeholderTextColor={COLORS.placeholderText}
                                value={email}
                                onChangeText={validateEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {emailValid && (
                                <Feather
                                    name="check"
                                    size={18}
                                    color={COLORS.success}
                                    style={styles.inputIcon}
                                />
                            )}
                        </View>
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password <Text style={styles.required}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••••••"
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.inputIcon}
                            >
                                <Feather
                                    name={showPassword ? "eye" : "eye-off"}
                                    size={16}
                                    color={COLORS.mediumText}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Phone Input (Optional) */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="9876543210"
                                placeholderTextColor={COLORS.placeholderText}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* Address Input (Optional) */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Address</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Your address"
                                placeholderTextColor={COLORS.placeholderText}
                                value={address}
                                onChangeText={setAddress}
                            />
                        </View>
                    </View>

                    {/* Terms and Conditions Checkbox */}
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setAgreeToTerms(!agreeToTerms)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.checkbox}>
                            {agreeToTerms && (
                                <Icon name="check" size={16} color={COLORS.success} />
                            )}
                        </View>
                        <Text style={styles.checkboxText}>
                            I agree to{' '}
                            <Text style={styles.linkText}>Terms of Services</Text> and{' '}
                            <Text style={styles.linkText}>Privacy Policy</Text>
                        </Text>
                    </TouchableOpacity>

                    {/* Create Account Button */}
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={handleSignup}
                        activeOpacity={0.8}
                        disabled={!emailValid || password.length < 6 || !name.trim() || !agreeToTerms || loading}
                    >
                        <LinearGradient
                            colors={[COLORS.gradientEnd, COLORS.gradientStart]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[
                                styles.button,
                                (!emailValid || password.length < 6 || !name.trim() || !agreeToTerms || loading) &&
                                styles.buttonDisabled,
                            ]}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color={COLORS.white} />
                            ) : (
                                <Text style={styles.buttonText}>Create account</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Sign In Link */}
                    <View style={styles.signInContainer}>
                        <Text style={styles.signInText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('login')}>
                            <Text style={styles.signInLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: SIZES.paddingHorizontal,
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
        paddingBottom: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerSection: {
        marginBottom: 23,
    },
    title: {
        fontSize: width * 0.065,
        fontWeight: '700',
        color: COLORS.darkText,
        textAlign: 'center',
        lineHeight: width * 0.075,
    },
    subtitle: {
        fontSize: width * 0.038,
        color: COLORS.mediumText,
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 22,
        letterSpacing: 0.5,
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: SIZES.body2,
        fontWeight: '500',
        color: COLORS.darkText,
        marginBottom: 8,
    },
    required: {
        color: '#FF4444',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.inputBackground,
        borderRadius: SIZES.buttonRadius,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        paddingHorizontal: 16,
        height: 52,
    },
    input: {
        flex: 1,
        fontSize: SIZES.body,
        color: COLORS.inputText,
        paddingVertical: 0,
    },
    inputIcon: {
        marginLeft: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 24,
        marginTop: 4,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: COLORS.success,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 2,
    },
    checkboxText: {
        flex: 1,
        fontSize: SIZES.small,
        color: COLORS.darkText,
        lineHeight: 18,
    },
    linkText: {
        color: COLORS.linkText,
        fontWeight: '600',
    },
    buttonContainer: {
        width: '100%',
        height: 56,
        borderRadius: SIZES.buttonRadius,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 4,
        shadowColor: COLORS.gradientEnd,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: SIZES.h5,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    signInText: {
        fontSize: SIZES.body2,
        color: COLORS.mediumText,
    },
    signInLink: {
        fontSize: SIZES.body2,
        color: COLORS.linkText,
        fontWeight: '600',
    },
});
