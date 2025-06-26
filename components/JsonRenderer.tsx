import React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")
const INDENT = 16

/** Recursively renders arbitrary JSON as readable text blocks */
export default function JsonRenderer({
  data,
  level = 0,
}: {
  data: any
  level?: number
}): React.ReactElement | null {
  if (typeof data === "string" || typeof data === "number") {
    return <Text style={[styles.text, { marginLeft: level * INDENT }]}>{data}</Text>
  }

  if (Array.isArray(data)) {
    return (
      <>
        {data.map((item, idx) => (
          <View key={idx} style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <View style={styles.bulletContent}>{JsonRenderer({ data: item, level })}</View>
          </View>
        ))}
      </>
    )
  }

  if (data && typeof data === "object") {
    return (
      <>
        {Object.entries(data).map(([k, v]) => (
          <View key={k} style={styles.block}>
            <Text style={[styles.heading, { marginLeft: level * INDENT }]}>{formatKey(k)}</Text>
            <View style={styles.content}>{JsonRenderer({ data: v, level: level + 1 })}</View>
          </View>
        ))}
      </>
    )
  }

  return null
}

const formatKey = (s: string) =>
  s
    .replace(/[_\-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase())

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2563EB", // Blue color matching the screenshot
    marginTop: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#374151", // Dark gray for body text
    marginBottom: 4,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 3,
    paddingLeft: 8,
  },
  bulletPoint: {
    fontSize: 15,
    color: "#374151",
    marginRight: 8,
    marginTop: 1,
  },
  bulletContent: {
    flex: 1,
  },
  block: {
    marginBottom: 12,
  },
  content: {
    paddingLeft: 4,
  },
})
