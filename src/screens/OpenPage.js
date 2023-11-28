import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Open from '../assests/open.png';

const OpenPage = () => {
  return (
    <View>
      <ImageBackground source={Open} style={styles.imageBackground}>
        <Text style={styles.heading}>Please wait we.....</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 300,
    color: 'white',
  },
  imageBackground: {
    height: 800,
    width: '100%',
  },
});
export default OpenPage;
