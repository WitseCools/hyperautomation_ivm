import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const useImagePicker = (onImagePicked) => async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled && result.assets?.length > 0) {
    const imageUri = result.assets[0].uri;
    onImagePicked(imageUri);  // Pass the URI to be processed later
  } else {
    Alert.alert('No image selected', 'Please select an image.');
  }
};

export default useImagePicker;
