import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const PassengerStack = createStackNavigator();
const DriverStack = createStackNavigator();
const CommonStack = createStackNavigator();

// Screens before authentication
export const BeforeAuthPassengerScreens = () => (
<PassengerStack.Navigator>
{/* Add your screens here */}
</PassengerStack.Navigator>
);

export const BeforeAuthDriverScreens = () => (
<DriverStack.Navigator>
{/* Add your screens here */}
</DriverStack.Navigator>
);

// Screens after authentication
export const AfterAuthPassengerScreens = () => (
<PassengerStack.Navigator>
{/* Add your screens here */}
</PassengerStack.Navigator>
);

export const AfterAuthDriverScreens = () => (
<DriverStack.Navigator>
{/* Add your screens here */}
</DriverStack.Navigator>
);

// Common Stack with custom splash screen
export const CommonScreens = () => (
<CommonStack.Navigator>
{/* Add your screens here, including the custom splash screen */}
</CommonStack.Navigator>
);