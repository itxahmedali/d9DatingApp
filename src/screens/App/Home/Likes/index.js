import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import axiosconfig from '../../../../Providers/axios';
import s from './style';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {dummyImage, getColor} from '../../../../Constants/Index';

const Likes = ({navigation, route}) => {
  const organizations = useSelector(state => state.reducer.organization);

  const [loader, setLoader] = useState(true);
  const theme = useSelector(state => state.reducer.theme);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const {token} = useAppContext(AppContext);
  const [data, setData] = useState(route?.params?.data);
  const isFocused = useIsFocused();
  const [userID, setUserID] = useState('');

  const [friends, setFriends] = useState([]);
  const [userData, setUserData] = useState('');
  useEffect(() => {
    getID();
    getAllUsers();
  }, []);
  const getID = async () => {
    const id = await AsyncStorage.getItem('id');
    setUserID(id);
  };

  const getAllUsers = async () => {
    setLoader(true);
    await axiosconfig
      .get('users-connect', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        setFriends(res?.data?.friends);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };
  const renderItem = (elem, i) => {
    return (
      <View style={s.card}>
        <View style={[s.dp, {borderColor: getColor(elem?.item?.group)}]}>
          <Image
            source={{
              uri: elem?.item?.users?.image
                ? elem?.item?.users?.image
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
              post: {id: elem?.item?.users?.id},
            });
          }}
          style={{flex: 0.7, alignSelf: 'center'}}>
          <View>
            <View
              style={{flexDirection: 'column', width: moderateScale(200, 0.1)}}>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {elem?.item?.users?.name} {elem?.item?.users?.last_name}
              </Text>
              <Text style={[s.textSmall, {color: 'grey'}]}>
                {elem?.item?.users?.location}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: color}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.4}}>
          <Header navigation={navigation} />
        </View>
        <View style={{flex: 0.6, justifyContent: 'center'}}>
          <Text style={[s.HeadingText, {color: textColor}]}>Likes</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        {data.length > 0 ? (
          <>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => String(index)}
              scrollEnabled={true}
            />
          </>
        ) : (
          <>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{fontSize: moderateScale(16, 0.1), color: textColor}}>
                No blocked Users
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Likes;
