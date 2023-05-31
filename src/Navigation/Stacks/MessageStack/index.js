import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ViewUser from '../../../screens/App/Home/ViewUser';
import Chat from '../../../screens/App/Message/Chat/chatInner';
import Message from '../../../screens/App/Message/chatList';
import InnerChat from '../../../screens/App/Message/Chat/InnerChat';

const Stack = createStackNavigator();

const MessageStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="InnerChat" component={InnerChat} />
      <Stack.Screen name="ViewUser" component={ViewUser} />
    </Stack.Navigator>
  );
};

export default MessageStack;