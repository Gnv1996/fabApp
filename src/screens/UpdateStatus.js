import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Permissions} from 'react-native-permissions';

const UpdateScreen = () => {
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [uploading, setUploading] = useState(false);

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
      sendImage(doc.uri); // Sending the image immediately after picking
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.log('Error picking document:', err);
      }
    }
  };

  const sendImage = async imageUri => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await fetch('YOUR_POST_API_ENDPOINT', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // You might need to add other headers based on your API requirements
        },
      });

      // Handle response here if needed
      console.log('Image upload response:', response);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
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

        {isImageSelected && (
          <Text style={{marginTop: 20}}>
            Uploaded on: {date.toLocaleString()}
          </Text>
        )}
      </View>

      {uploading && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text>Uploading...</Text>
        </View>
      )}

      {isImageSelected && !uploading && (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            padding: 10,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: image}}
            style={{width: 100, height: 100, borderRadius: 10}}
          />
          <Text>Uploaded on: {date.toLocaleString()}</Text>
        </View>
      )}
    </View>
  );
};

export default UpdateScreen;
