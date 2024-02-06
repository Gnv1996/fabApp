import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import colors from '../styles/colors';
import FormInput from '../components/FormInput';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import {RNCamera} from 'react-native-camera';

const Profile = ({navigation}) => {
  const [userRole, setUserRole] = useState('');
  const [userDetails, setUserdetails] = useState({
    editableCompanyName: '',
    editableMobile: '',
    editableAddress: '',
    editableCity: '',
    editableState: '',
    editableZipCode: '',
    fullName: '',
    editableWebsiteLink: '',
  });
  const [loading, setLoading] = useState(true);

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

      // Convert the image to base64 format
      const base64ImageData = await RNFetchBlob.fs.readFile(doc.uri, 'base64');

      // Include the image data in the request payload
      const formData = new FormData();
      formData.append('image', base64ImageData);

      // Make the API call to upload the image
      const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Include any additional headers required by your API
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      // Handle the response as needed
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
    openCamera();
    openGallery();
  };

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

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await api.get('profile/');
        const data = response.data.data;
        setUserdetails({
          ...userDetails,
          editableCompanyName: data.company,
          editableAddress: data.address,
          editableMobile: data.mobile_no,
          editableCity: data.city,
          editableState: data.state,
          editableZipCode: data.zip_code,
          editableWebsiteLink: data.website_link,
          email: data.email,
          fullName: data.fullName,
        });
        setLoading(false);
        await AsyncStorage.setItem(
          'userName',
          data.first_name + ' ' + data.last_name,
        ).catch(console.error);
      } catch (error) {
        setLoading(false);
        console.log('Error fetching data from API:', error);
      }
    };
    fetchDataFromAPI();
  }, []);

  const handleEditProfile = async () => {
    try {
      const response = await api.post('profile/', {
        company: userDetails.editableCompanyName,
        mobile_no: userDetails.editableMobile,
        address: userDetails.editableAddress,
        city: userDetails.editableCity,
        state: userDetails.editableState,
        zip_code: userDetails.editableZipCode,
        website_link: userDetails.editableWebsiteLink,
      });
      console.log(response.data);
      if (response.data.success === false) {
        Alert.alert('Error', response.data.message);
      } else {
        Alert.alert('Success', response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.orange} />
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.role_btn}>
            <Text
              style={{
                color: colors.white,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {userRole == 1 ? 'Exhibitor' : 'Fabricators'}
            </Text>
          </TouchableOpacity>
          <View style={styles.detail}>
            <View style={styles.first}>
              <Text
                style={{fontSize: 50, color: colors.black, fontWeight: 'bold'}}>
                {userDetails.fullName?.charAt(0)}
              </Text>
            </View>

            <FormInput
              style={styles.title}
              value={userDetails.fullName}
              placeholder="Full Name"
            />
          </View>

          <View style={styles.user}>
            <View>
              <FormInput
                style={styles.user_info}
                textHeader={'Company Name'}
                value={userDetails.company}
                placeholder={'Enter your Company Name'}
                onChangeText={text => {
                  setUserdetails({...userDetails, company: text});
                }}
              />
            </View>

            <FormInput
              style={styles.titleEmail}
              textHeader={'Email'}
              value={userDetails.email}
            />

            <FormInput
              style={styles.user_info}
              textHeader={'Mobile Number'}
              placeholder={'+91234567890'}
              value={userDetails.editableMobile}
              onChangeText={text =>
                setUserdetails({...userDetails, editableMobile: text})
              }
            />
            <FormInput
              style={styles.user_info}
              textHeader={'Address'}
              placeholder={'Enter your Address'}
              value={userDetails.editableAddress}
              onChangeText={text =>
                setUserdetails({...userDetails, editableAddress: text})
              }
            />

            <FormInput
              style={styles.user_info}
              textHeader={'City'}
              placeholder={'Enter your Address'}
              value={userDetails.editableCity}
              onChangeText={text =>
                setUserdetails({...userDetails, editableCity: text})
              }
            />

            <FormInput
              style={styles.user_info}
              textHeader={'State'}
              placeholder={'Enter your State'}
              value={userDetails.editableState}
              onChangeText={text =>
                setUserdetails({...userDetails, editableState: text})
              }
            />

            <FormInput
              style={styles.user_info}
              textHeader={'Zip Code'}
              placeholder={'Enter your zip Code'}
              value={userDetails.editableZipCode}
              onChangeText={text =>
                setUserdetails({...userDetails, editableZipCode: text})
              }
            />
            <FormInput
              style={styles.user_info}
              textHeader={'Website Link'}
              placeholder={'Enter your Website'}
              value={userDetails.editableWebsiteCode}
              onChangeText={text =>
                setUserdetails({...userDetails, editableWebsiteCode: text})
              }
            />
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={uploadImageHandler}>
              <Text style={{color: colors.black}}>Upload Image</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10}}>
            <TouchableOpacity style={styles.btn} onPress={handleEditProfile}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: 'black',
                }}>
                Update Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },

  user_info: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    margin: 5,
    color: 'gray',
    padding: 2,
  },
  info: {
    fontSize: 18,
    color: colors.gray,
    marginBottom: 1,
  },
  role_btn: {
    justifyContent: 'center',
    backgroundColor: '#ff8c00',
    height: 40,
    width: 130,
    borderRadius: 10,
    marginLeft: 240,
    marginTop: 2,
  },

  first: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#ff8c00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 30,
  },
  titleEmail: {
    color: colors.black,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  detail: {
    color: colors.black,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  btn: {
    backgroundColor: colors.orange,
    width: '100%',
    padding: 10,
    borderRadius: 20,
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
});

export default Profile;
