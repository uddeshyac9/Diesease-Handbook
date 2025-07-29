// File: app/Immunology.tsx

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

import immunologyJson from "../constants/Immunology.json";
import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";

import Image1 from "../assets/images/Immunology/Image1.jpg";
import Image2 from "../assets/images/Immunology/Image2.jpg";
import Image3 from "../assets/images/Immunology/Image3.jpg";
import Image4 from "../assets/images/Immunology/Image4.jpg";

const { width } = Dimensions.get("window");
const MARGIN = 10;

// Make sure this array length matches Object.keys(immunologyJson.immunology).length
const images = [Image1, Image2, Image3, Image4] as const;

const formatKey = (str: string) =>
  str
    .replace(/[_\-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

export default function ImmunologyScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const headings = Object.keys(
    immunologyJson.immunology as Record<string, unknown>
  );

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
    const data = (immunologyJson.immunology as Record<string, unknown>)[
      selected
    ];
    const selectedIndex = headings.indexOf(selected);
    const banner = images[selectedIndex];

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setSelected(null)}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.detailTitle}>
            {formatKey(selected)}
          </Text>
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
        <Text style={styles.pageTitle}>Immunology</Text>
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
  row: { justifyContent: "space-between" },

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
    alignSelf:'center',
    borderRadius:10
  },

  // Detail body
  content: { padding: 16, paddingVertical:16 }
});
