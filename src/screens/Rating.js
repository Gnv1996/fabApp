import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import fullStar from '../assests/fullStar.png';
import blankStar from '../assests/blankStar.png';

function Rating() {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [feedback, setFeedback] = useState('');

  const CustomRatingBar = () => {
    return (
      <View style={styles.customBarRatingStyle}>
        {maxRating.map((item, key) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => setDefaultRating(item)}>
            <Image
              source={defaultRating >= item ? fullStar : blankStar}
              style={styles.starImgStyle}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const postRatingData = () => {
    Alert.alert('Thank You For Your Feedback');
    setFeedback('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textStyle}>Please Rate Us</Text>

      <CustomRatingBar />

      <View style={{marginTop: 30}}>
        <Text style={styles.textComment}>Comment</Text>
        <TextInput
          style={styles.input}
          type="text"
          placeholder="Feedback"
          value={feedback}
          onChangeText={text => setFeedback(text)}
          multiline={true}
          numberOfLines={6}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={postRatingData}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: colors.black,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    height: 380,
    margin: 30,
    backgroundColor: colors.white,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    marginTop: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
  customBarRatingStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImgStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    margin: 2,
  },
  buttonStyle: {
    justifyContent: 'center',
    backgroundColor: colors.orange,
    width: '90%',
    padding: 10,
    borderRadius: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  input: {
    height: 90,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 7,
    padding: 10,
    color: colors.gray,
  },
  textComment: {
    color: colors.black,
    fontSize: 20,
    marginBottom: 10,
  },
});

export default Rating;
