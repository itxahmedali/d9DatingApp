import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {Input, Menu, Pressable} from 'native-base';
import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Image,
  FlatList,
  Keyboard,
  StyleSheet,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Inicon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Antdesign from 'react-native-vector-icons/AntDesign';
import ChatHeader from '../../../../Components/ChatHeader';
import axiosconfig from '../../../../Providers/axios';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {
  color,
  dummyImage,
  formatTimestamp,
  getColor,
  socketMessage,
  storeMsg,
} from '../../../../Constants/Index';
import ChatFooter from '../../../../Components/ChatFooter';
import socket from '../../../../utils/socket';
const Poppins = '';
const PoppinsBold = '';
const InnerChat = ({navigation, route}) => {
  const theme = useSelector(state => state.reducer.theme);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [userData, setUserData] = useState(route.params?.userData);
  const [myData, setMyData] = useState('');
  const [loader, setLoader] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const {token} = useAppContext(AppContext);
  useEffect(() => {
    if (route.params) {
      setUserData(route.params?.userData);
    }
  }, [userData]);
  useEffect(() => {
    getData();
  }, [myData]);
  useEffect(() => {
    const handleMessage = ({from, to, message,time}) => {
      console.log(from, to, message, 'hello from user');
      if (from === userData?.id) {
        setChatMessages(chatMessages => [
          ...chatMessages,
          {
            user_id: userData?.id,
            reciever_id: myData?.id,
            message: message,
            fromSelf: false,
            time: time,
          },
        ]);
      }
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket]);
  const getData = async () => {
    const data = await AsyncStorage.getItem('userData');
    setMyData(JSON.parse(data));
  };
  const getMessages = async () => {
    setLoader(true);
    await axiosconfig
      .get(`message_show/${userData?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setChatMessages(res?.data);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'message show API err');
      });
  };
  const handleNewMessage = () => {
    Keyboard.dismiss();
    if (message != '' || message != null || message != undefined) {
      const hour =
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : `${new Date().getHours()}`;

      const mins =
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : `${new Date().getMinutes()}`;
      let time = hour+':'+mins;
      socketMessage(myData?.id, userData?.id, message, time);
      setChatMessages([
        ...chatMessages,
        {
          user_id: myData?.id,
          reciever_id: userData?.id,
          message,
          fromSelf: true,
          time: `${hour}:${mins}`,
        },
      ]);
      storeMsg(
        {
          id: myData?.id,
          message: message,
          fromSelf: true,
          time: `${hour}:${mins}`,
        },
        token,
      );
      // if (socketUser) {
      //   socket.emit('private_message', {
      //     content,
      //     to: socketUser.userID,
      //     timestamp: {hour, mins},
      //   });
      //   storeMsg({
      //     id: userData.id,
      //     message: message,
      //     fromSelf: true,
      //     time: `${hour}:${mins}`,
      //   });
      //   setMessage('');
      // }
    }
  };
  const msgDlt = async id => {
    setLoader(true);
    await axiosconfig
      .delete(`message_delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        getMessages();
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };
  const chatRenderItem = elem => {
    const status = elem?.item?.user_id === myData.id;
    return (
      <View
        style={[
          s.message,
          {justifyContent: status ? 'flex-end' : 'flex-start'},
        ]}
        key={elem.index}>
        {!status ? (
          <View
            style={[
              s.dp,
              {
                borderColor: getColor(
                  !status ? userData?.group : myData?.group,
                ),
              },
            ]}>
            <Image
              source={{
                uri: !status
                  ? userData?.image
                    ? userData?.image
                    : dummyImage
                  : myData?.image
                  ? myData?.image
                  : dummyImage,
              }}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
        ) : null}
        <View
          style={[
            {
              maxWidth: '80%',
              marginLeft: !status ? moderateScale(20, 0.1) : 0,
              marginRight: !status ? 0 : moderateScale(5, 0.1),
            },
          ]}>
          <View style={[s.options]}>
            <Menu
              borderWidth={moderateScale(1, 0.1)}
              borderColor={'grey'}
              backgroundColor={color}
              marginRight={moderateScale(15, 0.1)}
              marginTop={moderateScale(25, 0.1)}
              closeOnSelect={true}
              trigger={triggerProps => {
                return (
                  <Pressable
                    {...triggerProps}
                    style={{
                      flexDirection: 'row',
                      right: moderateScale(8, 0.1),
                    }}>
                    <View style={status ? s.textFrom : s.textTo}>
                      <Text style={s.textSmall1}>{elem?.item?.message}</Text>
                      <Text style={[s.textSmall1, {textAlign: 'right'}]}>
                        {formatTimestamp(elem?.item?.created_at)}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}>
              <Menu.Item
                onPress={() => {
                  msgDlt(elem?.item?.id);
                }}>
                <View style={s.optionView}>
                  <Antdesign
                    name={'delete'}
                    color={textColor}
                    size={moderateScale(13, 0.1)}
                    style={{flex: 0.3}}
                  />
                  <Text style={[s.optionBtns, {color: textColor}]}>Delete</Text>
                </View>
              </Menu.Item>
            </Menu>
          </View>
        </View>
        {status ? (
          <View
            style={[
              s.dp,
              {
                borderColor: getColor(
                  !status ? userData?.group : myData?.group,
                ),
              },
            ]}>
            <Image
              source={{
                uri: !status
                  ? userData?.image
                    ? userData?.image
                    : dummyImage
                  : myData?.image
                  ? myData?.image
                  : dummyImage,
              }}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={[s.container, {backgroundColor: color}]}>
      <ChatHeader
        userData={userData}
        getMessages={getMessages}
        setLoader={setLoader}
        navigation={navigation}
      />
      <View style={s.chat}>
        <FlatList
          inverted
          contentContainerStyle={{flexDirection: 'column-reverse'}}
          data={chatMessages}
          renderItem={chatRenderItem}
          key={(e, i) => i}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="never"
          showsVerticalScrollIndicator={true}
        />
      </View>
      <ChatFooter
        message={message}
        setMessage={setMessage}
        handleNewMessage={handleNewMessage}
      />
    </View>
  );
};
const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  chatContainer: {},
  header: {
    paddingHorizontal: moderateScale(10, 0.1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeadingText: {
    fontSize: moderateScale(20, 0.1),
    lineHeight: moderateScale(30, 0.1),
  },
  border: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: moderateScale(10, 0.1),
    borderBottomWidth: moderateScale(2, 0.1),
  },
  options: {
    width: moderateScale(30, 0.1),
  },
  optionView: {
    flexDirection: 'row',
    width: moderateScale(100, 0.1),
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: 'grey',
    alignItems: 'center',
    paddingBottom: moderateScale(5, 0.1),
  },
  optionBtns: {
    fontSize: moderateScale(12, 0.1),
    fontFamily: Poppins,
  },
  option: {
    fontSize: moderateScale(14, 0.1),
    marginRight: moderateScale(10, 0.1),
  },
  options: {
    flex: 0.1,
    justifyContent: 'flex-start',
    marginTop: moderateScale(5, 0.1),
    marginRight: moderateScale(-12, 0.1),
  },
  btn: {
    flex: 0.5,
  },
  chats: {
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(18, 0.1),
  },
  dp: {
    width: moderateScale(55, 0.1),
    height: moderateScale(55, 0.1),
    borderWidth: moderateScale(2, 0.1),
    borderRadius: moderateScale(55 / 2, 0.1),
  },
  userName: {
    marginBottom: moderateScale(25, 0.1),
    marginTop: moderateScale(2, 0.1),
    fontSize: moderateScale(10, 0.1),
  },
  addBtn: {
    width: moderateScale(11, 0.1),
    height: moderateScale(11, 0.1),
    zIndex: 1000,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: moderateScale(8, 0.1),
    right: moderateScale(5, 0.1),
    borderRadius: moderateScale(11 / 2, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  myStory: {
    width: moderateScale(65, 0.1),
    height: moderateScale(65, 0.1),
    marginTop: moderateScale(10, 0.1),
    marginLeft: moderateScale(12, 0.1),
  },
  dp1: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(53 / 2, 0.1),
  },
  col: {
    flexDirection: 'column',
  },
  card: {
    flexDirection: 'row',
    flex: 0.7,
    margin: moderateScale(15, 0.1),
    alignItems: 'center',
  },
  name: {
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(17, 0.1),
  },
  userName: {
    color: '#fff',
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(14, 0.1),
  },
  textRegular: {
    fontSize: moderateScale(11, 0.1),
    lineHeight: moderateScale(14, 0.1),
    marginVertical: moderateScale(5, 0.1),
  },
  textSmall: {
    fontSize: moderateScale(8, 0.1),
    lineHeight: moderateScale(12, 0.1),
    marginVertical: moderateScale(5, 0.1),
    color: '#787878',
  },
  img: {
    width: '100%',
  },
  time: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  options: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: moderateScale(15, 0.1),
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(10, 0.1),
    marginBottom: moderateScale(15, 0.1),
  },
  chat: {
    maxHeight: '85%',
  },
  textSmall1: {
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1),
    marginVertical: moderateScale(2, 0.1),
    color: '#fff',
  },
  textTo: {
    flexDirection: 'column',

    padding: moderateScale(15, 0.1),
    backgroundColor: '#4D4D4D',
    borderRadius: moderateScale(5, 0.1),
  },
  textFrom: {
    flexDirection: 'column',
    padding: moderateScale(15, 0.1),
    backgroundColor: '#333232',
    borderRadius: moderateScale(5, 0.1),
  },
  messageInput: {
    paddingLeft: moderateScale(10, 0.1),
    position: 'absolute',
    bottom: moderateScale(0),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    flex: 0.9,
    borderRadius: moderateScale(15, 0.1),
    backgroundColor: '#595757',
    padding: moderateScale(5, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(15, 0.1),
  },
  circle: {
    width: moderateScale(37, 0.1),
    height: moderateScale(37, 0.1),
    borderRadius: moderateScale(37 / 2, 0.1),
    borderColor: '#8F8A8A',
    borderWidth: moderateScale(1, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    flex: 0.9,
  },
  attach: {
    flex: 0.1,
    alignItems: 'flex-end',
    paddingRight: moderateScale(10, 0.1),
  },
});
export default InnerChat;
