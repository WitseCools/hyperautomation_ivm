import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Menu } from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import i18n from "../app/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGES = [
  { code: "en", label: "English", country: "GB" },
  { code: "nl", label: "Nederlands", country: "NL" },
  { code: "fr", label: "Français", country: "FR" },
  { code: "pl", label: "Polski", country: "PL" },
  { code: "ru", label: "Русский", country: "RU" },
  { code: "tr", label: "Türkçe", country: "TR" },
  { code: "ar", label: "العربية", country: "SA" },
];

const LanguageDropdown: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

  // On mount, load the saved language from AsyncStorage
  useEffect(() => {
    (async () => {
      const savedLang = await AsyncStorage.getItem("selectedLanguage");
      if (savedLang) {
        const langObj = LANGUAGES.find((lang) => lang.code === savedLang);
        if (langObj) {
          setSelectedLanguage(langObj);
          i18n.changeLanguage(langObj.code);
        }
      }
    })();
  }, []);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectLanguage = async (lang: any) => {
    setSelectedLanguage(lang);
    await AsyncStorage.setItem("selectedLanguage", lang.code);
    i18n.changeLanguage(lang.code);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity style={styles.dropdownButton} onPress={openMenu}>
            <CountryFlag isoCode={selectedLanguage.country} size={18} />
            <Text style={styles.languageText}>
              {selectedLanguage.country} ▼
            </Text>
          </TouchableOpacity>
        }
        anchorPosition="bottom"
        style={styles.menu}
      >
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={styles.menuItem}
            onPress={() => selectLanguage(lang)}
          >
            <CountryFlag isoCode={lang.country} size={18} />
            <Text style={styles.menuText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "flex-end" },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  languageText: { fontSize: 16, fontWeight: "600", color: "#333", marginLeft: 8 },
  menu: { marginTop: 12 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: { fontSize: 16, color: "#333", marginLeft: 10 },
});

export default LanguageDropdown;
