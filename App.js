import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';
import {PaperProvider} from 'react-native-paper';
import MainApp from './src/navigation/MainApp';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={() =>
            setTimeout(() => {
              SplashScreen.hide();
            }, 3000)
          }>
          <SafeAreaView style={{flex: 1}}>
            <MainApp />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
