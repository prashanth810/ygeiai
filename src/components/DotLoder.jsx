import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';


const DotLoder = () => {
    const rotate = useSharedValue(0);

    useEffect(() => {
        rotate.value = withRepeat(
            withTiming(360, { duration: 1500, easing: Easing.linear }),
            -1
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    const dots = Array.from({ length: 8 });

    return (
        <Animated.View style={[styles.loaderContainer, animatedStyle]}>
            {dots.map((_, i) => {
                const angle = (i * 360) / 8;
                return (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            {
                                transform: [{ rotate: `${angle}deg` }, { translateY: -28 }],
                                opacity: i / 8 + 0.2,
                            },
                        ]}
                    />
                );
            })}
        </Animated.View>
    );
};


export default DotLoder;

const styles = StyleSheet.create({
    loaderContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dot: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#fff',
    },

})