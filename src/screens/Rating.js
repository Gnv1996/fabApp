import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import axios from 'axios';
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
    const apiUrl = 'https://example.com/api/rating'; // Replace with your API endpoint

    // Prepare data to be sent in the request body
    const postData = {
      rating: defaultRating,
      feedback: feedback,
    };

    // Send a POST request to the API
    axios
      .post(apiUrl, postData)
      .then(response => {
        // Handle the success response
        console.log('API Response:', response.data);
        // You can add further actions here if needed
      })
      .catch(error => {
        // Handle errors
        console.error('API Error:', error);
        // You can add error handling logic here
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textStyle}>Please Rate Us</Text>
      <CustomRatingBar />

      <View style={{margin: 20}}>
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
    borderRadius: 5,
    padding: 15,
    height: 380,
    margin: 30,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    marginTop: 20,
    color: colors.black,
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
  },
});

export default Rating;
