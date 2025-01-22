import { Stack } from 'expo-router';
import { Image, View, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: '#4E342E',
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          contentStyle: styles.content,  // Apply background styling to content
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Recycle AI',
            headerRight: () => (
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0', // Grey background applied to the entire app
  },
  header: {
    backgroundColor: '#FFFFFF', // White header background
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
    backgroundColor: '#E0E0E0',  // Grey background inside screen content
    flex: 1,
    paddingHorizontal: 0,  // Remove padding to avoid extra spacing
    paddingVertical: 0,
  },
});
