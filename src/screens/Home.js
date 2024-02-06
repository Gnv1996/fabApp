import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import MyCarousel from '../components/MyCarousel';
import {useNavigation} from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();
  const AutoExpoHandler = () => {
    navigation.navigate('AutoExpo');
  };
  const TradeFairHandler = () => {
    navigation.navigate('TradeFair');
  };
  const AaharExpoHandler = () => {
    navigation.navigate('Aahar');
  };
  const PlastIndiaHandler = () => {
    navigation.navigate('PlastIndia');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{borderRadius: 5, height: 250, borderRadius: 5}}>
          <ImageBackground
            source={require('../assests/bgwall.jpeg')}
            style={styles.imageBackground}>
            <Text style={styles.titleInfo}>Welcome in fab App</Text>
            <Text style={styles.info}>
              Headlines are used to entertain, add shock, or hook readers to
              make them want to know more....
            </Text>
            <View
              style={{
                marginLeft: 20,
                marginTop: 20,
                alignItems: 'center',
              }}>
              <TouchableOpacity style={styles.btn}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.black,
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
            Our Exhibitions
          </Text>
          <View style={styles.box}>
            <View style={styles.expobox}>
              <View style={styles.boxAlign}>
                <TouchableOpacity
                  style={styles.btnExpo}
                  onPress={AutoExpoHandler}>
                  <Text style={styles.btnboxText}>Auto Expo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnExpo}
                  onPress={PlastIndiaHandler}>
                  <Text style={styles.btnboxText}>Plast India</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.boxAlign}>
                <TouchableOpacity
                  style={styles.btnExpo}
                  onPress={TradeFairHandler}>
                  <Text style={styles.btnboxText}>Trade Fair</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnExpo}
                  onPress={AaharExpoHandler}>
                  <Text style={styles.btnboxText}>Aahar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View></View>
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            marginBottom: 5,
            color: colors.black,
            marginLeft: 20,
            marginBottom: 20,
            marginTop: 20,
          }}>
          Successfully Event
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <MyCarousel />
        </View>
        <View
          style={{
            backgroundColor: '#28231D',
            height: 70,
          }}>
          <View
            style={{
              borderBottomColor: colors.gray,
              borderBottomWidth: 1,
              padding: 15,
            }}>
            <Text style={{color: 'white', textAlign: 'right'}}>to top</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
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
  titleInfo: {
    marginTop: 50,
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    textAlign: 'justify',
    marginTop: 10,
    marginLeft: 50,
    width: 300,
    color: colors.black,
    textAlign: 'center',
  },
  imgBackground: {
    height: 400,
    width: '100%',
  },
  box: {
    borderColor: colors.gray,
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
  },
  expobox: {
    display: 'flex',
    margin: 20,
  },
  boxAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnExpo: {
    backgroundColor: colors.green,
    padding: 10,
    marginVertical: 10,
    flex: 1,
    margin: 10,
    borderRadius: 10,
  },
  btnboxText: {
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
});
export default HomeScreen;
