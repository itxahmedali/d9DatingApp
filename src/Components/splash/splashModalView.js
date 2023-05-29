import React, { useEffect, useRef, useContext } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Heading, Button } from '../Index';
import {moderateScale} from 'react-native-size-matters';
import { screenHeight, screenWidth, black, lightPurple, white, KumbhSansExtraBold } from '../../constants/Index';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';

const SplashModalView = ({ modalView }) => {
  const translateYAnimation = useRef(new Animated.Value(screenHeight)).current;
  const carAnimation = useRef(new Animated.Value(screenWidth)).current;
  const mapAnimation = useRef(new Animated.Value(0)).current;
  const {setRole} = useContext(AppContext);
  const navigation = useNavigation();
  useEffect(() => {
    const startAnimation = () => {
      if (modalView) {
        Animated.timing(translateYAnimation, {
          toValue: screenHeight / 2 - screenHeight / 1.6 / 2,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(translateYAnimation, {
          toValue: screenHeight,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    };
    const carAnimationTimeout = setTimeout(() => {
      Animated.timing(carAnimation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 0);

    const mapAnimationTimeout = setTimeout(() => {
      Animated.timing(mapAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 0);

    const animationTimeout = setTimeout(startAnimation, 0);

    return () => {
      clearTimeout(carAnimationTimeout);
      clearTimeout(mapAnimationTimeout);
      clearTimeout(animationTimeout);
    };
  }, [modalView, translateYAnimation, carAnimation, mapAnimation]);

  const carStyle = StyleSheet.compose(
    {
      transform: [{ translateX: carAnimation }],
    },
    styles.carProp
  );

  const mapStyle = StyleSheet.compose(
    {
      transform: [{ scale: mapAnimation }],
    },
    styles.mapProp
  );

  const setRoleAndNavigate = role => {
    setRole(role);
    setTimeout(() => {
      if (role === 'driver') {
        navigation.navigate('CapatainLogin');
      } else if (role === 'passenger') {
        navigation.navigate('Login');
      }
    }, 0);
  };

  return (
    <Animated.View style={[styles.viewBox, { transform: [{ translateY: translateYAnimation }] }]}>
      <View style={styles.viewBoxContent}>
        <View style={styles.viewBoxHeadingBox}>
          <Heading
            text="Our Service Is Always There For You."
            fontSize={moderateScale(35)}
            fontFamily={KumbhSansExtraBold}
            color={white}
            textAlign="left"
          />
        </View>
        <Animated.Image style={carStyle} resizeMode="contain" source={require('../../../assets/Images/carProp.png')} />
        <Animated.Image style={mapStyle} resizeMode="contain" source={require('../../../assets/Images/mapProp.png')} />
      </View>
      <View style={styles.viewboxButtons}>
        <Button
          fontSize={moderateScale(14)}
          backgroundColor={white}
          color={black}
          text="Login as Captain"
          padding={moderateScale(10)}
          textAlign="center"
          borderRadius={moderateScale(100)}
          width="40%"
          onPress={() => {
            setRoleAndNavigate('driver');
          }}
        />
        <Button
          fontSize={moderateScale(14)}
          backgroundColor={white}
          color={black}
          text="Get Started"
          padding={moderateScale(10)}
          textAlign="center"
          borderRadius={moderateScale(100)}
          width="40%"
          onPress={() => {
            setRoleAndNavigate('passenger');
          }}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  viewBox: {
    height: moderateScale(screenHeight / 1.2),
    backgroundColor: lightPurple,
    position: 'absolute',
    bottom: moderateScale(0),
    width: moderateScale(screenWidth),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  viewBoxContent: {
    position: 'relative',
    padding: moderateScale(50),
    flex: 1,
  },
  viewBoxHeadingBox: {
    width: moderateScale(screenWidth / 2),
  },
  viewboxButtons: {
    position: 'absolute',
    top: moderateScale(screenHeight / 1.85),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  carProp: {
    position: 'absolute',
    width: '100%',
    bottom: moderateScale(190),
    right: moderateScale(0),
  },
  mapProp: {
    position: 'absolute',
    width: '70%',
    top: moderateScale(0),
    right: moderateScale(0),
  },
});

export default SplashModalView;
