import { View, StyleSheet } from 'react-native';
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Input, Button } from '../Index';
import { black, gray, screenWidth, white } from '../../constants/Index';
import { moderateScale } from 'react-native-size-matters';
import { AppContext } from '../../context/AppContext';

const FindRide = () => {
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [dropOffAddress, setDropOffAddress] = useState('');
  const [noOfPassengers, setNoOfPassengers] = useState('');
  const { setRideDetails, setFindRideButton } = useContext(AppContext);

  const rideDetails = useMemo(() => {
    return {
      pickUpAddress,
      dropOffAddress,
      noOfPassengers,
    };
  }, [pickUpAddress, dropOffAddress, noOfPassengers]);

  useEffect(() => {
    setRideDetails(rideDetails);
  }, [rideDetails, setRideDetails]);

  const checkFields = () => {
    if (pickUpAddress && dropOffAddress && noOfPassengers) {
      setFindRideButton(true);
    } else {
      setFindRideButton(false);
    }
  };

  useEffect(() => {
    checkFields();
    console.log(pickUpAddress,dropOffAddress, noOfPassengers);
  }, [pickUpAddress, dropOffAddress, noOfPassengers]);

  return (
    <View style={styles.container}>
      <Input
        value={pickUpAddress}
        setValue={setPickUpAddress}
        placeholder="Pick Up Address"
        type="text"
        style={styles.input}
        placeholderTextColor={gray}
      />
      <Input
        value={dropOffAddress}
        setValue={setDropOffAddress}
        placeholder="Drop Off Address"
        type="text"
        style={styles.input}
        placeholderTextColor={gray}
      />
      <Input
        value={noOfPassengers}
        setValue={setNoOfPassengers}
        placeholder="No Of Passengers"
        type="text"
        style={styles.input}
        placeholderTextColor={gray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(screenWidth - 50),
  },
  input: {
    backgroundColor: white,
    borderRadius: 100,
    shadowColor: black,
    shadowOffset: { width: 2, height: 30 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    marginVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
  },
  button: {
    marginTop: moderateScale(10),
  },
});

export default FindRide;
