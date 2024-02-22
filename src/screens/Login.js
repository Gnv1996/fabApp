import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import FormInput from '../components/FormInput';
import api from '../utils/api'; // Update import path
import colors from '../styles/colors';
import {AuthContext} from '../contexts/AuthContext';
import OtpModal from '../components/OtpModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResetPasswordModal from '../components/ResetPasswordModel';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {handleLogin} = useContext(AuthContext);
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isResetVisible, setResetVisible] = useState(false);
  const [response, setResponse] = useState('');

  const handleLoginSubmit = async () => {
    if (!email || !password) {
      setError('Please fill all fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/user/auth/signin/', {email, password});
      const {success, accessToken, user} = response.data;
      console.log(response.data, '->->->->');
      setResponse(response.message);

      if (success == true) {
        await AsyncStorage.setItem('userRole', user.role).catch(console.error);
        await AsyncStorage.setItem('userToken', accessToken);
        await AsyncStorage.setItem('userEmail', user.email);
        await AsyncStorage.setItem('userFullName', user.fullname);
        await AsyncStorage.setItem('userID', user._id);

        handleLogin(accessToken);
      } else {
        setError('An error occurred during login.');
        Alert.alert(response, 'Error');
      }
    } catch (error) {
      // console.log(error);
      setError('An error occurred during login.');
      if (error?.response) {
        Alert.alert('Error', error.response.data.message);
      }
      // console.log(error?.response?.data?.message, '->->->->');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setEmail('');
        setPassword('');
        setError('');
      }, 2000);
    }
  };

  const handleForgotPassword = () => {
    setResetVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../assests/cloud.png')}
          style={{height: 200, width: 200}}
        />
      </View>

      <Text style={styles.header}>Login</Text>
      {isLoading && <ActivityIndicator size="large" color={colors.orange} />}
      <Text style={{color: colors.red, textAlign: 'right'}}>{error}</Text>
      <FormInput
        textHeader={'Enter your email'}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter your Email"
      />

      <FormInput
        textHeader={'Password'}
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Enter your Password"
        secureTextEntry={true}
      />
      <Text style={styles.forgotText} onPress={handleForgotPassword}>
        Forgot Password?
      </Text>

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.btn} onPress={handleLoginSubmit}>
          <Text style={styles.btn_Text}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.link_Text}>
          Don't have an account?{' '}
          <Text
            style={styles.link_Text2}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            Signup
          </Text>
        </Text>
      </View>

      <ResetPasswordModal
        isResetVisible={isResetVisible}
        setResetVisible={setResetVisible}
      />
      <OtpModal isVisible={isVisible} setVisible={setVisible} email={email} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 50,
    color: 'black',
    fontWeight: '400',
    fontSize: 30,
  },

  btn: {
    backgroundColor: colors.orange,
    width: '100%',
    padding: 10,
    borderRadius: 20,
  },

  btn_Text: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
  },
  link_Text: {
    marginTop: 10,
    color: colors.black,
    fontSize: 17,
  },
  link_Text2: {
    fontWeight: 'bold',
    color: colors.orange,
  },
  error: {
    color: colors.red,
    marginTop: -25,
    marginBottom: 20,
  },
  forgotText: {
    textAlign: 'right',
    color: colors.blue,
    marginBottom: 10,
    textDecorationLine: 'underline',
    padding: 2,
  },
});

export default LoginScreen;
