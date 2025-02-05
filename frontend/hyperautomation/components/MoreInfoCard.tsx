import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { WasteItem } from "@/models/WasteItem";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

interface MoreInfoCardProps {
  wasteItems?: WasteItem[] | null;
}

const MoreInfoCard: React.FC<MoreInfoCardProps> = ({ wasteItems }) => {
  const { t } = useTranslation();
  const router = useRouter();

  if (!wasteItems || wasteItems.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.placeholderText}>{t("nothingToShow")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {wasteItems.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>
            {t("identifiedAs")} <Text style={styles.bold}>{item.bin}</Text>
          </Text>
          <View style={styles.iconContainer}>
            <Image source={require("../assets/images/found-logo.png")} style={styles.icon} />
          </View>
          <Text style={styles.binText}>
            {t("item")} <Text style={styles.bold}>{item.name}</Text> {t("belongsIn")}{" "}
            <Text style={styles.bold}>{item.bin.toLocaleLowerCase()}</Text>
          </Text>
          <Text style={styles.bulletPoint}>• {item.short_explanation}</Text>
          <View style={styles.tipContainer}>
            <Text style={styles.whyText}>👉 {t("tip")}</Text>
            <Text style={styles.tipText}>{item.long_explanation}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.goBackButton} onPress={() => router.push("/")}>
              <Text style={styles.goBackText}>{t("goBack")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 20,
    minHeight: 500,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: "600", color: "#2c3e50", textAlign: "left", marginBottom: 10 },
  iconContainer: { alignItems: "center", marginVertical: 20 },
  icon: { width: 170, height: 170, resizeMode: "contain" },
  binText: { fontSize: 18, textAlign: "left", color: "#2c3e50", marginBottom: 15 },
  bulletPoint: { fontSize: 16, textAlign: "left", color: "#4E4E4E", marginLeft: 10, marginBottom: 20 },
  whyText: { fontSize: 14, fontWeight: "bold", color: "#2c3e50", textAlign: "left", marginRight: 5 },
  tipText: { fontSize: 16, textAlign: "left", color: "#4E4E4E", flexShrink: 1 },
  tipContainer: { flexDirection: "row", alignItems: "center", flexWrap: "nowrap", marginTop: 15 },
  bold: { fontWeight: "bold" },
  placeholderText: { fontSize: 18, fontWeight: "bold", color: "#888", textAlign: "center" },
  buttonContainer: { marginTop: 30, alignItems: "flex-start" },
  goBackButton: {
    borderWidth: 2,
    borderColor: "#8BB83F",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
  },
  goBackText: { color: "#8BB83F", fontSize: 18, fontWeight: "bold" },
});

export default MoreInfoCard;
