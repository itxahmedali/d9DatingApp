import React, {useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Animated} from 'react-native';
import {SplashLogoAnimation, SplashModalView, SplashBackgroundAnimation} from '../components/Index';
import {white} from '../constants/Index';

const AppSplash = () => {
  const [backgroundState, setBackgroundState] = useState(true);
  const [modalView, setModalView] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SplashBackgroundAnimation backgroundState={backgroundState} />
      <Animated.View style={[styles.overlay, {opacity: fadeAnim}]}>
        <View style={styles.overlay} />
      </Animated.View>
      <SplashLogoAnimation
        setBackgroundState={setBackgroundState}
        setModalView={setModalView}
      />
      {modalView && <SplashModalView modalView={modalView} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: white,
    opacity: 0.7,
  },
});

export default AppSplash;
