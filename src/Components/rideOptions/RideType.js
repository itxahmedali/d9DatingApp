import React, {useContext} from 'react';
import {View, KeyboardAvoidingView, StyleSheet, FlatList} from 'react-native';
import {AppContext} from '../../context/AppContext';
import {CarDetail, Heading, Promo, RideDetail} from '../../components/Index';
import {
  KumbhSansBold,
  rides,
  screenWidth,
  white,
} from '../../constants/Index';
import {moderateScale} from 'react-native-size-matters';

const RideType = () => {
  const {rideDetails} = useContext(AppContext);
  return (
    <KeyboardAvoidingView  behavior="height" enabled style={styles.container}>
      <View style={styles.headingContainer}>
        <Heading
          text="Select Your Type"
          style={null}
          fontSize={moderateScale(18)}
          fontFamily={KumbhSansBold}
          color={white}
          textAlign="center"
        />
      </View>
      <View style={styles.rideDetailContainer}>
        <RideDetail rideDetails={rideDetails} />
      </View>
      <View style={styles.carListContainer}>
        <FlatList
          data={rides}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <CarDetail key={index} car={item} index={index} select={true} />
          )}
        />
      </View>
      <Promo />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:moderateScale(30,0.1)
  },
  headingContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  rideDetailContainer: {
    width: '80%',
    alignItems: 'center',
  },
  carListContainer: {
    width: screenWidth,
    marginTop: moderateScale(15),
  },
});

export default RideType;
