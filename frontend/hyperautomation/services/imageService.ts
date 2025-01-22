import { WasteItem, WasteResponse } from '../models/WasteItem';

/**
 * Sends the image data URL to the backend for processing.
 * @param {string} imageDataUrl - The image data URL string.
 * @returns {Promise<WasteItem[]>} - A Promise resolving to an array of waste items.
 */

const API_URL_MOBILE = 'http://YOUR_IP:5000/describe_image';
const API_URL_WEB = 'http://127.0.0.1:5000/describe_image'; 

export const sendImageToBackend = async (imageDataUrl: string): Promise<WasteItem[]> => {
  try {
    const response = await fetch(API_URL_MOBILE, {
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
    return responseData;
  } catch (error) {
    console.error('Error sending image to backend:', error);
    throw error;
  }
};
