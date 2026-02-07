import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../utils/Constants';
import DotLoder from '../../components/DotLoder';



const { width, height } = Dimensions.get('window');

const Latestreports = ({ navigation }) => {
    const [step, setStep] = useState('disclaimer'); // disclaimer | loading | success

    const handlegoback = () => {
        navigation.navigate("main"); // ✅ FIXED: Changed from push to navigate
    }

    const handleAgree = () => {
        setStep('loading');

        setTimeout(() => {
            setStep('success');

            setTimeout(() => {
                // ✅ FIXED: Navigate to 'main' which contains the nested 'reports' screen
                navigation.navigate('main', { screen: 'reports' });
            }, 1500);
        }, 2000);
    };

    // ---------- LOADING & SUCCESS SCREENS ----------
    if (step !== 'disclaimer') {
        return (
            <LinearGradient
                colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                style={styles.fullCenter}>
                <StatusBar barStyle="light-content" />

                {step === 'loading' && (
                    <>
                        <DotLoder size="large" color="#fff" />
                        <Text style={styles.statusText}>Processing...</Text>
                    </>
                )}

                {step === 'success' && (
                    <>
                        <Icon name="check-circle-outline" size={80} color="#fff" />
                        <Text style={styles.statusText}>Uploaded</Text>
                    </>
                )}
            </LinearGradient>
        );
    }

    // ---------- DISCLAIMER SCREEN ----------
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <TouchableOpacity
                style={styles.backBtn}
                onPress={handlegoback}>
                <Icon name="arrow-left" size={22} color="#fff" />
            </TouchableOpacity>

            <View style={styles.iconWrap}>
                <Icon name="alert-outline" size={80} color={COLORS.darkText} />
            </View>

            <Text style={styles.title}>Disclaimer</Text>
            <Text style={styles.sub}>
                To continue with the app, please read {"\n"} through and acknowledge the disclaimer
            </Text>

            <View style={styles.box}>
                <Text style={styles.boxText}>
                    Pop-up screen. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales neque vel mi scelerisque, sit amet tincidunt nulla hendrerit. Nullam at tincidunt nibh. Quisque auctor, nibh nec venenatis tristique, lorem felis aliquam neque, sit amet maximus felis quam at ligula. Suspendisse efficitur, sem vel accumsan interdum, mi nisi semper nulla, in interdum libero diam semper neque. Ut at pulvinar mauris. Quisque varius nibh vel sem eleifend varius. Morbi facilisis tortor nulla, sit amet congue nunc tincidunt id. Suspendisse condimentum enim neque, eget volutpat mauris sodales vel. Donec laoreet justo nec tincidunt semper.
                </Text>
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleAgree}>
                <LinearGradient
                    colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                    style={styles.btnInner}>
                    <Text style={styles.btnText}>I Acknowledge the Disclaimer</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}


export default Latestreports;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bglighdrak, padding: SIZES.padding },

    backBtn: {
        width: 45,
        height: 45,
        borderRadius: 22,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconWrap: { alignItems: 'center', marginVertical: 20 },

    title: {
        textAlign: 'center',
        fontSize: width * 0.058,
        fontWeight: SIZES.bold,
        color: COLORS.darkText,
    },

    sub: {
        textAlign: 'center',
        marginVertical: 10,
        color: COLORS.darkText,
        lineHeight: 20,
        fontSize: SIZES.medium,
        fontWeight: SIZES.mediumbold,
    },

    box: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 20,
        marginVertical: 15,
    },

    boxText: {
        fontSize: SIZES.average,
        color: COLORS.lightText,
        lineHeight: SIZES.h3,
    },

    btn: { marginTop: 'auto' },

    btnInner: {
        height: 56,
        borderRadius: SIZES.buttonRadius,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.small,
    },

    btnText: { color: '#fff', fontWeight: '700' },

    fullCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    statusText: { color: '#fff', marginTop: 15, fontSize: SIZES.body },
});