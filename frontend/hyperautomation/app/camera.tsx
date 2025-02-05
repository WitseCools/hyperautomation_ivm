import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { sendImageToBackend } from "../services/imageService";
import { localImageToDataUrl } from "@/utils/localImageToDataUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WasteItem } from "@/models/WasteItem";
import { useTranslation } from "react-i18next";

const CameraScreen = () => {
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text>{t("requestingPermission")}</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text>{t("noCameraAccess")}</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>{t("grantPermission")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const clearPicture = () => {
    setCapturedImage(null);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
    }
  };

  const handleSendImage = async () => {
    if (!capturedImage) {
      Alert.alert(t("noImage"), t("pickImage"));
      return;
    }

    setLoading(true);

    try {
      const base64Image = await localImageToDataUrl(capturedImage);
      const responseItems = await sendImageToBackend(base64Image);

      if (responseItems.length > 0) {
        const itemsWithImage = responseItems.map((item) => ({
          ...item,
          capturedImage, // Attach the captured image URI
        }));

        await saveToHistory(itemsWithImage);

        if (responseItems.length > 1) {
          router.push({
            pathname: "/multipleItems",
            params: { items: JSON.stringify(responseItems) },
          });
        } else {
          router.push({
            pathname: "/moreInfo",
            params: { items: JSON.stringify(responseItems) },
          });
        }
      } else {
        router.push("/unknownItem");
      }
    } catch (error) {
      router.push("/unknownItem");
    } finally {
      setLoading(false);
    }
  };

  // Save items with image URI
  const saveToHistory = async (newItems: WasteItem[]) => {
    try {
      const existingHistory = await AsyncStorage.getItem("wasteHistory");
      const historyArray: WasteItem[] = existingHistory
        ? JSON.parse(existingHistory)
        : [];

      // Keep only the last 10 items (newest first)
      const updatedHistory = [...newItems, ...historyArray].slice(0, 10);
      await AsyncStorage.setItem("wasteHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Failed to save history", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Loading Modal */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>{t("processing")}</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          disabled={loading}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("scan")}</Text>
      </View>

      <View style={styles.cameraContainer}>
        <Text style={styles.instructionText}>
          {t("pointToObject")} <Text style={{ fontWeight: "bold" }}>{t("scan")}</Text>.
        </Text>
        {capturedImage ? (
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
        ) : (
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={capturedImage ? clearPicture : takePicture}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {capturedImage ? t("clear") : t("takePicture")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !capturedImage && styles.disabledButton]}
          onPress={handleSendImage}
          disabled={!capturedImage || loading}
        >
          <Text style={styles.buttonText}>{t("scanNow")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(50, 50, 50, 0.8)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  loadingText: { color: "#fff", fontSize: 18, marginTop: 10 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: { padding: 10 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  cameraContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  camera: {
    width: "90%",
    height: "70%",
    borderRadius: 15,
    overflow: "hidden",
  },
  capturedImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#7fa354",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  disabledButton: { backgroundColor: "#A5A5A5" },
  instructionText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "SourceSansPro-SemiBold",
    fontWeight: "600",
    marginBottom: 30,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default CameraScreen;
