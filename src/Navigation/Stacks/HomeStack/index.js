import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {useToast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import Home from '../../../screens/App/Home';
import ViewUser from '../../../screens/App/Home/ViewUser/index';
import FunInteraction from '../../../screens/App/Home/FunInteraction';
import Comments from '../../../screens/App/Home/Comments';
import CreatePost from '../../../screens/App/CreatePost';
import Map from '../../../screens/Auth/Register/Map';
import Likes from '../../../screens/App/Home/Likes';
import * as RootNavigation from '../../../../RootNavigation';
import socket from '../../../utils/socket';

const Stack = createStackNavigator();

const HomeStack = () => {
  const [myData, setMyData] = useState('');
  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('userData');
      setMyData(JSON.parse(data));
    };
    getData();

    const handleMessage = ({from, to, message, time}) => {
      if (to == myData?.id) {
        toast.show({
          placement: 'top',
          render: () => {
            return (
              <View
                style={{
                  borderRadius: moderateScale(10, 0.1),
                  paddingVertical: moderateScale(10, 0.1),
                  paddingHorizontal: moderateScale(15, 0.1),
                  backgroundColor: '#FFD700',
                  flexDirection: 'row',
                }}>
                <Icon name={'envelope'} color={'#000'} size={18} />
                <Text
                  style={{color: '#000', marginLeft: moderateScale(10, 0.1)}}>
                  You have a new message
                </Text>
              </View>
            );
          },
        });
      }
    };

    const handleSocketMessage = ({from, to, message, time}) => {
      handleMessage({from, to, message, time});
    };
    const handleRequest = ({from, to, type}) => {
      if (to == myData?.id && type == 'connectRequest') {
        toast.show({
          placement: 'top',
          render: () => {
            return (
              <View
                style={{
                  borderRadius: moderateScale(10, 0.1),
                  paddingVertical: moderateScale(10, 0.1),
                  paddingHorizontal: moderateScale(15, 0.1),
                  backgroundColor: '#FFD700',
                  flexDirection: 'row',
                }}>
                <Icon name={'envelope'} color={'#000'} size={18} />
                <Text
                  style={{color: '#000', marginLeft: moderateScale(10, 0.1)}}>
                  You have a new request
                </Text>
              </View>
            );
          },
        });
      }
    };

    const handleSocketRequest = ({from, to, type}) => {
      handleRequest({from, to, type});
    };
    socket.on('message', handleSocketMessage);
    socket.on('request', handleSocketRequest);

    return () => {
      socket.off('message', handleSocketMessage);
      socket.off('request', handleSocketRequest);
    };
  }, [socket, myData]);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const granted = await AsyncStorage.getItem('permission');
    if (granted == 'granted') {
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        RootNavigation.navigate(remoteMessage.data.screen, {
          data: remoteMessage.data,
        });
      });
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
              remoteMessage
            );
            RootNavigation.navigate(remoteMessage.data.screen, {
              data: remoteMessage.data,
            });
          }
        });
    } else {
      console.log("don't send notification");
    }
  };

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ViewUser" component={ViewUser} />
      <Stack.Screen name="FunInteraction" component={FunInteraction} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="createPost" component={CreatePost} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default HomeStack;
