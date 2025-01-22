import { WasteItem, WasteResponse } from "@/models/WasteItem";

const API_URL_MOBILE = 'http://192.168.4.62:5000/describe_image';
const API_URL_WEB = 'http://127.0.0.1:5000/describe_image';

export const sendImageToBackend = async (imageDataUrl: string): Promise<WasteItem[]> => {
  if (!imageDataUrl.startsWith('data:image/')) {
      console.error('Invalid image format:', imageDataUrl.slice(0, 50));
      throw new Error('Invalid image format. Must be a base64 encoded data URL.');
  }

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

