import React, {useState, useEffect, useContext} from 'react';
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
import {AuthContext} from '../contexts/AuthContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function AaharUpdate({navigation}) {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [adminData, setAdminData] = useState({
    title: 'Aahar',
    eventDate: '',
    imageURL: '',
    venue: '',
    timePeriod: '',
    description: '',
  });

  const [expoCreated, setExpoCreated] = useState('');
  const {setExpoID} = useContext(AuthContext);
  const {expoID} = useContext(AuthContext);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [isSelectingStartTime, setIsSelectingStartTime] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const createExpoHandler = async () => {
    try {
      setLoading(true);

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
      }
    } catch (error) {
      console.log('Error creating Expo:', error.response.data);

      Alert.alert(
        'Error',
        'An error occurred while creating Expo ',
        error.response.data.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const updateExpoHandler = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', adminData.title);
      formData.append('eventDate', adminData.eventDate);
      formData.append('imageURL', adminData.imageURL);
      formData.append('venue', adminData.venue);
      formData.append('timePeriod', adminData.timePeriod);
      formData.append('description', adminData.description);

      const response = await api.put(`/exhibition/update/${expoID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const responseData = response;
      console.log(response, 'data');
      if (responseData.status) {
        console.log('Expo update successful');
        Alert.alert('Success', 'Auto Expo data updated successfully', [
          {
            text: 'OK',
            onPress: () => fetchDataFromAPI(), // Reload profile data after update
          },
        ]);
      }
    } catch (error) {
      console.log('Error updating Expo:');
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
    requestGalleryPermission();
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

  const fetchDataFromAPI = async () => {
    try {
      const response = await api.get('/exhibition/get');
      const allExhibitions = response.data.exhibition;
      console.log(allExhibitions, '----data coming---');

      const filteredExhibition = allExhibitions.find(
        exhibition => exhibition.title === 'Aahar',
      );

      if (filteredExhibition) {
        setAdminData(prev => ({...prev, ...filteredExhibition}));
        setSelectedImage(filteredExhibition.imageURL);
        setExpoID(filteredExhibition._id);
        console.log(filteredExhibition.imageURL, '-------this is');
        setExpoCreated(true);
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    // Convert date to string with only the date part
    const dateString = date.toISOString().split('T')[0];
    setAdminData({...adminData, eventDate: dateString});
  };

  const showTimePicker = () => {
    if (isSelectingStartTime) {
      setStartTimePickerVisible(true);
    } else {
      setEndTimePickerVisible(true);
    }
  };

  const hideTimePicker = () => {
    if (isSelectingStartTime) {
      setStartTimePickerVisible(false);
    } else {
      setEndTimePickerVisible(false);
    }
  };

  const handleTimeConfirm = time => {
    hideTimePicker();
    const formattedTime = formatTime(time);
    if (isSelectingStartTime) {
      setAdminData(prevState => ({
        ...prevState,
        timePeriod: `${formattedTime} - ${
          prevState.timePeriod.split(' - ')[1]
        }`,
      }));
    } else {
      setAdminData(prevState => ({
        ...prevState,
        timePeriod: `${
          prevState.timePeriod.split(' - ')[0]
        } - ${formattedTime}`,
      }));
    }
    setIsSelectingStartTime(!isSelectingStartTime); // Toggle flag after selecting time
  };

  const formatTime = time => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  return (
    <ScrollView>
      <Text style={styles.layoutText}>{adminData.title}</Text>

      <View style={styles.component}>
        <Text style={styles.headingDate}>Select Date</Text>
        <TouchableOpacity
          onPress={showDatePicker}
          style={styles.imagePickerButtons}>
          <Text style={{color: colors.black}}>
            {adminData?.eventDate ? adminData?.eventDate : 'Select Date'}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <FormInput
          textHeader="Venue"
          placeholder="Location"
          value={adminData.venue}
          onChangeText={text => setAdminData({...adminData, venue: text})}
        />
        <Text style={styles.headingDate}>Select Event Time</Text>
        <TouchableOpacity
          onPress={showTimePicker}
          style={styles.imagePickerButtons}>
          <Text style={{color: colors.black}}>
            {adminData?.timePeriod
              ? adminData?.timePeriod
              : 'Select Event Time'}
          </Text>
        </TouchableOpacity>
        <View>
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible || isEndTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
        </View>

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
    color: colors.gray,
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
  selectedImage: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  imagePickerButtons: {
    borderWidth: 2,
    borderColor: colors.gray,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  headingDate: {
    fontSize: 16,
    color: colors.black,
  },
});

export default AaharUpdate;
