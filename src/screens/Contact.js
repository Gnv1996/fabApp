import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import FormInput from '../components/FormInput';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

function Contact() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            color: colors.black,
          }}>
          Talk to our contact sales
        </Text>
        <Text style={styles.heading}>
          Have question about Pricing plans and growly? Fill out the form and a
          product analytics expert will be an touch shortly.{' '}
        </Text>

        <View style={{backgroundColor: colors.white, padding: 20}}>
          <FormInput textHeader={'Full Name'} placeholder={'Full Name'} />
          <FormInput textHeader={'Email'} placeholder={'Email'} />
          <FormInput
            textHeader={'Mobile Number'}
            placeholder={'Mobile Number'}
          />
          <Text style={{fontSize: 16}}>{(textHeader = 'Message')}</Text>

          <TextInput
            style={{
              borderColor: colors.gray,
              borderWidth: 1,
              borderRadius: 5,
              marginTop: 7,
              height: 150,
              textAlignVertical: 'top',
              padding: 2,
              color: colors.gray,

              paddingLeft: 7,
              paddingRight: 7,
              width: '100%',
            }}
            placeholder="Message"
            // numberOfLines={3}
            multiline={true}
          />

          <View style={{marginTop: 20}}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btn_Text}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'black',
          height: 200,
        }}>
        <View
          style={{
            borderBottomColor: colors.gray,
            borderBottomWidth: 1,
            padding: 15,
          }}>
          <Text style={{color: 'white', textAlign: 'right'}}>to top</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{marginTop: 20, marginLeft: 10, marginRight: 20}}>
            <Icon name="facebook" size={40} color="#FFFFFF" />
          </View>
          <View style={{marginTop: 20, marginLeft: 30, marginRight: 20}}>
            <Icon name="twitter" size={40} color="#FFFFFF" />
          </View>
          <View style={{marginTop: 20, marginLeft: 30, marginRight: 10}}>
            <Icon name="instagram" size={40} color="#FFFFFF" />
          </View>
          <View style={{marginTop: 20, marginLeft: 30, marginRight: 20}}>
            <Icon name="youtube" size={35} color="#FFFFFF" />
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text style={{color: 'white'}}>
            Imprint / Privacy | Terms & Condition |
          </Text>
          <Text style={{color: 'white'}}>Feedback</Text>
          <Text style={{color: 'white', marginTop: 10}}>Standard website</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  heading: {
    fontSize: 17,
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'justify',
    color: colors.gray,
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
});
export default Contact;
