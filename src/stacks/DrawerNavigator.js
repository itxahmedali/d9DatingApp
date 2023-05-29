import React, {useContext, useMemo} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {purple} from '../constants/Index';
import {AppContext} from '../context/AppContext';
import {DriverStack, PassengerStack, CustomDrawerContent} from './Index';

const Drawer = createDrawerNavigator();

export default function DrawerNavigatorScreen() {
  const {role} = useContext(AppContext);

  const drawerContent = useMemo(
    () => props => <CustomDrawerContent {...props} />,
    [],
  );

  const initialRouteName = role === 'passenger' ? 'Passenger' : 'Driver';

  return (
    <Drawer.Navigator
      drawerContent={drawerContent}
      drawerType="front"
      drawerPosition="right"
      drawerStyle={{
        width: '60%',
      }}
      initialRouteName={initialRouteName}>
      {role === 'passenger' ? (
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="Passenger"
          component={PassengerStack}
        />
      ) : (
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="Driver"
          component={DriverStack}
        />
      )}
    </Drawer.Navigator>
  );
}
