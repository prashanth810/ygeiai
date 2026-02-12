import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReactNativeWaveView from 'react-native-waveview';
import { COLORS, SIZES } from '../utils/Constants';

const WaveProgressUI = ({ progress = 30 }) => { // Pass progress as a prop (0 to 100)

    // Ensure progress stays between 0 and 100
    const validatedProgress = Math.min(Math.max(progress, 0), 100);

    // Calculate H: If progress is 80%, H should be 20% of the height (21.2 for a 106 height)
    const containerHeight = 106;
    const waveHeight = containerHeight * (1 - validatedProgress / 100);

    return (
        <View style={styles.container}>
            <View style={styles.circleWrapper}>

                <ReactNativeWaveView
                    style={styles.waveBall}
                    H={waveHeight} // Dynamic height calculation
                    waveParams={[
                        { A: 10, T: 180, fill: '#6236FF' },
                        { A: 15, T: 140, fill: '#C4B5FD' },
                    ]}
                    animated={true}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.percentageText}>{validatedProgress}%</Text>
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
        borderRadius: 53, // Half of width/height for a perfect circle
        backgroundColor: COLORS.white,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    waveBall: {
        width: 106, // Match the container width
        aspectRatio: 1,
        position: 'absolute',
        bottom: 0,
    },
    textContainer: {
        position: 'absolute',
        zIndex: 10, // Ensure text stays on top of the water
    },
    percentageText: {
        fontSize: SIZES.h2,
        fontWeight: '700',
        color: COLORS.linkText,
    },
});

export default WaveProgressUI;