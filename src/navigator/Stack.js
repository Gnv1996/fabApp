// import 'react-native-gesture-handler';
import React, {useContext, useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import MyDrawer from './Drawer';
import {AuthContext} from '../contexts/AuthContext';
import Splash from '../screens/Splash';

const Stack = createStackNavigator();
function Stacks() {
  const {userLoggedIn} = useContext(AuthContext);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <Splash />}
      {!showSplash && (
        <Stack.Navigator>
          {userLoggedIn ? (
            <Stack.Screen
              name="Drawer"
              component={MyDrawer}
              options={{headerShown: false}}
            />
          ) : (
            <>
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      )}
    </>
  );
}

export default Stacks;
