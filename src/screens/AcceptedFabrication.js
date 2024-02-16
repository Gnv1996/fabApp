import React, {useState, useEffect, useContext} from 'react';
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
import api from '../utils/api';
import {AuthContext} from '../contexts/AuthContext';

function AcceptedFabrication({navigation}) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {setfabriID} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('requirement/accepted');
        const apiResponse = response.data.userRequirements;
        if (Array.isArray(apiResponse) && apiResponse.length > 0) {
          setNotifications(apiResponse);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewClick = id => {
    console.log(`Clicked on notification with id: ${id}`);
    setfabriID(id);
    navigation.navigate('Upload');
  };

  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.red} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        notifications.map(notification => (
          <TouchableOpacity
            key={notification._id}
            onPress={() => handleViewClick(notification._id)}
            style={styles.notificationContainer}>
            <View style={styles.iconContainer}>
              <Icon name="notifications-circle" size={50} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleName}>Accepted Request</Text>
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
    borderWidth: 2,
    borderColor: colors.gray,
    backgroundColor: colors.orange,
    borderRadius: 10,
    margin: 20,
  },
  iconContainer: {
    marginTop: 20,
    paddingRight: 10,
  },
  textContainer: {
    padding: 20,
  },
  titleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  titlePostion: {
    fontSize: 15,
    color: colors.white,
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: colors.red,
  },
});

export default AcceptedFabrication;
