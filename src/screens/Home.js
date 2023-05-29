import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {AppContext, useAppContext} from '../context/AppContext';
import {Button, DrawerHeader} from '../components/Index';
import {moderateScale} from 'react-native-size-matters';
import {purple, white} from '../constants/Index';
const Home = ({navigation}) => {
  const {rideStages, setRideStages, findRideButton} = useAppContext(AppContext);
  const findRide = () => {
    setRideStages('findType');
  };
  return (
    <View style={styles.container}>
      {console.log(findRideButton)}
      <DrawerHeader navigate={navigation} style={styles.drawerHeader} />
      {rideStages == 'initial' ? (
          !findRideButton ? (
            <ActivityIndicator style={styles.finRideButton} size="large" color="#000000" />
          ) : (
            <Button
              style={styles.finRideButton}
              fontSize={moderateScale(14)}
              backgroundColor={purple}
              color={white}
              text="Find My Ride"
              padding={moderateScale(10)}
              textAlign="center"
              borderRadius={moderateScale(100)}
              width="50%"
              onPress={() => findRide()}
            />
          )
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
  },
  drawerHeader: {
    position: 'absolute',
    top: moderateScale(0),
    left: moderateScale(0),
    right: moderateScale(0),
  },
  finRideButton: {
    position: 'absolute',
    bottom: moderateScale(50),
  },
});
export default Home;
