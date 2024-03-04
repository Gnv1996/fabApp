import React, {useState, useEffect, useContext} from 'react';
import api from '../utils/api';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../contexts/AuthContext';

function Notification({navigation}) {
  const [notifications, setNotifications] = useState([]);
  const {setUsersID} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const {incrementNotificationCount} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/requirement/get_all');
        const apiResponse = response.data.userRequirements;
        if (Array.isArray(apiResponse) && apiResponse.length > 0) {
          setNotifications(apiResponse);
          setLoading(false);
          incrementNotificationCount(apiResponse.length);
          // console.log(apiResponse, '---->----fetching data---');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    const interval = setInterval(() => {
      setLoading(true);
      fetchData();
    }, 2000);

    return () => clearTimeout(interval);
  }, [incrementNotificationCount]);

  const handleViewClick = id => {
    console.log(`Clicked on notification with id: ${id}`);
    setUsersID(id);

    navigation.navigate('Requirement');
  };

  return (
    <ScrollView>
      {loading ? ( // Show loader if loading state is true
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.red} />
        </View>
      ) : (
        notifications.map(notification => (
          <TouchableOpacity
            key={notification._id}
            onPress={() => handleViewClick(notification._id)}
            style={styles.notificationContainer}>
            <View style={styles.iconContainer}>
              <Icon name="notifications-circle" size={50} color="#808080" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleName}>New Notifications</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.titlePostion}>
                  {notification.createdAt}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
  },
  iconContainer: {
    marginTop: 20,
    paddingRight: 10,
  },
  textContainer: {
    padding: 20,
  },
  titleName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black,
  },
  titlePostion: {
    fontSize: 15,
    color: colors.gray,
    marginTop: 2,
    marginRight: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    color: colors.red,
  },
});

export default Notification;
