// import 'react-native-gesture-handler';
import React, {useContext, useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import MyDrawer from './Drawer';
import {AuthContext} from '../contexts/AuthContext';
import Splash from '../screens/Splash';
import Profile from '../screens/Profile';
import Requirement from '../screens/Requirement';
import Notification from '../screens/Notification';
import HomeScreen from '../screens/Home';
import OpenPage from '../screens/OpenPage';
import Cart from '../Ecommerce/Cart';
import Buy from '../Ecommerce/Buy';
import Payment from '../Ecommerce/Payment';
import Commerce from '../Ecommerce/Commerce';

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
          {/* {userLoggedIn ? ( */}
          <Stack.Screen
            name="Drawer"
            component={MyDrawer}
            options={{headerShown: false}}
          />
          {/* ) : ( */}
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
          {/* )} */}
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Notifications" component={Notification} />
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Requirement" component={Requirement} />

          <Stack.Screen
            name="Open"
            component={OpenPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="Buy"
            component={Buy}
            options={{
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="Commerce"
            component={Commerce}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </>
  );
}

export default Stacks;
