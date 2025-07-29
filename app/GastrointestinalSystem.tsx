// File: app/GastrointestinalSystem.tsx

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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import giJson from "../constants/GastrointestinalSystem.json";
import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";

// Make sure you actually have image1...image9 in this folder:
import image1 from "../assets/images/GasSystem/image1.jpg";
import image2 from "../assets/images/GasSystem/image2.jpg";
import image3 from "../assets/images/GasSystem/image3.jpg";
import image4 from "../assets/images/GasSystem/image4.jpg";
import image5 from "../assets/images/GasSystem/image5.png";
import image6 from "../assets/images/GasSystem/image6.jpg";
import image7 from "../assets/images/GasSystem/image7.jpg";
import image8 from "../assets/images/GasSystem/image8.jpg";
import image9 from "../assets/images/GasSystem/image9.jpg";
import image10 from "../assets/images/GasSystem/image10.jpg";
import image11 from "../assets/images/GasSystem/image11.jpg";

const { width } = Dimensions.get("window");
const MARGIN = 10;

// List of all condition names
const headings = giJson.GastrointestinalSystem.map((item) => item.name);

// Array of images—length must match `headings.length`
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
] as const;

const formatKey = (s: string) =>
  s
    .replace(/[_\-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

export default function GastrointestinalSystemScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  /* ----------------------------- RENDER CARD ----------------------------- */
  const renderHeading = ({
    item,
    index,
  }: ListRenderItemInfo<string>) => (
    <HeadingCard
      title={item}
      imageSource={images[index]}
      onPress={() => setSelected(item)}
    />
  );

  /* -------------------------- DETAIL VIEW -------------------------- */
  if (selected) {
    const data = giJson.GastrointestinalSystem.find((w) => w.name === selected);
    if (!data) return null;
    const selectedIndex = headings.indexOf(selected);
    const banner = images[selectedIndex];

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setSelected(null)}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.detailTitle}>{selected}</Text>
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

  /* --------------------------- GRID VIEW --------------------------- */
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Gastrointestinal System</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={headings}
        renderItem={renderHeading}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.outer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },

  // Grid header (back + title)
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  back: {
    fontSize: 20,
    fontWeight: "600",
    width: 24,
  },
  pageTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
  },

  // Grid list spacing
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
    shadowRadius: 4,
  },
  detailTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },

  // Banner image shown above the JSON
  bannerImage: {
    width: "95%",
    height: 200,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 16,
  },

  // Detail content
  content: { paddingHorizontal: 16, paddingVertical:16 },
});
