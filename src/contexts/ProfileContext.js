import React, {createContext, useState, useEffect} from 'react';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileContext = createContext();

const ProfileProvider = ({children}) => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const token = AsyncStorage.getItem('userToken');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        const response = await api.get('profile/');
        const data = response.data.data;
        setUserDetails(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setLoading(false);
        console.log('Error fetching data from API:', error);
      }
    };
    fetchDataFromAPI();
  }, []);

  return (
    <ProfileContext.Provider value={{userDetails, loading}}>
      {children}
    </ProfileContext.Provider>
  );
};

export {ProfileContext, ProfileProvider};
