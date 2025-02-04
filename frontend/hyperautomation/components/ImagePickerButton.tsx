import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import CustomButton from './Button';  
import useImagePicker from '../hooks/useImagePicker';
import { useTranslation } from 'react-i18next';

function ImagePickerButton({ onImagePicked }) {
  const { t } = useTranslation();
  const pickImage = useImagePicker(onImagePicked);

  return (
    <View style={styles.buttonContainer}>
      <CustomButton 
        title={Platform.OS === 'web' ? t('selectPicture') : t('takePicture')} 
        onPress={pickImage} 
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',  
  },
  button: {
    backgroundColor: '#6D4C41',
    borderRadius: 20,
    paddingVertical: 12,
    width: 200, 
    height: 50,
  },
});

export default React.memo(ImagePickerButton);
