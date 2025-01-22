import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WasteItem } from '@/models/WasteItem';

interface DisplayInfoCardProps {
  wasteItems?: WasteItem[] | null;
}

// Function to calculate the median of an array of numbers
const calculateMedian = (values: number[]): number => {
  if (values.length === 0) return 0;

  const sortedValues = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
  } else {
    return sortedValues[middle];
  }
};

const getIcon = (iconName: string) => {
  try{
    return require(`../assets/icons/${iconName}.png`);
  }
  catch(error){
    return require(`../assets/icons/icon_andere.png`);
  }
}

const DisplayInfoCard: React.FC<DisplayInfoCardProps> = ({ wasteItems }) => {
  if (!wasteItems || wasteItems.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.placeholderText}>Nothing to show yet</Text>
      </View>
    );
  }

  // Extract certainty values and calculate the median
  const certaintyValues = wasteItems.map(item => parseFloat(item.certainty));
  const medianCertainty = calculateMedian(certaintyValues);

  return (
    <View style={styles.container}>
      <Text style={styles.instructionsTitle}>Instructions</Text>
      {wasteItems.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Item:</Text> {item.name || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Bin:</Text> {item.short_explanation || 'N/A'}
          </Text>
          <Image source={getIcon(item.icon)} style={{ width: 30, height: 30 }} />
        </View>
      ))}
      <View style={styles.statsContainer}>
        <Text style={styles.itemCount}>Items recognized: {wasteItems.length}</Text>
        <Text style={styles.medianCertainty}>Certainty: {medianCertainty.toFixed(2)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#DDE8D9',  // Soft green background
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#EAF1E5',  // Lighter green card background
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Align items to left and right
    marginTop: 10,
  },
  itemCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  medianCertainty: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});

export default DisplayInfoCard;
