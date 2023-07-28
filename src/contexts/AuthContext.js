import 'react-native-gesture-handler';
import {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(() => {
    // Check if the token is already saved in local storage
    AsyncStorage.getItem('userToken')
      .then(token => {
        if (token) {
          // Token exists in local storage, set the userLoggedIn state to true
          setUserLoggedIn(true);
        }
      })
      .catch(error => {
        console.log('Error retrieving token from local storage:', error);
      });
  }, []);

  const handleLogin = token => {
    // Save the token to local storage
    AsyncStorage.setItem('userToken', token)
      .then(() => {
        // Token saved successfully, set the userLoggedIn state to true
        setUserLoggedIn(true);
      })
      .catch(error => {
        console.log('Error saving token to local storage:', error);
      });
  };

  const handleLogout = () => {
    // Clear token from local storage and set userLoggedIn to false
    AsyncStorage.removeItem('userToken')
      .then(() => {
        setUserLoggedIn(false);
      })
      .catch(error => {
        console.log('Error removing token from local storage:', error);
      });
  };

  return (
    <AuthContext.Provider value={{userLoggedIn, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
