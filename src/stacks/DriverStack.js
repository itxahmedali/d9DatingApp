import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home,Profile, Setting} from '../screens/Index';
const Stack = createStackNavigator();
const DriverStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Setting} />
      </>
    </Stack.Navigator>
  );
};

export default DriverStack;