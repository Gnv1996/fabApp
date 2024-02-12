import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Permission,
  Alert,
} from 'react-native';
import api from '../utils/api';
import colors from '../styles/colors';
import FormInput from '../components/FormInput';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import FormData from 'form-data';

function UpcomingExpoUpdate({navigation}) {
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState({
    title: '',
    eventDate: '',
    imageUrl: '',
    location: '',
    timePeriod: '',
    description: '',
  });

  const handleInputChange = (name, value) => {
    setAdminData({...adminData, [name]: value});
  };

  const postFormData = () => {
    // Filter data by title
    if (!adminData.title.startsWith('Auto')) {
      console.log('Title does not meet filtering condition.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('title', adminData.title);
    formData.append('eventDate', adminData.eventDate);
    formData.append('imageUrl', adminData.imageUrl);
    formData.append('location', adminData.location);
    formData.append('timePeriod', adminData.timePeriod);
    formData.append('description', adminData.description);

    // Replace 'PUT_API_ENDPOINT' with the actual API endpoint for updating data
    api
      .put('/exhibition/create', formData)
      .then(response => {
        if (response.data.success === true) {
          console.log('Data successfully updated:', response.data);
          Alert.alert('Data successfully updated:');
          // Optionally, you can reset the form after successful updating
          setAdminData({
            title: '',
            eventDate: '',
            imageUrl: '',
            location: '',
            timePeriod: '',
            description: '',
          });
        } else {
          console.log('Data update failed:', response.data);
          Alert.alert('Data update Failed');
        }
      })
      .catch(error => {
        console.error('Error updating data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const uploadImageHandler = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.error) {
        setAdminData({...adminData, imageUrl: response.uri});
      }
    });
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
    } else if (Platform.OS === 'ios') {
      // For iOS, permissions are handled automatically
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

      setUserDetails({...userDetails, profileImageURL: response});
      setModalVisible(true);
      console.log(result);
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const openCamera = () => {
    requestCameraPermission();
    launchCamera({mediaType: 'photo'}, response => {
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

  return (
    <ScrollView>
      <Text style={styles.layoutText}>Upcoming Expo Update</Text>
      <View style={styles.component}>
        <FormInput
          textHeader="Event Title"
          placeholder="Title"
          value={adminData.title}
          onChangeText={text => handleInputChange('title', text)}
        />
        <FormInput
          textHeader="Event Date"
          placeholder="DD/MM/YY"
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
          placeholder="Like 5:30am- 6:00 pm"
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
        <Text style={styles.headings}>Image Upload</Text>
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
});

export default UpcomingExpoUpdate;
