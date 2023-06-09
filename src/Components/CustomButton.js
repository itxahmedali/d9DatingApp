import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const CustomButton = ({
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
  fontFamily,
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        {backgroundColor, width, borderRadius, padding},
        style,
        disabled && styles.disabledButton,
      ]}
      activeOpacity={0.8}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator
          style={styles.finRideButton}
          size="small"
          color="#fff"
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            {color, fontSize, textAlign, fontFamily},
            disabled && styles.disabledText,
          ]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'grey',
    borderWidth: 1,
    borderColor: 'grey',
  },
  disabledText: {
    color: "#fff",
  },
});

export default CustomButton;