// File: app/BirthInjuries.tsx

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";
import injuriesJson from "../constants/BirthInjuries.json";

const { width } = Dimensions.get("window");
const MARGIN = 10;

const headings: string[] = Object.keys(injuriesJson.birth_injuries);

const formatKey = (s: string) =>
  s
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function BirthInjuries() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  // Detail view
  if (selected) {
    const data = injuriesJson.birth_injuries[selected as keyof typeof injuriesJson.birth_injuries];
    if (!data) return null;

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

  // Grid view
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Birth Injuries</Text>
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

  content: { padding: 16, paddingBottom: 32 }
});
