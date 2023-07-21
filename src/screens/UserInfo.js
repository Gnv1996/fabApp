import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import FormInput from '../components/FormInput';
import colors from '../styles/colors';

function UserInfo() {
  const [stallSize, setStallSize] = useState('');
  const [stallNumber, setStallNumber] = useState('');
  const [colorTheme, setColorTheme] = useState('');
  const [products, setProducts] = useState('');
  const [carpetColor, setCarpetColor] = useState('');
  const [furniture, setFurniture] = useState('');
  const [comment, setComment] = useState('');
  const [vinylSelected, setVinylSelected] = useState(false);
  const [backlitSelected, setBacklitSelected] = useState(false);
  const [vinylSunboardSelected, setVinylSunboardSelected] = useState(false);
  const [flexSelected, setFlexSelected] = useState(false);

  return (
    <ScrollView>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 30,
          marginBottom: 30,
          fontWeight: 'bold',
          fontSize: 24,
        }}>
        Requirement Form
      </Text>
      <View style={styles.container}>
        <FormInput
          textHeader="Size of Stall"
          value={stallSize}
          onChangeText={setStallSize}
        />
        <FormInput
          textHeader="Stall Number"
          value={stallNumber}
          onChangeText={setStallNumber}
        />
        <FormInput
          textHeader="Color Theme"
          value={colorTheme}
          onChangeText={setColorTheme}
        />
        <FormInput
          textHeader="Products to display / Service"
          value={products}
          setProducts={setProducts}
        />
        <Text style={styles.labels}>Branding</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Vinyl"
              checked={vinylSelected}
              onPress={() => setVinylSelected(!vinylSelected)}
              containerStyle={styles.checkbox}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Backlit Letters"
              checked={backlitSelected}
              onPress={() => setBacklitSelected(!backlitSelected)}
              containerStyle={styles.checkbox}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Vinyl with Sunboard"
              checked={vinylSunboardSelected}
              onPress={() => setVinylSunboardSelected(!vinylSunboardSelected)}
              containerStyle={styles.checkbox}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Flex"
              checked={flexSelected}
              onPress={() => setFlexSelected(!flexSelected)}
              containerStyle={styles.checkbox}
            />
          </View>
        </View>

        <FormInput
          textHeader={'Carpet Color'}
          value={carpetColor}
          onChangeText={setCarpetColor}
        />
        <FormInput
          textHeader={'Furniture'}
          value={furniture}
          onChangeText={setFurniture}
        />
        <FormInput
          textHeader={'Comment'}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.orange,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: 50,
          }}>
          <Text style={{color: colors.white, fontWeight: 'bold'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '50%',
  },
  label: {
    margin: 8,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labels: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
    color: colors.black,
    marginLeft: 2,
  },
});

export default UserInfo;
