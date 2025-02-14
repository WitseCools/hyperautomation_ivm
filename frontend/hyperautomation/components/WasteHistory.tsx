import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WasteItem } from "@/models/WasteItem";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const WasteHistory: React.FC = () => {
  const { t } = useTranslation();
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await AsyncStorage.getItem("wasteHistory");
        if (history) {
          setWasteItems(JSON.parse(history));
        } else {
          setWasteItems([]);
        }
      } catch (error) {
        console.error("Failed to load history", error);
      }
    };

    loadHistory();
  }, []);

  const handleItemPress = (item: WasteItem) => {
    router.push({
      pathname: "/moreInfo",
      params: { items: JSON.stringify([item]) },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("history")}</Text>
      {wasteItems.length === 0 ? (
        <Text style={styles.emptyMessage}>{t("noItemsScanned")}</Text>
      ) : (
        <FlatList
          data={wasteItems}
          keyExtractor={(item, index) => item.name + index}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
              <Image source={{ uri: item.capturedImage || item.icon }} style={styles.image} />
              <Text style={styles.label} numberOfLines={2} ellipsizeMode="tail">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, paddingHorizontal: 15, flexGrow: 1 },
  title: { fontSize: 18, fontFamily: "SourceSansPro-Bold", color: "#333", marginBottom: 10 },
  emptyMessage: {
    fontSize: 14,
    fontFamily: "SourceSansPro-Regular",
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  list: { paddingHorizontal: 5, paddingBottom: 10 },
  item: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 100,
    height: 130,
  },
  image: { width: 70, height: 70, borderRadius: 10, marginBottom: 5, resizeMode: "cover" },
  label: { fontSize: 12, fontFamily: "SourceSansPro-Regular", color: "#333", textAlign: "center" },
});

export default WasteHistory;
