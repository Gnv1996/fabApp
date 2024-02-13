import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import colors from '../styles/colors';

function Status() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://example.com/api/images');
      setImages(response.data);
    } catch (error) {
      console.log('Error fetching images:', error);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.layoutText}>Work Status</Text>
      <View style={styles.container}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{uri: image.url}} style={styles.image} />
            <Text style={styles.uploadTime}>
              Uploaded on: {formatUploadTime(image.uploadTime)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// Helper function to format upload time
const formatUploadTime = uploadTime => {
  // Assuming uploadTime is in ISO format (e.g., "2024-02-13T12:34:56Z")
  const date = new Date(uploadTime);
  return date.toLocaleString();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  uploadTime: {
    marginTop: 10,
    fontSize: 12,
    color: colors.gray,
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
});

export default Status;
