import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {useContext, useState, useEffect} from 'react';
import HomeScreen from '../screens/Home';
import About from '../screens/About';
import Contact from '../screens/Contact';
import Profile from '../screens/Profile';
import colors from '../styles/colors';
import UserInfo from '../screens/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const {handleLogout} = useContext(AuthContext);

  const handleLogoutAction = () => {
    handleLogout();
  };
  const [fullname, setFullName] = useState('');
  useEffect(() => {
    // Fetch userRole from AsyncStorage when the component mounts
    const fetchUserName = async () => {
      try {
        const storedUserRole = await AsyncStorage.getItem('userName').catch(
          console.error,
        );
        setFullName(storedUserRole);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserName();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'orange',
          height: 220,
        }}>
        <View style={{marginTop: 50, marginLeft: 20}}>
          <Image
            source={require('../assests/man.png')}
            style={{height: 100, width: 100}}
          />
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {fullname ? (
              <Text
                style={{
                  fontSize: 25,
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                {fullname}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 25,
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Hello,
              </Text>
            )}
          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{borderTopWidth: 1, borderColor: 'gray', marginBottom: 30}}>
        <TouchableOpacity
          onPress={handleLogoutAction}
          style={{flexDirection: 'row', marginLeft: 10, padding: 15}}>
          <Icon name="log-out" size={30} color="#808080" />
          <Text
            style={{
              color: 'black',
              marginTop: 2,
              fontSize: 18,
              marginLeft: 15,
            }}>
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MyDrawer() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch userRole from AsyncStorage when the component mounts
    const fetchUserRole = async () => {
      try {
        const storedUserRole = await AsyncStorage.getItem('userRole').catch(
          console.error,
        );
        setUserRole(storedUserRole);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({focused}) => (
            <Icon name="home" size={30} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({focused}) => (
            <Icon name="person" size={30} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          drawerLabel: 'Contact',
          drawerIcon: ({focused}) => (
            <Icon name="people" size={30} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          drawerLabel: 'About',
          drawerIcon: ({focused}) => (
            <Icon name="information-circle" size={30} color="#808080" />
          ),
        }}
      />
      {userRole == 1 && (
        <Drawer.Screen
          name="Exhibitions"
          component={UserInfo}
          options={{
            drawerLabel: 'Exhibitions',
            drawerIcon: ({focused}) => (
              <Icon name="eye" size={30} color="#808080" />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
export default MyDrawer;
