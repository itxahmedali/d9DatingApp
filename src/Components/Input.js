import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import {
  KumbhSansExtraBold,
  black,
  gray,
  purple,
  screenWidth,
} from '../constants/Index';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({
  placeholder,
  value,
  setValue,
  type,
  style,
  placeholderTextColor,
  textAlign,
  fontFamily,
  fontSize,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(prevState => !prevState);
  };

  const inputAnimation = new Animated.Value(screenWidth + 250);

  useEffect(() => {
    startInputAnimation();
  }, []);

  const startInputAnimation = () => {
    Animated.timing(inputAnimation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const inputAnimationStyle = {
    ...styles.container,
    ...(isActive && styles.activeContainer),
    ...style,
  };

  return (
    <View style={inputAnimationStyle}>
      <TextInput
        placeholderTextColor={placeholderTextColor}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        textAlign={textAlign}
        fontFamily={fontFamily}
        fontSize={fontSize}
        secureTextEntry={type === 'password' && secureTextEntry}
      />
      {type === 'password' && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={toggleSecureTextEntry}>
          <Icon
            name={secureTextEntry ? 'eye' : 'eye-slash'}
            size={15}
            color={purple}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: gray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeContainer: {
    borderBottomColor: purple,
  },
  input: {
    flex: 1,
    padding: 8,
    color: black,
  },
  eyeButton: {
    padding: 8,
  },
});

export default Input;
