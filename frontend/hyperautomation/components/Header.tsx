import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import LanguageDropdown from "./LanguageDropdown";

const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.title}>
          Rec<Text style={styles.boldText}>AI</Text>cle
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <LanguageDropdown />
      </View>
    </View>
  );
};

const HEADER_HEIGHT = Platform.OS === "ios" ? 120 : 100;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    height: HEADER_HEIGHT,
  },
  leftContainer: { flexDirection: "row", alignItems: "center", flex: 2 },
  logo: { width: 50, height: 50, resizeMode: "contain", marginRight: 10 },
  title: { fontSize: 30, color: "#9DBF40" },
  boldText: { fontWeight: "bold", color: "#9DBF40" },
  rightContainer: { flex: 1, alignItems: "flex-end" },
});

export default Header;
