import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [token, setToken] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchStoredValues() {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        if (storedToken !== null) {
          setToken(JSON.parse(storedToken));
        }
      } catch (error) {
        console.log('Error retrieving data from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStoredValues();
  }, []);

  useEffect(() => {
    async function saveValuesToStorage() {
      try {
        await AsyncStorage.setItem('token', JSON.stringify(token));
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
      loading,
      setLoading,
    }),
    [token, setToken, loading, setLoading],
  );
  if (loading) {
    return <Loader />;
  }
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
