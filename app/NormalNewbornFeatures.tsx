// File: app/NormalNewbornFeatures.tsx

import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  ListRenderItemInfo,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import featuresJson from "../constants/NormalNewbornFeatures.json";
import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";

// Import all 13 images
import image1 from "../assets/images/NormalNewborn/image1.jpg";
import image2 from "../assets/images/NormalNewborn/image2.jpg";
import image3 from "../assets/images/NormalNewborn/image3.jpg";
import image4 from "../assets/images/NormalNewborn/image4.jpg";
import image5 from "../assets/images/NormalNewborn/image5.jpg";
import image6 from "../assets/images/NormalNewborn/image6.jpg";
import image7 from "../assets/images/NormalNewborn/image7.jpg";
import image8 from "../assets/images/NormalNewborn/image8.jpg";
import image9 from "../assets/images/NormalNewborn/image9.jpg";
import image10 from "../assets/images/NormalNewborn/image10.jpg";
import image11 from "../assets/images/NormalNewborn/image11.jpg";
import image12 from "../assets/images/NormalNewborn/image12.jpg";
import image13 from "../assets/images/NormalNewborn/image13.jpg";
import image14 from "../assets/images/NormalNewborn/image14.jpg";
import image15 from "../assets/images/NormalNewborn/image15.jpg";

const { width } = Dimensions.get("window");
const MARGIN = 10;

// Must match Object.keys(featuresJson.normal_newborn_features).length === 13
const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15
] as const;

const headings: string[] = Object.keys(
  featuresJson.normal_newborn_features as Record<string, unknown>
);

const formatKey = (s: string) =>
  s
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function NormalNewbornFeatures() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  /* ----------------------------- RENDER CARD ---------------------------- */
  const renderHeading = ({ item, index }: ListRenderItemInfo<string>) => (
    <HeadingCard
      title={formatKey(item)}
      imageSource={images[index]}
      onPress={() => setSelected(item)}
    />
  );

  /* -------------------------- DETAIL SCREEN ---------------------------- */
  if (selected) {
    const data = (featuresJson.normal_newborn_features as any)[selected];
    if (!data) {
      setSelected(null);
      return null;
    }
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
            resizeMode="cover"
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
        <Text style={styles.pageTitle}>Normal Newborn Features</Text>
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
