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
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const [selectedItem, setSelectedItem] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleItemSelected = itemValue => {
    setSelectedItem(itemValue);
    setIsFormVisible(itemValue === 'item');
  };
  const returnHandler = () => {
    setIsFormVisible(true);
    setSelectedItem('');
  };

  const handleColorThemeChange = selectedValue => {
    setColorTheme(selectedValue);
  };
  const handleCarpetColorThemeChange = selectedValue => {
    setCarpetColor(selectedValue);
  };

  formSubmitHandler = async () => {
    try {
      const response = await api.post('signup/', {
        email,
        password: {password: password, confirm_password: confirmPassword},
        role: role.find(r => r.isChecked)?.id || '',
      });

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
      <View style={styles.container}>
        {isFormVisible ? (
          <View>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 30,
                marginBottom: 30,
                fontWeight: 'bold',
                fontSize: 24,
              }}>
              Welcome in Exhibitions
            </Text>

            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedItem}
                onValueChange={handleItemSelected}>
                <Picker.Item label="Select an Exhibitions" value="item" />
                <Picker.Item label="Natural Products" value="item1" />
                <Picker.Item label="3D Technologies" value="item2" />
                <Picker.Item label="Solo Art" value="item3" />
                <Picker.Item label="Trade Exhibitions" value="item4" />
                <Picker.Item label="Item 5" value="item5" />
              </Picker>
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                marginBottom: 60,
                gap: 85,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 24,
                  justifyContent: 'center',
                }}>
                Requirement Form
              </Text>
              <TouchableOpacity onPress={returnHandler}>
                <Icon name="cancel" size={30} color={colors.orange} />
              </TouchableOpacity>
            </View>

            <FormInput
              textHeader="Size of Stall"
              value={stallSize}
              onChangeText={setStallSize}
              placeholder={'Enter your size of stall'}
            />
            <FormInput
              textHeader="Stall Number"
              value={stallNumber}
              placeholder={'Enter your stall Number'}
              onChangeText={setStallNumber}
            />
            <Text style={styles.label}>Color Theme</Text>
            <View style={styles.dropdownColor}>
              <Picker
                selectedValue={colorTheme}
                onValueChange={handleColorThemeChange}>
                <Picker.Item label="Select" value="default" />
                <Picker.Item label="Dark Theme" value="dark" />
                <Picker.Item label="Light Theme" value="light" />
                <Picker.Item label="Custom Theme" value="custom" />
                <Picker.Item label="Default" value="default" />
              </Picker>
            </View>

            <FormInput
              textHeader="Products to display / Service"
              placeholder={'Enter your display/service'}
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
                  onPress={() =>
                    setVinylSunboardSelected(!vinylSunboardSelected)
                  }
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

            <Text style={styles.label}>Carpet Color</Text>
            <View style={styles.dropdownColor}>
              <Picker
                selectedValue={carpetColor}
                onValueChange={handleCarpetColorThemeChange}>
                <Picker.Item label="Select" value="default" />
                <Picker.Item label="Dark Theme" value="dark" />
                <Picker.Item label="Light Theme" value="light" />
                <Picker.Item label="Custom Theme" value="custom" />
                <Picker.Item label="Default" value="default" />
              </Picker>
            </View>
            <FormInput
              textHeader={'Furniture'}
              value={furniture}
              placeholder={'Enter your Furniture'}
              onChangeText={setFurniture}
            />
            <FormInput
              textHeader={'Comment'}
              placeholder={'Text Your comment'}
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
              }}
              onPress={formSubmitHandler}>
              <Text style={{color: colors.white, fontWeight: 'bold'}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
  dropdownContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  dropdownColor: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
  },
  selectedItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    textAlign: 'center',
    marginTop: 10,
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
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
    marginLeft: 2,
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
