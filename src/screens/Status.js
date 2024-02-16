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

function Status() {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchgetAllApi;
  }, []);

  const fetchgetAllApi = async () => {
    try {
      setLoading(true);
      const response = await api.get('/requirement/accepted');
      const ResponseData = response.data.userRequirements;
      console.log(ResponseData, 'api response-----for images---');
      setLoading(false);
    } catch (error) {
      console.error('Api Response coming for Accepted--:', error);
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

  // Function to group images by upload time
  const groupImagesByUploadTime = () => {
    const groupedImages = {};
    images.forEach(image => {
      const uploadTime = image.uploadTime;
      if (!groupedImages[uploadTime]) {
        groupedImages[uploadTime] = [];
      }
      groupedImages[uploadTime].push(image);
    });
    return groupedImages;
  };

  const renderImagesInSection = () => {
    const groupedImages = groupImagesByUploadTime();
    return Object.keys(groupedImages).map((uploadTime, index) => (
      <View key={index}>
        <Text style={styles.sectionTitle}>Upload Time: {uploadTime}</Text>
        <View style={styles.sectionContainer}>
          {groupedImages[uploadTime].map(image => (
            <TouchableOpacity
              key={image.id}
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
      </View>
    ));
  };

  return (
    <ScrollView>
      <Text style={styles.layoutText}>Work Status</Text>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" style={styles.loader} />
        ) : (
          renderImagesInSection()
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  sectionContainer: {
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
