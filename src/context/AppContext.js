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
  const [state, setState] = useState('');
  const [loader, setLoader] = useState('');
  const [token, setToken] = useState(false);
  const [role, setRole] = useState('');
  const [rideStages, setRideStages] = useState('initial');
  const [rideDetails, setRideDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageloading, setImageLoading] = useState(true);
  const [findRideButton, setFindRideButton] = useState(false);
  const [applyButton, setApplyButton] = useState(false);
  const [paymentButton, setPaymentButton] = useState(false);
  useEffect(() => {
    async function fetchStoredValues() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedRole = await AsyncStorage.getItem('role');

        if (storedToken !== null) {
          setToken(JSON.parse(storedToken));
        }
        if (storedRole !== null) {
          setRole(storedRole);
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
        await AsyncStorage.setItem('token', JSON.stringify(token));
        await AsyncStorage.setItem('role', role);
      } catch (error) {
        console.log('Error saving data to AsyncStorage:', error);
      }
    }

    saveValuesToStorage();
  }, [token, role]);

  const contextValues = useMemo(
    () => ({
      state,
      setState,
      loader,
      setLoader,
      token,
      setToken,
      role,
      setRole,
      rideStages,
      setRideStages,
      rideDetails,
      setRideDetails,
      loading,
      setLoading,
      imageloading,
      setImageLoading,
      findRideButton,
      setFindRideButton,
      applyButton,
      setApplyButton,
      paymentButton,
      setPaymentButton,
    }),
    [
      state,
      setState,
      loader,
      setLoader,
      token,
      setToken,
      role,
      setRole,
      rideStages,
      setRideStages,
      rideDetails,
      setRideDetails,
      loading,
      setLoading,
      imageloading,
      setImageLoading,
      findRideButton,
      setFindRideButton,
      applyButton,
      setApplyButton,
      paymentButton,
      setPaymentButton,
    ],
  );

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
