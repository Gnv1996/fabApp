import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../styles/colors';

function Splash() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome in Fab App</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.orange,
    height: '100%',
    width: '100%',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
export default Splash;
