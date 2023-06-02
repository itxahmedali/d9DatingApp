import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale, ms} from 'react-native-size-matters';
import s from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import Inicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Input, FormControl, Button} from 'native-base';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const messages = [
  {
    uid: 2,
    from: 'Julie Watson',
    to: '',
    date: '',
    text: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
    userImage: require('../../../../assets/images/png/u2.png'),
  },
  {
    uid: 1,
    from: 'Julie Watson',
    to: '',
    date: '',
    text: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
    userImage: require('../../../../assets/images/png/mydp.png'),
  },
  {
    uid: 2,
    from: 'Julie Watson',
    to: '',
    date: '',
    text: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
    userImage: require('../../../../assets/images/png/u2.png'),
  },
  {
    uid: 1,
    from: 'Julie Watson',
    to: '',
    date: '',
    text: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
    userImage: require('../../../../assets/images/png/mydp.png'),
  },
  {
    uid: 2,
    from: 'Julie Watson',
    to: '',
    date: '',
    text: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
    userImage: require('../../../../assets/images/png/u2.png'),
  },
];

const Chat = ({route}) => {
  const theme = useSelector(state => state.reducer.theme);
  const [userData, setUserData] = useState('');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await AsyncStorage.getItem('userData');
    setUserData(JSON.parse(data));
  };

  return (
    <View>
      {messages.map((message,index) => (
        <Text key={index}>{message.text}</Text>
      ))}
      <View>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
        />
        <TouchableOpacity>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
