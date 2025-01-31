import React from 'react';
import { Stack } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#4E342E',
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'center',
        contentStyle: styles.content,
      }}
    >
      {/* Home Screen Configuration */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Interafval app',
          headerRight: () => (
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* Settings Screen Configuration */}
      <Stack.Screen
        name="settings"
        options={{
          title: '',
          headerRight: () => (
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#4E342E',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  content: {
    backgroundColor: '#E0E0E0',
    flex: 1,
  },
});
