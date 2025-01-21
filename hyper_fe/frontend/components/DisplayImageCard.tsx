import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface DisplayImageCardProps {
  imageUri: string;
  onClear: () => void;
}

const DisplayImageCard: React.FC<DisplayImageCardProps> = ({ imageUri, onClear }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.clearButton} 
        onPress={onClear} 
        accessibilityLabel="Delete image"
      >
        <MaterialIcons name="delete" size={24} color="#000" />
      </TouchableOpacity>
      <Image source={{ uri: imageUri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  clearButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
});

export default React.memo(DisplayImageCard);
