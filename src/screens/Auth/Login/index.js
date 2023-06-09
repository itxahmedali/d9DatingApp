import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {CustomButton, Loader} from '../../../Components/Index';
import s from './style';
import {emailRegex, height, width} from '../../../Constants/Index';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import {theme} from '../../../Constants/Index';
const Login = ({navigation}) => {
  // const FCMtoken = useSelector(state => state.reducer.fToken);
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';
  const {setToken, setLoading} = useAppContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (email === '' || password === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, password]);

  // const fcmToken = useCallback(
  //   token => {
  //     const data = {
  //       device_token: FCMtoken,
  //     };
  //     axiosconfig
  //       .post('device-token', data, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then(res => {
  //         setLoader(false);
  //       })
  //       .catch(err => {
  //         setLoader(false);
  //         console.log(err, 'errors');
  //       });
  //   },
  //   [FCMtoken],
  // );
  const signIn = () => {
    setLoading(true);
    setTimeout(() => {
      setToken("true")
      setLoading(false);
    }, 1000);
  };
  return (
    <SafeAreaView style={{flex: 1, height: '100%'}}>
      <View
        style={{
          width: width,
          height: height,
          backgroundColor: theme === 'dark' ? '#222222' : '#fff',
        }}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={s.heading}>
            <Text style={[s.headingText, {color: Textcolor}]}>
              Sign <Text style={[s.headingText1, {color: Textcolor}]}>In</Text>
            </Text>
          </View>
          <View style={s.input}>
            <Input
              w={{
                base: '83%',
                md: '25%',
              }}
              variant="underlined"
              InputLeftElement={
                <View style={s.iconCircle}>
                  <Icon name={'envelope'} color={Textcolor} size={18} />
                </View>
              }
              placeholder="Email"
              placeholderTextColor={Textcolor}
              value={email}
              keyboardType="email-address"
              onChangeText={email => {
                setEmail(email);
              }}
              color={Textcolor}
              fontSize={moderateScale(14, 0.1)}
            />
          </View>
          <View style={s.input}>
            <Input
              w={{
                base: '83%',
                md: '25%',
              }}
              variant="underlined"
              InputLeftElement={
                <View style={[s.iconCircle, {borderColor: Textcolor}]}>
                  <Icon2 name="locked" color={Textcolor} size={18} />
                </View>
              }
              placeholder="Password"
              placeholderTextColor={Textcolor}
              value={password}
              onChangeText={password => {
                setPassword(password);
              }}
              InputRightElement={
                password ? (
                  <View style={s.eye}>
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                      <Feather
                        name={showPass ? 'eye' : 'eye-off'}
                        color={Textcolor}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )
              }
              color={Textcolor}
              fontSize={moderateScale(14, 0.1)}
              secureTextEntry={showPass}
            />
          </View>
          <View style={s.button}>
            <CustomButton
              disabled={disabled}
              backgroundColor={disabled ? 'grey' : '#FFD700'}
              color="white"
              borderRadius={50}
              onPress={() => signIn()}
              text="Login"
              style={s.btnText}
            />
          </View>
        </View>

        <View style={s.bottomLink}>
          <Button
            size="sm"
            variant={'link'}
            _text={{
              color: Textcolor,
            }}
            onPressIn={() => navigation.navigate('Register')}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[s.forgetPass, {color: Textcolor}]}>
                Don’t Have an Account?
              </Text>
              <Text
                style={[s.forgetPass, {fontWeight: '700', color: '#FFD700'}]}>
                Sign up Now!
              </Text>
            </View>
          </Button>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: moderateScale(5),
            }}>
            <TouchableOpacity>
              <Text
                style={[
                  s.forgetPass,
                  {color: Textcolor, textDecorationLine: 'underline'},
                ]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                s.forgetPass,
                {color: Textcolor, textDecorationLine: 'none'},
              ]}></Text>
            <TouchableOpacity>
              <Text
                style={[
                  s.forgetPass,
                  {color: Textcolor, textDecorationLine: 'underline'},
                ]}>
                {', '}
                Terms & conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
