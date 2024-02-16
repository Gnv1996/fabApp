import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import api from '../utils/api';
import colors from '../styles/colors';
import {AuthContext} from '../contexts/AuthContext';
import {CheckBox} from 'react-native-elements';

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageshow, setImageshow] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const {fabriID} = useContext(AuthContext);

  useEffect(() => {
    fetchUploadedImages();
  }, []);

  const fetchUploadedImages = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/requirement/get/${fabriID}`);
      const apiResponse = response.data.userRequirement;
      console.log(fabriID);
      console.log(apiResponse.acceptedBy, '--go india--data');
      setUploadedImages(apiResponse.acceptedBy.progress);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching uploaded images:', error);
      setLoading(false);
    }
  };

  const uploadImageHandler = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('Picked document:', doc);
      setSelectedImage(doc[0]);
      setImageshow(doc[0].uri);
      console.log(doc[0], '---data---');
      setUploadTime();
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const submitImagesHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('progress', selectedImage);
      console.log(formData, '---data Showing');
      console.log(selectedImage, 'uploading image');

      const response = await api.put(
        `/requirement/status/${fabriID}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log(response, 'data');
      Alert.alert('Image Upload Successfully');
      setImageshow('');
    } catch (error) {
      console.log('Error in Upload Image');

      Alert.alert('Error', 'An error occurred while updating Image');
    }
  };
  const toggleCheckbox = id => {
    const updatedSelectedImages = [...selectedImages];
    const index = updatedSelectedImages.indexOf(id);
    if (index === -1) {
      updatedSelectedImages.push(id);
    } else {
      updatedSelectedImages.splice(index, 1);
    }
    setSelectedImages(updatedSelectedImages);
  };

  console.log(uploadedImages, 'images link visible--->');

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
            <Text style={{color: colors.black, marginBottom: 10}}>
              Uploaded Time: {uploadTime}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitImagesHandler}>
          <Text style={{color: colors.white}}>Submit</Text>
        </TouchableOpacity>
      </View>
      {/* Loader */}
      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.blue}
          style={{marginTop: 20}}
        />
      )}

      {/* Display uploaded images */}
      {!loading &&
        uploadedImages.map(image => (
          <View key={image.id} style={styles.uploadedImageContainer}>
            <CheckBox
              value={selectedImages.includes(image.id)}
              onValueChange={() => toggleCheckbox(image.id)}
            />
            <Image source={{uri: image.uri}} style={styles.selectedImage} />
            <TouchableOpacity onPress={() => removeImageHandler(image.id)}>
              <Text style={{color: 'red', marginTop: 5}}>Remove</Text>
            </TouchableOpacity>
            <Text style={{color: colors.black, marginBottom: 10}}>
              Uploaded Time: {image.uploadTime}
            </Text>
          </View>
        ))}
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
