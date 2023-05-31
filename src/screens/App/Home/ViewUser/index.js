import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../../../../Redux/actions';
import axiosconfig from '../../../../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ImageView from 'react-native-image-viewing';
import * as RootNavigation from '../../../../../RootNavigation';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {dummyImage, socketRequest} from '../../../../Constants/Index';
import socket from '../../../../utils/socket';

const ViewUser = ({navigation, route}) => {
  const {post, screen} = route?.params;
  const [Userid, setUserid] = useState(
    screen == 'search'
      ? post?.id
      : route?.params?.data?.screen
      ? route?.params?.data?.id
      : post?.user.id,
  );
  const [loginId, setLoginId] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [imgView, setImgView] = useState(false);
  const theme = useSelector(state => state.reducer.theme);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const {token} = useAppContext(AppContext);
  const [scroll, setScroll] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState([]);
  const socketUsers = useSelector(state => state.reducer.socketUsers);
  const navigations = useNavigation();
  useEffect(() => {
    getData(true);
    getId();
  }, []);
  useEffect(() => {
    const handleRequest = ({from, to, type}) => {
      getData(false);
    };
    socket.on('request', handleRequest);
    return () => {
      socket.off('request', handleRequest);
    };
  }, [socket]);
  const searchUserOnSocket = userData => {
    let temp = {backendUser: userData, socketUser: {}};

    socketUsers.findLast((elem, index) => {
      if (elem?.username == userData?.email) {
        console.log('found', index);
        temp = {backendUser: userData, socketUser: elem};
      }
    });
    handleCreateRoom(temp);
  };

  const handleCreateRoom = user => {
    navigations.navigate('MessageStack', {
      screen: 'Chat',
      params: {backendUser: user.backendUser},
    });
  };

  const getId = async () => {
    console.log('id console');
    const logInId = await AsyncStorage.getItem('id');
    setLoginId(logInId);
  };

  const getData = async loader => {
    if (loader) {
      setLoader(true);
    }
    axiosconfig
      .get(`user_view/${Userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setUserData(res?.data?.user_details);
        if (loader) {
          setLoader(false);
        }
      })
      .catch(err => {
        if (loader) {
          setLoader(false);
        }
      });
  };
  const connect = async () => {
    setLoader(true);
    await axiosconfig
      .get(`connect/${Userid}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        socketRequest(loginId, Userid, 'connectRequest');
        getData(true);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };
  const Disconnect = async () => {
    setLoader(true);
    await axiosconfig
      .get(`connect-remove/${Userid}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        socketRequest(loginId, Userid, 'disconnect');
        getData(true);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };
  const block = async () => {
    setLoader(true);
    await axiosconfig
      .get(`block/${Userid}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        socketRequest(loginId, Userid, 'block');
        getData(true);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };
  const unblock = async () => {
    setLoader(true);
    await axiosconfig
      .get(`block/${Userid}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        getData(true);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };

  return loader ? (
    <Loader />
  ) : (
    <View style={{flex: 1, backgroundColor: color}}>
      <View style={[s.View1]}>
        <TouchableOpacity
          onPress={() => {
            setPreviewImage(userData?.image ? userData?.image : dummyImage);

            setImgView(!imgView);
          }}
          style={{width: '100%', height: moderateScale(260, 0.1)}}>
          <Image
            style={s.view1Img}
            resizeMode={'cover'}
            source={{uri: userData?.image ? userData?.image : dummyImage}}
          />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            justifyContent: 'flex-start',
          }}>
          <Header navigation={navigation} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        onScroll={() => {
          setScroll(!scroll);
        }}
        style={[
          s.View2,
          {
            backgroundColor: color,
            bottom: scroll ? moderateScale(50) : moderateScale(5),
          },
        ]}
        scrollEnabled={true}>
        <View>
          <View style={s.line}></View>
          <View style={s.container}>
            <View style={s.row}>
              <Text style={[s.headerTxt, {color: textColor}]}>
                {userData?.name} {userData?.last_name}
              </Text>
              {userData?.connected == 1 ? (
                <TouchableOpacity
                  onPress={() => {
                    // searchUserOnSocket(userData);
                    navigations.navigate('MessageStack', {
                      screen: 'InnerChat',
                      params: {userData: userData},
                    });
                  }}
                  style={s.icon}>
                  <AntDesign
                    style={{position: 'absolute'}}
                    name="message1"
                    color="#FFD700"
                    solid
                    size={moderateScale(22, 0.1)}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={s.row1}>
              <View>
                <Ionicon
                  name="location-sharp"
                  color={textColor}
                  solid
                  size={moderateScale(22, 0.1)}
                />
              </View>
              <Text style={s.location}>{userData?.location} </Text>
            </View>

            <View style={s.about}>
              <Text style={[s.aboutTxt, {color: textColor}]}>About</Text>
              <View style={s.abTxt}>
                <Text style={s.txt}>{userData?.about_me} </Text>
              </View>
            </View>
            <View style={{marginBottom: moderateScale(10, 0.1)}}>
              <Text style={[s.aboutTxt, {color: textColor}]}>Organization</Text>
              <View style={s.abTxt}>
                <Text style={s.txt}>{userData?.group} </Text>
              </View>
            </View>
          </View>
          {Userid != loginId ? (
            <>
              {userData?.connected ? (
                <>
                  <View style={s.connected}>
                    <TouchableOpacity
                      onPress={() =>
                        userData?.connected == 2 ? null : Disconnect()
                      }>
                      <View style={s.btn}>
                        <Text style={[s.btnTxt]}>
                          {userData?.connected == 2 ? 'Pending' : 'Disconnect'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {userData?.block_status == 0 && userData?.connected == 1 ? (
                      <>
                        <TouchableOpacity onPress={() => block()}>
                          <View style={s.btn}>
                            <Text style={[s.btnTxt]}>{'Block'}</Text>
                          </View>
                        </TouchableOpacity>
                      </>
                    ) : null}
                  </View>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      userData?.connected == 0 && userData?.block_status == 0
                        ? connect()
                        : unblock()
                    }>
                    <View style={s.btn}>
                      <Text style={[s.btnTxt]}>
                        {userData?.connected == 0 && userData?.block_status == 0
                          ? 'Connect'
                          : 'Unblock'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </>
          ) : null}
        </View>
      </ScrollView>
      <ImageView
        images={[
          {
            uri: previewImage,
          },
        ]}
        imageIndex={0}
        visible={imgView}
        onRequestClose={() => setImgView(!imgView)}
      />
    </View>
  );
};

export default ViewUser;
