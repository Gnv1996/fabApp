import React, {useState, useContext} from 'react';
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
import api from '../utils/api';
import colors from '../styles/colors';
import {AuthContext} from '../contexts/AuthContext';
import OtpModal from '../components/OtpModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {handleLogin} = useContext(AuthContext);
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleLoginSubmit = async () => {
    if (!email || !password) {
      setError('Please fill all fields.');
      return;
    }
    try {
      setLoading(true);
      const response = await api.post('signin/', {
        email,
        password,
      });
      const role = response.data.role.toString();
      setLoading(false);
      if (response.data.success === false) {
        if (response.data.message === 'Please verify your email.') {
          setVisible(true);
        } else {
          Alert.alert('Error', response.data.message);
        }
      } else {
        await AsyncStorage.setItem('userRole', role).catch(console.error);
        handleLogin(response.data.token.access);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      // Show the loader for 2 seconds and then hide it
      setTimeout(() => setLoading(false), 2000);
      setEmail('');
      setPassword('');
      setError('');
    }
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
});

export default LoginScreen;
