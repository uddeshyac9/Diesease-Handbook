// File: app/Infectious.tsx

import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import infectiousJson from "../constants/Infectious.json";
import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";

// Pull the top‐level "InfectiousDiseases" object
const headings = Object.keys(infectiousJson.InfectiousDiseases);
const { width } = Dimensions.get("window");
const MARGIN = 10;

export default function InfectiousScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const renderHeading = ({ item }: { item: string }) => (
    <HeadingCard
      title={formatKey(item)}
      onPress={() => setSelected(item)}
    />
  );

  if (selected) {
    // Lookup under InfectiousDiseases
    const data = (infectiousJson.InfectiousDiseases as any)[selected];

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelected(null)}>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{formatKey(selected)}</Text>
          <View style={{ width: 48 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <JsonRenderer data={data} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
          <View style={[styles.header,{marginBottom: 24}]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>← </Text>
          </TouchableOpacity>
      <Text style={styles.pageTitle}>Infectious Diseases</Text>

          <View style={{ width: 48 }} />
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

const formatKey = (s: string) =>
  s
    .replace(/[_\-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8f9fa" },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    
   
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
  back: { fontSize: 17, fontWeight: "500", width: 48 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700"
  },
  content: { padding: 16, paddingBottom: 32 }
});
