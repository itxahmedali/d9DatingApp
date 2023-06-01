import {createStackNavigator} from '@react-navigation/stack';
import Notifications from '../../../screens/App/Notifications';
import ViewUser from '../../../screens/App/Home/ViewUser/index';
import {useEffect, useState} from 'react';
import socket from '../../../utils/socket';
import {View, Text} from 'react-native';
import {useToast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from 'react-native-size-matters';
import * as RootNavigation from '../../../../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

const Notification = () => {
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

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Notification" component={Notifications} />
      <Stack.Screen name="ViewUser" component={ViewUser} />
    </Stack.Navigator>
  );
};

export default Notification;
