import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import axios from 'axios';
import colors from '../styles/colors';
import FormInput from '../components/FormInput';
import DocumentPicker from 'react-native-document-picker';

function AaharUpdate({navigation}) {
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState({
    title: '',
    eventDate: '',
    imageUrl: '',
    location: '',
    timePeriod: '',
    description: '',
  });

  useEffect(() => {
    // Replace 'API_ENDPOINT' with the actual API endpoint
    axios
      .get('API_ENDPOINT')
      .then(response => {
        setEventData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (name, value) => {
    setAdminData({...adminData, [name]: value});
  };

  const postFormData = () => {
    // Replace 'POST_API_ENDPOINT' with the actual API endpoint for posting data
    axios
      .post('POST_API_ENDPOINT', adminData)
      .then(response => {
        console.log('Data successfully posted:', response.data);
        // Optionally, you can reset the form after successful posting
        setAdminData({
          title: '',
          eventDate: '',
          imageUrl: '',
          location: '',
          timePeriod: '',
          description: '',
        });
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const {title, eventDate, imageUrl, location, timePeriod, description} =
    eventData;

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Gallery Permission',
            message:
              'Cool Photo App needs access to your gallery ' +
              'so you can pick awesome pictures.',
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
    } else if (Platform.OS === 'ios') {
      // For iOS, the permission is automatically handled by the library
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
    } else if (Platform.OS === 'ios') {
      const cameraStatus = await Permissions.check('photo');
      if (cameraStatus !== 'authorized') {
        const permissionStatus = await Permissions.request('photo');
        if (permissionStatus !== 'authorized') {
          console.log('Permission to access photos denied');
        }
      }
    }
  };

  const openGallery = async () => {
    await requestGalleryPermission();

    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(result);
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const openCamera = () => {
    requestCameraPermission();
    ImagePicker.showImagePicker({}, response => {
      console.log('Response =', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Handle the selected image here (upload or use as needed)
        console.log(response);
      }
    });
  };

  const uploadImageHandler = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      }).catch(err => {
        if (DocumentPicker.isCancel(err)) {
          console.log('Document picking cancelled');
        } else {
          console.log('Error picking document:', err);
        }
      });

      // Handle the selected image here (upload or use as needed)
      console.log(doc);

      // Also, consider opening the camera here if needed
      openCamera();
      openGallery();
    } catch (err) {
      console.log('Unhandled promise rejection:', err);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.layoutText}>Aahar</Text>
      <View style={styles.component}>
        <FormInput
          textHeader="Event Title"
          placeholder="Title"
          value={adminData.title}
          onChangeText={text => handleInputChange('title', text)}
        />
        <FormInput
          textHeader="Event Date"
          placeholder="Event Date"
          value={adminData.eventDate}
          onChangeText={text => handleInputChange('eventDate', text)}
        />

        <FormInput
          textHeader="Venue"
          placeholder="Location"
          value={adminData.location}
          onChangeText={text => handleInputChange('location', text)}
        />
        <FormInput
          textHeader="Time of Event"
          type="text"
          placeholder="Time Period"
          value={adminData.timePeriod}
          onChangeText={text => handleInputChange('timePeriod', text)}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          type="text"
          placeholder="Description"
          value={adminData.description}
          onChangeText={text => handleInputChange('description', text)}
          multiline={true}
          numberOfLines={6}
        />
        <Text style={styles.heading}>Image Upload</Text>
        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={uploadImageHandler}>
          <Text style={{color: colors.black}}>Upload Image</Text>
        </TouchableOpacity>

        <View style={{marginTop: 10}}>
          <TouchableOpacity style={styles.btn} onPress={postFormData}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                color: 'black',
              }}>
              Update Data
            </Text>
          </TouchableOpacity>
        </View>
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
  heading: {
    fontWeight: 'bold',
    fontSize: 23,
    color: colors.black,
    margin: 10,
  },
});

export default AaharUpdate;
