// File: app/RespiratorySystem.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ListRenderItemInfo,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import respiratoryJson from "../constants/RespiratorySystem.json";
import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";

// Import all 11 images
import image1 from "../assets/images/RespiratorySystem/image1.jpg";
import image2 from "../assets/images/RespiratorySystem/image2.jpg";
import image3 from "../assets/images/RespiratorySystem/image3.jpg";
import image4 from "../assets/images/RespiratorySystem/image4.jpg";
import image5 from "../assets/images/RespiratorySystem/image5.jpg";
import image6 from "../assets/images/RespiratorySystem/image6.jpg";
import image7 from "../assets/images/RespiratorySystem/image7.jpg";
import image8 from "../assets/images/RespiratorySystem/image8.jpg";
import image9 from "../assets/images/RespiratorySystem/image9.jpg";
import image10 from "../assets/images/RespiratorySystem/image10.jpg";
import image11 from "../assets/images/RespiratorySystem/image11.jpg";

/** Array length must equal respiratoryJson.RespiratorySystem.length */
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

const { width } = Dimensions.get("window");
const MARGIN = 10;

// Pretty‑print JSON keys if needed
const formatKey = (s: string) =>
  s
    .replace(/[_\-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

export default function RespiratorySystemScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const diseases = respiratoryJson.RespiratorySystem;
  const headings = diseases.map((d) => d.name);

  /* ───────── Render a disease tile in the grid ───────── */
  const renderHeading = ({
    item,
    index,
  }: ListRenderItemInfo<typeof diseases[number]>) => (
    <HeadingCard
      title={item.name}
      imageSource={images[index]}
      onPress={() => setSelected(item.name)}
    />
  );

  /* ───────── If a disease is selected, show its details ───────── */
  if (selected) {
    const data = diseases.find((d) => d.name === selected);
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
            resizeMode="contain"
          />
          <JsonRenderer data={data} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* ───────── Default grid view ───────── */
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Page title row with arrow back to Home */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Respiratory System</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={diseases}
        renderItem={renderHeading}
        keyExtractor={(item) => item.name}
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

  /* --- Grid header (back + title) --- */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  pageTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
  },
  back: { fontSize: 20, fontWeight: "600", width: 24, textAlign: "left" },

  /* --- Grid list --- */
  outer: { paddingHorizontal: MARGIN, paddingBottom: MARGIN },
  row: { justifyContent: "space-between", marginBottom: MARGIN * 2 },

  /* --- Disease detail header --- */
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

  /* --- Banner image --- */
  bannerImage: {
    width: "95%",
    height: 200,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 16,
  },

  /* --- Detail scroll area --- */
  content: { paddingHorizontal: 16, paddingVertical:16},
});
