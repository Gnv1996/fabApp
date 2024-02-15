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
import UpcomingExpo from '../expo/UpcomingExpo';
import UpcomingExpoUpdate from '../admin/UpcomingExpoUpdate';

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
            name="ReqForm"
            component={UserInfo}
            options={{
              title: 'Requirement Form',
            }}
          />
          <Stack.Screen
            name="AutoExpo"
            component={AutoExpo}
            options={{
              title: 'Auto Expo',
            }}
          />
          <Stack.Screen
            name="TradeFair"
            component={TradeFair}
            options={{
              title: 'Trade Fair',
            }}
          />
          <Stack.Screen
            name="PlastIndia"
            component={PlastIndia}
            options={{
              title: 'Plast India',
            }}
          />
          <Stack.Screen
            name="Aahar"
            component={Aahar}
            options={{
              title: 'Aahar',
            }}
          />
          <Stack.Screen
            name="aaharUpdate"
            component={AaharUpdate}
            options={{
              title: 'Aahar Update',
            }}
          />
          <Stack.Screen
            name="plastIndiaUpdate"
            component={PlastUpdate}
            options={{
              title: 'Plast India',
            }}
          />
          <Stack.Screen
            name="autoUpdate"
            component={AutoUpdate}
            options={{
              title: 'Auto Update',
            }}
          />
          <Stack.Screen
            name="tradeUpdate"
            component={TradeUpdate}
            options={{
              title: 'Trade Fair Update',
            }}
          />
          <Stack.Screen
            name="UpcomingUpdate"
            component={UpcomingExpoUpdate}
            options={{
              title: 'Upcoming Expo Update',
            }}
          />
          <Stack.Screen
            name="allData"
            component={AdminScreen}
            options={{
              title: 'Data Update',
            }}
          />
          <Stack.Screen
            name="UpcomingExpo"
            component={UpcomingExpo}
            options={{
              title: 'Upcoming Expo',
            }}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{
              title: 'Notification',
            }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}

export default Stacks;
