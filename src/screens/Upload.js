import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import api from '../utils/api';
import colors from '../styles/colors';
import {AuthContext} from '../contexts/AuthContext';

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const {userID} = useContext(AuthContext);

  useEffect(() => {
    fetchUploadedImages();
  }, []);

  const fetchUploadedImages = async () => {
    try {
      const response = await api.get(`/requirement/status/${userID}`);
      setUploadedImages(response.data.res);
    } catch (error) {
      console.log('Error fetching uploaded images:', error);
    }
  };

  const uploadImageHandler = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      console.log('Picked document:', doc[0]);
      setSelectedImage(doc[0]);
      setUploadTime(new Date().toLocaleString());

      const formData = new FormData();
      formData.append('progress', selectedImage);

      const response = await api.put(
        `/requirement/status/${userID}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Image uploaded:', response.data);
      fetchUploadedImages();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picking cancelled');
      } else {
        console.log('Error picking document:', err);
      }
    }
  };

  const removeImageHandler = async imageId => {
    try {
      await api.put(`/requirement/remove/${userID}/${imageId}`);
      setUploadedImages(prevImages =>
        prevImages.filter(image => image.id !== imageId),
      );
      setSelectedImage(null);
      setUploadTime(null);
    } catch (error) {
      console.log('Error removing image:', error);
    }
  };

  const submitImagesHandler = async () => {
    try {
      for (const image of uploadedImages) {
        const formData = new FormData();
        formData.append('progress', selectedImage);
        console.log(formData, '----checking payload----');

        const response = await api.put(
          `/requirement/status/${userID}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('Image uploaded:', response.data);
        console.log(formData, 'data showing---->--');
      }
      fetchUploadedImages();
    } catch (error) {
      console.log('Error uploading images:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imagePickerButton}
        onPress={uploadImageHandler}>
        <Text style={{color: colors.black}}>Upload Image</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Image source={{uri: selectedImage}} style={styles.selectedImage} />
          <Text style={{color: colors.black, marginBottom: 10}}>
            Uploaded Time: {uploadTime}
          </Text>
        </View>
      )}

      {uploadedImages.map(image => (
        <View key={image.id} style={{alignItems: 'center', marginTop: 20}}>
          <Image source={{uri: image.url}} style={styles.selectedImage} />
          <TouchableOpacity onPress={() => removeImageHandler(image.id)}>
            <Text style={{color: 'red', marginTop: 5}}>Remove</Text>
          </TouchableOpacity>
          <Text style={{color: colors.black, marginBottom: 10}}>
            Uploaded Time: {image.uploadTime}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={submitImagesHandler}>
        <Text style={{color: colors.white}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    borderColor: colors.gray,
    borderWidth: 1,
    padding: 30,
    borderRadius: 5,
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
