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
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/colors';

function Status() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const uploadTime = new Date().toLocaleString();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const accessToken = await AsyncStorage.getItem('userToken');
    try {
      setLoading(true);
      const response = await api.get('/requirement/accepted', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseData = response.data.userRequirements;

      // Extracting progress links from the responseData
      const progressLinks = responseData
        .map(requirement => requirement.acceptedBy.progress)
        .flat();

      console.log(progressLinks, 'gautam lunvh karne chalo');
      setImages(progressLinks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
  },
  uploadTime: {
    color: colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
    margin: 5,
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
