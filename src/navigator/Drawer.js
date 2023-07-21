import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {useContext} from 'react';
import HomeScreen from '../screens/Home';
import About from '../screens/About';
import Contact from '../screens/Contact';
import Profile from '../screens/Profile';
import colors from '../styles/colors';
import UserInfo from '../screens/UserInfo';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const {handleLogout} = useContext(AuthContext);

  const handleLogoutAction = () => {
    handleLogout();
  };

  return (
    <View style={{flex: 1, marginBottom: 30}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={handleLogoutAction}
        style={{
          margin: 10,
          justifyContent: 'center',
          backgroundColor: colors.gray,
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
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Contact" component={Contact} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="User" component={UserInfo} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
