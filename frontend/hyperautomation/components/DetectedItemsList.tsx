import React from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { WasteItem } from "@/models/WasteItem";

interface DetectedItemsListProps {
  detectedItems: WasteItem[];
}

const DetectedItemsList: React.FC<DetectedItemsListProps> = ({ detectedItems }) => {
  const router = useRouter();

  const handleItemPress = (item: WasteItem) => {
    router.push({
      pathname: "/moreInfo",
      params: { items: JSON.stringify([item]), fromMultipleItems: "true" },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={detectedItems}
        keyExtractor={(item, index) => item.name + index}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
            <Text style={styles.label}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  list: {
    paddingHorizontal: 5,
    paddingBottom: 15, // ✅ Adds spacing to avoid cut-off issue
  },
  item: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10, // ✅ Reduce padding to better fit content
    borderRadius: 15,
    marginRight: 12, // ✅ Spacing between cards
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 120, // ✅ Slightly bigger for better readability
    height: 60, // ✅ Increased height to fit image + text
  },
  label: {
    fontSize: 14, // ✅ Make text smaller to fit better
    fontFamily: "SourceSansPro-Regular",
    color: "#333",
    textAlign: "center",
  },
});

export default DetectedItemsList;
