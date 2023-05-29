import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({
  backgroundColor,
  text,
  width,
  onPress,
  color,
  textAlign,
  borderRadius,
  padding,
  fontSize,
  style,
  fontFamily
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, width, borderRadius, padding }, style]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color, fontSize, textAlign, fontFamily }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default Button;
