import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import colors from '../styles/colors';

function FormInput({textHeader, value, secureTextEntry = false, ...props}) {
  return (
    <View>
      <Text style={styles.label}>{textHeader}</Text>
      <TextInput
        placeholderTextColor={'grey'}
        style={styles.input}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
    color: colors.black,
    marginLeft: 2,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: colors.gray,
  },
});

export default FormInput;
