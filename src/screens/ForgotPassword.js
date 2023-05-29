import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated, KeyboardAvoidingView} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {
  primaryHeadingColor,
  purple,
  white,
  KumbhSansExtraBold,
  screenWidth,
  black,
} from '../constants/Index';
import {
  Heading,
  Button,
  Input,
  TopLeftCircleProp,
  BottomCircleProp,
} from '../components/Index';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    startAnimations();
  }, []);

  const QuestionMarkAnimation = new Animated.Value(screenWidth + 250);

  const startAnimations = () => {
    Animated.sequence([
      Animated.timing(QuestionMarkAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(QuestionMarkAnimation, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <TopLeftCircleProp />
      <View style={styles.headingBox}>
        <Heading
          style={null}
          text="Forget Password"
          fontSize={moderateScale(40)}
          fontFamily={KumbhSansExtraBold}
          color={primaryHeadingColor}
          textAlign="left"
        />
        <View style={styles.InputBox}>
          <Input
            placeholderTextColor={black}
            style={{marginBottom: 16}}
            placeholder="Email"
            value={email}
            setValue={setEmail}
            type="text"
          />
        </View>
        <View style={styles.signInButtonContainer}>
          <Button
            style={null}
            fontSize={moderateScale(14)}
            backgroundColor={purple}
            color={white}
            text="Send"
            padding={moderateScale(10)}
            textAlign="center"
            borderRadius={moderateScale(100)}
            width="50%"
            onPress={() => {}}
          />
        </View>
      </View>
      <Animated.Image
        style={[
          styles.QuestionMarkProp,
          {
            transform: [
              {
                translateY: QuestionMarkAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [screenWidth + 250, 0],
                }),
              },
              {
                scale: QuestionMarkAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
        resizeMode="contain"
        source={require('../../assets/Images/QuestionMarkProp.png')}
      />
      <BottomCircleProp />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headingBox: {
    width: moderateScale(screenWidth - 100),
  },
  InputBox: {
    marginTop: moderateScale(20),
  },
  signInButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(15),
  },
  QuestionMarkProp: {
    position: 'absolute',
    bottom: moderateScale(10),
    right: moderateScale(100),
    width: moderateScale(200),
    resizeMode: 'contain',
    height: moderateScale(180),
  },
});

export default ForgotPassword;
