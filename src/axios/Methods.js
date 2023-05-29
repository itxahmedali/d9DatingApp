import {baseUrl} from './Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {setLoader} = useAppContext();
export const getData = async (path, token) => {
  try {
    setLoader(true);

    let headers = {};
    if (token) {
      const storedToken = await AsyncStorage.getItem('token');
      headers = {
        Authorization: `Bearer ${storedToken}`,
      };
    }

    const response = await axios.get(baseUrl + path, {headers});
    setLoader(false);
    return response.data;
  } catch (error) {
    setLoader(false);
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (path, data, token) => {
  try {
    setLoader(true);

    let headers = {};
    if (token) {
      const storedToken = await AsyncStorage.getItem('token');
      headers = {
        Authorization: `Bearer ${storedToken}`,
      };
    }

    const response = await axios.post(baseUrl + path, data, {headers});
    setLoader(false);
    return response.data;
  } catch (error) {
    setLoader(false);
    console.error('Error posting data:', error);
    throw error;
  }
};
