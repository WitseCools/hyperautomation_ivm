import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

export const localImageToDataUrl = async (image: { uri: string }): Promise<string> => {
  try {
    if (Platform.OS === 'web') {
      if (image.uri.startsWith('data:image')) {
        return image.uri;  // If already Base64, return as is
      } else {
        throw new Error('Invalid image data URL format for web');
      }
    } else {
      // Convert mobile file to base64
      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;  // Ensure correct prefix
    }
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    throw error;
  }
};
