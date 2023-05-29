import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Heading } from '../Index';
import { moderateScale } from 'react-native-size-matters';
import {
  KumbhSansExtraBold,
  KumbhSansExtraLight,
  KumbhSansExtraRegular,
  black,
  lightestPurple,
  purple,
  white,
} from '../../constants/Index';
import { formatUSDPrice } from '../../constants/HelperFunctions';
import { AppContext } from '../../context/AppContext';

const CarDetail = ({ car, select }) => {
  const { rideDetails, setRideDetails, applyButton, setApplyButton } = useContext(AppContext);
  const getImageSource = () => {
    switch (car?.image) {
      case 'ride1.png':
        return require('../../../assets/Images/ride1.png');
      case 'ride2.png':
        return require('../../../assets/Images/ride2.png');
      default:
        return null;
    }
  };

  const imageSource = getImageSource();

  const selectVehicle = () => {
    const updatedRideDetails = { ...rideDetails };
    if (updatedRideDetails.car) {
      updatedRideDetails.car['selected'] = false;
    }
    car['selected'] = true;
    updatedRideDetails.car = car;

    setRideDetails(updatedRideDetails);
    setApplyButton(car['selected']);
  };

  return (
    <View style={[styles.container, { backgroundColor: select ? (car['selected'] ? lightestPurple : purple) : purple }]}>
      <View style={styles.imageContentBox}>
        <View>
          {imageSource && <Image source={imageSource} resizeMode="contain" />}
        </View>
        <View>
          <Heading
            style={styles.heading}
            text={car?.package}
            fontSize={moderateScale(10)}
            fontFamily={KumbhSansExtraRegular}
            color={white}
            textAlign="left"
          />
          <Heading
            style={styles.heading}
            text={car?.car}
            fontSize={moderateScale(10)}
            fontFamily={KumbhSansExtraRegular}
            color={white}
            textAlign="left"
          />
          <Heading
            style={styles.heading}
            text={car?.number}
            fontSize={moderateScale(10)}
            fontFamily={KumbhSansExtraRegular}
            color={white}
            textAlign="left"
          />
        </View>
      </View>
      <View>
        <Heading
          style={styles.estimatedPriceHeading}
          text="Estimated Fare"
          fontSize={moderateScale(6)}
          fontFamily={KumbhSansExtraLight}
          color={white}
          textAlign="center"
        />
        <Heading
          style={null}
          text={formatUSDPrice(car?.fare)}
          fontSize={moderateScale(16)}
          fontFamily={KumbhSansExtraBold}
          color={white}
          textAlign="center"
        />
      </View>
      {
        select ?
        <Button
          style={null}
          fontSize={moderateScale(14)}
          backgroundColor={white}
          color={black}
          text={car['selected'] ? "Selected" : "Select"}
          padding={moderateScale(5)}
          textAlign="center"
          borderRadius={moderateScale(100)}
          width="25%"
          onPress={selectVehicle}
        />
         : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
    alignItems: 'center',
  },
  estimatedPriceHeading: {
    marginBottom: moderateScale(5)
  },
  imageContentBox: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default CarDetail;