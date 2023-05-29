import {TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import {Icon} from '../components/Index'
import { white } from '../constants/Index';
const HeaderToggleButton = ({drawer}) => {
  return (
    <TouchableOpacity
        style={styles.buttonPosition}
        onPress={() => drawer.toggleDrawer()}>
          <Icon name={'bars'} size={25} color={white}/>
      </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  buttonPosition:{
  }
});
export default HeaderToggleButton