import {useState} from 'react';
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

const OtpModal = ({isVisible, setVisible, email, navigation}) => {
  const [otp, setOtp] = useState('');
  const [verifyClicked, setVerifyClicked] = useState(false);
  const [resendClicked, setResendClicked] = useState(false);

  console.log(otp);

  const verifyHandler = async () => {
    try {
      setVerifyClicked(true);
      setResendClicked(false);
      const response = await api.post('verify-otp/', {
        email,
        otp,
      });
      console.log(response.data.message);
      if (response.data.success == true) {
        Alert.alert('Success', response.data.message, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
        setVisible(false);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    resetButtonState();
  };

  const resendHandler = async () => {
    try {
      setResendClicked(true);
      setVerifyClicked(false);
      const response = await api.post('resend-otp/', {
        email,
      });
      console.log(response);
      if (response.data.success === false) {
        Alert.alert('Error', response.data.message);
      } else {
        Alert.alert('Success', response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    resetButtonState();
  };

  const resetButtonState = () => {
    setTimeout(() => {
      setVerifyClicked(false);
      setResendClicked(false);
    }, 2000);
  };

  const getButtonColor = isClicked => {
    return isClicked ? colors.orange : colors.gray;
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.modal_container}>
        <View style={styles.modal}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: 'green',
                fontWeight: 'bold',
                position: 'relative',
                top: 5,
              }}>
              Please Check your Inbox
            </Text>

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon name="cancel" size={30} color={colors.orange} />
            </TouchableOpacity>
          </View>

          <FormInput
            textHeader={'OTP'}
            value={otp}
            onChangeText={setOtp}
            placeholder={'Enter Otp'}
            maxLength={6}
            keyboardType="number-pad"
          />
          <View style={styles.button_container}>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: getButtonColor(verifyClicked)},
              ]}
              onPress={verifyHandler}
              activeOpacity={0.7}>
              <Text style={styles.text}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: getButtonColor(resendClicked)},
              ]}
              onPress={resendHandler}
              activeOpacity={0.7}>
              <Text style={styles.text}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OtpModal;

const styles = StyleSheet.create({
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.gray,
  },
  modal: {
    height: 200,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    padding: 10,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
    backgroundColor: colors.gray,
  },

  text: {
    color: colors.white,
  },
  button_container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
});
