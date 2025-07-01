// File: app/NutritionInChildren.tsx

import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import nutritionJson from "../constants/NutritionInChildren.json";
import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";

const { width } = Dimensions.get("window");
const MARGIN = 10;

// Top-level sections of the JSON
const headings: string[] = Object.keys(nutritionJson.NUTRITION_IN_CHILDREN);

// Convert keys like "age_wise_requirements" to Title Case
const formatKey = (s: string) =>
  s
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function NutritionInChildren() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  // Detail view when a section is selected
  if (selected) {
    const data = (nutritionJson.NUTRITION_IN_CHILDREN as any)[selected];
    if (!data) {
      setSelected(null);
      return null;
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelected(null)}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{formatKey(selected)}</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <JsonRenderer data={data} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Grid of sections
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Nutrition in Children</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={headings}
        renderItem={({ item }) => (
          <HeadingCard
            title={formatKey(item)}
            onPress={() => setSelected(item)}
          />
        )}
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
  safeArea: { flex: 1, backgroundColor: "#f8f9fa" },

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

  outer: { paddingHorizontal: MARGIN, paddingBottom: MARGIN },
  row: { justifyContent: "space-between", marginBottom: MARGIN * 2 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700"
  },

  content: { padding: 16, paddingBottom: 32 }
});
