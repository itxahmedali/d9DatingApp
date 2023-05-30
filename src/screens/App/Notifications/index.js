import {TouchableOpacity, Text, SafeAreaView, View, Image} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import axiosconfig from '../../../Providers/axios';
import {useIsFocused} from '@react-navigation/native';
import { Header, Loader } from '../../../Components/Index';
import { AppContext, useAppContext } from '../../../Context/AppContext';

const Notifications = ({navigation, route}) => {
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const isFocused = useIsFocused();
  const theme = useSelector(state => state.reducer.theme);
  const userToken = useSelector(state => state.reducer.userToken);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);
  const [response, setResponse] = useState('');
  const [dummyImage, setDummyImage] = useState(
    'https://designprosusa.com/the_night/storage/app/1678168286base64_image.png',
  );
  const [index, setIndex] = useState('');
  const {liked} = useAppContext(AppContext);
  useEffect(() => {
    setResponse('');
    getList();
  }, [isFocused]);
  useEffect(() => {
    getList()
  }, [liked])
  
  const id = route?.params?.data?.id;
  const matchId = () => {
    console.log('avg');
    data.map((v, index) => {
      console.log('ids', v.user_id);
      if (v.user_id == id) {
        console.log('abc');
        const matchedId = v.user_id;
        console.log(matchedId, index, 'mat');
        if (index !== -1 && flatListRef.current) {
          flatListRef.current.scrollToIndex({index, animated: true});
        }
      } else {
        console.log('false');
      }
    });
  };
  const getItemLayout = (data, index) => ({
    length: 200,
    offset: 200 * index,
    index,
  });

  const getList = async () => {
    setLoader(true);
    axiosconfig
      .get(`request-list`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        console.log('elenenen', res.data);
        setData(res?.data);
        matchId();
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
      });
  };
  const connectAccept = async id => {
    console.log('accept');
    setIndex(id);
    setLoader(true);
    axiosconfig
      .get(`connect-accept/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        console.log('data', res?.data);
        setResponse('Connected');
        setTimeout(() => {
          getList();
        }, 7000);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
      });
  };
  const connectDecline = async id => {
    setLoader(true);
    setIndex(id);
    axiosconfig
      .get(`connect-remove/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        console.log('data', res?.data);
        setResponse('Declined');
        setTimeout(() => {
          getList();
        }, 7000);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
      });
  };

  const renderItem = (elem, i) => {
    return (
      <View key={i} style={s.card}>
        <View style={s.dp}>
          <Image
            source={{
              uri: elem?.item?.request_user?.image
                ? elem?.item?.request_user?.image
                : dummyImage,
            }}
            style={s.dp1}
            resizeMode={'cover'}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ViewUser', {
              screen: 'search',
              post: {id: elem?.item?.request_user?.id},
            });
          }}
          style={{flex: 0.7, alignSelf: 'center'}}>
          <View>
            <View
              style={{flexDirection: 'column', width: moderateScale(200, 0.1)}}>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {elem?.item?.request_user?.name}{' '}
                {elem?.item?.request_user?.last_name}
              </Text>
              <Text style={[s.name1]}> requested to follow you</Text>
            </View>
          </View>
        </TouchableOpacity>

        {response && index == elem?.item?.request_user?.id ? (
          <View style={s.icon}>
            <View style={s.fView}>
              <Text style={[s.fText, {color: textColor}]}>{response}</Text>
            </View>
          </View>
        ) : (
          <View style={[s.icon]}>
            <TouchableOpacity
              onPress={() => connectAccept(elem?.item?.request_user?.id)}>
              <View
                style={{
                  paddingHorizontal: moderateScale(6, 0.1),
                  right: moderateScale(15),
                }}>
                <Antdesign name="checkcircle" size={20} color="green" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => connectDecline(elem?.item?.request_user?.id)}>
              <View
                style={{
                  right: moderateScale(5),
                }}>
                <Antdesign name="closecircle" size={20} color="red" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color}}>
      {loader ? <Loader /> : null}
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        <View>
          <Text style={[s.HeadingText, {color: textColor}]}>Notifications</Text>
        </View>
        <View style={s.txtView}>
          <Text style={s.hTxt}>See New Activity</Text>
        </View>
        <View style={s.hView}>
          <Text style={s.hTxt1}>This Week</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          keyExtractor={(item, index) => String(index)}
          scrollEnabled={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
