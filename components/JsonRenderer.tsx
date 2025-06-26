// File: components/JsonRenderer.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const INDENT = 12;

/** Recursively renders arbitrary JSON as readable text blocks */
export default function JsonRenderer({
  data,
  level = 0
}: {
  data: any;
  level?: number;
}): React.ReactElement | null {
  if (typeof data === "string" || typeof data === "number") {
    return (
      <Text style={[styles.text, { marginLeft: level * INDENT }]}>{data}</Text>
    );
  }

  if (Array.isArray(data)) {
    return (
      <>
        {data.map((item, idx) => (
          <View key={idx} style={styles.bullet}>
            {JsonRenderer({ data: item, level })}
          </View>
        ))}
      </>
    );
  }

  if (data && typeof data === "object") {
    return (
      <>
        {Object.entries(data).map(([k, v]) => (
          <View key={k} style={styles.block}>
            <Text style={[styles.heading, { marginLeft: level * INDENT }]}>
              {formatKey(k)}
            </Text>
            {JsonRenderer({ data: v, level: level + 1 })}
          </View>
        ))}
      </>
    );
  }

  return null;
}

const formatKey = (s: string) =>
  s
    .replace(/[_\-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

const styles = StyleSheet.create({
  heading: { fontSize: 17, fontWeight: "600", marginTop: 8, marginBottom: 4 },
  text: { fontSize: 15, lineHeight: 22 },
  bullet: { marginVertical: 2 },
  block: { marginBottom: 6 }
});
