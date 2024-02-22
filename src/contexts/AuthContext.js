// AuthProvider.js
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [UsersID, setUsersID] = useState(null);
  const [fabriID, setfabriID] = useState(null);
  const [expoID, setExpoID] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const incrementNotificationCount = count => {
    setNotificationCount(prevCount => prevCount + count);
  };

  // Function to clear notification count
  const clearNotificationCount = () => {
    setNotificationCount(0);
  };

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

    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userFullName');
    AsyncStorage.removeItem('userEmail');
    AsyncStorage.removeItem('ForgetToken');
    AsyncStorage.removeItem('OtpToken');
    AsyncStorage.removeItem('ExpoId');
    AsyncStorage.removeItem('userID')

      .then(() => {
        setUserLoggedIn(false);
      })
      .catch(error => {
        console.log('Error removing token from local storage:', error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        userLoggedIn,
        handleLogin,
        handleLogout,
        profileImg,
        setProfileImg,
        UsersID,
        setUsersID,
        fabriID,
        setfabriID,
        expoID,
        setExpoID,
        notificationCount,
        incrementNotificationCount,
        clearNotificationCount,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
