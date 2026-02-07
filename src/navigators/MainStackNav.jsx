import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// bottom navigator
import BottomNavigator from './BottomNavigator';

// screens to navigatons
import HomeScreen from '../screens/home/HomeScreen';
import ResportList from '../screens/reports/ResportList';
import Calendartimings from '../screens/calendar/Calendartimings';
import ReportDetails from './../screens/reports/ReportDetails';
import BiomarkerList from './../screens/reports/BiomarkerList';
import BiomarkerOverview from './../screens/reports/BiomarkerOverview';

const Stack = createNativeStackNavigator();

const MainStackNav = () => {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="home" component={HomeScreen} />
                <Stack.Screen name="reports" component={ResportList} />
                <Stack.Screen name="calendar" component={Calendartimings} />
                <Stack.Screen name="reportdetails" component={ReportDetails} />
                <Stack.Screen name="biomarketlist" component={BiomarkerList} />
                <Stack.Screen name="overview" component={BiomarkerOverview} />
            </Stack.Navigator>

            {/* Always on top */}
            <BottomNavigator />
        </View>
    );
};

export default MainStackNav;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
