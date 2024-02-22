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
  const [loading, setLoading] = useState(false);
  const [uploadTime, setUploadTime] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const accessToken = await AsyncStorage.getItem('userToken');
    const imgID = await AsyncStorage.getItem('userID');

    try {
      setLoading(true);
      const response = await api.get(`/requirement/all/fetch`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseData = response.data.requirements;

      const filteredData = responseData.filter(
        requirement => requirement.userId === imgID && requirement.acceptedBy,
      );

      if (filteredData.length > 0) {
        const progressLinks = filteredData[0].acceptedBy.progress || [];
        setImages(progressLinks);
      } else {
        console.log('No progress links found for the user.');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }

    setUploadTime(new Date().toLocaleString());
  };

  return (
    <ScrollView>
      <Text style={styles.layoutText}>Work Status</Text>
      <View style={styles.container}>
        <View style={styles.row}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="blue"
              style={styles.loader}
            />
          ) : (
            images.map((imageUrl, index) => (
              <Image
                key={index}
                source={{uri: imageUrl}}
                style={styles.image}
              />
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
});

export default Status;
