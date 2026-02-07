import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import Onboardingone from '../screens/onboarding screens/Onboardingone';
import OnboardingTwo from '../screens/onboarding screens/OnboardingTwo';
import LoginScreen from '../screens/authentication/LoginScreen';
import ProfileSetup from '../screens/authentication/ProfileSetup';
import MainStackNav from '../navigators/MainStackNav';
import Latestreports from '../screens/home/Latestreports';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animation: 'slide_from_right', // 👈 applies to ALL screens
            }}>
                <Stack.Screen name="Splash" component={SplashScreen}
                    options={{ animation: 'none' }} // Splash stays static
                />
                <Stack.Screen name="onboardone" component={Onboardingone} />
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="profile" component={ProfileSetup} />
                <Stack.Screen name="main" component={MainStackNav} />

                {/* ====================   without bottom navigators =============== */}
                <Stack.Screen name='latestReportFlow' component={Latestreports} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;