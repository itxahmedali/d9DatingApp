import {Animated,StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {lightPurple, screenWidth} from '../constants/Index';
const BottomCircleProp = () => {
  const CirclePropBottomAnimation = new Animated.Value(screenWidth + 150);

  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    Animated.timing(CirclePropBottomAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
        style={[
          styles.CirclePropBottom,
          {transform: [{translateY: CirclePropBottomAnimation}]},
        ]}
      />
  )
}
const styles = StyleSheet.create({
    CirclePropBottom: {
      position: 'absolute',
      bottom: moderateScale(-200),
      left: moderateScale(-70),
      backgroundColor: lightPurple,
      width: moderateScale(380),
      height: moderateScale(380),
      borderRadius: moderateScale(500),
      opacity: 0.3,
      zIndex: -10,
    }
  });
export default BottomCircleProp