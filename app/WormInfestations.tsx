// File: app/WormInfectious.tsx
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

import wormJson from "../constants/WormInfestations.json";   // ← path as saved
import HeadingCard from "../components/HeadingCard";
import JsonRenderer from "../components/JsonRenderer";

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
const { width } = Dimensions.get("window");
const MARGIN = 10;

/** Every card heading is the worm’s “name” field. */
const headings: string[] = wormJson.WormInfestations.map((w) => w.name);

/** Nicely space-out “snake-case” or “camelCase” keys for JsonRenderer */
const formatKey = (s: string) =>
  s
    .replace(/[_\-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function WormInfectiousScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  /* -- CARD FOR MAIN GRID -- */
  const renderHeading = ({ item }: { item: string }) => (
    <HeadingCard title={formatKey(item)} onPress={() => setSelected(item)} />
  );

  /* -- WHEN A HEADING IS TAPPED: SHOW DETAILS -- */
  if (selected) {
    const data = wormJson.WormInfestations.find((w) => w.name === selected);

    /* -- Safety check (should never hit) -- */
    if (!data) {
      setSelected(null);
      return null;
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        {/* Header with Back ← */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelected(null)}>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{formatKey(selected)}</Text>

          {/* Dummy view for symmetrical spacing (matches back arrow width) */}
          <View style={{ width: 48 }} />
        </View>

        {/* Body */}
        <ScrollView contentContainerStyle={styles.content}>
          <JsonRenderer data={data} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* -- DEFAULT: GRID OF WORM TITLES -- */
  return (
    <SafeAreaView style={styles.safeArea}>
         <View style={[styles.headerRow]}>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.back}>← </Text>
                </TouchableOpacity>
           <Text style={styles.pageTitle}>Worm Infestations</Text>
      
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

/* ------------------------------------------------------------------ */
/* Styles                                                             */
/* ------------------------------------------------------------------ */
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
  /* List view */
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    
  },
  outer: { paddingHorizontal: MARGIN, paddingBottom: MARGIN },
  row: { justifyContent: "space-between", marginBottom: MARGIN * 2 },

  /* Detail view */
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
