import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

const useImagePicker = (onImagePicked) => async () => {
  if (Platform.OS === 'web') {
    // Web fallback to selecting an image from the library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      onImagePicked(result.assets[0].uri);
    } else {
      Alert.alert('No image selected', 'Please select an image.');
    }
    return;
  }

  // Request camera permissions on mobile
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission denied', 'Camera access is required to take pictures.');
    return;
  }

  // Launch the camera
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled && result.assets?.length > 0) {
    onImagePicked(result.assets[0].uri);
  } else {
    Alert.alert('No picture taken', 'Please try again.');
  }
};

export default useImagePicker;
