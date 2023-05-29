import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { gray, purple, white } from '../constants/Index';

const RadioButton = ({ selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      {selected && <View style={styles.innerCircle} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor:white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: gray,
  },
});

export default RadioButton;
