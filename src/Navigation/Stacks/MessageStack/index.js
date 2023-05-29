import {createStackNavigator} from '@react-navigation/stack';
import Message from '../../../screens/App/Message/chatList';
import Chat from '../../../screens/App/Message/Chat/chatInner';
import ViewUser from '../../../screens/App/Home/ViewUser';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from '../../../../RootNavigation';
import {navigationRef} from '../../../../RootNavigation';
import {useEffect} from 'react';
const Stack = createStackNavigator();

const MessageStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ViewUser" component={ViewUser} />
    </Stack.Navigator>
  );
};

export default MessageStack;