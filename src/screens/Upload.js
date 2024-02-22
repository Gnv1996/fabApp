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
import AsyncStorage from '@react-native-async-storage/async-storage';

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageshow, setImageshow] = useState(null);
  const {fabriID} = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const uploadTime = new Date().toLocaleString();

  const uploadImageHandler = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('Picked document:', doc);
      setSelectedImage(doc[0]);
      setImageshow(doc[0].uri);
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
      Alert.alert('Success', 'Image Upload Successfully', [
        {
          text: 'OK',
          onPress: () => fetchImages(),
        },
      ]);

      setImageshow('');
    } catch (error) {
      console.log('Error in Upload Image');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const accessToken = await AsyncStorage.getItem('userToken');
    try {
      setLoading(true);
      const response = await api.get(`requirement/get/${fabriID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseData = response.data.userRequirement;

      const progressLinks = responseData.acceptedBy
        ? responseData.acceptedBy.progress || []
        : [];
      setImages(progressLinks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const removeImageHandler = async index => {
    const accessToken = await AsyncStorage.getItem('userToken');
    try {
      const removedImage = images[index];
      const response = await api.put(
        `requirement/remove/${fabriID}?index=${index}`,
        {imageUrl: removedImage},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      Alert.alert('Success', 'Image Removed Successfully', [
        {
          text: 'OK',
          onPress: () => {
            const updatedImages = [...images];
            updatedImages.splice(index, 1);
            setImages(updatedImages);
          },
        },
      ]);
    } catch (error) {
      console.error('Error removing image:', error);
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
            <TouchableOpacity
              onPress={() => setSelectedImage(null)}
              style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitImagesHandler}>
          <Text style={{color: colors.white}}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containers}>
        <Text style={styles.heading}>Upload Images</Text>
        <View style={styles.row}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="blue"
              style={styles.loader}
            />
          ) : (
            images.map((imageUrl, index) => (
              <View key={index} style={{position: 'relative'}}>
                <Image source={{uri: imageUrl}} style={styles.image} />
                <TouchableOpacity
                  onPress={() => removeImageHandler(index)}
                  style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <Text style={styles.uploadTime}>Uploaded Time: {uploadTime}</Text>
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
  containers: {
    flex: 1,
  },
  uploadTime: {
    color: colors.black,
    marginVertical: 10,
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
    margin: 10,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutText: {
    borderWidth: 2,
    borderColor: colors.gray,
    padding: 15,
    borderRadius: 10,
    margin: 20,
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
  },
  heading: {
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    margin: 25,
    padding: 10,
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 20,
  },
});

export default Upload;
