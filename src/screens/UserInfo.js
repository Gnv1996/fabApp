import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import FormInput from '../components/FormInput';
import colors from '../styles/colors';
import {ColorPicker} from 'react-native-color-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../utils/api';

function UserInfo() {
  const [stallSize, setStallSize] = useState('');
  const [stallNumber, setStallNumber] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [colorVisible, setColorVisible] = useState(false);
  const [carpetColor, setCarpetColor] = useState('Select the Carpet Color');
  const [products, setProducts] = useState('');
  const [WoodenFlooring, setWoodenFlooring] = useState(
    'Select your Wooden Flooring',
  );
  const [furniture, setFurniture] = useState('Select your Furniture');
  const [lighting, setLighting] = useState('Select your Lighting');
  const [vinylSelected, setVinylSelected] = useState(false);
  const [backlitSelected, setBacklitSelected] = useState(false);
  const [vinylSunboardSelected, setVinylSunboardSelected] = useState(false);
  const [flexSelected, setFlexSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Select Exhibitions');
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [budget, setBudget] = useState('Select Your Budget ');
  const [isChecked, setIsClicked] = useState(false);
  const [isWoodenChecked, setIsWoodenClicked] = useState(false);
  const [isCarpetChecked, setIsCarpetClicked] = useState(false);
  const [isFurnitureChecked, setIsFurnitureClicked] = useState(false);
  const [isLightingChecked, setIsLightingClicked] = useState(false);
  const [comment, SetComment] = useState('');

  const Exhibitor = [
    {label: 'Auto Expo', value: 'item1'},
    {label: 'Plast India', value: 'item2'},
    {label: 'Tent Expo', value: 'item3'},
    {label: 'Solar Expo', value: 'item4'},
  ];

  const budgets = [
    {label: '₹2000- ₹3000', value: '₹2000_₹3000'},
    {label: '₹3000- ₹4000', value: '₹3000_₹4000'},
    {label: '₹5000- ₹6000', value: '₹5000_₹6000'},
    {label: '₹6000- ₹7000', value: '₹6000_₹7000'},
    {label: '₹7000- ₹8000', value: '₹7000_₹8000'},
    {label: '₹8000- ₹9000', value: '₹8000_₹9000'},
    {label: '₹10,000- ₹11,000', value: '₹10,000_₹11,000'},
    {label: '₹12,000- ₹13,000', value: '₹12,000_₹13,000'},
  ];

  const furnitures = [
    {label: 'Select your Furniture', value: 'default'},
    {label: 'Fixed Chair', value: 'Fixed_Chair'},
    {label: 'Glass Round Table', value: 'Glass_round'},
    {
      label: 'Sofa set Double Seater',
      value: 'Sofa_Double_Seater',
    },
    {
      label: 'Sofa set Single Seater',
      value: 'Sofa_Single_Seater',
    },
    {label: 'Center Table', value: 'Center_table'},
    {label: 'Browser Stand', value: 'Browser_stand'},
    {label: 'Visiting Bowl', value: 'Visiting Bowl'},
    {label: 'Dustbin', value: 'Dustbin'},
    {label: 'Executive Table', value: 'Executive_table'},
  ];

  const CarpetColors = [
    {label: 'Select Carpet color', value: 'default'},
    {label: 'Blue', value: 'Blue'},
    {label: 'Black', value: 'Black'},
    {label: 'Gray', value: 'Gray'},
    {label: 'Light', value: 'Light'},
    {label: 'Light-Gray', value: 'Light-Gray'},
    {label: 'Dark-Gray', value: 'Dark-Gray'},
    {label: 'Red', value: 'Red'},
    {label: 'Green', value: 'Green'},
    {label: 'camel color', value: 'Camel color'},
  ];
  const Wooden = [
    {
      value: 'White',
      label: 'White',
      image: require('../assests/Luna.jpeg'),
    },
    {
      label: 'Light Brown',
      value: 'light Brown',
      image: require('../assests/volto.jpeg'),
    },
    {
      label: 'Dark Brown',
      value: 'Dark Brown',
      image: require('../assests/Hillcrest.jpeg'),
    },
    {
      label: 'Burton',
      value: 'Burton',
      image: require('../assests/Burton.jpg'),
    },
    {label: 'Canon', value: 'Canon', image: require('../assests/Canon.jpeg')},
  ];

  const lightings = [
    {label: 'White', value: 'White'},
    {label: 'Warm White', value: 'WarmWhite'},
    {label: 'Yellow', value: 'Yellow'},
  ];

  const handleItemSelected = itemValue => {
    setSelectedItem(itemValue);
    setIsFormVisible(itemValue === 'item');
  };
  const returnHandler = () => {
    setIsFormVisible(true);
    setSelectedItem('');
  };
  const colorSelectedHandler = color => {
    setSelectedColor(color);
  };

  const dataSubmitHandler = async () => {
    // Prepare data to send
    const dataToSend = {
      stallSize,
      stallNumber,
      selectedColor,
      carpetColor,
      products,
      WoodenFlooring,
      furniture,
      lighting,
      vinylSelected,
      backlitSelected,
      vinylSunboardSelected,
      flexSelected,
      selectedItem,
      budget,
      comment,
    };

    try {
      const response = await api.post('/requirement/set', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
      // Handle response according to your requirements
      if (response.status == true) {
        Alert.alert('Your Data is Successfully Save. ');
      }

      console.log(dataToSend, '--->---requirement Form---');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Please Enter all Details Error ');
      // Handle error
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
                color: colors.black,
              }}>
              Welcome in Fabrication
            </Text>

            <View style={styles.dropdownSelect}>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => {
                  setIsClicked(!isChecked);
                }}>
                <Text style={styles.heading}>Select Option</Text>
                {isChecked ? (
                  <Image
                    source={require('../assests/arrow-up.png')}
                    style={styles.icon}
                  />
                ) : (
                  <Image
                    source={require('../assests/down.png')}
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

              {isChecked ? (
                <View style={styles.dropDownArea}>
                  <FlatList
                    data={Exhibitor}
                    keyExtractor={item => item.value}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        style={styles.countryitem}
                        onPress={() => {
                          handleItemSelected(item.label);
                          setIsClicked(false); // Close the dropdown
                        }}>
                        <Text style={styles.heading}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              ) : null}
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
                gap: 30,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24,
                  justifyContent: 'center',
                  color: colors.black,
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
              textHeader="Stall No :"
              value={stallNumber}
              placeholder={'Enter your stall Number'}
              onChangeText={setStallNumber}
            />
            <Text style={styles.label}>Color Theme</Text>

            <View style={{marginBottom: 10, marginTop: 5}}>
              <TouchableOpacity
                style={{
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: colors.gray,
                }}
                onPress={() => setColorVisible(!colorVisible)} // Fix the issue here
              >
                <Text style={{color: 'black'}}>Choose Color</Text>
              </TouchableOpacity>

              <View style={{alignItems: 'center', marginTop: 10}}>
                {colorVisible ? (
                  <ColorPicker
                    hideSliders
                    onColorSelected={colorSelectedHandler}
                    style={{height: 100, width: 100}}
                  />
                ) : null}
                <View
                  style={{
                    height: 10,
                    width: 40,
                    backgroundColor: selectedColor,
                    borderRadius: 10,
                    margin: 5,
                  }}></View>
              </View>
            </View>

            <FormInput
              textHeader="Products to display / Service"
              placeholder={'Enter your display/service'}
              value={products}
              onChangeText={setProducts}
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
                  title="Non-Backlit Letters"
                  checked={vinylSunboardSelected}
                  onPress={() =>
                    setVinylSunboardSelected(!vinylSunboardSelected)
                  }
                  containerStyle={styles.checkbox}
                />
              </View>

              <View style={styles.checkboxContainer}>
                <CheckBox
                  title="Flex / Fabric"
                  checked={flexSelected}
                  onPress={() => setFlexSelected(!flexSelected)}
                  containerStyle={styles.checkbox}
                />
              </View>
            </View>

            <View style={styles.dropdownSelect}>
              <Text style={styles.labels}>Wooden Flooring</Text>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => {
                  setIsWoodenClicked(!isWoodenChecked);
                }}>
                <Text style={styles.heading}>{WoodenFlooring}</Text>
                {isWoodenChecked ? (
                  <Image
                    source={require('../assests/arrow-up.png')}
                    style={styles.icon}
                  />
                ) : (
                  <Image
                    source={require('../assests/down.png')}
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

              {isWoodenChecked ? (
                <View style={styles.dropDownArea}>
                  <FlatList
                    data={Wooden}
                    keyExtractor={item => item.image}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        style={styles.countryitem}
                        onPress={() => {
                          setWoodenFlooring(item.label);
                          setIsWoodenClicked(false); // Close the dropdown
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Image source={item.image} style={styles.itemImage} />
                          <Text style={styles.imagelabel}>{item.label}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              ) : null}
            </View>

            <View style={styles.dropdownSelect}>
              <Text style={styles.labels}>CarpetColor</Text>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => {
                  setIsCarpetClicked(!isCarpetChecked);
                }}>
                <Text style={styles.heading}>{carpetColor}</Text>
                {isCarpetChecked ? (
                  <Image
                    source={require('../assests/arrow-up.png')}
                    style={styles.icon}
                  />
                ) : (
                  <Image
                    source={require('../assests/down.png')}
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

              {isCarpetChecked ? (
                <View style={styles.dropDownArea}>
                  <FlatList
                    data={CarpetColors}
                    keyExtractor={item => item.value}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        style={styles.countryitem}
                        onPress={() => {
                          setCarpetColor(item.label);
                          setIsCarpetClicked(false); // Close the dropdown
                        }}>
                        <Text style={styles.heading}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              ) : null}
            </View>

            <View style={styles.dropdownSelect}>
              <Text style={styles.labels}>Furniture</Text>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => {
                  setIsFurnitureClicked(!isFurnitureChecked);
                }}>
                <Text style={styles.heading}>{furniture}</Text>
                {isFurnitureChecked ? (
                  <Image
                    source={require('../assests/arrow-up.png')}
                    style={styles.icon}
                  />
                ) : (
                  <Image
                    source={require('../assests/down.png')}
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

              {isFurnitureChecked ? (
                <View style={styles.dropDownArea}>
                  <FlatList
                    data={furnitures}
                    keyExtractor={item => item.value}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        style={styles.countryitem}
                        onPress={() => {
                          setFurniture(item.label);
                          setIsFurnitureClicked(false); // Close the dropdown
                        }}>
                        <Text style={styles.heading}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              ) : null}
            </View>

            <View style={styles.dropdownSelect}>
              <Text style={styles.labels}>Lighting</Text>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => {
                  setIsLightingClicked(!isLightingChecked);
                }}>
                <Text style={styles.heading}>{lighting}</Text>
                {isLightingChecked ? (
                  <Image
                    source={require('../assests/arrow-up.png')}
                    style={styles.icon}
                  />
                ) : (
                  <Image
                    source={require('../assests/down.png')}
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

              {isLightingChecked ? (
                <View style={styles.dropDownArea}>
                  <FlatList
                    data={lightings}
                    keyExtractor={item => item.value}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        style={styles.countryitem}
                        onPress={() => {
                          setLighting(item.label);
                          setIsLightingClicked(false); // Close the dropdown
                        }}>
                        <Text style={styles.heading}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              ) : null}
            </View>

            <View style={styles.dropdownSelect}>
              <Text style={styles.labels}>Set Budget</Text>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => {
                  setIsClicked(!isChecked);
                }}>
                <Text style={styles.heading}>{budget}</Text>
                {isChecked ? (
                  <Image
                    source={require('../assests/arrow-up.png')}
                    style={styles.icon}
                  />
                ) : (
                  <Image
                    source={require('../assests/down.png')}
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

              {isChecked ? (
                <View style={styles.dropDownArea}>
                  <FlatList
                    data={budgets}
                    keyExtractor={item => item.value}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        style={styles.countryitem}
                        onPress={() => {
                          setBudget(item.label);
                          setIsClicked(false); // Close the dropdown
                        }}>
                        <Text style={styles.heading}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              ) : null}
            </View>
            <View style={{marginTop: 10, marginBottom: 20}}>
              <Text style={styles.labels}>Comment</Text>
              <TextInput
                style={styles.input}
                type="text"
                placeholder="Any Comment"
                value={comment}
                onChangeText={text => SetComment(text)}
                multiline={true}
                numberOfLines={6}
              />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: colors.orange,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: 50,
              }}
              onPress={dataSubmitHandler}>
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
  colorPickerContainer: {
    flex: 1,
    marginTop: 20,
  },
  colorPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
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
    width: '55%',
  },
  input: {
    height: 90,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 7,
    padding: 10,
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
    marginBottom: 7,
    color: colors.black,
    marginLeft: 2,
  },
  heading: {
    color: colors.black,
  },

  dropdownSelect: {
    marginTop: 10,
    marginBottom: 15,
  },

  dropdownSelector: {
    width: '97%',
    height: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  icon: {
    height: 25,
    width: 25,
  },
  dropDownArea: {
    elevation: 5,
    marginTop: 20,
    height: 300,
    alignSelf: 'center',
    width: '97%',
    backgroundColor: '#fff',
    borderRadius: 10,
    color: 'blue',
  },
  countryitem: {
    width: '85%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#8e8e8e',
  },
  itemImage: {
    height: 40,
    width: '60%',
    marginTop: 5,
  },
  imagelabel: {
    color: colors.black,
    padding: 15,
    alignItems: 'center',
  },
});

export default UserInfo;
