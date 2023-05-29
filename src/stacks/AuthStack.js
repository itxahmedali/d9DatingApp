import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from '../context/AppContext';
import { ForgotPassword,CapatainSignUp,CapatainLogin, SignUp, Login, AppSplash} from '../screens/Index';
const Stack = createStackNavigator();

const AuthNavigator = () => {
  const { role } = useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AppSplash" component={AppSplash} />
      {role === 'passenger' ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      ) : role === 'driver' ? (
        <>
          <Stack.Screen name="CapatainLogin" component={CapatainLogin} />
          <Stack.Screen name="CapatainSignup" component={CapatainSignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      ) : null}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
