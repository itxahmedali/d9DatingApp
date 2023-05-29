import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {RadioButton, Heading} from '../Index';
import {moderateScale} from 'react-native-size-matters';
import {
  KumbhSansExtraBold,
  black,
  lightestPurple,
  screenWidth,
} from '../../constants/Index';
import {AppContext} from '../../context/AppContext';

const CardDetails = ({card, select}) => {
  const {rideDetails, setRideDetails, setPaymentButton} = useContext(AppContext);
  const selectCard = () => {
    const updatedCardDetails = {...rideDetails};
    if (updatedCardDetails.card) {
      updatedCardDetails.card['selected'] = false;
    }
    card['selected'] = true;
    updatedCardDetails.card = card;
    setRideDetails(updatedCardDetails);
    setPaymentButton(card['selected']);
};
useEffect(() => {
      console.log(rideDetails);
  }, [rideDetails])
  

  return (
    <View style={[styles.container]}>
      <View style={styles.column}>
        <Heading
          style={styles.heading}
          text={card?.name}
          fontSize={moderateScale(12)}
          fontFamily={KumbhSansExtraBold}
          color={black}
          textAlign="left"
        />
        <View style={styles.row}>
          <Heading
            style={styles.heading}
            text={card?.number}
            fontSize={moderateScale(10)}
            fontFamily={KumbhSansExtraBold}
            color={black}
            textAlign="left"
          />
          <Heading
            style={[styles.heading, styles.typeHeading]}
            text={card?.type}
            fontSize={moderateScale(10)}
            fontFamily={KumbhSansExtraBold}
            color={black}
            textAlign="left"
          />
        </View>
      </View>
      {select ? (
        <RadioButton selected={card['selected']} onPress={selectCard} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
    backgroundColor: lightestPurple,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(2),
    width: screenWidth - 40,
    marginLeft: moderateScale(20),
    marginRight: moderateScale(20),
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  estimatedPriceHeading: {
    marginBottom: moderateScale(5),
  },
  typeHeading: {
    marginLeft: moderateScale(15),
  },
});

export default CardDetails;
