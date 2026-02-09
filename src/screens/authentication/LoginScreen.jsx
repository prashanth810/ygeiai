import React, { useState } from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../utils/Constants';
import brandlogo2 from '../../assets/brandlogo2.png';
import applelogo from '../../assets/applelogo.png';
import googlelogo from '../../assets/googlelogo.png';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { handlelogin } from '../../redux/slices/AuthSlice';



const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const dispatch = useDispatch();

    // Email validation
    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(text));
    };

    const handleCreateAccount = async () => {
        if (!emailValid) return;
        if (password.length < 6) return;
        if (!agreeToTerms) return;

        const data = { email, password };

        console.log("✅ data :", data);
        try {
            const result = await dispatch(handlelogin(data)).unwrap();

            console.log("✅ Login Success:", result);

            navigation.replace("home"); // or main screen

        } catch (err) {
            console.log("❌ Login Error:", err);
        }
    };


    const handleSignIn = () => {
        navigation.navigate('SignIn'); // Update route name
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled" >

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image
                        source={brandlogo2}
                        style={{ width: 140, height: 145, resizeMode: 'contain' }}
                    />
                </View>

                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.title}>Get started in a couple</Text>
                    <Text style={styles.title}>of minutes</Text>
                    <Text style={styles.subtitle}>
                        Create your account and join{'\n'}your virtual ygeiai.
                    </Text>
                </View>

                {/* Form Section */}
                <View style={styles.formContainer}>
                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
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
                                    style={styles.inputIcon} />
                            )}
                        </View>
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
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
                                style={styles.inputIcon}>
                                {showPassword ? (<Feather name="eye"
                                    size={16}
                                    color={COLORS.mediumText} />) : (<Feather name="eye-off" size={16} />)}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Terms and Conditions Checkbox */}
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setAgreeToTerms(!agreeToTerms)}
                        activeOpacity={0.7} >

                        <View style={styles.checkbox}>
                            {agreeToTerms && (
                                <Icon name="check" size={16} color={COLORS.success} />
                            )}
                        </View>
                        <Text style={styles.checkboxText}>
                            I agree to ygeiai{' '}
                            <Text style={styles.linkText}>Terms of Services</Text> and{' '}
                            <Text style={styles.linkText}>Privacy Policy</Text>
                        </Text>
                    </TouchableOpacity>

                    {/* Create Account Button */}
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={handleCreateAccount}
                        activeOpacity={0.8}
                        disabled={!emailValid || password.length < 6 || !agreeToTerms} >
                        <LinearGradient
                            colors={[COLORS.gradientEnd, COLORS.gradientStart]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[
                                styles.button,
                                (!emailValid || password.length < 6 || !agreeToTerms) &&
                                styles.buttonDisabled,
                            ]} >

                            <Text style={styles.buttonText}>Create account</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Divider */}
                    <Text style={styles.dividerText}>or sign in with</Text>

                    {/* Social Login Buttons */}
                    <View style={styles.socialContainer}>
                        <TouchableOpacity
                            style={styles.socialButton}
                            onPress={() => handleSocialLogin('Apple')}
                            activeOpacity={0.7}
                        >
                            <Image source={applelogo} style={styles.socialIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.socialButton}
                            onPress={() => handleSocialLogin('Google')}
                            activeOpacity={0.7}
                        >
                            <Image source={googlelogo} style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View>

                    {/* Sign In Link */}
                    <View style={styles.signInContainer}>
                        <Text style={styles.signInText}>You have an account? </Text>
                        <TouchableOpacity onPress={handleSignIn}>
                            <Text style={styles.signInLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default LoginScreen;

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
    },
    logoPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    logoText: {
        fontSize: width * 0.065,
        fontWeight: '700',
        color: COLORS.darkText,
        letterSpacing: 1,
    },
    logoSubtext: {
        fontSize: width * 0.032,
        color: COLORS.mediumText,
        marginTop: 2,
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
        letterSpacing: 0.5
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
    dividerText: {
        fontSize: SIZES.body2,
        color: COLORS.lightText,
        textAlign: 'center',
        marginVertical: 20,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginBottom: 24,
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        elevation: 2,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    socialIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,  // round
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
    },

});