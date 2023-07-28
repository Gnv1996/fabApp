import React, {useContext, useState} from 'react';
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
import {ProfileContext} from '../contexts/ProfileContext';
import api from '../utils/api';

const ProfileScreen = () => {
  const {userDetails, loading} = useContext(ProfileContext);

  const [formData, setFormData] = useState({
    editableMobile: userDetails.mobile_no,
    editableAddress: userDetails.address,
    editableCity: userDetails.city,
    editableState: userDetails.state,
    editableZipCode: userDetails.zip_code,
    fullName: userDetails.first_name + ' ' + userDetails.last_name,
  });

  const handleEditProfile = async () => {
    try {
      const full_name = formData.fullName.split(' ');
      const response = await api.post('profile/', {
        first_name: full_name[0],
        last_name: full_name[1],
        mobile_no: formData.editableMobile,
        address: formData.editableAddress,
        city: formData.editableCity,
        state: formData.editableState,
        zip_code: formData.editableZipCode,
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
              {userDetails.role == 1 ? 'Exhibitor' : 'Fabricators'}
            </Text>
          </TouchableOpacity>
          <View style={styles.detail}>
            <View style={styles.first}>
              <Text
                style={{fontSize: 50, color: colors.black, fontWeight: 'bold'}}>
                {userDetails.first_name?.charAt(0)}
              </Text>
            </View>

            <FormInput
              style={styles.title}
              value={formData.fullName}
              placeholder={'Full Name'}
              onChangeText={text => setFormData({...formData, fullName: text})}
            />
          </View>

          <View style={styles.user}>
            <FormInput
              style={styles.user_info}
              textHeader={'Email'}
              value={userDetails.email}
            />

            <FormInput
              style={styles.user_info}
              textHeader={'Mobile Number'}
              placeholder={'+911234567890'}
              value={formData.editableMobile}
              onChangeText={text =>
                setFormData({...formData, editableMobile: text})
              }
            />
            <FormInput
              style={styles.user_info}
              textHeader={'Address'}
              placeholder={'Enter your Address'}
              value={formData.editableAddress}
              onChangeText={text =>
                setFormData({...formData, editableAddress: text})
              }
            />

            <FormInput
              style={styles.user_info}
              textHeader={'Enter your City'}
              value={formData.editableCity}
              placeholder={'City'}
              onChangeText={text =>
                setFormData({...formData, editableCity: text})
              }
            />

            <FormInput
              style={styles.user_info}
              textHeader={'State'}
              placeholder={'Enter Your State'}
              value={formData.editableState}
              onChangeText={text =>
                setFormData({...formData, editableState: text})
              }
            />
            <FormInput
              style={styles.user_info}
              placeholder={'Enter your Zip Code'}
              textHeader={'Zip Code'}
              value={formData.editableZipCode}
              onChangeText={text =>
                setFormData({...formData, editableZipCode: text})
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

export default ProfileScreen;
