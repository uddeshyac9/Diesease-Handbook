// File: app/Cardiology.tsx

import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  ListRenderItemInfo,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import cardiologyJson from "../constants/Cardiology.json";
import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";

// Import all 6 images
import image1 from "../assets/images/Cardiology/image1.jpg";
import image2 from "../assets/images/Cardiology/image2.jpg";
import image3 from "../assets/images/Cardiology/image3.jpg";
import image4 from "../assets/images/Cardiology/image4.png";
import image5 from "../assets/images/Cardiology/image5.jpg";
import image6 from "../assets/images/Cardiology/image6.jpg";

// Must match Object.keys(cardiologyJson.Cardiology).length
const images = [image1, image2, image3, image4, image5, image6] as const;

// Top‑level keys in the Cardiology object
const headings = Object.keys(cardiologyJson.Cardiology);

/** Nicely format SCREAMING_SNAKE_CASE keys */
const formatKey = (s: string) =>
  s
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function CardiologyScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  /* ----------------------------- RENDER CARD ---------------------------- */
  const renderHeading = ({
    item,
    index
  }: ListRenderItemInfo<string>) => (
    <HeadingCard
      title={formatKey(item)}
      imageSource={images[index]}
      onPress={() => setSelected(item)}
    />
  );

  /* -------------------------- DETAIL SCREEN ---------------------------- */
  if (selected) {
    const data = (cardiologyJson.Cardiology as Record<string, unknown>)[
      selected
    ];
    if (!data) return null;

    const selectedIndex = headings.indexOf(selected);
    const banner = images[selectedIndex];

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setSelected(null)}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.detailTitle}>{formatKey(selected)}</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Image
            source={banner}
            style={styles.bannerImage}
            resizeMode="contain"
          />
          <JsonRenderer data={data} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* --------------------------- GRID SCREEN ----------------------------- */
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Cardiology</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={headings}
        renderItem={renderHeading}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.outer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* ------------------------------------------------------------------ */
/* ---------------------------  STYLES  ----------------------------- */
const { width } = Dimensions.get("window");
const MARGIN = 10;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },

  // Grid header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 12
  },
  back: {
    fontSize: 20,
    fontWeight: "600",
    width: 24
  },
  pageTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700"
  },

  // Grid list
  outer: { paddingHorizontal: MARGIN, paddingBottom: MARGIN },
  row: { justifyContent: "space-between", marginBottom: MARGIN * 2 },

  // Detail header
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4
  },
  detailTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700"
  },

  // Banner image
  bannerImage: {
    width: "95%",
    height: 200,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 16
  },

  // Detail content
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16
  }
});
