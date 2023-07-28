import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://116.202.210.102:8070/user/api/v1/',
});

// Add a new function to retrieve the token from Async Storage
const getToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('userToken');
    return accessToken;
  } catch (error) {
    console.log('Error getting token from Async Storage:', error);
    return null;
  }
};

// For request
api.interceptors.request.use(
  async config => {
    try {
      // Get the access token from Async Storage
      const accessToken = await getToken();
      console.log(accessToken, 'profile api');

      // If the access token exists, add it to the Authorization header
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return config;
    } catch (error) {
      console.log('Error adding token to request:', error);
      return Promise.reject(error);
    }
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  },
);

// For response
api.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with the response data
    return response;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default api;
