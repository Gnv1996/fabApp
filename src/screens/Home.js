import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import FormInput from '../components/FormInput';
import Icon from 'react-native-vector-icons/FontAwesome';

function ExhibitionCenterCard({title, description, imageSource}) {
  const handleCardPress = () => {
    console.log('Exhibition center clicked:', title);
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.imgContain}>
        <Image source={imageSource} style={styles.imgFixed} />
        <Text
          style={{
            textAlign: 'left',
            fontWeight: 'bold',
            color: colors.black,
            margin: 5,
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: colors.gray,
            textAlign: 'justify',
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 7,
          }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{borderRadius: 5, height: 250, borderRadius: 5}}>
          <ImageBackground
            source={require('../assests/dp.jpeg')}
            style={styles.imageBackground}>
            <Text style={styles.titleInfo}>Welcome in fab App</Text>
            <Text style={styles.info}>
              Headlines are used to entertain, add shock, or hook readers to
              make them want to know more....
            </Text>
            <View
              style={{
                marginLeft: 20,
                marginTop: 10,
              }}>
              <TouchableOpacity style={styles.btn}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.white,
                    fontWeight: 'bold',
                  }}>
                  Explore Now
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={{backgroundColor: colors.white}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              marginTop: 25,
              marginBottom: 15,
              marginLeft: 32,
              color: colors.black,
            }}>
            Our Exhibitions centre
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ExhibitionCenterCard
              title="Lucknow Center"
              description="An event at which objects such as paintings are shown to the public ..."
              imageSource={require('../assests/a.jpeg')}
            />

            <ExhibitionCenterCard
              title="Kolkata Center"
              description="An event at which objects such as paintings are shown to the public ..."
              imageSource={require('../assests/b.jpeg')}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <ExhibitionCenterCard
              title="Delhi Center"
              description="An event at which objects such as paintings are shown to the public ..."
              imageSource={require('../assests/c.jpeg')}
            />

            <ExhibitionCenterCard
              title="Hyderabad Center"
              description="An event at which objects such as paintings are shown to the public ..."
              imageSource={require('../assests/d.jpeg')}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.orange,
            height: 70,
            width: '100%',
          }}>
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 5,
                  marginLeft: 15,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.black,
                }}>
                Join us Exhibitions
              </Text>
              <Text style={{marginLeft: 20, marginBottom: 10, color: 'grey'}}>
                some art show invitation ideas
              </Text>
            </View>
            <View
              style={{
                marginTop: 15,
                marginLeft: 46,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={styles.btns}>
                <Text style={{textAlign: 'center'}}>Join Us</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{margin: 32}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              marginBottom: 10,
              color: colors.black,
            }}>
            Feedback Form
          </Text>
          <Text style={{marginBottom: 30, color: colors.gray}}>
            I appreciate the time you committed to providing me with detailed
            and constructive feedback.
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              padding: 20,
              borderRadius: 5,
            }}>
            <FormInput textHeader={'Name'} placeholder={'Enter your Name'} />
            <FormInput textHeader={'Email'} placeholder={'Enter your Email'} />
            <FormInput
              textHeader={'Mobile Number'}
              placeholder={'Enter your Mobile Number'}
            />
            <FormInput
              textHeader={'Suggestion'}
              placeholder={'Any Suggestion'}
            />

            <View style={{marginTop: 10}}>
              <TouchableOpacity style={styles.btk}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.white,
                    fontWeight: 'bold',
                  }}>
                  submit
                </Text>
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
            <Text style={{color: 'white', marginTop: 10}}>
              Standard website
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontSize: 22,
    color: colors.black,
    fontWeight: 'bold',
    marginTop: 10,
  },
  container: {},
  imageBackground: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },

  btn: {
    backgroundColor: colors.orange,
    width: 150,
    padding: 10,
    borderRadius: 20,
  },
  btk: {
    backgroundColor: colors.orange,
    width: '100%',
    padding: 10,
    borderRadius: 20,
  },
  btns: {
    backgroundColor: colors.white,
    width: 100,
    padding: 8,
    borderRadius: 20,
    borderColor: colors.gray,
  },
  titleInfo: {
    marginTop: 50,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 20,
  },
  info: {
    textAlign: 'justify',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    width: 200,
    color: colors.white,
  },
  imgContain: {
    height: 210,
    width: 150,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    margin: 15,
  },
  imgFixed: {
    height: 100,
    width: 150,
    borderRadius: 5,
  },
});
export default HomeScreen;
