import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {RNCamera} from 'react-native-camera';
import Permissions from 'react-native-permissions';

const UpdateScreen = () => {
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isImageSelected, setIsImageSelected] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const cameraStatus = await Permissions.check('photo');
        if (cameraStatus !== 'authorized') {
          const permissionStatus = await Permissions.request('photo');
          if (permissionStatus !== 'authorized') {
            console.log('Permission to access photos denied');
          }
        }
      } else if (Platform.OS === 'android') {
        const storageStatus = await Permissions.check('storage');
        if (storageStatus !== 'authorized') {
          const permissionStatus = await Permissions.request('storage');
          if (permissionStatus !== 'authorized') {
            console.log('Permission to access storage denied');
          }
        }
      }
    } catch (error) {
      console.error('Error checking or requesting permission:', error);
    }
  };

  const pickImage = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      setImage(doc.uri);
      setDate(new Date());
      setIsImageSelected(true);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.log('Error picking document:', err);
      }
    }
  };

  const takePhoto = async () => {
    try {
      const cameraStatus = await Permissions.check('camera');
      if (cameraStatus === 'authorized') {
        // Assuming you have navigation and Camera component properly set up
        // You might need to navigate to a screen where the Camera component is rendered
        navigation.navigate('CameraScreen');
      } else {
        console.log('Permission to access camera denied');
      }
    } catch (error) {
      console.error('Error checking or requesting camera permission:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={pickImage}>
        {isImageSelected ? (
          <Image
            source={{uri: image}}
            style={{width: 200, height: 200, borderRadius: 10}}
          />
        ) : (
          <View
            style={{
              width: 200,
              height: 200,
              backgroundColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text>Select Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={takePhoto} style={{marginTop: 20}}>
        <Text>Take Photo</Text>
      </TouchableOpacity>

      {isImageSelected && (
        <Text style={{marginTop: 20}}>
          Uploaded on: {date.toLocaleString()}
        </Text>
      )}
    </View>
  );
};

export default UpdateScreen;
