import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { COLORS, SIZES } from '../utils/Constants';

const BottomNavigator = () => {
    const navigation = useNavigation();

    // ✅ FIX: Get the actual current screen name, even if nested
    const currentRoute = useNavigationState(state => {
        // Get the active route in the navigation state
        const route = state.routes[state.index];

        // If this route has nested state (like MainStackNav), get the nested route
        if (route.state) {
            const nestedRoute = route.state.routes[route.state.index];
            return nestedRoute.name;
        }

        return route.name;
    });

    const isActive = (screen) => currentRoute === screen;

    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity onPress={() => navigation.navigate('main', { screen: 'home' })}>
                <Icon
                    name="home-outline"
                    size={28}
                    color={isActive('home') ? COLORS.gradientEnd : COLORS.mediumText}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('main', { screen: 'reports' })}>
                <Icon
                    name="file-document-outline"
                    size={28}
                    color={isActive('reports') ? COLORS.gradientEnd : COLORS.mediumText}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.centerBtn} onPress={() => navigation.navigate('Scan')}>
                <Icon name="qrcode-scan" size={26} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('calendar')}>
                <Icon
                    name="calendar-outline"
                    size={27}
                    color={isActive('Calendar') ? COLORS.gradientEnd : COLORS.mediumText}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('main', { screen: 'userprofile' })}>
                <Icon
                    name="account-outline"
                    size={28}
                    color={isActive('userprofile') ? COLORS.gradientEnd : COLORS.mediumText}
                />
            </TouchableOpacity>
        </View>
    );
};

export default BottomNavigator;

const styles = StyleSheet.create({
    bottomNav: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: COLORS.white,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        // 🔥 IMPORTANT
        elevation: 20,     // Android shadow
        zIndex: 999,       // iOS stacking
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
    },

    centerBtn: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: COLORS.gradientEnd,
        justifyContent: 'center',
        alignItems: 'center',
    },
});