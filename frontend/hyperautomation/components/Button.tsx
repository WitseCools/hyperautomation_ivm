import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const CustomButton = ({ title, onPress, style , disabled }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, style]} 
      disabled={disabled}
    >
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5C4433',  // Brownish color to match the button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,  // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,  // Android shadow effect
  },
  buttonText: {
    color: 'white',  // White text color
    fontSize: 12,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#ccc',  // Light grey text when disabled
  },
});

export default CustomButton;
