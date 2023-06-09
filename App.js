import 'react-native-gesture-handler';
import React, { memo, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyStatusBar from './src/Components/StatusBar';
import BottomTabs from './src/Navigation/BottomTabs';
import AuthStack from './src/Navigation/Stacks/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import { navigationRef } from './RootNavigation';
import { AppContext, AppProvider, useAppContext } from './src/Context/AppContext';

const App = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      // Handle permission granted
    }
  };

  const requestNotificationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        await AsyncStorage.setItem('permission', granted === PermissionsAndroid.RESULTS.GRANTED ? 'granted' : 'denied');
      } else {
        const status = await request(PERMISSIONS.IOS.NOTIFICATIONS);
        await AsyncStorage.setItem('permission', status === RESULTS.GRANTED ? 'granted' : 'denied');
      }
    } catch (error) {
      console.log('Error requesting notification permission: ', error);
    }
  };

  const checkNotPer = async () => {
    const checkPermission = await AsyncStorage.getItem('permission');
    askForPermission(checkPermission);
  };

  const askForPermission = checkPermission => {
    if (checkPermission === 'granted') {
      // Handle permission granted
    } else {
      const checkAndRequestNotificationPermission = async () => {
        try {
          const status = await check(
            Platform.OS === 'android'
              ? PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
              : PERMISSIONS.IOS.NOTIFICATIONS,
          );
          if (status === RESULTS.GRANTED) {
            await AsyncStorage.setItem('permission', 'granted');
          } else {
            await requestNotificationPermission();
          }
        } catch (error) {
          console.log('Error checking notification permission: ', error);
        }
      };

      checkAndRequestNotificationPermission();
    }
  };

  useEffect(() => {
    checkNotPer();
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppProvider>
      <NativeBaseProvider>
        <SafeAreaProvider>
            <MyStatusBar backgroundColor="#000" barStyle="light-content" />
            <NavigationContainer ref={navigationRef}>
              <AppContent />
            </NavigationContainer>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </AppProvider>
  );
};

const AppContent = memo(() => {
  const { token } = useAppContext(AppContext);
  console.log(token);
  return (
    <>
      {!token ? <AuthStack /> : <BottomTabs />}
    </>
  );
});

export default App;