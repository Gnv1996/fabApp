import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import colors from '../styles/colors';
import FormInput from './FormInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../utils/api';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPasswordModal = ({isResetVisible, setResetVisible, data}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const navigation = useNavigation();

  const resetPasswordHandler = async () => {
    try {
      if (step === 1) {
        const response = await api.post('/user/forgot/password', {
          email,
        });
        const {resetPasswordToken} = response.data;
        console.log(response.data, '------->------forgot Token Chceking---');
        if (response.data.success === true) {
          await AsyncStorage.setItem('ForgetToken', resetPasswordToken).catch(
            console.error,
          );
          setStep(2);
        } else {
          Alert.alert(
            'Error',
            response.data.message || 'Failed to send reset password link',
          );
        }
      } else if (step === 2) {
        const response = await api.put('/user/update/password', {
          password,
          confirmPassword,
        });
        if (response.data.success === true) {
          await AsyncStorage.removeItem('ForgetToken');
          Alert.alert(
            'Success',
            response.data.message || 'Password reset successfully',
            [
              {
                text: 'OK',
                onPress: () => {
                  setResetVisible(false);
                  navigation.navigate('Login');
                },
              },
            ],
          );
        } else {
          Alert.alert(
            'Error',
            response.data.message || 'Failed to reset password',
          );
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const renderStepOne = () => {
    return (
      <>
        <Text style={styles.title}>Enter Email</Text>
        <FormInput
          textHeader={'Email'}
          value={email}
          onChangeText={setEmail}
          placeholder={'Enter your email'}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={resetPasswordHandler} // Call resetPasswordHandler on button press
        >
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderStepTwo = () => {
    return (
      <>
        <Text style={styles.title}>Reset Password</Text>
        <FormInput
          textHeader={'New Password'}
          value={password}
          onChangeText={setPassword}
          placeholder={'Enter New Password'}
          secureTextEntry={true}
        />
        <FormInput
          textHeader={'Confirm Password'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder={'Confirm Password'}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={resetPasswordHandler}>
          <Text style={styles.text}>Reset Password</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Modal visible={isResetVisible} transparent={true}>
      <View style={styles.modal_container}>
        <View style={styles.modal}>
          {step === 1 ? renderStepOne() : renderStepTwo()}
          <TouchableOpacity
            onPress={() => setResetVisible(false)}
            style={styles.closeButton}>
            <Icon name="cancel" size={30} color={colors.orange} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResetPasswordModal;

const styles = StyleSheet.create({
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
