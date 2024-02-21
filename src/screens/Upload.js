import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import api from '../utils/api';
import colors from '../styles/colors';
import {AuthContext} from '../contexts/AuthContext';

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageshow, setImageshow] = useState(null);
  const {fabriID, setimgID} = useContext(AuthContext);

  const uploadImageHandler = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('Picked document:', doc);
      setSelectedImage(doc[0]);
      setImageshow(doc[0].uri);
      // console.log(doc[0], '---data---');
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const submitImagesHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('progress', selectedImage);

      const response = await api.put(
        `/requirement/status/${fabriID}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const imgID = response.data.userRequirement._id;
      setimgID(imgID);
      Alert.alert('Image Upload Successfully');
      setImageshow('');
    } catch (error) {
      console.log('Error in Upload Image');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={uploadImageHandler}>
          <Text style={{color: colors.black}}>Upload Image</Text>
        </TouchableOpacity>

        {imageshow && (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image source={{uri: imageshow}} style={styles.selectedImage} />
          </View>
        )}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitImagesHandler}>
          <Text style={{color: colors.white}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    borderColor: colors.gray,
    borderWidth: 1,
    padding: 30,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  imagePickerButton: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Upload;
