import {View, Text, ImageBackground} from 'react-native';
import React from 'react';

function HomeScreen() {
  return (
    <View style={{height: '100%', width: '100%'}}>
      <ImageBackground
        source={require('../assests/wood.jpeg')}
        style={{height: '100%', width: '100%'}}>
        <Text
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 30,
            color: 'black',
            marginTop: 540,
          }}>
          Welcome in Home Page
        </Text>
      </ImageBackground>
    </View>
  );
}
export default HomeScreen;
