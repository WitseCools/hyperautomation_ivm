import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DetectedItemsList from "@/components/DetectedItemsList";
import { WasteItem } from "@/models/WasteItem";
import { useTranslation } from "react-i18next";

const MultipleItemsScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { items } = useLocalSearchParams();
  const detectedItems: WasteItem[] = items ? JSON.parse(items as string) : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.push({ pathname: "/camera", params: { resetCamera: "true" } })
          }
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("recycleInfo")}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{t("multipleItemsDetected")}</Text>
        <Image source={require("../assets/images/found-logo.png")} style={styles.image} />
        <Text style={styles.description}>{t("multipleItemsDescription")}</Text>
      </View>
      <Text style={styles.detectedItem}>{t("detectedItems")}</Text>
      <DetectedItemsList detectedItems={detectedItems} />
      <TouchableOpacity style={styles.scanButton} onPress={() => router.push("/camera")}>
        <Text style={styles.scanButtonText}>{t("scanAgain")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff", alignItems: "center", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", width: "100%", marginBottom: 20 },
  backButton: { padding: 10 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 20, fontWeight: "bold" },
  content: { alignItems: "center", justifyContent: "center", flex: 1 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  image: { width: 200, height: 200, resizeMode: "contain", marginBottom: 20 },
  description: { fontSize: 16, textAlign: "center", color: "#555", marginBottom: 30 },
  detectedItem: { fontWeight: "bold", fontSize: 16, textAlign: "center", color: "#555", marginBottom: 30 },
  scanButton: {
    backgroundColor: "#7fa354",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  scanButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default MultipleItemsScreen;
