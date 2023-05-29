import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import Svg, {LinearGradient, Path, Stop} from 'react-native-svg';

const WavesAnimated = () => {
  const wave1TranslateY = useRef(new Animated.Value(0)).current;
  const wave2TranslateY = useRef(new Animated.Value(0)).current;
  const wave3TranslateY = useRef(new Animated.Value(0)).current;
  const wave4TranslateY = useRef(new Animated.Value(0)).current;
  const wave5TranslateY = useRef(new Animated.Value(0)).current;
  const wave6TranslateY = useRef(new Animated.Value(0)).current;
  const wave7TranslateY = useRef(new Animated.Value(0)).current;
  const wave8TranslateY = useRef(new Animated.Value(0)).current;

  const wave1TranslateX = useRef(new Animated.Value(0)).current;
  const wave2TranslateX = useRef(new Animated.Value(0)).current;
  const wave3TranslateX = useRef(new Animated.Value(0)).current;
  const wave4TranslateX = useRef(new Animated.Value(0)).current;
  const wave5TranslateX = useRef(new Animated.Value(0)).current;
  const wave6TranslateX = useRef(new Animated.Value(0)).current;
  const wave7TranslateX = useRef(new Animated.Value(0)).current;
  const wave8TranslateX = useRef(new Animated.Value(0)).current;

  const [waveHeight, setWaveHeight] = useState('100%');
  const [waveWidth, setWaveWidth] = useState('100%');

  useEffect(() => {
    const waveAnimation1 = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave1TranslateY, {
            toValue: -10,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave1TranslateY, {
            toValue: 0,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave1TranslateX, {
            toValue: -100,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave1TranslateX, {
            toValue: 0,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }

    const waveAnimation2 = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave2TranslateY, {
            toValue: -15,
            duration: 2200,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave2TranslateY, {
            toValue: 0,
            duration: 2200,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave2TranslateX, {
            toValue: -100,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave2TranslateX, {
            toValue: 0,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }

    const waveAnimation3 = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave3TranslateY, {
            toValue: -12,
            duration: 2300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave3TranslateY, {
            toValue: 0,
            duration: 2300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave3TranslateX, {
            toValue: -100,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave3TranslateX, {
            toValue: 0,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }

    const waveAnimation4 = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave4TranslateY, {
            toValue: -13,
            duration: 2400,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave4TranslateY, {
            toValue: 0,
            duration: 2400,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave4TranslateX, {
            toValue: -13,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave4TranslateX, {
            toValue: 0,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }

    const waveAnimation5 = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave5TranslateY, {
            toValue: -11,
            duration: 2600,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave5TranslateY, {
            toValue: 0,
            duration: 2600,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave5TranslateX, {
            toValue: -11,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave5TranslateX, {
            toValue: 0,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }

    const waveAnimation6 = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave6TranslateY, {
            toValue: -14,
            duration: 2100,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave6TranslateY, {
            toValue: 0,
            duration: 2100,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave6TranslateX, {
            toValue: -14,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave6TranslateX, {
            toValue: 0,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }

    const waveAnimation7 = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave7TranslateY, {
            toValue: -16,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave7TranslateY, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave7TranslateX, {
            toValue: -18,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave7TranslateX, {
            toValue: 0,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }

    const waveAnimation8 = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave8TranslateY, {
            toValue: -9,
            duration: 2700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave8TranslateY, {
            toValue: 0,
            duration: 2700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave8TranslateX, {
            toValue: -11,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave8TranslateX, {
            toValue: 0,
            duration: 9700,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }

    waveAnimation1();
    waveAnimation2();
    waveAnimation3();
    waveAnimation4();
    waveAnimation5();
    waveAnimation6();
    waveAnimation7();
    waveAnimation8();

    return () => {
      waveAnimation1();
      waveAnimation2();
      waveAnimation3();
      waveAnimation4();
      waveAnimation5();
      waveAnimation6();
      waveAnimation7();
      waveAnimation8();
    };
  }, []);

  const W1 = () => {
    return (
      <Svg height={waveHeight} width={waveWidth} viewBox="0 0 2249.46 1313.23">
        <LinearGradient
          id="linear-gradient"
          x1="46.19"
          y1="943.27"
          x2="46.19"
          y2="230.35"
          gradientUnits="userSpaceOnUse">
          <Stop offset="63%" stopColor="#fff" stopOpacity="0" />
          <Stop offset="71%" stopColor="#0001c9" stopOpacity="0" />
          <Stop offset="86%" stopColor="#0001c9" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#00019d" stopOpacity="0.7" />
        </LinearGradient>
        <Path
          d="m2195.46,265.25c-156.13-27.31-188.52-116.25-399.47-116.25-249.23,0-249.23,124.13-498.46,124.13s-249.22-124.13-498.44-124.13-249.17,124.13-498.35,124.13c-152.86,0-211.99-46.69-292.36-82.8v671.6h2187.08V265.25Z"
          fill="url(#linear-gradient)"
        />
      </Svg>
    );
  };

  const W2 = () => {
    return (
      <Svg height={waveHeight} width={waveWidth} viewBox="0 0 2249.46 1313.23">
        <LinearGradient
          id="linear-gradient-2"
          x1="42"
          y1="1082.82"
          x2="42"
          y2="369.9"
          gradientUnits="userSpaceOnUse">
          <Stop offset="63%" stopColor="#fff" stopOpacity="0" />
          <Stop offset="71%" stopColor="#0001c9" stopOpacity="0" />
          <Stop offset="86%" stopColor="#0001c9" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#00019d" stopOpacity="0.2" />
        </LinearGradient>
        <Path
          d="m2044.5,412.68c-249.19,0-249.19-124.13-498.38-124.13s-249.23,124.13-498.46,124.13-249.22-124.13-498.44-124.13-249.17,124.13-498.35,124.13c-18.24,0-35.11-.68-50.87-1.91v590.71h2195.46V392.36c-39.54,12.14-87.04,20.31-150.95,20.31Z"
          fill="url(#linear-gradient-2)"
        />
      </Svg>
    );
  };

  const W3 = () => {
    return (
      <Svg height={waveHeight} width={waveWidth} viewBox="0 0 2249.46 1313.23">
        <LinearGradient
          id="linear-gradient-3"
          x1="50.7"
          y1="1255.03"
          x2="50.7"
          y2="542.11"
          gradientUnits="userSpaceOnUse">
          <Stop offset="63%" stopColor="#fff" stopOpacity="0" />
          <Stop offset="71%" stopColor="#0001c9" stopOpacity="0" />
          <Stop offset="86%" stopColor="#0001c9" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#00019d" stopOpacity="0.7" />
        </LinearGradient>
        <Path
          d="m2195.46,575.33c-148.44-29.08-183.62-114.58-390.43-114.58-249.23,0-249.23,124.13-498.46,124.13s-249.22-124.13-498.44-124.13-249.17,124.13-498.35,124.13c-152.86,0-211.99-46.69-292.36-82.8v671.6h2178.05v-598.35Z"
          fill="url(#linear-gradient-3)"
        />
      </Svg>
    );
  };

  const W4 = () => {
    return (
      <Svg height={waveHeight} width={waveWidth} viewBox="0 0 2249.46 1313.23">
        <LinearGradient
          id="linear-gradient-4"
          x1="42"
          y1="1394.58"
          x2="42"
          y2="681.65"
          gradientUnits="userSpaceOnUse">
          <Stop offset="63%" stopColor="#fff" stopOpacity="0" />
          <Stop offset="71%" stopColor="#0001c9" stopOpacity="0" />
          <Stop offset="86%" stopColor="#0001c9" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#00019d" stopOpacity="0.7" />
        </LinearGradient>
        <Path
          d="m2116.75,724.43c-249.19,0-249.19-124.13-498.38-124.13s-249.23,124.13-498.46,124.13-249.22-124.13-498.44-124.13-249.17,124.13-498.35,124.13c-49.62,0-89.32-4.94-123.12-12.82v601.61h2195.46v-593.6c-23.31,3.06-49.25,4.81-78.7,4.81Z"
          fill="url(#linear-gradient-4)"
        />
      </Svg>
    );
  };

  const W5 = () => {
    return (
      <Svg height={waveHeight} width={waveWidth} viewBox="0 0 2249.46 1313.23">
        <LinearGradient
          id="linear-gradient-5"
          x1="100.19"
          y1="794.27"
          x2="100.19"
          y2="81.35"
          gradientUnits="userSpaceOnUse">
          <Stop offset="63%" stopColor="#fff" stopOpacity="0" />
          <Stop offset="71%" stopColor="#0001c9" stopOpacity="0" />
          <Stop offset="86%" stopColor="#0001c9" stopOpacity="0.1" />
          <Stop offset="100%" stopColor="#00019d" stopOpacity="0.1" />
        </LinearGradient>
        <Path
          d="m2249.46,116.25C2093.33,88.94,2060.93,0,1849.99,0c-249.23,0-249.23,124.13-498.46,124.13S1102.31,0,853.09,0s-249.17,124.13-498.35,124.13c-152.86,0-211.99-46.69-292.36-82.8v671.6h2187.08V116.25Z"
          fill="url(#linear-gradient-5)"
        />
      </Svg>
    );
  };

  const W6 = () => {
    return (
      <Svg height={waveHeight} width={waveWidth} viewBox="0 0 2249.46 1313.23">
        <LinearGradient
          id="linear-gradient-6"
          x1="96"
          y1="933.82"
          x2="96"
          y2="220.9"
          gradientUnits="userSpaceOnUse">
          <Stop offset="63%" stopColor="#fff" stopOpacity="0" />
          <Stop offset="71%" stopColor="#0001c9" stopOpacity="0" />
          <Stop offset="86%" stopColor="#0001c9" stopOpacity="0.1" />
          <Stop offset="100%" stopColor="#00019d" stopOpacity="0.1" />
        </LinearGradient>
        <Path
          d="m2098.5,263.68c-249.19,0-249.19-124.13-498.38-124.13s-249.23,124.13-498.46,124.13-249.22-124.13-498.44-124.13-249.17,124.13-498.35,124.13c-18.24,0-35.11-.68-50.87-1.91v590.71h2195.46V243.36c-39.54,12.14-87.04,20.31-150.95,20.31Z"
          fill="url(#linear-gradient-6)"
        />
      </Svg>
    );
  };

  const W7 = () => {
    return (
      <Svg height={waveHeight} width={waveWidth} viewBox="0 0 2249.46 1313.23">
        <LinearGradient
          id="linear-gradient-7"
          x1="104.7"
          y1="1106.03"
          x2="104.7"
          y2="393.11"
          gradientUnits="userSpaceOnUse">
          <Stop offset="63%" stopColor="#fff" stopOpacity="0" />
          <Stop offset="71%" stopColor="#0001c9" stopOpacity="0" />
          <Stop offset="86%" stopColor="#0001c9" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#00019d" stopOpacity="0.4" />
        </LinearGradient>
        <Path
          d="m2249.46,426.33c-148.44-29.08-183.62-114.58-390.43-114.58-249.23,0-249.23,124.13-498.46,124.13s-249.22-124.13-498.44-124.13-249.17,124.13-498.35,124.13c-152.86,0-211.99-46.69-292.36-82.8v671.6h2178.05V426.33Z"
          fill="url(#linear-gradient-7)"
        />
      </Svg>
    );
  };

  const W8 = () => {
    return (
      <Svg height={waveHeight} width={waveWidth} viewBox="0 0 2249.46 1313.23">
        <LinearGradient
          id="linear-gradient-8"
          x1="96"
          y1="1245.58"
          x2="96"
          y2="532.65"
          gradientUnits="userSpaceOnUse">
          <Stop offset="63%" stopColor="#fff" stopOpacity="0" />
          <Stop offset="71%" stopColor="#0001c9" stopOpacity="0" />
          <Stop offset="86%" stopColor="#0001c9" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#00019d" stopOpacity="0.3" />
        </LinearGradient>
        <Path
          d="m2170.75,575.43c-249.19,0-249.19-124.13-498.38-124.13s-249.23,124.13-498.46,124.13-249.22-124.13-498.44-124.13-249.17,124.13-498.35,124.13c-49.62,0-89.32-4.94-123.12-12.82v601.61h2195.46v-593.6c-23.31,3.06-49.25,4.81-78.7,4.81Z"
          fill="url(#linear-gradient-8)"
        />
      </Svg>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/backgroundPlain.png')}
      resizeMode="stretch"
      style={{
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'flex-end',
        position: 'relative',
      }}>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          height: '100%',
          transform: [{scale: 3.1}],
        }}>
         <Animated.View
          style={{
            transform: [
              {translateY: wave1TranslateY},
              {
                translateX: wave1TranslateX,
              },
            ],
            ...styles.waves,
          }}>
          <W1 />
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              {translateY: wave2TranslateY},
              {
                translateX: wave2TranslateX,
              },
            ],
            ...styles.waves,
          }}>
          <W2 />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateY: wave3TranslateY},
              {
                translateX: wave3TranslateY,
              },
            ],
            ...styles.waves,
          }}>
          <W3 />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateY: wave4TranslateY},
              {
                translateX: wave4TranslateY,
              },
            ],
            ...styles.waves,
          }}>
          <W4 />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateY: wave5TranslateY},
              {
                translateX: wave5TranslateX,
              },],
            ...styles.waves,
          }}>
          <W5 />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateY: wave6TranslateY},
              {
                translateX: wave6TranslateX,
              }
            ],
            ...styles.waves,
          }}>
          <W6 />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateY: wave7TranslateY},
              {
                translateX: wave7TranslateX,
              }
            ],
            ...styles.waves,
          }}>
          <W7 />
        </Animated.View> 
        <Animated.View
          style={{
            transform: [{translateY: wave8TranslateY},
              {
                translateX: wave8TranslateX,
              }
            ],
            ...styles.waves,
          }}>
          <W8 />
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waves: {
    height: 300,
    width: '120%',
    position: 'absolute',
    bottom: '20%',
  },
});

export default WavesAnimated;
