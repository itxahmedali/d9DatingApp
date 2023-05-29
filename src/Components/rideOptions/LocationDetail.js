import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Heading, Icon} from '../Index';
import {moderateScale} from 'react-native-size-matters';
import {
  KumbhSansExtraBold,
  KumbhSansLight,
  lightPurple
} from '../../constants/Index';

const LocationDetail = ({rideDetails}) => {
  return (
    <View>
      <Heading
        style={styles.heading}
        text="Pick Up"
        fontSize={moderateScale(10)}
        fontFamily={KumbhSansExtraBold}
        color={lightPurple}
        textAlign="left"
      />
      <Heading
        style={styles.heading}
        text={rideDetails?.pickUpAddress}
        fontSize={moderateScale(10)}
        fontFamily={KumbhSansLight}
        color={lightPurple}
        textAlign="left"
      />
      <Icon style={styles.icon} name={'arrow-down'} size={20} color={lightPurple} />
      <Heading
        style={styles.heading}
        text="Drop Off"
        fontSize={moderateScale(10)}
        fontFamily={KumbhSansExtraBold}
        color={lightPurple}
        textAlign="left"
      />
      <Heading
        style={styles.heading}
        text={rideDetails?.dropOffAddress}
        fontSize={moderateScale(10)}
        fontFamily={KumbhSansLight}
        color={lightPurple}
        textAlign="left"
      />
      <Heading
        style={styles.heading}
        text="No. Of Passengers"
        fontSize={moderateScale(10)}
        fontFamily={KumbhSansExtraBold}
        color={lightPurple}
        textAlign="left"
      />
      <Heading
        style={styles.heading}
        text={rideDetails?.noOfPassengers}
        fontSize={moderateScale(30)}
        fontFamily={KumbhSansExtraBold}
        color={lightPurple}
        textAlign="left"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  heading: {
    marginVertical: moderateScale(5)
  },
  icon:{
    marginVertical: moderateScale(10)
  }
});
export default LocationDetail;
