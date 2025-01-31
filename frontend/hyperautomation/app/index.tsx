import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import ImagePickerComponent from '../components/ImagePickerComponent';
import DisplayInfoCard from '../components/DisplayInfoCard';
import MoreInfoCard from '../components/MoreInfoCard';
import CustomButton from '../components/Button';
import { sendImageToBackend } from '../services/imageService';
import { WasteItem } from '../models/WasteItem';
import { useRouter } from 'expo-router';

const HomeScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleClearAll(); 
  }, [i18n.language]);

  const handleSendImage = async () => {
    if (!selectedImage) {
      Alert.alert(t('noImage'), t('pickImage'));
      return;
    }

    setLoading(true);

    try {
      const responseItems = await sendImageToBackend(selectedImage);
      if (responseItems.length > 0) {
        setWasteItems(responseItems);
      } else {
        Alert.alert(t('noValidItems'));
        setWasteItems([]);
      }
    } catch (error) {
      Alert.alert(t('uploadError'));
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    setSelectedImage(null);
    setWasteItems([]);
  };

  const handleSettingsPress = () => {
    router.push('settings');
  };

  return (
    <View style={styles.container}>
      {/* Settings Button */}
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
        <Ionicons name="settings-outline" size={28} color="#4E342E" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <CustomButton title="clear" onPress={handleClearAll} style={styles.button} disabled={!selectedImage || loading} />
          <CustomButton title="send" onPress={handleSendImage} style={styles.button} disabled={!selectedImage || loading} />
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6D4C41" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  instructionsCard: {
    width: '100%',
    backgroundColor: '#DDE8D9',
    borderRadius: 10,
    padding: 15,
    marginTop: 60,
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

export default HomeScreen;
