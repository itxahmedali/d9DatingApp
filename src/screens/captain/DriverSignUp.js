import React from 'react';
import { View, Text, Button } from 'react-native';
import { AppContext, useAppContext } from '../../context/AppContext';

const CapatainSignUp = () => {
  const { state,setState } = useAppContext(AppContext);

  return (
    <View>
      <Text>CapatainSignUp</Text>
      <Button onPress={() => setState(state == "Ahmed" ? "Ali" :"Ahmed")} title="Context Check State" />
    </View>
  );
};

export default CapatainSignUp;
