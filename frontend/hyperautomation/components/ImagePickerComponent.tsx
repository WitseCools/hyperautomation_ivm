import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import ImagePickerButton from './ImagePickerButton';
import DisplayImageCard from './DisplayImageCard';
import { localImageToDataUrl } from '../utils/localImageToDataUrl';

interface ImagePickerComponentProps {
  image: string | null;
  onImageSelected: (image: string | null) => void;
  onClear: () => void; 
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({ image, onImageSelected, onClear }) => {
  const handleImagePicked = async (imageUri: string) => {
    try {
      const base64Image = await localImageToDataUrl({ uri: imageUri });
      onImageSelected(base64Image);  // Store Base64 string instead of URI
    } catch (error) {
      Alert.alert('Error', 'Failed to process the image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {!image ? (
          <ImagePickerButton onImagePicked={handleImagePicked} />
        ) : (
          <DisplayImageCard imageUri={image} onClear={onClear} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  card: {
    width: 350,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default ImagePickerComponent;
