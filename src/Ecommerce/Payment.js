import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const processPayment = async paymentDetails => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({success: true});
    }, 2000);
  });
};

export default function Payment({route}) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [fullName, setFullName] = useState('');
  const {totalPrice} = route.params;

  const handlePayment = async () => {
    try {
      const paymentResult = await processPayment({
        cardNumber,
        expiryDate,
        cvc,
        fullName,
      });

      if (paymentResult.success) {
        Alert.alert('Payment Successful..!', 'Thank you for your purchase!');
      } else {
        Alert.alert(
          'Payment Failed',
          'There was an issue processing your payment. Please try again.',
        );
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      Alert.alert(
        'Payment Error',
        'An error occurred while processing your payment. Please try again.',
      );
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <Image
            source={require('../assests/payment.png')}
            style={styles.cardImage}
          />
          <Text
            style={{
              fontSize: 20,
              padding: 15,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Debit Card / Credit Card Only
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={text => setCardNumber(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Expiry Date (MM/YY)"
            keyboardType="numeric"
            value={expiryDate}
            onChangeText={text => setExpiryDate(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="CVC"
            keyboardType="numeric"
            value={cvc}
            onChangeText={text => setCvc(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name of Account Holder"
            value={fullName}
            onChangeText={text => setFullName(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <Text style={styles.buttonText}>You have to Pay ₹{totalPrice}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  cardImage: {
    maxWidth: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
