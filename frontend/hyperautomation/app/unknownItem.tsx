import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const UnknownItemScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("recycleInfo")}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{t("couldNotIdentify")}</Text>
        <Image source={require("../assets/images/unknown-item.png")} style={styles.image} />
        <Text style={styles.description}>{t("noValidObject")}</Text>
      </View>
      <TouchableOpacity style={styles.scanButton} onPress={() => router.push("/camera")}>
        <Text style={styles.scanButtonText}>{t("scanAgain")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "flex-start", padding: 20 },
  header: { flexDirection: "row", alignItems: "flex-start", width: "100%", marginBottom: 20 },
  backButton: { padding: 10 },
  headerTitle: { flex: 1, textAlign: "left", fontSize: 20, fontWeight: "bold" },
  content: { alignItems: "flex-start", justifyContent: "center", flex: 1 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "left", marginBottom: 10 },
  image: { width: 200, height: 200, resizeMode: "contain", marginBottom: 20 },
  description: { fontSize: 16, textAlign: "left", color: "#555", marginBottom: 30 },
  scanButton: {
    backgroundColor: "#7fa354",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  scanButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default UnknownItemScreen;
