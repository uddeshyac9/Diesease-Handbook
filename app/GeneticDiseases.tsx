// File: app/GeneticDiseases.tsx

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

import geneticJson from "../constants/GeneticDiseases.json";
import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";

const { width } = Dimensions.get("window");
const MARGIN = 10;

/** List of disease topics */
const headings: string[] = geneticJson.geneticDiseases.map((d) => d.topic);

/** Convert SCREAMING_SNAKE_CASE or Title Case to Normal Title */
const formatKey = (s: string) =>
  s
    .toLowerCase()
    .replace(/[_\-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function GeneticDiseases() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  // Detail view when a topic is selected
  if (selected) {
    const data = geneticJson.geneticDiseases.find((d) => d.topic === selected);
    if (!data) {
      setSelected(null);
      return null;
    }
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
          <JsonRenderer data={data} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Grid view of all genetic disease topics
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Genetic Diseases</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={headings}
        renderItem={({ item }) => (
          <HeadingCard title={formatKey(item)} onPress={() => setSelected(item)} />
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

  // Main grid header
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

  // Grid layout
  outer: { paddingHorizontal: MARGIN, paddingBottom: MARGIN },
  row: { justifyContent: "space-between", marginBottom: MARGIN * 2 },

  // Detail view header
  detailHeader: {
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
  detailTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700"
  },

  // Detail content
  content: { padding: 16, paddingBottom: 32 }
});
