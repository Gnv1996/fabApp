import React, {useState, useEffect, useContext} from 'react';
import api from '../utils/api';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../contexts/AuthContext';

function Notification({navigation}) {
  const [notification, setNotification] = useState(null);

  const {setUserId} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/requirement/get_all');
        const apiResponse = response.data.userRequirements;
        if (Array.isArray(apiResponse) && apiResponse.length > 0) {
          setNotification(apiResponse[1]);
          setUserId(notification.apiResponse._id);

          // console.log(apiResponse[1]._id, '====id of object==');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewClick = id => {
    console.log(`Clicked on notification with id: ${id}`);
    setUserId(notification._id);
    navigation.navigate('Requirement');
  };

  if (!notification) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }



  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => handleViewClick(notification._id)}
        style={styles.notificationContainer}>
        <View style={styles.iconContainer}>
          <Icon name="notifications-circle" size={50} color="#808080" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleName}>New Notifications</Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.titlePostion}>{notification.furniture}</Text>
            <Text style={styles.titlePostion}>{notification.budget}</Text>
            <Text style={styles.titlePostion}>{notification.carpetColor}</Text>
            <Text style={styles.titlePostion}>{notification.branding}</Text>
            <Text style={styles.titlePostion}>{notification.stallNumber}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
