import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WasteItem } from '@/models/WasteItem';
import { useTranslation } from 'react-i18next';

interface DisplayInfoCardProps {
  wasteItems?: WasteItem[] | null;
}

const DisplayInfoCard: React.FC<DisplayInfoCardProps> = ({ wasteItems }) => {
  const { t } = useTranslation();

  if (!wasteItems || wasteItems.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.placeholderText}>{t('nothingToShow')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instructionsTitle}>{t('instructions')}</Text>
      {wasteItems.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>{t('item')}:</Text> {item.name || 'N/A'}
          </Text>
          <View style={styles.row}>
            <Text style={styles.infoText}>
              <Text style={styles.bold}>{t('bin')}:</Text> {item.short_explanation || 'N/A'}
            </Text>
            {item.icon && <Image source={item.icon} style={styles.icon} />}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#DDE8D9',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#EAF1E5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});

export default DisplayInfoCard;
