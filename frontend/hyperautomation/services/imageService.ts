import { Platform } from 'react-native';
import { WasteItem, WasteResponse } from '../models/WasteItem';
import { getWasteIcon } from '@/utils/wasteIcons';

/**
 * Sends the image data URL to the backend for processing.
 * @param {string} imageDataUrl - The image data URL string.
 * @returns {Promise<WasteItem[]>} - A Promise resolving to an array of waste items.
 */
export const sendImageToBackend = async (imageDataUrl: string): Promise<WasteItem[]> => {
  // Determine the correct API URL based on platform
  const API_URL =
    Platform.OS === 'ios' || Platform.OS === 'android'
      ? 'http://YOUR_IP:5000/describe_image'  // Mobile (iOS/Android)
      : 'http://127.0.0.1:5000/describe_image'; // Web/Desktop

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image_data_url: imageDataUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: WasteResponse = await response.json();

    // Map items and rename "icon:" to "icon"
    const itemsWithIcons = Array.isArray(responseData)
      ? responseData.map(({ "icon:": icon, ...rest }) => ({
          ...rest,
          icon: getWasteIcon(icon),  // Correctly map icon field
        }))
      : [{ ...responseData, icon: getWasteIcon(responseData["icon:"]) }];

    return itemsWithIcons;
  } catch (error) {
    console.error('Error sending image to backend:', error);
    throw error;
  }
};
