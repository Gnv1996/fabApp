// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://116.202.210.102:3005/api/v1',
});

const getToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('userToken');
    // console.log('Retrieved token:', accessToken);
    return accessToken;
  } catch (error) {
    console.log('Error getting token from Async Storage:', error);
    return null;
  }
};

api.interceptors.request.use(
  async config => {
    try {
      const accessToken = await getToken();
      const ForgetToken = await AsyncStorage.getItem('ForgetToken');
      const OtpToken = await AsyncStorage.getItem('OtpToken');
      // Await this call

 

      if (accessToken) {
        // const tokenToUse = ForgetToken ? ForgetToken : accessToken;
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      if (ForgetToken) {
        config.headers['Authorization'] = `Bearer ${ForgetToken}`;
      }
      if (OtpToken) {
        config.headers['Authorization'] = `Bearer ${OtpToken}`;
      }



      return config;
    } catch (error) {
      console.log('Error adding token to request:', error);
      return Promise.reject(error);
    }
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;
