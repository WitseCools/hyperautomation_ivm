import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MoreInfoCard from "@/components/MoreInfoCard";
import { useTranslation } from "react-i18next";

const MoreInfoScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { items, fromMultipleItems } = useLocalSearchParams();
  const wasteItems = items ? JSON.parse(items as string) : [];

  const handleGoBack = () => {
    if (fromMultipleItems === "true") {
      router.back();
    } else {
      router.push({ pathname: "/camera", params: { resetCamera: "true" } });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("recycleInfo")}</Text>
      </View>
      <View style={styles.cardContainer}>
        <MoreInfoCard wasteItems={wasteItems} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  header: { flexDirection: "row", alignItems: "center", width: "100%", marginBottom: 20 },
  backButton: { padding: 10 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 20, fontWeight: "bold" },
  cardContainer: { flex: 1, width: "100%", height: 800 },
});

export default MoreInfoScreen;
