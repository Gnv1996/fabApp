import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Platform, // Import Platform
  PermissionsAndroid, // Import PermissionsAndroid
} from 'react-native';
import colors from '../styles/colors';
import FormInput from '../components/FormInput';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import FormData from 'form-data';
import DocumentPicker from 'react-native-document-picker';
import {AuthContext} from '../contexts/AuthContext';

const Profile = ({navigation}) => {
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [imgProfile, setImgProfile] = useState('');
  const [userDetails, setUserDetails] = useState({
    companyName: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    websiteLink: '',
    selectedImage: '',
  });

  const [loading, setLoading] = useState(true);
  const {setProfileImg} = useContext(AuthContext);

  const fetchDataFromAPI = async () => {
    try {
      const storedUserRole = await AsyncStorage.getItem('userRole');
      setUserRole(storedUserRole);

      const storedFullName = await AsyncStorage.getItem('userFullName');
      setFullName(storedFullName);

      const storedEmail = await AsyncStorage.getItem('userEmail');
      setEmail(storedEmail);

      const response = await api.get('/user/get_profile');
      // console.log(response, '=======>======');
      const data = response.data.profileData;
      setUserDetails(prev => ({...prev, ...data}));
      setProfileImg(data.profileImage);
      setImgProfile(data.profileImage);
      // setUserDetails({...userDetails, selectedImage: data.profileImage});

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data from API:', error);
      Alert.alert('Error', 'Failed to fetch profile data');
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  // console.log(userDetails, '---------------data----');
  const handleEditProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('companyName', userDetails.companyName);
      formData.append('mobileNumber', userDetails.mobileNumber);
      formData.append('address', userDetails.address);
      formData.append('city', userDetails.city);
      formData.append('state', userDetails.state);
      formData.append('zipcode', userDetails.zipcode);
      formData.append('websiteLink', userDetails.websiteLink);
      formData.append('profile', userDetails.selectedImage);
      formData.append('email', userDetails.email);

      console.log(formData, '------->-fff------------');
      const response = await api.put('/user/update/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${AsyncStorage.getItem('userToken')}`,
        },
      });
      // console.log(response, '--->--');
      const responseData = response.data;
      // console.log(responseData);
      ;

      if (response.data) {
        const profileData = responseData.profile;
        setUserDetails(prev => {
          return {...prev, ...profileData};
        });
        Alert.alert('Success', 'Profile updated successfully', [
          {
            text: 'OK',
            onPress: () => fetchDataFromAPI(), // Reload profile data after update
          },
        ]);
      } else {
        Alert.alert(
          'Error',
          responseData.message || 'Failed to update profile',
        );
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating profile');
    }
  };

  const uploadImageHandler = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('Picked document:', doc);
      setUserDetails({...userDetails, selectedImage: doc[0]});
      // setSelectedImage(doc[0].uri);
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  // const uploadImageHandler = () => {
  //   launchImageLibrary({mediaType: 'photo'}, response => {
  //     if (!response.didCancel && !response.error) {
  //       setUserDetails({...userDetails, profileImage: response.uri});
  //     }
  //   });
  // };

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
              {imgProfile ? (
                <Image
                  source={{
                    uri: imgProfile,
                  }}
                  style={styles.profileImage}
                />
              ) : (
                <Text style={styles.titleHeading}>
                  {fullName.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>

            <FormInput
              style={styles.titles}
              value={fullName}
              placeholder="Full Name"
            />
          </View>

          <View style={styles.user}>
            <View>
              <FormInput
                style={styles.user_info}
                textHeader={'Company Name'}
                value={userDetails.companyName}
                placeholder={'Enter your Company Name'}
                onChangeText={text => {
                  setUserDetails({...userDetails, companyName: text});
                }}
              />
            </View>

            <FormInput
              style={styles.titleEmail}
              textHeader={'Email'}
              value={email}
            />

            <FormInput
              style={styles.user_info}
              textHeader={'Mobile Number'}
              placeholder={'+91234567890'}
              value={userDetails.mobileNumber}
              onChangeText={text =>
                setUserDetails({...userDetails, mobileNumber: text})
              }
            />
            <FormInput
              style={styles.user_info}
              textHeader={'Address'}
              placeholder={'Enter your Address'}
              value={userDetails.address}
              onChangeText={text =>
                setUserDetails({...userDetails, address: text})
              }
            />

            <FormInput
              style={styles.user_info}
              textHeader={'City'}
              placeholder={'Enter your City'}
              value={userDetails.city}
              onChangeText={text =>
                setUserDetails({...userDetails, city: text})
              }
            />

            <FormInput
              style={styles.user_info}
              textHeader={'State'}
              placeholder={'Enter your State'}
              value={userDetails.state}
              onChangeText={text =>
                setUserDetails({...userDetails, state: text})
              }
            />

            <FormInput
              style={styles.user_info}
              textHeader={'Zip Code'}
              placeholder={'Enter your Zip Code'}
              value={userDetails.zipcode?.toString()}
              onChangeText={text =>
                setUserDetails({...userDetails, zipcode: text})
              }
            />
            <FormInput
              style={styles.user_info}
              textHeader={'Website Link'}
              placeholder={'Enter your Website Link'}
              value={userDetails.websiteLink}
              onChangeText={text =>
                setUserDetails({...userDetails, websiteLink: text})
              }
            />

            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={uploadImageHandler}>
              <Text style={{color: colors.black}}>Upload Image</Text>
            </TouchableOpacity>
          </View>

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
  titles: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  titleEmail: {
    color: colors.black,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  titleHeading: {
    fontSize: 40,
    color: colors.black,
    fontWeight: 'bold',
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default Profile;
