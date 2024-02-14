import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import FormData from 'form-data';
import api from '../utils/api';
import colors from '../styles/colors';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UpcomingExpoUpdate({navigation}) {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [adminData, setAdminData] = useState({
    title: 'Upcoming',
    eventDate: '',
    imageURL: '',
    venue: '',
    timePeriod: '',
    description: '',
  });
  const [userExpoId, setUserExpoId] = useState(null);
  const [expoCreated, setExpoCreated] = useState('');

  useEffect(() => {
    const getUserExpoId = async () => {
      try {
        const storedId = await AsyncStorage.getItem('ExpoId'); // Assuming 'userExpoId' is the key used for storing the ID
        setUserExpoId(storedId);
      } catch (error) {
        console.error('Error retrieving user Expo ID:', error);
      }
    };

    getUserExpoId();
  }, []);

  const createExpoHandler = async () => {
    try {
      setLoading(true);

      // Run post API to create expo
      const formData = new FormData();
      formData.append('title', adminData.title);
      formData.append('eventDate', adminData.eventDate);
      formData.append('imageURL', adminData.imageURL);
      formData.append('venue', adminData.venue);
      formData.append('timePeriod', adminData.timePeriod);
      formData.append('description', adminData.description);

      const response = await api.post('/exhibition/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseData = response;
      const id = response.data.data._id;
      console.log(response);
      console.log(id, '-----id of user');
      await AsyncStorage.setItem('ExpoId', id);

      if (responseData.status) {
        console.log('Expo creation successful');
        Alert.alert('Expo Data Creation successful');
        setExpoCreated(true); // Set expoCreated to true after successful creation
      }
    } catch (error) {
      console.log('Error creating Expo:', error.response.data);

      Alert.alert(
        'Error',
        'An error occurred while creating Expo',
        error.response.data.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const updateExpoHandler = async () => {
    try {
      setLoading(true);

      // Run post API to create expo
      const formData = new FormData();
      formData.append('title', adminData.title);
      formData.append('eventDate', adminData.eventDate);
      formData.append('imageURL', adminData.imageURL);
      formData.append('venue', adminData.venue);
      formData.append('timePeriod', adminData.timePeriod);
      formData.append('description', adminData.description);
      console.log(userExpoId, '---local id new----');

      const response = await api.put(
        `/exhibition/update/${userExpoId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const responseData = response;
      console.log(response, 'data');
      if (responseData.status) {
        console.log('Expo update successful');
        Alert.alert('Expo Data Update successful');
        await AsyncStorage.removeItem('ExpoId');
      }
    } catch (error) {
      console.log('Error updating Expo:');

      Alert.alert('Error', 'An error occurred while updating Expo');
    } finally {
      setLoading(false);
    }
  };

  const uploadImageHandler = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('Picked document:', doc);
      setAdminData({...adminData, imageURL: doc[0]});
      setSelectedImage(doc[0].uri);
      console.log(doc[0].uri, '---data---');

      // setSelectedImage(doc[0].uri);
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Gallery Permission',
            message: 'App needs access to your gallery to pick pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Gallery permission granted');
        } else {
          console.log('Gallery permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <ScrollView>
      <Text style={styles.layoutText}>{adminData.title} Expo</Text>
      <View style={styles.component}>
        <FormInput
          textHeader="Event Date"
          placeholder="DD/MM/YY"
          value={adminData.eventDate}
          onChangeText={text => setAdminData({...adminData, eventDate: text})}
        />

        <FormInput
          textHeader="Venue"
          placeholder="Location"
          value={adminData.location}
          onChangeText={text => setAdminData({...adminData, venue: text})}
        />

        <FormInput
          textHeader="Time of Event"
          type="text"
          placeholder="Like 5:30am- 6:00 pm"
          value={adminData.timePeriod}
          onChangeText={text => setAdminData({...adminData, timePeriod: text})}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          type="text"
          placeholder="Description"
          value={adminData.description}
          onChangeText={text => setAdminData({...adminData, description: text})}
          multiline={true}
          numberOfLines={6}
        />
        <Text style={styles.headings}>Image Upload</Text>
        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={uploadImageHandler}>
          <Text style={{color: colors.black}}>Upload Image</Text>
        </TouchableOpacity>
        <View style={styles.imgContainer}>
          {selectedImage && (
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Image
                source={{uri: selectedImage}}
                style={styles.selectedImage}
              />
            </View>
          )}
        </View>

        {expoCreated ? (
          // If expo is created, show "Update Expo" button
          <TouchableOpacity style={styles.btn} onPress={updateExpoHandler}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                color: 'black',
              }}>
              Update Expo
            </Text>
          </TouchableOpacity>
        ) : (
          // If expo is not created, show "Create Expo" button
          <TouchableOpacity style={styles.btn} onPress={createExpoHandler}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                color: 'black',
              }}>
              Create Expo
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  component: {
    margin: 20,
  },
  input: {
    height: 90,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 7,
    padding: 10,
  },
  btn: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.black,
    margin: 10,
  },
  headings: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.black,
    margin: 10,
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
  imagePicker: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UpcomingExpoUpdate;

// export default TradeUpdate;

// export default AaharUpdate;

// export default UpcomingExpoUpdate;
