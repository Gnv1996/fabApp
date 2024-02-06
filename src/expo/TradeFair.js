import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import colors from '../styles/colors';

function TradeFair() {
  const [eventData, setEventData] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('https://api.example.com/events') // Replace with your actual API endpoint
      .then(response => {
        setEventData(response.data);
        setImageUrl(response.data.imageUrl); // Replace 'imageUrl' with the actual key in your API response
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
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
    navigation.navigate('home');
  };
  const {eventDate, location, timePeriod, description} = eventData;

  return (
    <ScrollView>
      <Text style={styles.layoutText}>Trade Fair</Text>
      <View style={styles.container}>
        <Image
          source={{uri: imageUrl}}
          style={styles.eventImage}
          alt="Loading"
        />

        <View style={styles.component}>
          <Text style={styles.label}>Event Date:-</Text>
          <Text style={{fontSize: 17}}>{eventDate}</Text>

          <Text style={styles.label}>Venue:-</Text>
          <Text style={{fontSize: 17}}>{location} </Text>

          <Text style={styles.label}>Time of Event :-</Text>
          <Text style={{fontSize: 17}}>{timePeriod}</Text>

          <Text style={styles.label}>Description:-</Text>
          <Text style={{fontSize: 17}}>{description}</Text>
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
  },
  eventImage: {
    width: 340,
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
  input: {
    height: 90,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 7,
    padding: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 23,
    color: colors.black,
    marginVertical: 10,
  },
  imagePickerButton: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  btn: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  imagePickerButton: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 20,
  },
  layoutText: {
    borderWidth: 2,
    borderColor: colors.gray,
    padding: 15,
    borderRadius: 10,
    margin: 20,
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
  },
  layoutHeading: {
    borderRadius: 10,
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 27,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '23',
    color: colors.black,
    margin: 10,
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
  imgStyle: {
    height: 300,
    width: '100%',
  },
});

export default TradeFair;
