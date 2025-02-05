import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import HomeScreen from "../screens/HomeScreen";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header /> 
      <HomeScreen /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
