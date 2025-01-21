import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from './Button';  // Import the custom button
import useImagePicker from '../hooks/useImagePicker';

function ImagePickerButton({ onImagePicked }) {
  const pickImage = useImagePicker(onImagePicked);

  return (
    <View style={styles.buttonContainer}>
      <CustomButton 
        title="Select picture" 
        onPress={pickImage} 
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',  // Center vertically
    alignItems: 'center',  // Center horizontally
  },
  button: {
    backgroundColor: '#6D4C41',
    borderRadius: 20,
    paddingVertical: 12,
    width: 200, 
    height: 50,
  },
  buttonText: {
    fontSize: 1,  // Correct font size applied via prop
  },
});

export default React.memo(ImagePickerButton);
