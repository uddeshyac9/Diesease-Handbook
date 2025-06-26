// File: app/RespiratorySystem.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import respiratoryJson from "../constants/RespiratorySystem.json";
import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";

/* ------------------------------------------------------------------ */
/* ----------  CONSTANTS & HELPERS  --------------------------------- */
const diseases = respiratoryJson.RespiratorySystem; // ⇐ array of objects
const { width } = Dimensions.get("window");
const MARGIN = 10;

const formatKey = (s: string) =>
  s
    .replace(/[_\-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

/* ------------------------------------------------------------------ */
/* ---------------------  MAIN COMPONENT  --------------------------- */
export default function RespiratorySystemScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  /* ───────── Render a disease tile in the grid ───────── */
  const renderHeading = ({ item }: { item: (typeof diseases)[number] }) => (
    <HeadingCard title={item.name} onPress={() => setSelected(item.name)} />
  );

  /* ───────── If a disease is selected, show its details ───────── */
  if (selected) {
    const data = diseases.find((d) => d.name === selected);
    if (!data) {
      // should never happen, but safety first
      setSelected(null);
      return null;
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        {/* Header with “back to list” arrow */}
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

  /* ───────── Default grid view ───────── */
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Page title row with arrow back to Home */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.pageTitle}>Respiratory System</Text>
        {/* spacer keeps title centred */}
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

/* ------------------------------------------------------------------ */
/* ---------------------------  STYLES  ----------------------------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8f9fa" },

  /* --- Grid header (back + title) --- */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 12
  },
  pageTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700"
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

  /* --- Detail scroll area --- */
  content: { padding: 16, paddingBottom: 32 }
});
