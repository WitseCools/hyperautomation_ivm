import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

interface MoreInfoCardProps {
  wasteItems: { name: string; long_explanation: string }[];
}

const MoreInfoCard: React.FC<MoreInfoCardProps> = ({ wasteItems }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.moreInfoText}>
          {expanded ? t('hideMoreInfo') : t('moreInfo')}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.infoContainer}>
          {wasteItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.infoText}>{item.long_explanation}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 15,
  },
  moreInfoText: {
    fontSize: 16,
    color: '#2C3E50',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 10,
  },
  itemContainer: {
    marginBottom: 15,
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
});

export default MoreInfoCard;
