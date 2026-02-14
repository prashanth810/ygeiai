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
import AiSuggetions from './../screens/suggetions/AiSuggetions';
import ReminderList from './../screens/suggetions/ReminderList';
import Addreminder from './../screens/suggetions/Addreminder';
import ReminderNote from './../screens/suggetions/ReminderNote';
import Notifications from '../components/Notifications';
import UserProfile from './../screens/user profile/UserProfile';

const Stack = createNativeStackNavigator();

const MainStackNav = () => {
    return (
        <View style={styles.container}>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="home"
            >
                <Stack.Screen name="home" component={HomeScreen} />
                <Stack.Screen name="reports" component={ResportList} />
                <Stack.Screen name="calendar" component={Calendartimings} />
                <Stack.Screen name="reportdetails" component={ReportDetails} />
                <Stack.Screen name="biomarketlist" component={BiomarkerList} />
                <Stack.Screen name="overview" component={BiomarkerOverview} />
                <Stack.Screen name="aisuggetions" component={AiSuggetions} />
                <Stack.Screen name="reminderlist" component={ReminderList} />
                <Stack.Screen name="addreminder" component={Addreminder} />
                <Stack.Screen name="addremindernote" component={ReminderNote} />
                <Stack.Screen name="notifications" component={Notifications} />
                <Stack.Screen name="userprofile" component={UserProfile} />
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
