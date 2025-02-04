import { Platform } from 'react-native';
import { WasteItem, WasteResponse } from '../models/WasteItem';
import { getWasteIcon } from '@/utils/wasteIcons';
import i18n from '../app/i18n';

/**
 * Sends the image data URL to the backend for processing, including the selected language.
 * @param {string} imageDataUrl - The image data URL string.
 * @returns {Promise<WasteItem[]>} - A Promise resolving to an array of waste items.
 */
export const sendImageToBackend = async (imageDataUrl: string): Promise<WasteItem[]> => {
  const API_URL =
    Platform.OS === 'ios' || Platform.OS === 'android'
      ? 'http://192.168.4.65:5000/describe_image'
      : 'http://127.0.0.1:5000/describe_image';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_data_url: imageDataUrl,
        language: i18n.language, 
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: WasteResponse = await response.json();

    return Array.isArray(responseData)
      ? responseData.map((item) => ({
          ...item,
          icon: getWasteIcon(item.icon),
        }))
      : [{ ...responseData, icon: getWasteIcon(responseData.icon) }];
  } catch (error) {
    console.error('Error sending image to backend:', error);
    throw error;
  }
};
