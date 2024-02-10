import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {useContext, useState, useEffect} from 'react';
import HomeScreen from '../screens/Home';
import Profile from '../screens/Profile';
import colors from '../styles/colors';
import UserInfo from '../screens/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Notification from '../screens/Notification';
import Rating from '../screens/Rating';
import Upload from '../screens/Upload';
import Response from '../screens/Response';
import Admin from '../admin/Admin';
import UpdateScreen from '../screens/UpdateStatus';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const {handleLogout} = useContext(AuthContext);

  const handleLogoutAction = () => {
    handleLogout();
  };
  const [fullname, setFullName] = useState('');
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedFullName = await AsyncStorage.getItem('userFullName');
        setFullName(storedFullName || 'Hello');
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const storedUserRole = await AsyncStorage.getItem('userRole');
        setUserRole(storedUserRole);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'orange',
          height: 220,
        }}>
        <View
          style={{
            marginTop: Platform.OS === 'android' ? 30 : 45,
            marginLeft: 20,
          }}>
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
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <Text
                style={{
                  fontSize: 25,
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 2,
                  textAlign: 'center',
                }}>
                {fullname
                  .split(' ')
                  .map((word, index) =>
                    index === 0
                      ? word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                      : word.toLowerCase(),
                  )
                  .join(' ')}
              </Text>
            )}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              marginTop: 5,
              marginBottom: 10,
            }}>
            ( {userRole == 1 ? 'Exhibitor' : 'Fabricators'} )
          </Text>
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        style={Platform.OS === 'ios' ? {marginTop: -48} : {}}>
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
        options={({navigation}) => ({
          drawerLabel: 'Exhibition',
          drawerIcon: ({focused}) => (
            <Icon name="home" size={30} color="#FFA500" />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => {
                // Add the logic to navigate to the Notification screen
                navigation.navigate('Notifications');
              }}>
              <Icon name="notifications" size={30} color="#FFA500" />
            </TouchableOpacity>
          ),
        })}
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
        name="Requirement Form"
        component={UserInfo}
        options={{
          drawerLabel: 'Requirement Form',
          drawerIcon: ({focused}) => (
            <Icon name="eye" size={30} color="#808080" />
          ),
        }}
      />

      <Drawer.Screen
        name="Notifications"
        component={Notification}
        options={{
          drawerLabel: 'Notifications',
          drawerIcon: ({focused}) => (
            <Icon name="notifications" size={30} color="#808080" />
          ),
        }}
      />

      {userRole == 2 && (
        <Drawer.Screen
          name="Upload Design"
          component={Upload}
          options={{
            drawerLabel: 'Upload Design',
            drawerIcon: ({focused}) => (
              <Icon name="cloud-upload-outline" size={30} color="#808080" />
            ),
          }}
        />
      )}

      <Drawer.Screen
        name="Ratings"
        component={Rating}
        options={{
          drawerLabel: 'Ratings',
          drawerIcon: ({focused}) => (
            <Icon name="star-half-outline" size={30} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin Panel"
        component={Admin}
        options={{
          drawerLabel: 'Admin Panel',
          drawerIcon: ({focused}) => (
            <Icon name="person-circle-outline" size={30} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Update"
        component={UpdateScreen}
        options={{
          drawerLabel: 'Update',
          drawerIcon: ({focused}) => (
            <Icon name="sync-outline" size={30} color="#808080" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
