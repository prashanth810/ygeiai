import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ReactNativeWaveView from 'react-native-waveview';
import { COLORS, SIZES } from '../utils/Constants';

const WaveProgressUI = () => {
    return (
        <View style={styles.container}>
            {/* Main Circular Container */}
            <View style={styles.circleWrapper}>

                {/* Wave Component */}
                <ReactNativeWaveView
                    style={styles.waveBall}
                    H={40} // Controls the water level (Higher = lower water)
                    waveParams={[
                        { A: 10, T: 180, fill: '#6236FF' }, // Darker purple wave
                        { A: 15, T: 140, fill: '#C4B5FD' }, // Lighter purple wave
                    ]}
                    animated={true}
                />

                {/* Text Overlays */}
                <View style={styles.textContainer}>
                    <Text style={styles.percentageText}>30%</Text>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleWrapper: {
        width: 106,
        height: 106,
        borderRadius: 90,
        backgroundColor: COLORS.white, // White background of the circle
        overflow: 'hidden', // This is critical to keep waves inside the circle
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
    },
    waveBall: {
        width: 180,
        aspectRatio: 1,
        position: 'absolute',
        bottom: 0, // Keeps the wave at the bottom
    },
    textContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    percentageText: {
        fontSize: SIZES.h2,
        fontWeight: SIZES.mediumbold,
        color: COLORS.linkText, // Purple color from image
        marginBottom: 23,
    },
    statusText: {
        fontSize: 20,
        fontWeight: '500',
        color: COLORS.linkText,
        opacity: 0.9,
    },
});

export default WaveProgressUI;