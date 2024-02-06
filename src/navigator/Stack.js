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
import UserInfo from '../screens/UserInfo';
import AutoExpo from '../expo/AutoExpo';
import PlastIndia from '../expo/PlastIndia';
import Aahar from '../expo/Aahar';
import TradeFair from '../expo/TradeFair';
import AaharUpdate from '../admin/AaharUpdate';
import PlastUpdate from '../admin/PlastUpdate';
import AutoUpdate from '../admin/AutoUpdate';
import TradeUpdate from '../admin/TradeUpdate';
import AdminScreen from '../admin/AdminScreen';

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
          <Stack.Screen name="ReqForm" component={UserInfo} />
          <Stack.Screen name="AutoExpo" component={AutoExpo} />
          <Stack.Screen name="TradeFair" component={TradeFair} />
          <Stack.Screen name="PlastIndia" component={PlastIndia} />
          <Stack.Screen name="Aahar" component={Aahar} />
          <Stack.Screen name="aaharUpdate" component={AaharUpdate} />
          <Stack.Screen name="plastIndiaUpdate" component={PlastUpdate} />
          <Stack.Screen name="autoUpdate" component={AutoUpdate} />
          <Stack.Screen name="tradeUpdate" component={TradeUpdate} />
          <Stack.Screen name="allData" component={AdminScreen} />
        </Stack.Navigator>
      )}
    </>
  );
}

export default Stacks;
