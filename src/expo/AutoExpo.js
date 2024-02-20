import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import api from '../utils/api';
import {useNavigation} from '@react-navigation/native';

import colors from '../styles/colors';

function AutoExpo() {
  const [eventData, setEventData] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchDataFromAPI = async () => {
    try {
      const response = await api.get('/exhibition/get');
      const allExhibitions = response.data.exhibition;
      const filteredExhibition = allExhibitions.find(
        exhibition => exhibition.title === 'AutoExpo',
      );

      if (filteredExhibition) {
        setEventData(filteredExhibition);
        setImageUrl(filteredExhibition.imageURL);
        setLoading(false);
      } else {
        console.error('Exhibition not found.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const buttonAcceptHandler = () => {
    navigation.navigate('ReqForm');
  };
  const buttonRejectHandler = () => {
    Alert.alert('Please Explore App');
  };

  const {eventDate, venue, timePeriod, description} = eventData;

  return (
    <ScrollView>
      <Text style={styles.layoutText}>Auto Expo</Text>
      <View style={styles.container}>
        <Image
          source={{uri: imageUrl}}
          style={styles.eventImage}
          alt="Loading"
        />

        <View style={styles.component}>
          <Text style={styles.label}>Event Date:-</Text>
          <Text style={styles.textInput}>{eventDate}</Text>
          <Text style={styles.label}>Venue:-</Text>
          <Text style={styles.textInput}>{venue} </Text>
          {/* Displaying venue here */}
          <Text style={styles.label}>Time of Event :-</Text>
          <Text style={styles.textInput}>{timePeriod}</Text>
          <Text style={styles.label}>Description:-</Text>
          <Text style={styles.textInput}>{description}</Text>
        </View>

        <View style={styles.budget}>
          <TouchableOpacity
            style={styles.btnAccept}
            onPress={buttonAcceptHandler}>
            <Text style={styles.btn_Text}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnReject}
            onPress={buttonRejectHandler}>
            <Text style={styles.btn_Text}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: 'red',
            margin: 15,
            width: 100,
          }}>
          <Text style={styles.layoutHeading}>Layout</Text>
        </View>

        <Image
          source={require('../assests/expo.jpeg')}
          style={styles.imgStyle}
        />
      </View>
      <View
        style={{
          borderBottomColor: colors.gray,
          borderBottomWidth: 1,
          backgroundColor: colors.black,
          padding: 15,
        }}>
        <Text style={{color: 'white', textAlign: 'right'}}>to top</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: colors.white,
    padding: 10,
  },
  eventImage: {
    width: 330,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 10,
  },
  layoutText: {
    borderWidth: 2,
    borderColor: colors.gray,
    padding: 15,
    borderRadius: 10,
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
    margin: 20,
    backgroundColor: colors.white,
  },
  component: {
    marginVertical: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black,
    marginVertical: 5,
  },
  btnAccept: {
    backgroundColor: colors.green,
    flex: 1,
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  btnReject: {
    backgroundColor: colors.red,
    flex: 1,
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  btn_Text: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '500',
    fontSize: 20,
  },
  budget: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  layoutHeading: {
    borderRadius: 10,
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 27,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  imgStyle: {
    height: 300,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    color: colors.gray,
    fontSize: 17,
  },
});

export default AutoExpo;
