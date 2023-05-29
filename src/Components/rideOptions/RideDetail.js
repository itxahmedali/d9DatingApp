import {View, StyleSheet} from 'react-native';
import React from 'react';
import {
  KumbhSansExtraBold,
  black,
  screenWidth,
  white,
} from '../../constants/Index';
import {LocationDetail} from '../../components/Index';
import {moderateScale} from 'react-native-size-matters';

const RideDetail = ({rideDetails}) => {
  return (
    <View style={styles.container}>
      <LocationDetail rideDetails={rideDetails}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: moderateScale(screenWidth - 50),
    backgroundColor: white,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(15),
    shadowColor: black,
    shadowOffset: { width: 2, height: 30 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10
  }
});
export default RideDetail;
