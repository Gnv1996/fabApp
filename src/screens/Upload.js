import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // Make sure to import DocumentPicker
import axios from 'axios'; // Import Axios
import colors from '../styles/colors';

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);

  const uploadImageHandler = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      console.log('Picked document:', doc);
      setSelectedImage(doc.uri);
      setUploadTime(new Date().toLocaleString());

      // Convert image URI to blob
      const formData = new FormData();
      formData.append('image', {
        uri: doc.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      // Send image to backend API
      const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded:', response.data);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picking cancelled');
      } else {
        console.log('Error picking document:', err);
      }
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

      <View style={{marginTop: 20}}>
        <TouchableOpacity style={styles.btn}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              color: 'black',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display uploaded image here */}
      {selectedImage && (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Image source={{uri: selectedImage}} style={styles.selectedImage} />
          <Text style={{color: colors.black, marginBottom: 10}}>
            Uploaded Time: {uploadTime}
          </Text>
        </View>
      )}
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
  btn: {
    backgroundColor: colors.orange,
    width: '100%',
    padding: 10,
    borderRadius: 20,
  },
});

export default Upload;
