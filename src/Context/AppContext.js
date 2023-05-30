import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AppContext = createContext();
export const AppProvider = ({children}) => {
  const [token, setToken] = useState(false);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    async function fetchStoredValues() {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        if (storedToken !== null) {
          setToken(JSON.parse(storedToken));
        }
      } catch (error) {
        console.log('Error retrieving data from AsyncStorage:', error);
      }
    }

    fetchStoredValues();
  }, []);

  useEffect(() => {
    async function saveValuesToStorage() {
      try {
        await AsyncStorage.setItem('userToken', JSON.stringify(token));
      } catch (error) {
        console.log('Error saving data to AsyncStorage:', error);
      }
    }

    saveValuesToStorage();
  }, [token]);

  const contextValues = useMemo(
    () => ({
      token,
      setToken,
      liked,
      setLiked,
    }),
    [token, setToken, liked, setLiked],
  );

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
