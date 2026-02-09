import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import AppNavigator from '../ygeiai/src/navigators/AppNavigator';
import { Provider } from 'react-redux';
import Store from './src/redux/store/Store.js'

export default function App() {
  return (
    <Provider store={Store}>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#0000', // white text
    fontSize: 20,
    fontWeight: 'bold',
  },
});
