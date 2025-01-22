import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import ImagePickerComponent from '../components/ImagePickerComponent';
import DisplayInfoCard from '../components/DisplayInfoCard';
import MoreInfoCard from '../components/MoreInfoCard';
import CustomButton from '../components/Button';
import { sendImageToBackend } from '../services/imageService';
import { WasteItem } from '../models/WasteItem';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please pick an image first.');
      return;
    }

    setLoading(true);  // Start loading animation

    try {
      const responseItems = await sendImageToBackend(selectedImage);
      if (responseItems.length > 0) {
        setWasteItems(responseItems);
      } else {
        Alert.alert('No valid items received.');
        setWasteItems([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image.');
    } finally {
      setLoading(false);  // Stop loading animation
    }
  };

  const handleClearAll = () => {
    setSelectedImage(null);
    setWasteItems([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImagePickerComponent 
        image={selectedImage} 
        onImageSelected={setSelectedImage} 
        onClear={handleClearAll}
      />

      <View style={styles.instructionsCard}>
        {wasteItems.length > 0 ? (
          <DisplayInfoCard wasteItems={wasteItems} />
        ) : (
          <DisplayInfoCard wasteItems={null} />
        )}
      </View>

      {wasteItems.length > 0 && (
        <View style={styles.moreInfoContainer}>
          <MoreInfoCard wasteItems={wasteItems} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton title="Clear" onPress={handleClearAll} style={styles.button} disabled={!selectedImage || loading} />
        <CustomButton title="Send" onPress={handleSendImage} style={styles.button} disabled={!selectedImage || loading} />
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6D4C41" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  instructionsCard: {
    width: '100%',
    backgroundColor: '#DDE8D9',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  moreInfoContainer: {
    marginTop: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6D4C41',
    borderRadius: 20,
    width: '45%',
    paddingVertical: 12,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
