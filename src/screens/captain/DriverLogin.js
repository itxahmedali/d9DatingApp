import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAppContext } from '../../context/AppContext';

const CapatainLogin = () => {
  const { state,setState } = useAppContext();

  return (
    <View>
      <Text>CapatainLogin</Text>
      <Button onPress={() => setState(state == "Ahmed" ? "Ali" :"Ahmed")} title="Context Check State" />
    </View>
  );
};

export default CapatainLogin;
