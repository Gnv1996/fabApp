import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {useContext, useState} from 'react';
import HomeScreen from '../screens/Home';
import About from '../screens/About';
import Contact from '../screens/Contact';
import Profile from '../screens/Profile';
import colors from '../styles/colors';
import UserInfo from '../screens/UserInfo';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const {handleLogout} = useContext(AuthContext);
  const [buttonColor, setButtonColor] = useState(colors.gray);

  const handleLogoutAction = () => {
    handleLogout();
  };

  const changeButtonColor = () => {
    // Change the button color to orange when pressed
    setButtonColor('orange');
    // Reset the button color to its original color after a delay (1 second in this case)
    setTimeout(() => {
      setButtonColor(colors.gray);
    }, 2000);
  };

  return (
    <View style={{flex: 1, marginBottom: 30}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={handleLogoutAction}
        onPressIn={changeButtonColor}
        style={{
          margin: 10,
          justifyContent: 'center',
          backgroundColor: buttonColor,
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Contact" component={Contact} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Exhibitions" component={UserInfo} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
