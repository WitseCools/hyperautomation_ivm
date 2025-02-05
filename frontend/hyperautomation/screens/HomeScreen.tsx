import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import WasteHistory from "../components/WasteHistory";
import { useTranslation } from "react-i18next";

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require("../assets/images/homescreen-logo.png")} style={styles.logo} />
        <TouchableOpacity style={styles.scanButton} onPress={() => router.push("/camera")}>
          <Image source={require("../assets/images/icon-scan-button.png")} style={styles.scanIcon} />
          <Text style={styles.scanButtonText}>{t("scanNow")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSection}>
        <WasteHistory />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  topSection: {
    backgroundColor: "#F4F7E9",
    alignItems: "center",
    justifyContent: "center",
    flex: 1.3,
    paddingVertical: 40,
  },
  logo: { width: "70%", height: 180, resizeMode: "contain", marginBottom: 10 },
  scanButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7fa354",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: -10,
  },
  scanIcon: { width: 30, height: 30, resizeMode: "contain", marginBottom: 5 },
  scanButtonText: { color: "#fff", fontSize: 18, fontFamily: "SourceSansPro-Bold" },
  bottomSection: { flex: 1, backgroundColor: "#FFFFFF", paddingTop: 10 },
});

export default HomeScreen;
