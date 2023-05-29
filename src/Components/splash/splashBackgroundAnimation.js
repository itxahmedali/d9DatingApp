import React, { useEffect, useRef } from 'react';
import { Animated, Image } from 'react-native';

const SplashBackgroundAnimation = ({ backgroundState }) => {
  const scaleAnimation = useRef(new Animated.Value(0.6)).current;
  const backgroundImageSource = require('../../../assets/Images/AppSplashBg.png');

  useEffect(() => {
    if (!backgroundState) {
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [backgroundState, scaleAnimation]);

  return (
    backgroundImageSource && (
      <Animated.Image
        source={backgroundImageSource}
        resizeMode="cover"
        style={{
          transform: [{ scale: scaleAnimation }],
        }}
      />
    )
  );
};

export default SplashBackgroundAnimation;
