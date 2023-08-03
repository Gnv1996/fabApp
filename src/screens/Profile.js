import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import colors from '../styles/colors';
import FormInput from '../components/FormInput';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [userRole, setUserRole] = useState('');
  const [userDetails, setUserdetails] = useState({
    editableMobile: '',
    editableAddress: '',
    editableCity: '',
    editableState: '',
    editableZipCode: '',
    fullName: '',
  });
  const [loading, setLoading] = useState(true);

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
          editableAddress: data.address,
          editableMobile: data.mobile_no,
          editableCity: data.city,
          editableState: data.state,
          editableZipCode: data.zip_code,
          email: data.email,
          fullName: data.first_name + ' ' + data.last_name,
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
      const full_name = userDetails.fullName.split(' ');
      const response = await api.post('profile/', {
        first_name: full_name[0],
        last_name: full_name[1],
        mobile_no: userDetails.editableMobile,
        address: userDetails.editableAddress,
        city: userDetails.editableCity,
        state: userDetails.editableState,
        zip_code: userDetails.editableZipCode,
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
              placeholder={'Full Name'}
              onChangeText={text => {
                setUserdetails({...userDetails, fullName: text});
              }}
            />
          </View>

          <View style={styles.user}>
            <View>
              <FormInput
                style={styles.user_info}
                textHeader={'Full Name'}
                value={userDetails.fullName}
                placeholder={'Enter your Full Name'}
                onChangeText={text => {
                  setUserdetails({...userDetails, fullName: text});
                }}
              />
            </View>

            <FormInput
              style={styles.user_info}
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
    width: 100,
    borderRadius: 10,
    marginLeft: 270,
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
});

export default Profile;
