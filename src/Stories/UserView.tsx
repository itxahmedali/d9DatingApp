/* eslint-disable */
import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  onClosePress: () => void;
  user_id:any,
  profile: string;
  name: string;
  datePublication: string;
  navigation:()=> void
};

const diffDateWithNow = (date) => {
  let startDate = new Date(date);
  return startDate.toLocaleString()
};

export default memo(function UserView(props: Props) {
  return (
    <View style={styles.userView}>
      <Image source={{ uri: props.profile }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={()=> { props.navigation.navigate('ViewUser', {
                  screen: 'search',
                  post: {id: props.user_id},
                });}} style={styles.barUsername}>
          <Text style={styles.name}>{props.name}</Text>
        </TouchableOpacity>

        <Text style={styles.time}>
          {!!props.datePublication &&
            `${diffDateWithNow(props.datePublication)}`}
        </Text>
      </View>
      <TouchableOpacity onPress={props.onClosePress}>
        <Icon name="close" color="white" size={25} style={{ marginRight: 8 }} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  barUsername: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
  verifyIcon: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  userView: {
    flexDirection: "row",
    position: "absolute",
    top: 55,
    width: "98%",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 12,
    color: "white",
  },
  time: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 3,
    marginLeft: 12,
    color: "white",
  },
});
