// File: app/GrowthAndDevelopment.tsx

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

import growthDevJson from "../constants/GrowthAndDevelopment.json";
import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";

const { width } = Dimensions.get("window");
const MARGIN = 10;

// All top-level keys except the title
const allKeys = Object.keys(growthDevJson).filter((k) => k !== "title");

const formatKey = (s: string) =>
  s
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function GrowthAndDevelopment() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  // Detail view for a selected section
  if (selected) {
    const data = (growthDevJson as any)[selected];

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
        <Text style={styles.pageTitle}>Growth & Development</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={allKeys}
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

  outer: {
    paddingHorizontal: MARGIN,
    paddingBottom: MARGIN
  },
  row: {
    justifyContent: "space-between",
    marginBottom: MARGIN * 2
  },

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

  content: {
    padding: 16,
    paddingBottom: 32
  }
});
