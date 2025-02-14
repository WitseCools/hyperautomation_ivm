import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

export const localImageToDataUrl = async (imageUri: string): Promise<string> => {
  try {
    if (Platform.OS === 'web') {
      if (imageUri.startsWith('data:image')) {
        return imageUri; // Already Base64
      } else {
        throw new Error('Invalid image format for web');
      }
    } else {
      // Read file as Base64
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    }
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    throw error;
  }
};
