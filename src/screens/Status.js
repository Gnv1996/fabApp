import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import api from '../utils/api';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Status() {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [UserID, setUserID] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const Uuid = await AsyncStorage.getItem('userID');
    setUserID(Uuid);
    try {
      setLoading(true);
      const response = await api.get(`/requirement/get/${UserID}`);
      console.log(UserID, '---->---comming response');
      console.log(response, '---->---comming response');
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const toggleImageSelection = imageId => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter(id => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.layoutText}>Work Status</Text>
      <View style={styles.container}>
        {loading && (
          <ActivityIndicator size="large" color="blue" style={styles.loader} />
        )}
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleImageSelection(image.id)}>
            <View style={styles.imageContainer}>
              <Image source={{uri: image.url}} style={styles.image} />
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  onPress={() => toggleImageSelection(image.id)}>
                  <View
                    style={[
                      styles.checkbox,
                      selectedImages.includes(image.id) &&
                        styles.checkedCheckbox,
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.uploadTime}>
                Uploaded Time: {image.uploadTime}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  uploadTime: {
    marginTop: 5,
    textAlign: 'center',
  },
  checkboxContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  checkedCheckbox: {
    backgroundColor: 'blue',
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
});

export default Status;

// import React, {useState, useEffect} from 'react';
// import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
// import axios from 'axios';
// import colors from '../styles/colors';

// function Status() {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//       const response = await axios.get('https://example.com/api/images');
//       setImages(response.data);
//     } catch (error) {
//       console.log('Error fetching images:', error);
//     }
//   };

//   return (
//     <ScrollView>
//       <Text style={styles.layoutText}>Work Status</Text>
//       <View style={styles.container}>
//         {images.map((image, index) => (
//           <View key={index} style={styles.imageContainer}>
//             <Image source={{uri: image.url}} style={styles.image} />
//             <Text style={styles.uploadTime}>
//               Uploaded on: {formatUploadTime(image.uploadTime)}
//             </Text>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// // Helper function to format upload time
// const formatUploadTime = uploadTime => {
//   // Assuming uploadTime is in ISO format (e.g., "2024-02-13T12:34:56Z")
//   const date = new Date(uploadTime);
//   return date.toLocaleString();
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.white,
//   },
//   imageContainer: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: 'cover',
//   },
//   uploadTime: {
//     marginTop: 10,
//     fontSize: 12,
//     color: colors.gray,
//   },
//   layoutText: {
//     borderWidth: 2,
//     borderColor: colors.gray,
//     padding: 15,
//     borderRadius: 10,
//     margin: 20,
//     color: colors.black,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 27,
//   },
// });

// export default Status;
