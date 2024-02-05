import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import {useNavigation} from '@react-navigation/native';

function Admin() {
  const navigation = useNavigation();
  const AutoExpoHandler = () => {
    navigation.navigate('AutoUpdate');
  };
  const TradeFairHandler = () => {
    navigation.navigate('TradeUpdate');
  };
  const AaharExpoHandler = () => {
    navigation.navigate('AaharUpdate');
  };
  const PlastIndiaHandler = () => {
    navigation.navigate('PlastIndiaUpdate');
  };
  const shownDataHandler = () => {
    navigation.navigate('AllData');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.layoutText}>Admin Panel</Text>
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
          Update Exhibition Data
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
        <View>
          <TouchableOpacity style={styles.layout} onPress={shownDataHandler}>
            <Text style={styles.btnboxTexts}>Expo Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  btnboxTexts: {
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    fontSize: 17,
  },
  container: {
    margin: 20,
  },
  layoutText: {
    borderWidth: 2,
    borderColor: colors.gray,
    padding: 15,
    borderRadius: 10,
    margin: 20,
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
  },
  layout: {
    backgroundColor: colors.orange,
    padding: 15,
    borderRadius: 10,
    margin: 20,
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
  },
});

export default Admin;
